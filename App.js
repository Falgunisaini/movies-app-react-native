import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavigationBar from "./src/components/navigationBar"; 

export default function App() {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Movies App</Text>
        </View>
        <NavigationBar />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 110,
    backgroundColor: "#cfb2f7",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  headerText: {
    color: "#fff",
    paddingTop: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
});

