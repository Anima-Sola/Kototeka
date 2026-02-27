import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import getFavouriteCats from "../../API/getFavouriteCats";
import Colors from "../../constants/colors";
import FavouriteCatCard from "../../components/CatCard/FavouriteCatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import getCatByIdAPI from "../../API/getCatById";
import { favouriteCatType } from "../../constants/types";

const Favourites = () => {
  const { favouriteCats, setFavouriteCats, addFavoriteCatBreeds } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);

  const fetchFavouriteCatsData = async () => {
    try {
      const data = await getFavouriteCats();
      setFavouriteCats(data);
      return data;
    } catch (error: any) {
      console.log("Ошибка: ", error);
    }
  };

  const getFavouriteCatsBreeds = async (favouriteCats: favouriteCatType[]) => {
    const promises = favouriteCats.map(async (favouriteCat) => {
      try {
        const response = await getCatByIdAPI(favouriteCat.image.id);
        if (response.breeds) addFavoriteCatBreeds(favouriteCat.id, response.breeds[0]);
      } catch (error: any) {
        console.log("Ошибка: ", error);
      }
    });

    return await Promise.all(promises);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const favouriteCats = await fetchFavouriteCatsData();
      await getFavouriteCatsBreeds(favouriteCats);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={styles.container}>
      <TopBar setNumOfColumns={setNumOfColumns} />
      <FlatList
        key={numColumns}
        data={favouriteCats}
        renderItem={({ item }) => (
          <FavouriteCatCard cat={item} numOfColumns={numColumns} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchData}
        refreshing={isLoading}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
});

export default Favourites;
