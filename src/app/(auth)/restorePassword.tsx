import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import EmailInput from "../../components/TextInputs/EmailInput";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import Header from "../../components/Header/Header";
import LeftArrow from "../../../assets/Icons/LeftArrow";

type FormValues = {
  email: string;
};

const SignUp = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const email = data.email.trim();
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Письмо отправлено", "Проверьте почту для восстановления пароля.");
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
      <Text style={styles.textHeader}>Введите почту</Text>
      <Text style={styles.hint}>
        На указанную почту мы отправим код для восстановления пароля
      </Text>
      <ScrollView style={styles.formContainer}>
        <FormProvider {...methods}>
          <View style={styles.inputContainer}>
            <EmailInput name="email" />
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
          Продолжить
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
    fontSize: fontSizes.FONT50,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    fontWeight: 500,
    marginBottom: 10,
  },
  hint: {
    fontSize: fontSizes.FONT14,
    fontFamily: "ShantellBold",
    color: Colors.mainText,
    paddingBottom: 30,
    paddingHorizontal: 16,
    textAlign: "center",
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
