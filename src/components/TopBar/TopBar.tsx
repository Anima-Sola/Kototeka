import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

type TopBarType = {
  setNumOfColumns: (value: number) => void;
  isIconsVisible?: boolean;
};

const TopBar: FC<TopBarType> = ({ setNumOfColumns, isIconsVisible = true }) => {
  if (!isIconsVisible) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer} />
      <View style={styles.gridContainer}>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(1)}>
            <FontAwesome name="square" size={32} color={Colors.secondaryText} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(2)}>
            <Entypo name="grid" size={45} color={Colors.secondaryText} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridIcon}>
          <TouchableOpacity onPress={() => setNumOfColumns(3)}>
            <Fontisto name="nav-icon-grid" size={28} color={Colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity>
          <Ionicons name="options" size={40} color={Colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.statusBar,
    borderTopColor: Colors.disabled,
    borderBottomColor: Colors.disabled,
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
});

export default TopBar;
