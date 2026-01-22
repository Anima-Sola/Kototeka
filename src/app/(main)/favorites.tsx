import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import getFavouriteCats from "../../API/getFavouriteCats";
import Colors from "../../constants/colors";
import FavouriteCatCard from "../../components/CatCard/FavouriteCatCard";
import useStore from "../../store/store";

const Favourites = () => {
  const { favouriteCats, setFavouriteCats } = useStore();
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteCats}
        renderItem={({ item }) => <FavouriteCatCard cat={item} numOfColumns={2}/>}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchFavouriteCatsData}
        refreshing={isLoading}
        numColumns={2}
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
