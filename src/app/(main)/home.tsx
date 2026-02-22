import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import getCats from "../../API/getCats";
import getFavouriteCats from "../../API/getFavouriteCats";
import Colors from "../../constants/colors";
import CatCard from "../../components/CatCard/CatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";

const Home = () => {
  const { cats, setCats, setFavouriteCats } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [numColumns, setNumOfColumns] = useState(2);

  const fetchFavouriteCatsData = async () => {
    try {
      const data = await getFavouriteCats();
      setFavouriteCats(data);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCatsData = async () => {
    try {
      const req = {
        limit: 20,
      };

      const data = await getCats(req);
      setCats(data);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavouriteCatsData();
    fetchCatsData();
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
