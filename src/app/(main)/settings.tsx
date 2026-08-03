import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Appearance,
} from "react-native";
import { Button } from "react-native-paper";
import { useForm, FormProvider } from "react-hook-form";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import updateUserPassword from "../../API/FirebaseAPI/updatePassword";
import { RadioButton, SegmentedButtons } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import Entypo from "@expo/vector-icons/Entypo";
import { useBottomSheet } from "../../contexts/BottomSheetContext";
import ChangeNameBS from "../../components/BottomSheets/ChangeNameBS";
import DeleteAccountBS from "../../components/BottomSheets/DeleteAccountBS";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import RepeatPasswordInput from "../../components/TextInputs/RepeatPasswordInput";
import fetchUserData from "../../API/fetchUserData";
import FullScreenLoadingIndicator from "../../components/FullScreenLoadingIndicator/FullScreenLoadingIndicator";

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
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [isPetsSelecting, setIsPetsSelecting] = useState(false);
  const {
    setResolvedTheme,
    setMode,
    setIsSignedIn,
    userName,
    showErrorToast,
    showSuccessToast,
    petsType,
    setApi,
    userId,
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
    await signOut(auth);
    setIsSignedIn(false);
    router.replace("/(auth)/login");
  };

  const logoutAlert = () => {
    Alert.alert("Log out", "Do you really want to log out?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: logout },
    ]);
  };

  async function onSubmit(data: FormValues) {
    const currentPassword = data.currentPassword.trim();
    const newPassword = data.newPassword.trim();

    try {
      setIsPasswordChanging(true);

      await updateUserPassword({
        currentPassword,
        newPassword,
      });

      methods.reset();
      showSuccessToast("Your password has been changed successfully");
    } catch (error: any) {
      showErrorToast("Error while updating password");
    } finally {
      setIsPasswordChanging(false);
    }
  }

  const newPasswordValue = methods.watch("newPassword");

  useEffect(() => {
    if (newPasswordValue !== undefined) {
      methods.trigger("repeatNewPassword");
    }
  }, [newPasswordValue, methods]);

  const onThemeSwitch = (value: string) => {
    switch (value) {
      case "system": {
        const systemTheme =
          Appearance.getColorScheme() === "dark" ? "dark" : "light";
        setMode("system");
        setResolvedTheme(systemTheme);
        setTheme("system");
        break;
      }
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

  const changePets = async (value: "cats" | "dogs") => {
    if (value === petsType) return;

    const currentApi = petsType;
    setIsPetsSelecting(true);

    try {
      setApi(value);
      await fetchUserData(userId);
      showSuccessToast(`You've chosen ${value}`);
    } catch (error: any) {
      showErrorToast("Pets selection error");
      setApi(currentApi);
    } finally {
      setIsPetsSelecting(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.textHeader}>Name</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.textName}>{userName}</Text>
            <TouchableOpacity onPress={openChangeNameBottomSheet}>
              <Entypo name="pencil" size={24} color={styles.iconColor.color} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textHeader}>Pets selection</Text>
          <View style={styles.segmentedButtionsContainer}>
            <SegmentedButtons
              value={petsType}
              onValueChange={changePets}
              density={"regular"}
              buttons={[
                {
                  value: "cats",
                  label: "Cats",
                  labelStyle:
                    petsType === "cats"
                      ? styles.segmentedButtonLabel
                      : styles.segmentedButtonLabelSelected,
                  style: [
                    styles.segmentedButtonItem,
                    petsType === "cats" && styles.segmentedButtonSelected,
                  ],
                },
                {
                  value: "dogs",
                  label: "Dogs",
                  labelStyle:
                    petsType === "dogs"
                      ? styles.segmentedButtonLabel
                      : styles.segmentedButtonLabelSelected,
                  style: [
                    styles.segmentedButtonItem,
                    petsType === "dogs" && styles.segmentedButtonSelected,
                  ],
                },
              ]}
            />
          </View>
          <Text style={styles.textHeader}>API Keys</Text>
          <View style={styles.apiKeysButtonContainer}>
            <Button
              mode={"contained"}
              style={styles.button}
              labelStyle={styles.labelButton}
              onPress={() => router.push("/(apikeys)/apikeys")}
            >
              Add API Keys
            </Button>
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
                    ? styles.button
                    : styles.disabledButton
                }
                labelStyle={styles.labelButton}
                loading={isPasswordChanging}
                disabled={!methods.formState.isValid || isPasswordChanging}
                onPress={methods.handleSubmit(onSubmit)}
              >
                Change
              </Button>
            </View>
          </View>
          <View style={styles.logoutButtonContainer}>
            <Button
              mode={"contained"}
              style={styles.button}
              labelStyle={styles.labelButton}
              onPress={logoutAlert}
            >
              Log out
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
      {isPetsSelecting && <FullScreenLoadingIndicator />}
    </>
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
    segmentedButtionsContainer: {
      marginBottom: 10,
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
    apiKeysButtonContainer: {
      marginBottom: 10,
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
      justifyContent: "center",
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
    segmentedButtonItem: {
      borderRadius: 20,
      height: 50,
      borderColor: theme.colors.disabled,
      justifyContent: "center",
    },
    segmentedButtonLabel: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      color: theme.colors.secondary,
      lineHeight: 22,
    },
    segmentedButtonLabelSelected: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      color: theme.colors.mainText,
      lineHeight: 22,
    },

    segmentedButtonSelected: {
      backgroundColor: theme.colors.accent,
    },
    footer: {
      height: 190,
    },
  });

export default Settings;
