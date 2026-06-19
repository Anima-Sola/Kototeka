import { useState, useCallback, useRef } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";
import getFavouritePetsAPI from "../../API/getFavouritePets";
import FavouritePetCard from "../../components/PetCard/FavouritePetCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import getPetByIdAPI from "../../API/getPetById";
import { favouritePetType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const Favourites = () => {
  const styles = useThemedStyles(createStyles);
  const {
    favouritePets,
    setFavouritePets,
    addFavoritePetBreeds,
    userId,
    petsType,
  } = useStore();
  const prevPetsTypeRef = useRef(petsType);
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);
  const [isFilteredLoading, setIsFilteredLoading] = useState(false);

  const getFavouritePetsBreeds = async (favouritePets: favouritePetType[]) => {
    const promises = favouritePets.map(async (favouritePet) => {
      try {
        const response = await getPetByIdAPI(favouritePet.image.id);
        if (response.breeds)
          addFavoritePetBreeds(favouritePet.id, response.breeds[0]);
      } catch (error: any) {
        throw error;
      }
    });

    return await Promise.all(promises);
  };

  const fetchFavouritePetsData = async () => {
    setIsLoading(true);

    try {
      const favouritePets = await getFavouritePetsAPI(userId);
      setFavouritePets(favouritePets);
      await getFavouritePetsBreeds(favouritePets);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
      setIsFilteredLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (prevPetsTypeRef.current !== petsType) {
        setIsFilteredLoading(true);
        fetchFavouritePetsData();
        prevPetsTypeRef.current = petsType;
      }
    }, [petsType]),
  );

  const keyExtractor = (item: favouritePetType, index: number) =>
    `${item.id}_${index}`;
  const renderItem = ({ item }: { item: favouritePetType }) => (
    <FavouritePetCard pet={item} numOfColumns={numColumns} />
  );

  if (isFilteredLoading) {
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
        <View style={styles.loadingContainer}>
          <PaperActivityIndicator size={"large"} />
          <Text style={styles.text}>Pets are coming!</Text>
        </View>
      </View>
    );
  }

  if (favouritePets.length === 0)
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
          <Text style={styles.text}>No favourite cats</Text>
          <Text style={styles.text}>Please, add them from the gallery</Text>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={favouritePets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchFavouritePetsData}
        refreshing={isLoading}
        numColumns={numColumns}
        maxToRenderPerBatch={20}
        ListFooterComponent={<View style={styles.footer} />}
        contentContainerStyle={styles.flatListContent}
        scrollIndicatorInsets={{ top: 60 }}
      />
      <View style={styles.topBarContainer}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
      </View>
    </View>
  );
};
export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.colors.main,
      paddingTop: 200,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: theme.colors.main,
      paddingTop: 200,
      alignItems: "center",
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
    },
    text: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      alignSelf: "center",
      marginTop: 10,
    },
    footer: {
      height: 190,
      alignItems: "center",
      marginVertical: 20,
    },
    iconColor: {
      color: theme.colors.accent,
    },
    topBarContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    flatListContent: {
      paddingTop: 50,
      paddingBottom: 80,
    },
  });

export default Favourites;
