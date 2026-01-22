import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default function ToolBar() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.secondary,
  },
});
