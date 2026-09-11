import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../../firebaseConfig";
import { Button, ActivityIndicator } from "react-native-paper";
import EmailInput from "../../components/TextInputs/EmailInput";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import useStore from "../../store/store";
import fetchUserData from "../../API/fetchUserData";
import {
  getApiErrorMessage,
  getFirebaseApiErrorMessage,
} from "../../functions/errorApiMessages";
import getCatsBreedsAPI from "../../API/getCatsBreeds";
import getDogsBreedsAPI from "../../API/getDogsBreeds";
import getUserApiKeys from "../../API/FirebaseAPI/getUserApiKeys";
import GoogleIcon from "../../../assets/Icons/GoogleIcon";
import { signInWithGoogle } from "../../API/FirebaseAPI/signInWithGoogle";
import { DEFAULT_LIMIT_PHOTOS } from "../../constants/common";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    userId,
    setIsSignedIn,
    showErrorToast,
    setUserId,
    setUserName,
    setIsOnBoarding,
    setUserCatApiKey,
    setUserDogApiKey,
    setMode,
    setApi,
    setCatBreeds,
    setDogBreeds,
    setProvider,
    setFilterRequestSettings,
  } = useStore();
  const [isEmailLogging, setIsEmailLogging] = useState(false);
  const [isGoogleLogging, setIsGoogleLogging] = useState(false);
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  const setNewLoggedUserData = async (user: User) => {
    setApi("cats");
    const userApiKeys = await getUserApiKeys(user.uid);
    setUserCatApiKey(userApiKeys.catApiKey || "");
    setUserDogApiKey(userApiKeys.dogApiKey || "");
    setFilterRequestSettings({
      limit: DEFAULT_LIMIT_PHOTOS,
      has_breeds: false,
      breed_ids: "",
      mode: "allPhotos",
    });
    await fetchUserData(user.uid);

    if (user.displayName) setUserName(user.displayName);
    setUserId(user.uid);
    setMode("system");
  };

  const loadBreeds = async () => {
    const catBreeds = await getCatsBreedsAPI();
    const dogBreeds = await getDogsBreedsAPI();
    setCatBreeds(catBreeds);
    setDogBreeds(dogBreeds);
  };

  const loginWithGoogle = async () => {
    setIsGoogleLogging(true);

    try {
      const user = await signInWithGoogle();

      if (userId !== user.uid) await setNewLoggedUserData(user);
      await loadBreeds();
      setProvider("GoogleAccount");
      setIsSignedIn(true);

      router.replace("/(main)");
    } catch (error: any) {
      error.code = "auth/Google Sign In failed";
      showErrorToast(getFirebaseApiErrorMessage(error));
    } finally {
      setIsGoogleLogging(false);
    }
  };

  async function onSubmit(data: FormValues) {
    const email = data.email.trim();
    const password = data.password.trim();

    setIsEmailLogging(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userId !== userCredential.user.uid)
        await setNewLoggedUserData(userCredential.user);
      await loadBreeds();
      setProvider("EmailPassword");
      setIsSignedIn(true);

      router.replace("/(main)");
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        showErrorToast(getFirebaseApiErrorMessage(error));
      } else {
        showErrorToast(getApiErrorMessage(error));
        logout();
      }
    } finally {
      setIsEmailLogging(false);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUserCatApiKey("");
      setUserDogApiKey("");
      setIsSignedIn(false);
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <LinearGradient
      colors={[
        styles.gradientColor1.color,
        styles.gradientColor2.color,
        styles.gradientColor3.color,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={[styles.container, { paddingBottom: insets.bottom }]}
      >
        <Text style={styles.textHeader}>Sign In</Text>
        <ScrollView style={styles.formContainer}>
          <FormProvider {...methods}>
            <View style={styles.emailInputContainer}>
              <EmailInput name="email" />
            </View>
            <View style={styles.passwordInputContainer}>
              <PasswordInput name="password" checkFormat={false} />
            </View>
          </FormProvider>
          <TouchableOpacity
            onPress={() => router.push("/restorePassword")}
            disabled={isEmailLogging || isGoogleLogging}
          >
            <Text style={styles.restorePasswordLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsOnBoarding(true);
              router.replace("/onboarding0");
            }}
            disabled={isEmailLogging || isGoogleLogging}
          >
            <Text style={styles.backToIntroLink}>Back to intro</Text>
          </TouchableOpacity>
          <Button
            mode={"contained"}
            loading={isEmailLogging}
            style={
              methods.formState.isValid && !isGoogleLogging
                ? styles.signInButton
                : styles.disabledSignInButton
            }
            labelStyle={styles.singInLabelButton}
            disabled={
              !methods.formState.isValid || isEmailLogging || isGoogleLogging
            }
            onPress={methods.handleSubmit(onSubmit)}
          >
            Sing In
          </Button>
          <View style={styles.gap} />
          <Button
            mode={"contained"}
            style={
              !isEmailLogging
                ? styles.signInButton
                : styles.disabledSignInButton
            }
            labelStyle={styles.singInLabelButton}
            icon={() => (
              <View style={styles.googleButtonIcon}>
                {isGoogleLogging && (
                  <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                      color={styles.singInLabelButton.color}
                      size={18}
                    />
                  </View>
                )}
                <GoogleIcon size={30} />
              </View>
            )}
            disabled={isEmailLogging}
            onPress={loginWithGoogle}
          >
            Continue with Google
          </Button>
          <View style={styles.gap} />
          <Button
            mode={"outlined"}
            style={
              !isEmailLogging && !isGoogleLogging
                ? styles.signUpButton
                : styles.disabledSignUpButton
            }
            labelStyle={
              !isEmailLogging && !isGoogleLogging
                ? styles.singUpLabelButton
                : styles.disabledSingUpLabelButton
            }
            onPress={() => router.navigate("/signUp")}
            disabled={isEmailLogging || isGoogleLogging}
          >
            Sing Up
          </Button>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    textHeader: {
      paddingTop: 88,
      paddingBottom: 20,
      fontSize: fontSizes.FONT50,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      fontWeight: 500,
    },
    formContainer: {
      flex: 1,
      width: "100%",
    },
    restorePasswordLink: {
      fontSize: fontSizes.FONT14,
      fontFamily: "ShantellRegular",
      color: theme.colors.accent,
      alignSelf: "flex-end",
      marginTop: -24,
    },
    backToIntroLink: {
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellBold",
      color: theme.colors.accent,
      alignSelf: "center",
      marginBottom: 24,
    },
    buttonContainer: {
      width: "100%",
      paddingBottom: 15,
    },
    text: {
      color: theme.colors.mainText,
    },
    emailInputContainer: {
      height: 74,
    },
    passwordInputContainer: {
      height: 74,
    },
    signInButton: {
      backgroundColor: theme.colors.accent,
    },
    disabledSignInButton: {
      backgroundColor: theme.colors.disabled,
    },
    singUpButton: {
      backgroundColor: theme.colors.main,
      borderColor: theme.colors.accent,
    },
    disabledSignUpButton: {
      borderColor: theme.colors.disabled,
    },
    singInLabelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    googleButtonIcon: {
      flexDirection: "row",
      alignItems: "center",
    },
    singUpLabelButton: {
      color: theme.colors.accent,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    disabledSingUpLabelButton: {
      color: theme.colors.secondaryText,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    activityIndicatorContainer: {
      marginRight: 8,
    },
    gap: {
      height: 10,
    },
    gradientColor1: {
      color: theme.colors.authBGColor1,
    },
    gradientColor2: {
      color: theme.colors.authBGColor2,
    },
    gradientColor3: {
      color: theme.colors.authBGColor3,
    },
  });

export default Login;
