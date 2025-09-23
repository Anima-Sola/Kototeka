import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import EmailInput from "../../components/TextInputs/EmailInput";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import SimpleTextInput from "../../components/TextInputs/SimpleTextInput";
import RepeatPasswordInput from "../../components/TextInputs/RepeatPasswordInput";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import Header from "../../components/Header/Header";
import LeftArrow from "../../../assets/Icons/LeftArrow";

type FormValues = {
  name: string;
  email: string;
  password: string;
  retryPassword: string;
};

const SignUp = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const name = data.name.trim();
    const email = data.email.trim();
    const password = data.password.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      console.log("Пользователь создан:", userCredential.user);
    } catch (error: any) {
      console.error("Ошибка регистрации:", error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header
        leftIcon={<LeftArrow size={24} color={Colors.accent} />}
        onLeftIconPress={() => router.back()}
      />
      <Text style={styles.textHeader}>Регистрация</Text>
      <ScrollView style={styles.formContainer}>
        <FormProvider {...methods}>
          <View style={styles.inputContainer}>
            <SimpleTextInput name="name" placeholder="Введите ваше имя" />
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
            methods.formState.isValid ? styles.signUpButton : styles.disabledSignUpButton
          }
          labelStyle={styles.singUpLabelButton}
          disabled={!methods.formState.isValid}
          onPress={methods.handleSubmit(onSubmit)}
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
    
  },
  textHeader: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: fontSizes.FONT50,
    color: Colors.mainText,
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
    color: Colors.mainText,
  },
  inputContainer: {
    height: 74,
  },
  signUpButton: {
    backgroundColor: Colors.accent,
  },
  disabledSignUpButton: {
    backgroundColor: Colors.disabled,
  },
  singUpLabelButton: {
    color: Colors.secondary,
    fontSize: fontSizes.FONT18,
    fontFamily: "ShantellBold",
    lineHeight: 30,
  },
});

export default SignUp;
