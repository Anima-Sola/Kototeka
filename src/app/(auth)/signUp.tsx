import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStore from "../../store/store";
import { PressableScale } from "pressto";
import { Button } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import EmailInput from "../../components/TextInputs/EmailInput";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import SimpleTextInput from "../../components/TextInputs/SimpleTextInput";
import RepeatPasswordInput from "../../components/TextInputs/RepeatPasswordInput";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  const styles = useThemedStyles(createStyles);
  const { setIsSignedIn, showErrorToast, setUserId, setUserName } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isRegistering, setIsRegistering] = useState(false);
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const name = data.name.trim();
    const email = data.email.trim();
    const password = data.password.trim();

    setIsRegistering(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      if (userCredential.user.displayName)
        setUserName(userCredential.user.displayName);
      setUserId(userCredential.user.uid);
      setIsSignedIn(true);

      router.replace("/(main)");
    } catch (error: any) {
      const message = JSON.stringify(error).indexOf(
        "auth/email-already-in-use",
      );
      if (message !== -1)
        showErrorToast("A user with this email address is already registered");
      else showErrorToast("Error during registration");
    } finally {
      setIsRegistering(false);
    }
  }

  const repeatPasswordValue = methods.watch("password");

  useEffect(() => {
    if (repeatPasswordValue !== undefined) {
      methods.trigger("repeatPassword");
    }
  }, [repeatPasswordValue, methods]);

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
        <PressableScale
          style={styles.backButtonContainer}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={styles.backIconColor.color}
          />
        </PressableScale>
        <Text style={styles.textHeader}>Sign Up</Text>
        <ScrollView style={styles.formContainer}>
          <FormProvider {...methods}>
            <View style={styles.inputContainer}>
              <SimpleTextInput name="name" placeholder="Your name" />
            </View>
            <View style={styles.inputContainer}>
              <EmailInput name="email" />
            </View>
            <View style={styles.inputContainer}>
              <PasswordInput name="password" />
            </View>
            <View style={styles.inputContainer}>
              <RepeatPasswordInput
                name="repeatPassword"
                passwordToCheck={methods.watch("password")}
              />
            </View>
          </FormProvider>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode={"contained"}
            style={
              methods.formState.isValid
                ? styles.signUpButton
                : styles.disabledSignUpButton
            }
            labelStyle={styles.singUpLabelButton}
            disabled={!methods.formState.isValid || isRegistering}
            loading={isRegistering}
            onPress={methods.handleSubmit(onSubmit)}
          >
            Sign Up
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
    },
    textHeader: {
      paddingTop: 90,
      paddingBottom: 20,
      fontSize: fontSizes.FONT50,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      fontWeight: 500,
    },
    formContainer: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 16,
    },
    buttonContainer: {
      width: "100%",
      paddingBottom: 15,
      paddingHorizontal: 16,
    },
    text: {
      color: theme.colors.mainText,
    },
    inputContainer: {
      height: 74,
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
    iconColor: {
      color: theme.colors.accent,
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
    backIconColor: {
      color: theme.colors.black,
    },
    backButtonContainer: {
      position: "absolute",
      top: Platform.OS === "ios" ? 55 : 40,
      left: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.whiteTransluscent,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default SignUp;
