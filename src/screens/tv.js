import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchTVShows } from "../utils/api";

const TVShowsScreen = ({ navigation }) => {
  const [tvshow, setTvshow] = useState([]);
  const [category, setCategory] = useState("popular");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Airing Today", value: "airing_today" },
    { label: "On the Air", value: "on_the_air" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const tvShowPerPage = 10;

  useEffect(() => {
    const loadTVShows = async () => {
      try {
        const data = await fetchTVShows(category);
        if (data && data.results) {
          setTvshow(data.results);
          setCurrentPage(1); 
        } else {
          console.error("No results found in the API response");
          setTvshow([]); 
        }
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        setTvshow([]); 
      }
    };

    loadTVShows();
  }, [category]);

  const indexOfLastTvShow = currentPage * tvShowPerPage;
  const indexOfFirstTvShow = indexOfLastTvShow - tvShowPerPage;
  const currentTvShow = tvshow.slice(indexOfFirstTvShow, indexOfLastTvShow);
  const totalPages = Math.ceil(tvshow.length / tvShowPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
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
        data={currentTvShow}
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
              <Text style={styles.title}>{item.title || item.name}</Text>
              <Text>Popularity: {item.popularity}</Text>
              <Text>Release Date: {item.first_air_date}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("MediaDetails", { id: item.id, type: "tv" });
                }}
              >
                <Text style={styles.buttonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        {pageNumbers.map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.paginationButton,
              currentPage === page && styles.activePaginationButton,
            ]}
            onPress={() => handlePageChange(page)}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage === page && styles.activePaginationButtonText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TVShowsScreen;

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
    marginBottom: 20,
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