import { FC } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import RatingRects from "../RatingRects/RatingRects";

type MarkItemType = {
  name: string;
  mark: number;
};

const MarkItem: FC<MarkItemType> = ({ name, mark }) => {
  if (!mark) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.ratingContainer}>
        <RatingRects value={mark} />
      </View>
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
  header: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
  ratingContainer: {
    marginTop: Platform.OS === "ios" ? 3 : 8,
  },
});

export default MarkItem;
