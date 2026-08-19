import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ActivityIndicator, Button } from "react-native-paper";
import useStore from "../../store/store";
import ProfileTopBar from "../../components/TopBar/ProfileTopBar";
import fontSizes from "../../constants/fontSizes";
import { Image } from "expo-image";
import { blurhash } from "../../constants/common";
import BreedInfo from "../../components/BreedInfo/BreedInfo";
import NoBreedInfo from "../../components/BreedInfo/NoBreedInfo";
import { isElementInArray } from "../../functions/common";
import addFavouritePetAPI from "../../API/addFavouritePet";
import getFavouritePetByIdAPI from "../../API/getFavouritePetById";
import deleteFavouritePetAPI from "../../API/deleteFavouritePet";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import { MAX_NUMBER_OF_FAVOURITES } from "../../constants/common";
import getPetsAPI from "../../API/getPets";
import { PetType } from "../../constants/types";

const imageWidth = Dimensions.get("screen").width;

const PetOfTheDay = () => {
  const {
    userId,
    favouritePets,
    addFavouritePet,
    deleteFavouritePet,
    addFavoritePetBreeds,
    showErrorToast,
  } = useStore();
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const [petOfTheDay, setPetOfTheDay] = useState<PetType>({
    breeds: [],
    height: 0,
    id: "",
    url: "",
    width: 0,
    favourite: {
      id: "",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  useEffect(() => {
    getPetOfTheDay();
  }, []);

  const getPetOfTheDay = async () => {
    try {
      const params = {
        limit: 1,
        has_breeds: false,
      };

      const pet = await getPetsAPI(params);
      setPetOfTheDay(pet[0]);
      setIsLoading(false);
    } catch (error: any) {
      showErrorToast(error.message);
      router.dismissTo("/(main)");
    }
  };

  const addToFavourites = async () => {
    if (favouritePets.length + 1 > MAX_NUMBER_OF_FAVOURITES) {
      Alert.alert(
        "Maximum number of favourites reached",
        "You have reached the maximum number of favourite pets",
      );
      return;
    }
    setIsFavouriteToggling(true);

    try {
      const addingFavouritePetResult = await addFavouritePetAPI(
        petOfTheDay.id,
        userId,
      );
      const addedFavouritePet = await getFavouritePetByIdAPI(
        addingFavouritePetResult.id,
      );
      addFavouritePet(addedFavouritePet);
      if (breeds)
        addFavoritePetBreeds(addedFavouritePet.id, petOfTheDay.breeds[0]);
    } catch (error: any) {
      showErrorToast(error.message);
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
      showErrorToast(error.message);
    } finally {
      setIsFavouriteToggling(false);
    }
  };

  const toggleFavourites = async () => {
    if (favouritePet) deleteFromFavourites();
    else addToFavourites();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
        <Text style={styles.text}>Pet of the day is coming!</Text>
      </View>
    );
  }

  const favouritePet = isElementInArray(petOfTheDay.id, favouritePets);
  const breeds = petOfTheDay?.breeds[0];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={petOfTheDay?.url}
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
          onBackIconPress={() => router.dismissTo("/(main)")}
          isFavouriteIconEnabled={true}
          isFavourite={Boolean(favouritePet)}
          isRequestInProcess={isFavouriteToggling}
          onFavouriteIconPress={toggleFavourites}
          imageUrl={petOfTheDay.url}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={styles.buttonStyle}
          labelStyle={styles.labelStyle}
          onPress={() => router.dismissTo("/(main)")}
        >
          Go to the gallery
        </Button>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.colors.main,
      alignItems: "center",
      justifyContent: "center",
    },
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
    text: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      textAlign: "center",
      marginTop: 10,
    },
  });

export default PetOfTheDay;
