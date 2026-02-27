import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import getCats from "../../API/getCats";
import getFavouriteCats from "../../API/getFavouriteCats";
import getCatByIdAPI from "../../API/getCatById";
import Colors from "../../constants/colors";
import CatCard from "../../components/CatCard/CatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import { ActivityIndicator } from "react-native-paper";
import { favouriteCatType } from "../../constants/types";

const Home = () => {
  const { cats, setCats, setFavouriteCats, addFavoriteCatBreeds } = useStore();
  const [isLoading, setIsLoading] = useState(true);
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

  const fetchCatsData = async () => {
    try {
      const req = {
        limit: 50,
      };

      const data = await getCats(req);
      setCats(data);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const favouriteCats = await fetchFavouriteCatsData();
        await getFavouriteCatsBreeds(favouriteCats);
        await fetchCatsData();
      } catch (error: any) {
        console.log("Ошибка: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        data={cats}
        renderItem={({ item }) => <CatCard cat={item} numOfColumns={numColumns} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchCatsData()}
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

export default Home;
