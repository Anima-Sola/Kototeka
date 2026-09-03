import { FC } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import { Button, SegmentedButtons, RadioButton } from "react-native-paper";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";
import Slider from "@react-native-community/slider";
import { MIN_LIMIT_PHOTOS, MAX_LIMIT_PHOTOS } from "../../constants/common";
import { getNumOfSelectedBreedIds } from "../../functions/common";

type ChangeNameBSType = {
  hideBottomSheet: (executeOnClose?: boolean) => void;
};

const FilterBS: FC<ChangeNameBSType> = ({ hideBottomSheet }) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const {
    filterRequestSettings,
    setFilterRequestSettings,
    setIsFiltersChanged,
    petsType,
    setApi,
    setIsApiChanged,
    selectedBreeds,
    tempFilterRequestSettings,
    tempPetsType,
  } = useStore();

  const checkIsFiltersChanged = () => {
    if (
      filterRequestSettings.mode === "selectedPhotos" &&
      filterRequestSettings.breed_ids.length === 0
    )
      return false;

    return (
      filterRequestSettings.mode !== tempFilterRequestSettings.mode ||
      filterRequestSettings.limit !== tempFilterRequestSettings.limit ||
      filterRequestSettings.has_breeds !==
        tempFilterRequestSettings.has_breeds ||
      filterRequestSettings.breed_ids !== tempFilterRequestSettings.breed_ids ||
      petsType !== tempPetsType
    );
  };

  const isFiltersChanged = checkIsFiltersChanged();

  const onSavePress = () => {
    if (petsType !== tempPetsType) {
      setIsApiChanged(true);
    } else {
      setIsFiltersChanged(true);
    }
    hideBottomSheet(false);
  };

  const onCancel = () => hideBottomSheet();

  const changePets = async (value: "cats" | "dogs") => {
    if (value === petsType) return;
    setApi(value);
  };

  const onRadioButtonsValueChange = (
    value: "allPhotos" | "randomPhotos" | "selectedPhotos",
  ) => {
    switch (value) {
      case "allPhotos":
        setFilterRequestSettings({
          ...filterRequestSettings,
          has_breeds: false,
          breed_ids: "",
          mode: "allPhotos",
        });
        break;
      case "randomPhotos":
        setFilterRequestSettings({
          ...filterRequestSettings,
          has_breeds: true,
          breed_ids: "",
          mode: "randomPhotos",
        });
        break;
      case "selectedPhotos":
        hideBottomSheet(false);
        router.push("/selectPetsBreeds");
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <BottomSheetTopBar title={"Filters"} />
      <View style={styles.textContainer}>
        <Text style={styles.queryParamText}>Pets selection</Text>
      </View>
      <View style={styles.segmentedButtonsContainer}>
        <SegmentedButtons
          value={petsType}
          onValueChange={changePets}
          density={"regular"}
          buttons={[
            {
              value: "cats",
              label: "Cats",
              labelStyle:
                petsType === "cats"
                  ? styles.segmentedButtonLabel
                  : styles.segmentedButtonLabelSelected,
              style: [
                styles.segmentedButtonItem,
                petsType === "cats" && styles.segmentedButtonSelected,
              ],
            },
            {
              value: "dogs",
              label: "Dogs",
              labelStyle:
                petsType === "dogs"
                  ? styles.segmentedButtonLabel
                  : styles.segmentedButtonLabelSelected,
              style: [
                styles.segmentedButtonItem,
                petsType === "dogs" && styles.segmentedButtonSelected,
              ],
            },
          ]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.queryParamText}>Number of loading photos</Text>
      </View>
      <Slider
        style={styles.slider}
        value={filterRequestSettings.limit}
        step={1}
        onValueChange={(value) =>
          setFilterRequestSettings({ ...filterRequestSettings, limit: value })
        }
        minimumValue={MIN_LIMIT_PHOTOS}
        maximumValue={MAX_LIMIT_PHOTOS}
        minimumTrackTintColor={styles.minimumTrackTintColor.color}
        maximumTrackTintColor={styles.maximumTrackTintColor.color}
      />
      <View style={styles.limitTextContainer}>
        <Text style={styles.textLimit}>{MIN_LIMIT_PHOTOS}</Text>
        <Text style={styles.text}>{filterRequestSettings.limit}</Text>
        <Text style={styles.textLimit}>{MAX_LIMIT_PHOTOS}</Text>
      </View>
      <View style={styles.gap} />
      <View style={styles.radioButtonsContainer}>
        <RadioButton.Group
          onValueChange={(newValue: string) =>
            onRadioButtonsValueChange(
              newValue as "allPhotos" | "randomPhotos" | "selectedPhotos",
            )
          }
          value={filterRequestSettings.mode}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton value="allPhotos" />
            <TouchableOpacity
              onPress={() => onRadioButtonsValueChange("allPhotos")}
            >
              <Text style={styles.queryParamText}>All photos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="randomPhotos" />
            <TouchableOpacity
              onPress={() => onRadioButtonsValueChange("randomPhotos")}
            >
              <Text style={styles.queryParamText}>Random breeds photos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="selectedPhotos" />
            <TouchableOpacity
              onPress={() => onRadioButtonsValueChange("selectedPhotos")}
            >
              <Text style={styles.queryParamText}>
                Selected breeds photos (
                {getNumOfSelectedBreedIds(selectedBreeds)} breeds)
              </Text>
            </TouchableOpacity>
          </View>
        </RadioButton.Group>
      </View>
      <View
        style={{
          ...styles.buttonsContainer,
          paddingBottom: Platform.OS === "ios" ? 0 : 30,
        }}
      >
        <Button
          mode={"contained"}
          style={
            isFiltersChanged ? styles.enabledButton : styles.disabledButton
          }
          labelStyle={styles.labelButton}
          onPress={onSavePress}
          disabled={!isFiltersChanged}
        >
          Save
        </Button>
        <View style={styles.gap} />
        <Button
          mode={"contained"}
          style={styles.enabledButton}
          labelStyle={styles.labelButton}
          onPress={onCancel}
        >
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors.main,
      paddingHorizontal: 16,
    },
    textContainer: {
      marginHorizontal: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    queryParamText: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
    },
    segmentedButtonsContainer: {
      marginBottom: 10,
    },
    segmentedButtonItem: {
      borderRadius: 20,
      height: 50,
      borderColor: theme.colors.disabled,
      justifyContent: "center",
    },
    segmentedButtonLabel: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      color: theme.colors.secondary,
      lineHeight: 22,
    },
    segmentedButtonLabelSelected: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      color: theme.colors.mainText,
      lineHeight: 22,
    },
    segmentedButtonSelected: {
      backgroundColor: theme.colors.accent,
    },
    limitTextContainer: {
      marginHorizontal: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellRegular",
    },
    textLimit: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
    },
    slider: {
      width: "100%",
    },
    radioButtonsContainer: {
      marginBottom: 20,
    },
    radioButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    buttonsContainer: {
      marginBottom: 30,
    },
    disabledButton: {
      backgroundColor: theme.colors.disabled,
      height: 50,
    },
    enabledButton: {
      backgroundColor: theme.colors.accent,
      height: 50,
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    gap: {
      height: 10,
    },
    minimumTrackTintColor: {
      color: theme.colors.accent,
    },
    maximumTrackTintColor: {
      color: theme.colors.disabled,
    },
  });

export default FilterBS;
