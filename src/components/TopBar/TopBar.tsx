import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type TopBarType = {
  numOfColumns: number;
  setNumOfColumns: (value: number) => void;
  onFilterPress?: () => void;
};

const TopBar: FC<TopBarType> = ({
  numOfColumns,
  setNumOfColumns,
  onFilterPress,
}) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          onPress={() => setNumOfColumns(1)}
          style={
            numOfColumns === 1
              ? styles.gridIconContainerSelected
              : styles.gridIconContainer
          }
        >
          <FontAwesome
            name="square"
            size={18}
            color={
              numOfColumns === 1
                ? styles.iconColorSelected.color
                : styles.iconColor.color
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNumOfColumns(2)}
          style={
            numOfColumns === 2
              ? styles.gridIconContainerSelected
              : styles.gridIconContainer
          }
        >
          <Entypo
            name="grid"
            size={24}
            color={
              numOfColumns === 2
                ? styles.iconColorSelected.color
                : styles.iconColor.color
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNumOfColumns(3)}
          style={
            numOfColumns === 3
              ? styles.gridIconContainerSelected
              : styles.gridIconContainer
          }
        >
          <Fontisto
            name="nav-icon-grid"
            size={16}
            color={
              numOfColumns === 3
                ? styles.iconColorSelected.color
                : styles.iconColor.color
            }
          />
        </TouchableOpacity>
      </View>
      {onFilterPress && (
        <TouchableOpacity
          onPress={onFilterPress}
          style={styles.filterContainer}
        >
          <Ionicons
            name="options"
            size={24}
            color={styles.filterIconColor.color}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: theme.colors.statusBarTransluscent,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    gridContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 6,
    },
    gridIconContainer: {
      marginHorizontal: 5,
      backgroundColor: theme.colors.secondaryTransluscent,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 14,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.colors.disabled,
    },
    gridIconContainerSelected: {
      marginHorizontal: 5,
      backgroundColor: theme.colors.accent,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginRight: 10,
    },
    filterContainer: {
      marginHorizontal: 5,
      backgroundColor: theme.colors.secondaryTransluscent,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.colors.disabled,
    },
    iconColor: {
      color: theme.colors.secondaryText,
    },
    iconColorSelected: {
      color: theme.colors.main,
    },
    filterIconColor: {
      color: theme.colors.accent,
    },
  });

export default TopBar;
