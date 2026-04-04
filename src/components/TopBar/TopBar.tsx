import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type TopBarType = {
  setNumOfColumns: (value: number) => void;
  isIconsVisible?: boolean;
};

const TopBar: FC<TopBarType> = ({ setNumOfColumns, isIconsVisible = true }) => {
  const styles = useThemedStyles(createStyles);
  if (!isIconsVisible) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer} />
      <View style={styles.gridContainer}>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(1)}>
            <FontAwesome name="square" size={32} color={styles.iconColor.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(2)}>
            <Entypo name="grid" size={45} color={styles.iconColor.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(3)}>
            <Fontisto name="nav-icon-grid" size={28} color={styles.iconColor.color} />
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
      backgroundColor: theme.colors.statusBar,
      borderTopColor: theme.colors.disabled,
      borderBottomColor: theme.colors.disabled,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    gridContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
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
      color: theme.colors.secondaryText,
    }
  });

export default TopBar;
