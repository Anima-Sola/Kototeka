import { useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { PressableScale } from "pressto";
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

const SelectPetsBreeds = () => {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const breeds = useStore((state) => state.breeds);
  const clearSelectedBreeds = useStore((state) => state.clearSelectedBreeds);
  const selectAllBreeds = useStore((state) => state.selectAllBreeds);
  const breedIds = useMemo(() => Object.keys(breeds), [breeds]);

  const saveChanges = () => {
    router.back();
  };

  const keyExtractor = (id: string) => id;
  const renderItem = ({ item: breedId }: ListRenderItemInfo<string>) => (
    <BreedItem breedId={breedId} />
  );

  const isBreedsChanged = true;

  const footerComponent = () => {
    return <View style={styles.footer} />;
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.iconsContainer}>
        <View>
          <PressableScale
            style={styles.backButtonContainer}
            onPress={() => router.back()}
          >
            <MaterialIcons
              name="chevron-left"
              size={30}
              color={styles.backIconColor.color}
            />
          </PressableScale>
        </View>
        <View style={styles.selectAllEraseIconsContainer}>
          <PressableScale onPress={() => selectAllBreeds()}>
            <MaterialCommunityIcons
              name="selection-multiple"
              size={38}
              color={styles.iconColor.color}
            />
          </PressableScale>
          <PressableScale onPress={() => clearSelectedBreeds()} style={styles.eraseIcon}>
            <MaterialCommunityIcons
              name="eraser"
              size={38}
              color={styles.iconColor.color}
            />
          </PressableScale>
        </View>
      </View>
      <Text style={styles.textHeader}>Select breeds</Text>
      <FlatList
        data={breedIds}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footerComponent}
        contentContainerStyle={styles.content}
      />
      <View style={styles.buttonsContainer}>
        <Button
          mode={"contained"}
          style={
            isBreedsChanged
              ? styles.saveCancelButton
              : styles.disabledSaveCancelButton
          }
          labelStyle={styles.labelButton}
          disabled={!isBreedsChanged}
          onPress={saveChanges}
        >
          Save
        </Button>
        <View style={styles.gap} />
        <Button
          mode={"contained"}
          style={styles.saveCancelButton}
          labelStyle={styles.labelButton}
          onPress={() => router.back()}
        >
          Cancel
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
    backIconColor: {
      color: theme.colors.black,
    },
    eraseIcon: {
      marginLeft: 5,
    },
    textHeader: {
      fontSize: fontSizes.FONT40,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      marginTop: Platform.OS === "ios" ? 75 : 60,
      textAlign: "center",
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
    buttonsContainer: {
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
    disabledSaveCancelButton: {
      backgroundColor: theme.colors.disabled,
      height: 50,
      justifyContent: "center",
    },
    iconColor: {
      color: theme.colors.accent,
    },
    gap: {
      height: 10,
    },
    footer: {
      height: 190,
    },
  });

export default SelectPetsBreeds;
