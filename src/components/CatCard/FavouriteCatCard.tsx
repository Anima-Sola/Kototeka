import { FC, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "expo-image";
import useStore from "../../store/store";
import { favouriteCatType } from "../../constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import { blurhash } from "../../constants/common";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type CatCardProps = {
  cat: favouriteCatType;
  numOfColumns: number;
};

const FavouriteCatCard: FC<CatCardProps> = ({ cat, numOfColumns }) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { deleteFavouriteCat } = useStore();
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
      throw error;
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/favouriteCatProfile", params: { catId: cat.id } })
        }
      >
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={cat.image.url}
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
            <ActivityIndicator size={45 - iconScale} color={styles.iconColor.color} />
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
                name="documents-outline"
                size={50 - iconScale}
                color={styles.iconColor.color}
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
    },
    infoIconContainer: {
      position: "absolute",
      top: 6,
      left: 6,
    },
    iconColor: {
      color: theme.colors.white
    }
  });

export default FavouriteCatCard;
