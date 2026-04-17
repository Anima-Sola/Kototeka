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
import NoBreedInfo from "../../components/BreedInfo/NoBreedInfo";
import { isElementInArray } from "../../utils/functions";
import addFavouriteCatAPI from "../../API/addFavouriteCat";
import getFavouriteCatByIdAPI from "../../API/getFavouriteCatById";
import deleteFavouriteCatAPI from "../../API/deleteFavouriteCat";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const imageWidth = Dimensions.get("screen").width;

const CatProfile = () => {
  const {
    cats,
    userId,
    favouriteCats,
    addFavouriteCat,
    deleteFavouriteCat,
    addFavoriteCatBreeds,
  } = useStore();
  const styles = useThemedStyles(createStyles);
  const { catId } = useLocalSearchParams<{ catId: string }>();
  const cat = cats.find((cat) => cat.id === catId);

  if (!cat) return null;

  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  const favouriteCat = isElementInArray(cat.id, favouriteCats);
  const breeds = cat.breeds[0];

  const addToFavourites = async () => {
    setIsFavouriteToggling(true);

    try {
      const addingFavouriteCatResult = await addFavouriteCatAPI(cat.id, userId);
      const addedFavouriteCat = await getFavouriteCatByIdAPI(addingFavouriteCatResult.id);
      addFavouriteCat(addedFavouriteCat);
      if (breeds) addFavoriteCatBreeds(addedFavouriteCat.id, cat.breeds[0]);
    } catch (error: any) {
      throw error;
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
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={cat?.url}
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
      <View style={styles.topBarContainer}>
        <ProfileTopBar
          isFavouriteIconEnabled={true}
          isFavourite={Boolean(favouriteCat)}
          isRequestInProcess={isFavouriteToggling}
          onFavouriteIconPress={toggleFavourites}
        />
      </View>
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
    content: {
      paddingTop: 50,
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
    topBarContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
  });

export default CatProfile;
