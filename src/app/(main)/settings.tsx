import { useState } from "react";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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
import DeleteAccountBS from "../../components/BottomSheets/DeleteAccountBS";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLogginOut] = useState(false);
  const {
    setResolvedTheme,
    setMode,
    setIsSignedIn,
    userName,
    showErrorToast,
    showSuccessToast,
  } = useStore();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const openChangeNameBottomSheet = () => {
    showBottomSheet(
      <ChangeNameBS hideBottomSheet={hideBottomSheet} userName={userName} />,
    );
  };

  const openDeleteAccountBottomSheet = () => {
    showBottomSheet(<DeleteAccountBS hideBottomSheet={hideBottomSheet} />);
  };

  const logout = async () => {
    try {
      setIsLogginOut(true);

      await signOut(auth);
      setIsSignedIn(false);
      router.replace("/(auth)/login");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      showErrorToast("Error while loggin out: " + errorMessage);
    } finally {
      setIsLogginOut(false);
    }
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      const currentPassword = data.currentPassword.trim();
      const newPassword = data.newPassword.trim();

      await updateUserPassword({
        currentPassword,
        newPassword,
      });

      methods.reset();
      showSuccessToast("Your password has been changed successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      showErrorToast("Error updating password: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

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
          <TouchableOpacity onPress={openChangeNameBottomSheet}>
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
                methods.formState.isValid && !isLoading
                  ? styles.button
                  : styles.disabledButton
              }
              labelStyle={styles.labelButton}
              disabled={!methods.formState.isValid || isLoading}
              onPress={methods.handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <ActivityIndicator color={styles.activityIndicator.color} size="small" />
              ) : (
                "Change"
              )}
            </Button>
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <Button
            mode={"contained"}
            style={!isLoggingOut ? styles.button : styles.disabledButton}
            labelStyle={styles.labelButton}
            onPress={logout}
          >
            {isLoggingOut ? (
              <ActivityIndicator color={styles.activityIndicator.color} size="small" />
            ) : (
              "Log out"
            )}
          </Button>
        </View>
        <TouchableOpacity
          style={styles.deleteAccountContainer}
          onPress={openDeleteAccountBottomSheet}
        >
          <Text style={styles.deleteAccountText}>Delete account</Text>
        </TouchableOpacity>
        <View style={styles.footer} />
      </View>
    </ScrollView>
  );
};

//To do activity full screen indicator then deleting

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
    deleteAccountContainer: {
      marginTop: 50,
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
      paddingBottom: 30,
    },
    logoutButtonContainer: {
      marginTop: 30,
      marginHorizontal: 8,
    },
    button: {
      backgroundColor: theme.colors.accent,
      height: 50,
    },
    disabledButton: {
      backgroundColor: theme.colors.disabled,
      height: 50,
      justifyContent: "center",
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    activityIndicator: {
      color: theme.colors.accent,
    },
    footer: {
      height: 190,
    },
  });

export default Settings;
