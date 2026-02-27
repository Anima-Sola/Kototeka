import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

const NoBreedInfo = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="paw-sharp" size={50} color={Colors.accent} />
      <Text style={styles.text}>No breed info</Text>
      <Text style={styles.text}>Just enjoy the picture</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
});

export default NoBreedInfo;
