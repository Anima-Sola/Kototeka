import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import getFavouriteCatsAPI from "../../API/getFavouriteCats";
import FavouriteCatCard from "../../components/CatCard/FavouriteCatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import getCatByIdAPI from "../../API/getCatById";
import { favouriteCatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const Favourites = () => {
  const styles = useThemedStyles(createStyles);
  const { favouriteCats, setFavouriteCats, addFavoriteCatBreeds, userId } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);

  const getFavouriteCatsBreeds = async (favouriteCats: favouriteCatType[]) => {
    const promises = favouriteCats.map(async (favouriteCat) => {
      try {
        const response = await getCatByIdAPI(favouriteCat.image.id);
        if (response.breeds) addFavoriteCatBreeds(favouriteCat.id, response.breeds[0]);
      } catch (error: any) {
        throw error;
      }
    });

    return await Promise.all(promises);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const favouriteCats = await getFavouriteCatsAPI(userId);
      setFavouriteCats(favouriteCats);
      await getFavouriteCatsBreeds(favouriteCats);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (favouriteCats.length === 0)
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns}/>
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
          <Text style={styles.text}>No favourite cats</Text>
          <Text style={styles.text}>Please, add them from the gallery</Text>
        </View>
      </View>
    );

  const keyExtractor = (item: favouriteCatType, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: favouriteCatType }) => (
    <FavouriteCatCard cat={item} numOfColumns={numColumns} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={favouriteCats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchData}
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
