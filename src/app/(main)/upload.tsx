import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import TopBar from "../../components/TopBar/TopBar";
import { Button } from "react-native-paper";
import fontSizes from "../../constants/fontSizes";

const Upload = () => {
  const [numColumns, setNumOfColumns] = useState(2);

  return (
    <View style={styles.container}>
      <TopBar setNumOfColumns={setNumOfColumns} />

      <TouchableOpacity style={styles.plusButtonContainer}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  plusButtonContainer: {
    position: "absolute",
    width: 80,
    height: 80,
    bottom: 130,
    right: 16,
    borderRadius: 40,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
  },
});

export default Upload;
