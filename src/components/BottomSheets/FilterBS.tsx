import { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Platform } from "react-native";
import useStore from "../../store/store";
import { Button } from "react-native-paper";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";
import Slider from "@react-native-community/slider";
import { Checkbox } from "react-native-paper";
import { MIN_LIMIT_PHOTOS, MAX_LIMIT_PHOTOS } from "../../constants/common";

type ChangeNameBSType = {
  hideBottomSheet: () => void;
};

const FilterBS: FC<ChangeNameBSType> = ({ hideBottomSheet }) => {
  const styles = useThemedStyles(createStyles);
  const {
    filterRequestSettings,
    setFilterRequestSettings,
    setIsFiltersChanged,
  } = useStore();
  const [limit, setLimit] = useState(filterRequestSettings.limit);
  const [hasBreeds, setHasBreeds] = useState(filterRequestSettings.has_breeds);

  const isFiltersChanged =
    limit !== filterRequestSettings.limit ||
    hasBreeds !== filterRequestSettings.has_breeds;

  const onSavePress = () => {
    setFilterRequestSettings({
      limit: limit,
      has_breeds: hasBreeds,
    });
    setIsFiltersChanged(true);
    hideBottomSheet();
  };

  return (
    <ScrollView style={styles.container}>
      <BottomSheetTopBar title={"Filters"} />
      <View style={styles.textContainer}>
        <Text style={styles.queryParamText}>Number Of Loading Photos</Text>
      </View>
      <Slider
        style={styles.slider}
        value={limit}
        step={1}
        onValueChange={(value) => setLimit(value)}
        minimumValue={MIN_LIMIT_PHOTOS}
        maximumValue={MAX_LIMIT_PHOTOS}
        minimumTrackTintColor={styles.minimumTrackTintColor.color}
        maximumTrackTintColor={styles.maximumTrackTintColor.color}
      />
      <View style={styles.limitTextContainer}>
        <Text style={styles.textLimit}>{MIN_LIMIT_PHOTOS}</Text>
        <Text style={styles.text}>{limit}</Text>
        <Text style={styles.textLimit}>{MAX_LIMIT_PHOTOS}</Text>
      </View>
      <View style={styles.gap} />
      <View style={styles.checkBoxContainer}>
        <Checkbox.Android
          status={hasBreeds ? "checked" : "unchecked"}
          onPress={() => setHasBreeds(!hasBreeds)}
          color={styles.chekedColor.color}
          uncheckedColor={styles.uncheckedColor.color}
        />
        <Text style={styles.queryParamText}>Only with breed info</Text>
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
          onPress={hideBottomSheet}
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
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    queryParamText: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
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
    checkBoxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      marginLeft: -6,
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
    uncheckedColor: {
      color: theme.colors.disabled,
    },
    chekedColor: {
      color: theme.colors.accent,
    },
  });

export default FilterBS;
