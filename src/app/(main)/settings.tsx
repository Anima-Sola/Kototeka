import { useState } from "react";
import useStore from "../../store/store";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Button } from "react-native-paper";
import TopBar from "../../components/TopBar/TopBar";
import { RadioButton } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

const Settings = () => {
  const styles = useThemedStyles(createStyles);
  const [theme, setTheme] = useState("system");
  const { setResolvedTheme, setMode } = useStore();

  const logout = async () => {
    try {
      await signOut(auth);
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
    <View style={styles.container}>
      <TopBar isIconsVisible={false} setNumOfColumns={() => {}} />
      <View style={styles.content}>
        <Text style={styles.textHeader}>Theme</Text>
        <View style={styles.radioGroupContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => onThemeSwitch(newValue)}
            value={theme}
          >
            <View style={styles.radioGroupItem}>
              <Text style={styles.text}>System</Text>
              <RadioButton value="system" />
            </View>
            <View style={styles.radioGroupItem}>
              <Text style={styles.text}>Light</Text>
              <RadioButton value="light" />
            </View>
            <View style={styles.radioGroupItem}>
              <Text style={styles.text}>Dark</Text>
              <RadioButton value="dark" />
            </View>
          </RadioButton.Group>
        </View>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    textHeader: {
      color: theme.colors.mainText,
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
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
      alignSelf: "center",
    },
  });

export default Settings;
