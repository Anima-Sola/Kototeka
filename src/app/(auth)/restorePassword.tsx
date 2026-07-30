import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { sendPasswordResetEmail } from "firebase/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PressableScale } from "pressto";
import { auth } from "../../../firebaseConfig";
import EmailInput from "../../components/TextInputs/EmailInput";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import useStore from "../../store/store";

type FormValues = {
  email: string;
};

const RestorePassword = () => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { showErrorToast } = useStore();
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const email = data.email.trim();
    setIsEmailSending(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "The letter has been sent",
        "Check your email to reset your password.",
      );
    } catch (error: any) {
      showErrorToast("Error sending a message");
    } finally {
      setIsEmailSending(false);
    }
  }

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
        <Text style={styles.textHeader}>Enter email</Text>
        <Text style={styles.hint}>
          We will send a password reset code to the email address you provided
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
              methods.formState.isValid
                ? styles.signUpButton
                : styles.disabledSignUpButton
            }
            loading={isEmailSending}
            labelStyle={styles.singUpLabelButton}
            disabled={!methods.formState.isValid || isEmailSending}
            onPress={methods.handleSubmit(onSubmit)}
          >
            Next
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
      fontSize: fontSizes.FONT50,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      fontWeight: 500,
      marginBottom: 10,
    },
    hint: {
      fontSize: fontSizes.FONT14,
      fontFamily: "ShantellBold",
      color: theme.colors.mainText,
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

export default RestorePassword;
