import { FC, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native-paper";
import addFavouritePetAPI from "../../API/addFavouritePet";
import deleteFavouritePetAPI from "../../API/deleteFavouritePet";
import getFavouritePetByIdAPI from "../../API/getFavouritePetById";
import useStore from "../../store/store";
import { isElementInArray } from "../../utils/functions";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import { PetType } from "../../constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blurhash } from "../../constants/common";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type PetCardProps = {
  pet: PetType;
  numOfColumns: number;
};

const PetCard: FC<PetCardProps> = ({ pet, numOfColumns }) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { favouritePets, addFavouritePet, deleteFavouritePet, addFavoritePetBreeds, userId } =
    useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  const hasBreeds = pet.breeds[0];
  const imageWidth = Dimensions.get("screen").width * (1 / numOfColumns) - 2;
  const favouritePet = isElementInArray(pet.id, favouritePets);
  const iconScale = 10 * numOfColumns;

  const addToFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const addingFavouritePetResult = await addFavouritePetAPI(pet.id, userId);
      const addedFavouritePet = await getFavouritePetByIdAPI(addingFavouritePetResult.id);
      addFavouritePet(addedFavouritePet);
      if (hasBreeds) addFavoritePetBreeds(addedFavouritePet.id, pet.breeds[0]);
    } catch (error: any) {
      throw error;
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const deleteFromFavourites = async () => {
    if (!favouritePet) return;
    setIsFavouriteToggling(true);

    try {
      const data = await deleteFavouritePetAPI(favouritePet.id);
      deleteFavouritePet(favouritePet.id);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const toggleFavourites = async () => {
    if (favouritePet) deleteFromFavourites();
    else addToFavourites();
  };

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/petProfile", params: { petId: pet.id } })
        }
      >
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={pet.url}
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
            <ActivityIndicator size={45 - iconScale} color={styles.activityIndicator.color} />
          ) : (
            <FavouriteIcon
              isFavourite={Boolean(favouritePet)}
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
              color={styles.iconColor.color}
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

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondary,
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
      textShadowColor: theme.colors.shadow,
    },
    infoIconContainer: {
      position: "absolute",
      top: 6,
      left: 6,
    },
    iconColor: {
      color: theme.colors.white
    },
    activityIndicator: {
      color: theme.colors.white,
    }
  });

export default PetCard;
