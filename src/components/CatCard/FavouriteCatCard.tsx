import { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useStore from "../../store/store";
import Colors from "../../constants/colors";
import { favouriteCatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";

const imageWidth = Dimensions.get("screen").width - 32;

type CatCardProps = {
  cat: favouriteCatType;
};

const FavouriteCatCard: FC<CatCardProps> = ({ cat }) => {
  const { deleteFavouriteCat } = useStore();
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const deleteFromFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const data = await deleteFavouriteCatAPI(cat.id);
      deleteFavouriteCat(cat.id);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={{
            uri: cat.image.url,
          }}
          onLoadEnd={() => setIsImageLoading(false)}
          onError={() => {
            setIsImageLoading(false);
            setIsImageLoadingError(true);
          }}
        />
        {/*<Text style={styles.catNameText}>{cat.breeds[0].name}</Text>*/}
        <View style={styles.favouriteIconContainer}>
          {isFavouriteToggling ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <FavouriteIcon isFavourite={true} onPress={deleteFromFavourites} />
          )}
        </View>
        <View style={styles.shareIconContainer}>
          <TouchableOpacity>
            <Ionicons
              name="share-social-sharp"
              size={30}
              color={Colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isImageLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
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
  loaderContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: Colors.black,
  },
  readMoreText: {
    position: "absolute",
    bottom: 10,
    fontSize: fontSizes.FONT16,
    color: Colors.white,
    fontFamily: "ShantellBold",
  },
  icon: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: Colors.black,
  },
  favouriteIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 60,
  },
});

export default FavouriteCatCard;
