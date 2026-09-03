import { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  ListRenderItemInfo,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import BreedItem from "../../components/BreedItem/BreedItem";
import { useBottomSheet } from "../../contexts/BottomSheetContext";
import FilterBS from "../../components/BottomSheets/FilterBS";
import { getBreedIdsStr } from "../../functions/common";
import { BreedType } from "../../constants/types";

const filterBreeds = (
  breeds: Record<string, BreedType>,
  filterText: string,
) => {
  const normalizedFilterText = filterText.toLowerCase();

  return Object.keys(breeds).filter((breedId) =>
    breeds[breedId].name.toLowerCase().includes(normalizedFilterText),
  );
};

const SelectPetsBreeds = () => {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    breeds,
    clearSelectedBreeds,
    selectAllBreeds,
    filterRequestSettings,
    setFilterRequestSettings,
    selectedBreeds,
    setApi,
    tempPetsType,
    tempFilterRequestSettings,
  } = useStore();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const [filterText, setFilterText] = useState("");

  const onFilterBottomSheetClose = () => {
    setFilterRequestSettings(tempFilterRequestSettings);
    setApi(tempPetsType);
  };

  const openFilterBottomSheet = () => {
    showBottomSheet(
      <FilterBS hideBottomSheet={hideBottomSheet} />,
      onFilterBottomSheetClose,
    );
  };

  const renderItem = ({ item: breedId }: ListRenderItemInfo<string>) => (
    <BreedItem breedId={breedId} />
  );

  const footerComponent = () => {
    return <View style={styles.footer} />;
  };

  const onGoBack = () => {
    setFilterRequestSettings({
      ...filterRequestSettings,
      mode: "selectedPhotos",
      breed_ids: getBreedIdsStr(selectedBreeds),
    });
    router.back();
    openFilterBottomSheet();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.iconsContainer}>
        <View>
          <Pressable style={styles.backButtonContainer} onPress={onGoBack}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color={styles.backIconColor.color}
            />
          </Pressable>
        </View>
        <View style={styles.selectAllEraseIconsContainer}>
          <Pressable style={styles.iconButton} onPress={selectAllBreeds}>
            <MaterialCommunityIcons
              name="selection-multiple"
              size={38}
              color={styles.iconColor.color}
            />
          </Pressable>
          <Pressable
            onPress={clearSelectedBreeds}
            style={[styles.iconButton, styles.eraseIcon]}
          >
            <MaterialCommunityIcons
              name="eraser"
              size={38}
              color={styles.iconColor.color}
            />
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={styles.textHeader}>Select breeds</Text>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Find breeds"}
            placeholderTextColor={styles.placeholderColor.color}
            value={filterText}
            defaultValue={""}
            onChangeText={(newText) => setFilterText(newText)}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View pointerEvents="none" style={styles.searchIconContainer}>
            <MaterialIcons
              name="search"
              size={28}
              color={styles.iconColor.color}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={filterBreeds(breeds, filterText)}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(id: string) => id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footerComponent}
        contentContainerStyle={styles.content}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={styles.saveCancelButton}
          labelStyle={styles.labelButton}
          onPress={onGoBack}
        >
          Go back
        </Button>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
      paddingHorizontal: 16,
    },
    content: {
      marginTop: 10,
    },
    iconsContainer: {
      position: "absolute",
      left: 16,
      right: 16,
      top: Platform.OS === "ios" ? 55 : 40,
      zIndex: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButtonContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.whiteTransluscent,
      alignItems: "center",
      justifyContent: "center",
    },
    selectAllEraseIconsContainer: {
      flexDirection: "row",
    },
    iconButton: {
      minWidth: 44,
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    backIconColor: {
      color: theme.colors.black,
    },
    eraseIcon: {
      marginLeft: 5,
    },
    searchInputContainer: {
      position: "relative",
    },
    searchIconContainer: {
      position: "absolute",
      right: 10,
      top: 18,
    },
    textHeader: {
      fontSize: fontSizes.FONT40,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      marginTop: Platform.OS === "ios" ? 75 : 50,
      textAlign: "center",
    },
    input: {
      height: 44,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingRight: 52,
      paddingVertical: 0,
      textAlignVertical: "center",
      includeFontPadding: false,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellLightItalic",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.mainText,
      marginVertical: 10,
    },
    placeholderColor: {
      color: theme.colors.placeholder,
    },

    text: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellRegular",
      color: theme.colors.mainText,
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    buttonContainer: {
      width: "100%",
      position: "absolute",
      bottom: Platform.OS === "ios" ? 30 : 50,
      alignSelf: "center",
    },
    saveCancelButton: {
      backgroundColor: theme.colors.accent,
      height: 50,
      justifyContent: "center",
    },
    iconColor: {
      color: theme.colors.accent2,
    },
    gap: {
      height: 10,
    },
    footer: {
      height: 190,
    },
  });

export default SelectPetsBreeds;
