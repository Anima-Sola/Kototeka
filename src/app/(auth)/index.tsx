import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FormProvider,
} from "react-hook-form";
import Colors from "../../constants/colors";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {};

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    return console.log({ errors });
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.onBackground,
  },
});

export default Login;
