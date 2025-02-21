import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, FlatList, Image,TouchableOpacity, } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchSearchResults } from "../utils/api";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("multi");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Movie", value: "movie" },
    { label: "TV Show", value: "tv" },
    { label: "Multi", value: "multi" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const handleSearch = async () => {
    if (!query || !category) {
      setError("Both search query and type are required");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const results = await fetchSearchResults(query, category);
      setResults(results);
      setCurrentPage(1); 
    } catch (err) {
      setError("Failed to fetch search results");
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageSwitch = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Movies/TV Shows</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. James Bond, Spiderman"
        value={query}
        onChangeText={setQuery}
      />

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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {isLoading && <Text>Loading...</Text>}

      {results.length === 0 && !isLoading && !error ? (
        <Text style={styles.noResults}>Please initiate a search to view results</Text>
      ) : (
        <>
          <FlatList
            data={currentResults}
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
                  <Text>Release Date: {item.release_date}</Text>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      const mediaType = category === "tv" ? "tv" : item.media_type || "movie";
                      if (mediaType === "movie" || mediaType === "tv") {
                        navigation.navigate("MovieDetails", {
                          id: item.id,
                          type: mediaType,
                        });
                      } else {
                        console.log("Media type not found:", mediaType);
                      }
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
                onPress={() => handlePageSwitch(page)}
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    minHeight: 40,
    maxHeight: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dropdownContainer: {
    height: 50,
    marginBottom: 16,
  },
  error: {
    color: "purple",
    marginBottom: 16,
  },
  noResults: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 15,
  },
  loading: {
    fontSize: 16,
    color: "#cfb2f7",
    textAlign: "center",
    marginTop: 15,
  },
  card: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
    textAlign: "center",
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

export default SearchScreen;