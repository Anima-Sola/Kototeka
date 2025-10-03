import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Button } from "react-native-paper";
import EmailInput from "../../components/TextInputs/EmailInput";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  textHeader: {
    paddingTop: 78,
    paddingBottom: 20,
    fontSize: fontSizes.FONT50,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    fontWeight: 500,
  },
  formContainer: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 15,
  },
  text: {
    color: Colors.mainText,
  },
  emailInputContainer: {
    height: 74,
  },
  passwordInputContainer: {
    height: 74,
  },
  signInButton: {
    backgroundColor: Colors.accent,
  },
  disabledSignInButton: {
    backgroundColor: Colors.disabled,
  },
  singUpButton: {
    backgroundColor: Colors.main,
    borderColor: Colors.accent,
  },
  singInLabelButton: {
    color: Colors.secondary,
    fontSize: fontSizes.FONT18,
    fontFamily: "ShantellBold",
    lineHeight: 30,
  },
  singUpLabelButton: {
    color: Colors.accent,
    fontSize: fontSizes.FONT18,
    fontFamily: "ShantellBold",
    lineHeight: 30,
  },
  gap: {
    height: 10,
  },
});

export default Login;
