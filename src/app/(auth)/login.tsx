import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text, ScrollView } from "react-native";
import { useRouter, Link } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Button } from "react-native-paper";
import EmailInput from "../../components/TextInputs/EmailInput";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const email = data.email.trim();
    const password = data.password.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Успешный вход:", userCredential.user);
    } catch (error: any) {
      console.error("Ошибка входа:", error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text style={styles.textHeader}>Вход</Text>
      <ScrollView style={styles.formContainer}>
        <FormProvider {...methods}>
          <View style={styles.emailInputContainer}>
            <EmailInput name="email" />
          </View>
          <View style={styles.passwordInputContainer}>
            <PasswordInput name="password" checkFormat={false} />
          </View>
        </FormProvider>
        <Link style={styles.restorePasswordLink} href="/restorePassword">
          Забыли пароль?
        </Link>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={
            methods.formState.isValid ? styles.signInButton : styles.disabledSignInButton
          }
          labelStyle={styles.singInLabelButton}
          disabled={!methods.formState.isValid}
          onPress={methods.handleSubmit(onSubmit)}
        >
          Вход
        </Button>
        <View style={styles.gap} />
        <Button
          mode={"outlined"}
          style={styles.singUpButton}
          labelStyle={styles.singUpLabelButton}
          onPress={() => router.navigate("/signUp")}
        >
          Регистрация
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    textHeader: {
      paddingTop: 78,
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
      fontFamily: "ShantellBold",
      color: theme.colors.accent,
      alignSelf: "flex-end",
      marginTop: -24,
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
    singInLabelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    singUpLabelButton: {
      color: theme.colors.accent,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    gap: {
      height: 10,
    },
  });

export default Login;
