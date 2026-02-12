import { FC, useState, useRef } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native-paper";
import addFavouriteCatAPI from "../../API/addFavouriteCat";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import getFavouriteCatByIdAPI from "../../API/getFavouriteCatById";
import useStore from "../../store/store";
import { isElementInArray } from "../../utils/functions";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import Colors from "../../constants/colors";
import { CatType } from "../../constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blurhash } from "../../constants/common";

type CatCardProps = {
  cat: CatType;
  numOfColumns: number;
};

const CatCard: FC<CatCardProps> = ({ cat, numOfColumns }) => {
  const router = useRouter();
  const { favouriteCats, addFavouriteCat, deleteFavouriteCat } = useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  const favouriteCatId = useRef(0);
  const hasBreeds = cat.breeds.length !== 0;
  const imageWidth = Dimensions.get("screen").width * (1 / numOfColumns) - 2;
  const isFavourite = isElementInArray(cat.id, favouriteCats);
  const iconScale = 10 * numOfColumns;

  const addToFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const addResponse = await addFavouriteCatAPI(cat.id);
      const favouriteCat = await getFavouriteCatByIdAPI(addResponse.id);
      favouriteCatId.current = favouriteCat.id;
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
      const data = await deleteFavouriteCatAPI(favouriteCatId.current);
      deleteFavouriteCat(favouriteCatId.current);
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
      <TouchableOpacity onPress={() => router.push(`/${cat.id}`)}>
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={cat.url}
          placeholder={{ blurhash }}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          transition={1000}
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
              isFavourite={isFavourite}
              onPress={toggleFavourites}
              size={45 - iconScale}
            />
          )}
        </View>
        {hasBreeds && (
          <View style={styles.infoIconContainer}>
            <Ionicons
              name="information-circle-outline"
              size={52 - iconScale}
              color={Colors.white}
              style={styles.icon}
            />
          </View>
        )}
      </TouchableOpacity>
      {isImageLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={numOfColumns === 3 ? "small" : "large"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    margin: 1,
    alignSelf: "center",
    borderRadius: 5,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 5,
  },
  favouriteIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: Colors.black,
  },
  infoIconContainer: {
    position: "absolute",
    top: 5,
    left: 5,
  },
});

export default CatCard;
