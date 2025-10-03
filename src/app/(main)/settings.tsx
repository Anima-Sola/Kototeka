import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Настройки</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.mainText,
  },
});

export default Settings;