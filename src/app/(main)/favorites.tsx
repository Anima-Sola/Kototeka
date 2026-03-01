import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import getFavouriteCats from "../../API/getFavouriteCats";
import Colors from "../../constants/colors";
import FavouriteCatCard from "../../components/CatCard/FavouriteCatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import getCatByIdAPI from "../../API/getCatById";
import { favouriteCatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";

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

  if (favouriteCats.length === 0)
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} isIconsVisible={false} />
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-sharp" size={50} color={Colors.accent} />
          <Text style={styles.text}>No favourite cats</Text>
          <Text style={styles.text}>Please, add them from the gallery</Text>
        </View>
      </View>
    );

  const keyExtractor = (item: favouriteCatType) => item.id;
  const renderItem = ({ item }: { item: favouriteCatType }) => (
    <FavouriteCatCard cat={item} numOfColumns={numColumns} />
  );

  return (
    <View style={styles.container}>
      <TopBar setNumOfColumns={setNumOfColumns} />
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingTop: 200,
    alignItems: "center",
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
    height: 75,
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Favourites;
