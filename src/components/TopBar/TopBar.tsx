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
};

const TopBar: FC<TopBarType> = ({ numOfColumns, setNumOfColumns }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(1)}>
            <FontAwesome
              name="square"
              size={32}
              color={
                numOfColumns === 1
                  ? styles.iconColorSelected.color
                  : styles.iconColor.color
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(2)}>
            <Entypo
              name="grid"
              size={45}
              color={
                numOfColumns === 2
                  ? styles.iconColorSelected.color
                  : styles.iconColor.color
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(3)}>
            <Fontisto
              name="nav-icon-grid"
              size={28}
              color={
                numOfColumns === 3
                  ? styles.iconColorSelected.color
                  : styles.iconColor.color
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity>
          <Ionicons name="options" size={40} color={styles.iconColor.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: theme.colors.statusBarTransluscent,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    gridContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 3,
    },
    gridIcon: {
      marginHorizontal: 5,
    },
    filterContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
    },
    iconColor: {
      color: theme.colors.accent,
    },
    iconColorSelected: {
      color: theme.colors.accent2,
    },
  });

export default TopBar;
