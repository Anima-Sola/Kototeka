import { useState } from "react";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { RadioButton } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import Entypo from "@expo/vector-icons/Entypo";
import { useBottomSheet } from "../../contexts/BottomSheetContext";
import ChangeNameBS from "../../components/BottomSheets/ChangeNameBS";

const Settings = () => {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);
  const [theme, setTheme] = useState("system");
  const { setResolvedTheme, setMode, setIsSignedIn, userName } = useStore();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const openSimpleBottomSheet = () => {
    showBottomSheet(
      <ChangeNameBS />
    );
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsSignedIn(false);
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("Ошибка");
    }
  };

  const onThemeSwitch = (value: string) => {
    switch (value) {
      case "system":
        setMode("system");
        setTheme("system");
        break;
      case "light": {
        setMode("light");
        setResolvedTheme("light");
        setTheme("light");
        break;
      }
      case "dark": {
        setMode("dark");
        setResolvedTheme("dark");
        setTheme("dark");
        break;
      }
      default: {
        setMode("system");
        setTheme("system");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textHeader}>Name</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.textName}>{userName}</Text>
          <TouchableOpacity onPress={openSimpleBottomSheet}>
            <Entypo name="pencil" size={24} color={styles.iconColor.color} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textHeader}>Theme</Text>
        <View style={styles.radioGroupContainer}>
          <TouchableOpacity
            style={styles.radioGroupItem}
            onPress={() => onThemeSwitch("system")}
          >
            <Text style={styles.text}>System</Text>
            <RadioButton
              onPress={() => onThemeSwitch("system")}
              value="system"
              status={theme === "system" ? "checked" : "unchecked"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioGroupItem}
            onPress={() => onThemeSwitch("light")}
          >
            <Text style={styles.text}>Light</Text>
            <RadioButton
              onPress={() => onThemeSwitch("light")}
              value="light"
              status={theme === "light" ? "checked" : "unchecked"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioGroupItem}
            onPress={() => onThemeSwitch("dark")}
          >
            <Text style={styles.text}>Dark</Text>
            <RadioButton
              onPress={() => onThemeSwitch("dark")}
              value="dark"
              status={theme === "dark" ? "checked" : "unchecked"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
    },
    content: {
      flex: 1,
      marginHorizontal: 16,
      marginTop: 10,
    },
    text: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    textName: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellRegular",
      marginLeft: 10,
    },
    textHeader: {
      color: theme.colors.accent,
      fontSize: fontSizes.FONT14,
      fontFamily: "ShantellRegular",
      marginLeft: 10,
    },
    radioGroupContainer: {
      borderWidth: 1,
      borderColor: theme.colors.disabled,
      borderRadius: 5,
    },
    radioGroupItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    logoutContainer: {
      marginTop: 50,
      marginHorizontal: 16,
    },
    logoutText: {
      color: theme.colors.red,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellRegular",
      alignSelf: "center",
    },
    iconColor: {
      color: theme.colors.accent,
    },
  });

export default Settings;
