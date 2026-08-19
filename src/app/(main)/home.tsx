import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";
import getPetsAPI from "../../API/getPets";
import PetCard from "../../components/PetCard/PetCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import { PetType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import { useBottomSheet } from "../../contexts/BottomSheetContext";
import FilterBS from "../../components/BottomSheets/FilterBS";
import { MAX_NUMBER_OF_PHOTOS } from "../../constants/common";
import { fetchPetsData } from "../../API/fetchUserData";
import fetchUserData from "../../API/fetchUserData";

const Home = () => {
  const {
    pets,
    addPets,
    filterRequestSettings,
    isFiltersChanged,
    setIsFiltersChanged,
    isApiChanged,
    setIsApiChanged,
    userId,
    showErrorToast,
  } = useStore();
  const styles = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingPetsLoading, setIsAddingPetsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const fetchAddedPetsData = async () => {
    if (pets.length >= MAX_NUMBER_OF_PHOTOS) {
      return;
    }

    setIsAddingPetsLoading(true);

    try {
      const data = await getPetsAPI(filterRequestSettings);
      addPets(data);
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setIsAddingPetsLoading(false);
    }
  };

  const refreshPetsList = async () => {
    setIsLoading(true);

    try {
      await fetchPetsData();
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updatePets = async () => {
      try {
        if (isApiChanged) {
          await fetchUserData(userId);
        } else {
          await fetchPetsData();
        }
      } catch (error: any) {
        showErrorToast(error.message);
      } finally {
        setIsFiltersChanged(false);
        setIsApiChanged(false);
      }
    };

    if (isApiChanged || isFiltersChanged) updatePets();
  }, [isApiChanged, isFiltersChanged]);

  const openFilterBottomSheet = () => {
    showBottomSheet(<FilterBS hideBottomSheet={hideBottomSheet} />);
  };

  const keyExtractor = (item: PetType, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: PetType }) => (
    <PetCard
      pet={item}
      numOfColumns={numColumns}
      isListRefreshing={isLoading}
    />
  );

  const footerComponent = () => {
    if (pets.length >= MAX_NUMBER_OF_PHOTOS) {
      return (
        <View style={styles.footer}>
          <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
          <Text style={styles.limitText}>You've reached the maximum</Text>
          <Text style={styles.limitText}>number of pets!</Text>
          <Text style={styles.limitText}>Pull down top of the list</Text>
          <Text style={styles.limitText}>to get new pets.</Text>
        </View>
      );
    }

    return (
      <View style={styles.footer}>
        {isAddingPetsLoading && <ActivityIndicator size={"large"} />}
      </View>
    );
  };

  if (isApiChanged || isFiltersChanged) {
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

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={pets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshPetsList}
        refreshing={isLoading}
        numColumns={numColumns}
        onEndReached={fetchAddedPetsData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerComponent}
        maxToRenderPerBatch={20}
        contentContainerStyle={styles.flatListContent}
        scrollIndicatorInsets={{ top: 60 }}
        progressViewOffset={30}
      />
      <View style={styles.topBarContainer}>
        <TopBar
          setNumOfColumns={setNumOfColumns}
          numOfColumns={numColumns}
          onFilterPress={() => {
            if (!isLoading) openFilterBottomSheet();
          }}
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
      height: 290,
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
