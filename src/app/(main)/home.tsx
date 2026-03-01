import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import getCats from "../../API/getCats";
import getFavouriteCats from "../../API/getFavouriteCats";
import getCatByIdAPI from "../../API/getCatById";
import Colors from "../../constants/colors";
import CatCard from "../../components/CatCard/CatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";
import { CatType, favouriteCatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";

const Home = () => {
  const { cats, setCats, addCats, setFavouriteCats, addFavoriteCatBreeds } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedLoading, setIsAddedLoading] = useState(false);
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
    setIsLoading(true);

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

  const fetchAddCatsData = async () => {
    setIsAddedLoading(true);

    try {
      const req = {
        limit: 20,
      };

      const data = await getCats(req);
      addCats(data);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsAddedLoading(false);
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

  if (isLoading && !cats)
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} />
        <View style={styles.loadingContainer}>
          <PaperActivityIndicator size={"large"} />
          <Text style={styles.text}>Cats are coming!</Text>
        </View>
      </View>
    );

  const keyExtractor = (item: CatType) => item.id;
  const renderItem = ({ item }: { item: CatType }) => (
    <CatCard cat={item} numOfColumns={numColumns} />
  );

  const footerComponent = () => {
    return (
      <View style={styles.footer}>
        {isAddedLoading && <ActivityIndicator size={"large"} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar setNumOfColumns={setNumOfColumns} />
      <FlatList
        key={numColumns}
        data={cats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchCatsData()}
        refreshing={isLoading}
        numColumns={numColumns}
        onEndReached={fetchAddCatsData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerComponent}
        maxToRenderPerBatch={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingTop: 200,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  text: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
    marginTop: 10,
  },
  footer: {
    height: 125,
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Home;
