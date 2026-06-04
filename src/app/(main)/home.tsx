import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import getCatsAPI from "../../API/getCats";
import CatCard from "../../components/CatCard/CatCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";
import { CatType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import { useBottomSheet } from "../../contexts/BottomSheetContext";
import FilterBS from "../../components/BottomSheets/FilterBS";
import { MAX_NUMBER_OF_PHOTOS } from "../../constants/common";

const Home = () => {
  const {
    cats,
    setCats,
    addCats,
    filterRequestSettings,
    isFiltersChanged,
    setIsFiltersChanged,
  } = useStore();
  const styles = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingCatsLoading, setIsAddingCatsLoading] = useState(false);
  const [isFilteredLoading, setIsFilteredLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const fetchCatsData = async () => {
    try {
      const data = await getCatsAPI(filterRequestSettings);
      setCats(data);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
      setIsFilteredLoading(false);
    }
  };

  const fetchAddedCatsData = async () => {
    if (cats.length >= MAX_NUMBER_OF_PHOTOS) {
      return;
    }

    setIsAddingCatsLoading(true);

    try {
      const data = await getCatsAPI(filterRequestSettings);
      addCats(data);
    } catch (error: any) {
      throw error;
    } finally {
      setIsAddingCatsLoading(false);
    }
  };

  const refreshCatsList = () => {
    setIsLoading(true);
    fetchCatsData();
  };

  useEffect(() => {
    if (isFiltersChanged) {
      setIsFilteredLoading(true);
      fetchCatsData();
      setIsFiltersChanged(false);
    }
  }, [isFiltersChanged]);

  if (isFilteredLoading) {
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
        <View style={styles.loadingContainer}>
          <PaperActivityIndicator size={"large"} />
          <Text style={styles.text}>Cats are coming!</Text>
        </View>
      </View>
    );
  }

  const openFilterBottomSheet = () => {
    showBottomSheet(<FilterBS hideBottomSheet={hideBottomSheet} />);
  };

  const keyExtractor = (item: CatType, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: CatType }) => (
    <CatCard cat={item} numOfColumns={numColumns} />
  );

  const footerComponent = () => {
    if (cats.length >= MAX_NUMBER_OF_PHOTOS) {
      return (
        <View style={styles.footer}>
          <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
          <Text style={styles.limitText}>You've reached the maximum</Text>
          <Text style={styles.limitText}>number of cats!</Text>
        </View>
      );
    }

    return (
      <View style={styles.footer}>
        {isAddingCatsLoading && <ActivityIndicator size={"large"} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={cats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={() => refreshCatsList()}
        refreshing={isLoading}
        numColumns={numColumns}
        onEndReached={fetchAddedCatsData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerComponent}
        maxToRenderPerBatch={20}
        contentContainerStyle={styles.flatListContent}
        scrollIndicatorInsets={{ top: 60 }}
      />
      <View style={styles.topBarContainer}>
        <TopBar
          setNumOfColumns={setNumOfColumns}
          numOfColumns={numColumns}
          onFilterPress={openFilterBottomSheet}
        />
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
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
    },
    text: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      textAlign: "center",
      marginTop: 10,
    },
    limitText: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      width: "80%",
      textAlign: "center",
    },
    footer: {
      height: 190,
      alignItems: "center",
      marginVertical: 20,
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
    iconColor: {
      color: theme.colors.accent,
    },
  });

export default Home;
