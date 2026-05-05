import { useState } from "react";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useForm, FormProvider } from "react-hook-form";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import updateUserPassword from "../../API/FirebaseAPI/updatePassword";
import { RadioButton } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import Entypo from "@expo/vector-icons/Entypo";
import { useBottomSheet } from "../../contexts/BottomSheetContext";
import ChangeNameBS from "../../components/BottomSheets/ChangeNameBS";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import RepeatPasswordInput from "../../components/TextInputs/RepeatPasswordInput";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const Settings = () => {
  const router = useRouter();
  const styles = useThemedStyles(createStyles);
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });
  const [theme, setTheme] = useState("system");
  const { setResolvedTheme, setMode, setIsSignedIn, userName } = useStore();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const openSimpleBottomSheet = () => {
    showBottomSheet(
      <ChangeNameBS hideBottomSheet={hideBottomSheet} userName={userName} />,
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

  async function onSubmit(data: FormValues) {
    try {
      const currentPassword = data.currentPassword.trim();
      const newPassword = data.newPassword.trim();

      await updateUserPassword({
        currentPassword,
        newPassword,
      });

      Alert.alert("Success", "Your password has been changed successfully", [
        {
          text: "OK",
          onPress: () => {
            methods.reset();
          },
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password";

      let displayMessage = errorMessage;

      // Улучшенные сообщения об ошибках
      if (errorMessage.includes("auth/wrong-password")) {
        displayMessage = "Current password is incorrect";
      } else if (errorMessage.includes("auth/weak-password")) {
        displayMessage = "New password is too weak";
      }

      Alert.alert("Error", displayMessage);
    }
  }

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
        <Text style={styles.textHeader}>Change Password</Text>
        <View style={styles.changePasswordFormContainer}>
          <FormProvider {...methods}>
            <View style={styles.inputContainer}>
              <PasswordInput
                name="currentPassword"
                placeholder="Current password"
                checkFormat={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <PasswordInput name="newPassword" placeholder="New password" />
            </View>
            <View style={styles.inputContainer}>
              <RepeatPasswordInput
                name="repeatNewPassword"
                placeholder="Repeat new password"
                passwordToCheck={methods.watch("newPassword")}
              />
            </View>
          </FormProvider>
          <View style={styles.buttonContainer}>
            <Button
              mode={"contained"}
              style={
                methods.formState.isValid
                  ? styles.signUpButton
                  : styles.disabledSignUpButton
              }
              labelStyle={styles.singUpLabelButton}
              disabled={!methods.formState.isValid}
              onPress={methods.handleSubmit(onSubmit)}
            >
              Save changes
            </Button>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountContainer} onPress={() => {}}>
          <Text style={styles.deleteAccountText}>Delete account</Text>
        </TouchableOpacity>
        <View style={styles.footer} />
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
      marginBottom: 15,
    },
    radioGroupItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    logoutContainer: {
      marginTop: 30,
      alignSelf: "center",
    },
    logoutText: {
      color: theme.colors.accent,
      fontSize: fontSizes.FONT25,
      fontFamily: "ShantellRegular",
    },
    deleteAccountContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignSelf: "center",
    },
    deleteAccountText: {
      color: theme.colors.red,
      fontSize: fontSizes.FONT14,
      fontFamily: "ShantellRegular",
      alignSelf: "center",
    },
    iconColor: {
      color: theme.colors.accent,
    },
    inputContainer: {
      height: 74,
    },
    changePasswordFormContainer: {
      borderWidth: 1,
      borderColor: theme.colors.disabled,
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingTop: 30,
    },
    buttonContainer: {
      width: "100%",
      paddingBottom: 30,
    },
    signUpButton: {
      backgroundColor: theme.colors.accent,
    },
    disabledSignUpButton: {
      backgroundColor: theme.colors.disabled,
    },
    singUpLabelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    footer: {
      height: 190,
    },
  });

export default Settings;
