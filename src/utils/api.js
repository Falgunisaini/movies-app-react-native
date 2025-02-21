import axios from 'axios';
import { apiKey, baseUrl } from '../../config';

export const fetchMovies = async (category) => {
  try {
    const response = await fetch(`${baseUrl}/movie/${category}?api_key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return { results: [] };
  }
};

export const fetchTVShows = async (category) => {
  try {
    const response = await fetch(`${baseUrl}/tv/${category}?api_key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV Shows:", error.message);
    return { results: [] };
  }
};


export const fetchSearchResults = async (query, category) => {
    try {
      const response = await fetch(`${baseUrl}/search/${category}?query=${query}&api_key=${apiKey}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];  
    }
  };
  

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchTVShowDetails = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/tv/${id}?api_key=${apiKey}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      return null;
    }
  };

