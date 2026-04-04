import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import getCatsAPI from "../../API/getCats";
import getFavouriteCatsAPI from "../../API/getFavouriteCats";
import getCatByIdAPI from "../../API/getCatById";
import getUploadedCatsAPI from "../../API/getUploadedCats";
import CatCard from "../../components/CatCard/CatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";
import { CatType, favouriteCatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const Home = () => {
  const {
    cats,
    setCats,
    addCats,
    setFavouriteCats,
    addFavoriteCatBreeds,
    setUploadedCats,
  } = useStore();
  const styles = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingCatsLoading, setIsAddingCatsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
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

  const fetchCatsData = async () => {
    setIsLoading(true);

    try {
      const req = {
        limit: 20,
        //limit: 5,
      };

      const data = await getCatsAPI(req);
      setCats(data);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddedCatsData = async () => {
    setIsAddingCatsLoading(true);

    try {
      const req = {
        limit: 20,
      };

      const data = await getCatsAPI(req);
      addCats(data);
    } catch (error: any) {
      throw error;
    } finally {
      setIsAddingCatsLoading(false);
    }
  };

  useEffect(() => {
    setIsInitialLoading(true);

    const fetchData = async () => {
      try {
        const favouriteCats = await getFavouriteCatsAPI();
        setFavouriteCats(favouriteCats);
        await getFavouriteCatsBreeds(favouriteCats);
        const uploadedCats = await getUploadedCatsAPI({
          limit: 1000,
        });
        setUploadedCats(uploadedCats);
        await fetchCatsData();
      } catch (error: any) {
        throw error;
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isInitialLoading) {
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} />
        <View style={styles.loadingContainer}>
          <PaperActivityIndicator size={"large"} />
          <Text style={styles.text}>Cats are coming!</Text>
        </View>
      </View>
    );
  }

  const keyExtractor = (item: CatType, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: CatType }) => (
    <CatCard cat={item} numOfColumns={numColumns} />
  );

  const footerComponent = () => {
    return (
      <View style={styles.footer}>
        {isAddingCatsLoading && <ActivityIndicator size={"large"} />}
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
        onEndReached={fetchAddedCatsData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerComponent}
        maxToRenderPerBatch={20}
      />
    </View>
  );
};

export const createStyles = (theme: ITheme) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.main,
    paddingTop: 200,
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
});

export default Home;
