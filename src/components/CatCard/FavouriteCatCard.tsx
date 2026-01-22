import { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  //ActivityIndicator,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useStore from "../../store/store";
import Colors from "../../constants/colors";
import { favouriteCatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import getCatByIdAPI from "../../API/getCatById";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";

const imageWidth = Dimensions.get("screen").width - 32;

type CatCardProps = {
  cat: favouriteCatType;
  numOfColumns: number;
};

const FavouriteCatCard: FC<CatCardProps> = ({ cat, numOfColumns }) => {
  const { deleteFavouriteCat, addFavoriteCatBreeds } = useStore();
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const imageWidth = Dimensions.get("screen").width * (1 / numOfColumns) - 2;
  const iconScale = 10 * numOfColumns;
  const hasBreeds = cat.breeds;

  const deleteFromFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      await deleteFavouriteCatAPI(cat.id);
      deleteFavouriteCat(cat.id);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const loadFavouriteCatDataById = async () => {
    if (!cat.image.id) return;

    try {
      const response = await getCatByIdAPI(cat.image.id);
      addFavoriteCatBreeds(cat.id, response.breeds[0]);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    }
  };

  useEffect(() => {
    loadFavouriteCatDataById();
  }, [cat.breeds?.name]);

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={!hasBreeds}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{
            uri: cat.image.url,
          }}
          onLoadEnd={() => setIsImageLoading(false)}
          onError={() => {
            setIsImageLoading(false);
            setIsImageLoadingError(true);
          }}
        />
        <View style={styles.favouriteIconContainer}>
          {isFavouriteToggling ? (
            <ActivityIndicator size={45 - iconScale} color={Colors.white} />
          ) : (
            <FavouriteIcon
              isFavourite={true}
              onPress={deleteFromFavourites}
              size={45 - iconScale}
            />
          )}
        </View>
        {hasBreeds && (
          <View style={styles.infoIconContainer}>
            <TouchableOpacity>
              <Ionicons
                name="information-circle-outline"
                size={52 - iconScale}
                color={Colors.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
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
    margin: 1,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: Colors.black,
  },
  favouriteIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoIconContainer: {
    position: "absolute",
    top: 5,
    left: 5,
  },
});

export default FavouriteCatCard;
