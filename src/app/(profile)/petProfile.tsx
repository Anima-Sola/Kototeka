import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const imageWidth = Dimensions.get("screen").width;

const PetProfile = () => {
  const {
    pets,
    userId,
    favouritePets,
    addFavouritePet,
    deleteFavouritePet,
    addFavoritePetBreeds,
  } = useStore();
  const styles = useThemedStyles(createStyles);
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const pet = pets.find((pet) => pet.id === petId);

  if (!pet) return null;

  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const [isFavouriteToggling, setIsFavouriteToggling] = useState(false);

  const favouritePet = isElementInArray(pet.id, favouritePets);
  const breeds = pet.breeds[0];

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
      const addingFavouritePetResult = await addFavouritePetAPI(pet.id, userId);
      const addedFavouritePet = await getFavouritePetByIdAPI(
        addingFavouritePetResult.id,
      );
      addFavouritePet(addedFavouritePet);
      if (breeds) addFavoritePetBreeds(addedFavouritePet.id, pet.breeds[0]);
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
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={pet?.url}
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
          isFavourite={Boolean(favouritePet)}
          isRequestInProcess={isFavouriteToggling}
          onFavouriteIconPress={toggleFavourites}
          imageUrl={pet.url}
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

export default PetProfile;
