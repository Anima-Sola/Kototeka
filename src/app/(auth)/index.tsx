import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import EmailInput from "../../components/TextInputs/EmailInput";
import PasswordInput from "../../components/TextInputs/PasswordInput";
import Colors from "../../constants/colors";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const insets = useSafeAreaInsets();
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text style={styles.textHeader}>Вход</Text>
      <View style={styles.formContainer}>
        <FormProvider {...methods}>
          <View style={styles.emailInputContainer}>
            <EmailInput name="email" />
          </View>
          <View style={styles.passwordInputContainer}>
            <PasswordInput name="password" />
          </View>
        </FormProvider>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={methods.formState.isValid ? styles.button : styles.disabledButton}
          labelStyle={styles.labelButton}
          disabled={!methods.formState.isValid}
          onPress={methods.handleSubmit(onSubmit)}
        >
          Вход
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
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: 50,
    color: Colors.mainText,
    fontFamily: 'AmaticBold',
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
  button: {
    backgroundColor: Colors.accent,
    padding: 5,
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
    padding: 5,
  },
  labelButton: {
    color: Colors.secondary,
    fontSize: 18,
    fontFamily: 'ShantellBold',
  },
});

export default Login;
