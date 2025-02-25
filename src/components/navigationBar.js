import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesScreen from "../screens/movies";
import MovieDetailsScreen from "../screens/movieDetails";
import SearchScreen from "../screens/search";
import TVScreen from "../screens/tv";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ 
          title: "Movie Details",
          headerBackTitle: "Back",
          headerTintColor: "#1c1c1c",
        }} 
      />
    </Stack.Navigator>
  );
}

function TVStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TVScreen"
        component={TVScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="MediaDetails" 
        component={MovieDetailsScreen}
        options={{ 
          title: "TV Show Details",
          headerBackTitle: "Back",
          headerTintColor: "##1c1c1c",
         }} 
      />
    </Stack.Navigator>
  );
}


function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ 
          title: "Movie/Show Details",
          headerBackTitle: "Back",
          headerTintColor: "#1c1c1c",
         }} 
      />
    </Stack.Navigator>
  );
}


const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        detachInactiveScreens={true}
        initialRouteName="Movies"
        screenOptions={{
          tabBarActiveTintColor: "#7c41fa",
          tabBarInactiveTintColor: "#777",
          tabBarStyle: { backgroundColor: "white" },
        }}
        lazy={false}
      >
        <Tab.Screen name="Movies" component={MoviesStack} />
        <Tab.Screen name="Search Results" component={SearchStack} />
        <Tab.Screen name="TV Shows" component={TVStack} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
