import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";

type TopBarType = {
  setNumOfColumns: (value: number) => void;
};

const TopBar: FC<TopBarType> = ({ setNumOfColumns }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setNumOfColumns(1)}>
        <FontAwesome name="square" size={32} color={Colors.black} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setNumOfColumns(2)}>
        <Entypo name="grid" size={45} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setNumOfColumns(3)}>
        <Fontisto name="nav-icon-grid" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.statusBar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: Colors.disabled,
    borderTopWidth: 1,
  },
});

export default TopBar;
