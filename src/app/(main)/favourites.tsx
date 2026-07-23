import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import getFavouritePetsAPI from "../../API/getFavouritePets";
import FavouritePetCard from "../../components/PetCard/FavouritePetCard";
import useStore from "../../store/store";
import TopBar from "../../components/TopBar/TopBar";
import { favouritePetType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import { getFavouritePetsBreeds } from "../../API/fetchUserData";

const Favourites = () => {
  const styles = useThemedStyles(createStyles);
  const { favouritePets, setFavouritePets, userId } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);

  const fetchFavouritePetsData = async () => {
    setIsLoading(true);

    try {
      const favouritePets = await getFavouritePetsAPI(userId);
      setFavouritePets(favouritePets);
      await getFavouritePetsBreeds(favouritePets);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const keyExtractor = (item: favouritePetType, index: number) =>
    `${item.id}_${index}`;
  const renderItem = ({ item }: { item: favouritePetType }) => (
    <FavouritePetCard pet={item} numOfColumns={numColumns} />
  );

  if (!favouritePets || favouritePets.length === 0)
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
          <Text style={styles.text}>No favourite pets</Text>
          <Text style={styles.text}>Please, add them from the gallery</Text>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={favouritePets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchFavouritePetsData}
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
