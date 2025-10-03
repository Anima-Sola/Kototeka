import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Colors from "../../constants/colors";
import { Button } from "react-native-paper";

const Home = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Ошибка");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Главный экран</Text>
      <Button mode={"contained"} onPress={logout}>
        Выход
      </Button>
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

export default Home;
