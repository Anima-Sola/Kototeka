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
import Colors from "../../constants/colors";
import { CatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import addFavouriteCatAPI from "../../API/addFavouriteCat";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import getFavouriteCatByIdAPI from "../../API/getFavouriteCatById";
import useStore from "../../store/store";
import { isElementInArray } from "../../utils/functions";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";

const imageWidth = Dimensions.get("screen").width - 32;

type CatCardProps = {
  cat: CatType;
};

const CatCard: FC<CatCardProps> = ({ cat }) => {
  const { favouriteCats, addFavouriteCat, deleteFavouriteCat } = useStore();
  const isFavourite = isElementInArray(cat.id, favouriteCats);

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const addToFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const addResponse = await addFavouriteCatAPI(cat.id);
      const favouriteCat = await getFavouriteCatByIdAPI(addResponse.id);
      addFavouriteCat(favouriteCat);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

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

  const toggleFavourites = async () => {
    if (isFavourite) deleteFromFavourites();
    else addToFavourites();
  };

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity>
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={{
            uri: cat.url,
          }}
          onLoadEnd={() => setIsImageLoading(false)}
          onError={() => {
            setIsImageLoading(false);
            setIsImageLoadingError(true);
          }}
        />
        <Text style={styles.catNameText}>{cat.breeds[0].name}</Text>
        <View style={styles.favouriteIconContainer}>
          {isFavouriteToggling ? (
            <ActivityIndicator size={'small'}/>
          ) : (
            <FavouriteIcon isFavourite={isFavourite} onPress={toggleFavourites} />
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
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
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
    textShadowOffset: { width: -1, height: 1 },
    textShadowColor: Colors.black,
    textShadowRadius: 1,
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
  },
  shareIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 60,
  },
});

export default CatCard;
