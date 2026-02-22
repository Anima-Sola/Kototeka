import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

type TextItemType = {
  name: string;
  text: string;
};

const TextItem: FC<TextItemType> = ({ name, text }) => {
  if (!text) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <Text selectable style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  header: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
  text: {
    fontSize: fontSizes.FONT14,
    fontFamily: "ShantellRegular",
    color: Colors.mainText,
    textAlign: "justify",
  },
});

export default TextItem;
