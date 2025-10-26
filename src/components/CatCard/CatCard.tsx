import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const imageWidth = Dimensions.get("screen").width - 32;

const CatCard = ({ cat }) => {
  console.log(cat);

  return (
    <View style={styles.container}>
      <Image
        style={{ ...styles.image, width: imageWidth, height: imageWidth }}
        source={{
          uri: cat.url,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  image: {
    borderRadius: 20,
  },
});

export default CatCard;
