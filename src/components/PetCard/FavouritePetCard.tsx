import { FC, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { PressableScale } from "pressto";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "expo-image";
import useStore from "../../store/store";
import { favouritePetType } from "../../constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import deleteFavouritePetAPI from "../../API/deleteFavouritePet";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import { blurhash } from "../../constants/common";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type PetCardProps = {
  pet: favouritePetType;
  numOfColumns: number;
};

const FavouritePetCard: FC<PetCardProps> = ({ pet, numOfColumns }) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { deleteFavouritePet } = useStore();
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const imageWidth = Dimensions.get("screen").width * (1 / numOfColumns) - 2;
  const iconScale = 10 * numOfColumns;
  const hasBreeds = pet.breeds;

  const deleteFromFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      await deleteFavouritePetAPI(pet.id);
      deleteFavouritePet(pet.id);
    } catch (error: any) {
      throw error;
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.favouriteIconContainer}>
        {isFavouriteToggling ? (
          <ActivityIndicator
            size={45 - iconScale}
            color={styles.iconColor.color}
          />
        ) : (
          <FavouriteIcon
            isFavourite={true}
            onPress={deleteFromFavourites}
            size={45 - iconScale}
          />
        )}
      </View>
      <PressableScale
        onPress={() =>
          router.push({
            pathname: "/favouritePetProfile",
            params: { petId: pet.id },
          })
        }
      >
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={pet.image.url}
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

        {hasBreeds && (
          <View style={styles.infoIconContainer}>
            <TouchableOpacity>
              <Ionicons
                name="documents-outline"
                size={50 - iconScale}
                color={styles.iconColor.color}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </PressableScale>
      {isImageLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.main,
      alignItems: "center",
      justifyContent: "center",
      margin: 1,
      borderRadius: 5,
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
    image: {
      borderRadius: 5,
    },
    icon: {
      textShadowOffset: { width: 1, height: 1 },
      textShadowColor: theme.colors.shadow,
    },
    favouriteIconContainer: {
      position: "absolute",
      bottom: 10,
      right: 10,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    infoIconContainer: {
      position: "absolute",
      top: 6,
      left: 6,
    },
    iconColor: {
      color: theme.colors.white,
    },
  });

export default FavouritePetCard;
