import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchMovies } from "../utils/api";

const MoviesScreen = ({ navigation }) => {

  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(category);
        if (data && data.results && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          console.log("No valid results found in API response");
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };
    loadMovies();
  }, [category]);
  
  const currentMovies = currentPage === 1 
    ? movies.slice(0, moviesPerPage) 
    : movies.slice(moviesPerPage); 

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  
  const handlePageSwitch = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Category</Text>
      <DropDownPicker 
        open={open}
        value={category}
        items={categories}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setCategories}
        containerStyle={styles.dropdownContainer}
      />

      <FlatList
        data={currentMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Popularity: {item.popularity}</Text>
              <Text>Release Date: {item.release_date}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("MovieDetails", { id: item.id, type: "movie" });
                }}
              >
                <Text style={styles.buttonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.activePaginationButton,
          ]}
          onPress={() => handlePageSwitch(1)}
        >
          <Text
            style={[
              styles.paginationButtonText,
              currentPage === 1 && styles.activePaginationButtonText,
            ]}
          >
            1
          </Text>
        </TouchableOpacity>
        
        {totalPages > 1 && (
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 2 && styles.activePaginationButton,
            ]}
            onPress={() => handlePageSwitch(2)}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage === 2 && styles.activePaginationButtonText,
              ]}
            >
              2
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    marginTop: 5,
    backgroundColor: "#cfb2f7",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationButton: {
    marginHorizontal: 5,
    backgroundColor: "#e0e0e0",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activePaginationButton: {
    backgroundColor: "#cfb2f7",
  },
  paginationButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  activePaginationButtonText: {
    color: "#fff",
  },
});
