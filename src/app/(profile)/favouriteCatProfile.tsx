import { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Button } from "react-native-paper";
import useStore from "../../store/store";
import ProfileTopBar from "../../components/TopBar/ProfileTopBar";
import fontSizes from "../../constants/fontSizes";
import { Image } from "expo-image";
import { blurhash } from "../../constants/common";
import BreedInfo from "../../components/BreedInfo/BreedInfo";
import addFavouriteCatAPI from "../../API/addFavouriteCat";
import getFavouriteCatByIdAPI from "../../API/getFavouriteCatById";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import NoBreedInfo from "../../components/BreedInfo/NoBreedInfo";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const imageWidth = Dimensions.get("screen").width;

const FavouriteCatProfile = () => {
  const styles = useThemedStyles(createStyles);
  const { favouriteCats, addFavouriteCat, deleteFavouriteCat } = useStore();
  const { catId } = useLocalSearchParams<{ catId: string }>();
  const favouriteCat = favouriteCats.find(
    (cat) => cat.id.toString() === catId.toString(),
  );

  if (!favouriteCat) return null;

  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  const breeds = favouriteCat.breeds;

  const addToFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const addingFavouriteCatResult = await addFavouriteCatAPI(favouriteCat.id);
      const addedFavouriteCat = await getFavouriteCatByIdAPI(addingFavouriteCatResult.id);
      addFavouriteCat(addedFavouriteCat);
    } catch (error: any) {
      throw error;
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const deleteFromFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      await deleteFavouriteCatAPI(favouriteCat.id);
      setTimeout(() => deleteFavouriteCat(favouriteCat.id), 500);
      router.back();
    } catch (error: any) {
      throw error;
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const toggleFavourites = async () => {
    if (favouriteCat) deleteFromFavourites();
    else addToFavourites();
  };

  return (
    <View style={styles.container}>
      <ProfileTopBar
        isFavouriteIconEnabled={true}
        isFavourite={Boolean(favouriteCat)}
        isRequestInProcess={isFavouriteToggling}
        onFavouriteIconPress={toggleFavourites}
      />
      <ScrollView>
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={favouriteCat?.image.url}
          placeholder={{ blurhash }}
          contentFit="cover"
          cachePolicy={"memory-disk"}
          onLoadEnd={() => setIsImageLoading(false)}
          transition={1000}
          onError={() => {
            setIsImageLoading(false);
            setIsImageLoadingError(true);
          }}
        />
        {breeds ? <BreedInfo breeds={breeds} /> : <NoBreedInfo />}
        {isImageLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={styles.buttonStyle}
          labelStyle={styles.labelStyle}
          onPress={() => router.back()}
        >
          Go back
        </Button>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
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
      borderColor: theme.colors.secondaryText,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    buttonContainer: {
      width: "100%",
      paddingHorizontal: 16,
      bottom: Platform.OS === "ios" ? 35 : 55,
      position: "absolute",
    },
    buttonStyle: {
      backgroundColor: theme.colors.accent,
    },
    labelStyle: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
  });

export default FavouriteCatProfile;
