import { FC, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native-paper";
import deleteCatAPI from "../../API/deleteCat";
import useStore from "../../store/store";
import { CatType } from "../../constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blurhash } from "../../constants/common";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type CatCardProps = {
  cat: CatType;
  numOfColumns: number;
};

const UploadedCatCard: FC<CatCardProps> = ({ cat, numOfColumns }) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { deleteUploadedCat } = useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasBreeds = false; //cat.breeds.length !== 0;
  const imageWidth = Dimensions.get("screen").width * (1 / numOfColumns) - 2;
  const iconScale = 10 * numOfColumns;

  const deleteCat = async () => {
    setIsDeleting(true);

    try {
      await deleteCatAPI(cat.id);
      deleteUploadedCat(cat.id);
    } catch (error: any) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/uploadedCatProfile", params: { catId: cat.id } })
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
          {isDeleting ? (
            <ActivityIndicator size={45 - iconScale} color={styles.iconColor.color} />
          ) : (
            <TouchableOpacity onPress={deleteCat}>
              <FontAwesome
                name="trash-o"
                size={45 - iconScale}
                color={styles.iconColor.color}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
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
    iconStyle: {
      textShadowOffset: { width: 1, height: 1 },
      textShadowColor: theme.colors.shadow,
    },
    iconColor: {
      color: theme.colors.white,
    },
  });

export default UploadedCatCard;
