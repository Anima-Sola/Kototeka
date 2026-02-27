import { FC, useState } from "react";
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
  const { favouriteCats, addFavouriteCat, deleteFavouriteCat, addFavoriteCatBreeds } = useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  const hasBreeds = cat.breeds.length !== 0;
  const imageWidth = Dimensions.get("screen").width * (1 / numOfColumns) - 2;
  const favouriteCat = isElementInArray(cat.id, favouriteCats);
  const iconScale = 10 * numOfColumns;

  const addToFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const addingFavouriteCatResult = await addFavouriteCatAPI(cat.id);
      const addedFavouriteCat = await getFavouriteCatByIdAPI(addingFavouriteCatResult.id);
      addFavouriteCat(addedFavouriteCat);
      if(hasBreeds) addFavoriteCatBreeds(addedFavouriteCat.id, cat.breeds[0]);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const deleteFromFavourites = async () => {
    if (!favouriteCat) return;
    setIsFavouriteToggling(true);

    try {
      const data = await deleteFavouriteCatAPI(favouriteCat.id);
      deleteFavouriteCat(favouriteCat.id);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const toggleFavourites = async () => {
    if (favouriteCat) deleteFromFavourites();
    else addToFavourites();
  };

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/catProfile", params: { catId: cat.id } })
        }
      >
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
              isFavourite={Boolean(favouriteCat)}
              onPress={toggleFavourites}
              size={45 - iconScale}
            />
          )}
        </View>
        {hasBreeds && (
          <View style={styles.infoIconContainer}>
            <Ionicons
              name="documents-outline"
              size={50 - iconScale}
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
    top: 6,
    left: 6,
  },
});

export default CatCard;
