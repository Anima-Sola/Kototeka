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
          buttonColor={Colors.primary}
          textColor={Colors.onPrimary}
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
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  textHeader: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: 30,
    color: Colors.onBackground,
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
    color: Colors.onBackground,
  },
  emailInputContainer: {
    height: 74,
  },
  passwordInputContainer: {
    height: 74,
  }
});

export default Login;
