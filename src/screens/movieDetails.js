import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchMovieDetails, fetchTVShowDetails } from "../utils/api";

const MovieDetailsScreen = ({ route }) => {
  const [media, setMedia] = useState(null);
  const { id, type } = route.params;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (type === "movie") {
          const movieDetails = await fetchMovieDetails(id);
          setMedia(movieDetails);
        } else if (type === "tv") {
          const tvShowDetails = await fetchTVShowDetails(id);
          setMedia(tvShowDetails);
        } else {
          try {
            const movieDetails = await fetchMovieDetails(id);
            setMedia(movieDetails);
          } catch (movieError) {
            const tvShowDetails = await fetchTVShowDetails(id);
            setMedia(tvShowDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching media details:", error);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (!media) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${media.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{media.title || media.name}</Text>
      <Text>{media.overview ? `Description: ${media.overview}` : "Description: NA"}</Text>
      <Text>Release Date: {media.release_date || media.first_air_date}</Text>
      <Text>Rating: {media.vote_average}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
});

export default MovieDetailsScreen;
