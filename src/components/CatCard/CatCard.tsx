import { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/colors";
import { CatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const imageWidth = Dimensions.get("screen").width - 32;

type CatCardProps = {
  cat: CatType;
};

const CatCard: FC<CatCardProps> = ({ cat }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourites = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={{
            uri: cat.url,
          }}
        />
        <Text style={styles.catNameText}>{cat.breeds[0].name}</Text>
        <View style={styles.favouriteIconContainer}>
          {isFavourite ? (
            <TouchableOpacity onPress={toggleFavourites}>
              <FontAwesome name="heart" size={30} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleFavourites}>
              <FontAwesome name="heart-o" size={30} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.shareIconContainer}>
          <TouchableOpacity>
            <Ionicons name="share-social-sharp" size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
  catNameText: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: fontSizes.FONT16,
    color: Colors.white,
    fontFamily: "ShantellBold",
  },
  readMoreText: {
    position: "absolute",
    bottom: 10,
    fontSize: fontSizes.FONT16,
    color: Colors.white,
    fontFamily: "ShantellBold",
  },
  favouriteIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  shareIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 60,
  },
});

export default CatCard;
