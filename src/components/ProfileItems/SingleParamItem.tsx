import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

type TextItemType = {
  name: string;
  param: string;
};

const SingleParamItem: FC<TextItemType> = ({ name, param }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text selectable style={styles.text}>
        {param}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  text: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
});

export default SingleParamItem;
