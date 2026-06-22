import { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";
import PasswordInput from "../TextInputs/PasswordInput";
import deleteUserAccount from "../../API/FirebaseAPI/deleteAccount";

type DeleteAccountBSType = {
  hideBottomSheet: () => void;
};

type FormValues = {
  currentPassword: string;
};

const DeleteAccountBS: FC<DeleteAccountBSType> = ({ hideBottomSheet }) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { setIsSignedIn, showSuccessToast, showErrorToast } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      await deleteUserAccount(data.currentPassword);
      setIsSignedIn(false);
      router.replace("/(auth)/login");
      setTimeout(() => showSuccessToast("Your account has been deleted"), 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      showErrorToast("Error deleting account: " + errorMessage);
    } finally {
      setIsLoading(false);
      hideBottomSheet();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <BottomSheetTopBar title={"Delete Account"} />
      <FormProvider {...methods}>
        <View style={styles.inputContainer}>
          <PasswordInput
            name="currentPassword"
            placeholder="Current password"
            checkFormat={false}
          />
        </View>
        <View
          style={{
            ...styles.buttonsContainer,
            paddingBottom: Platform.OS === "ios" ? 0 : 30,
          }}
        >
          <Button
            mode={"contained"}
            loading={isLoading}
            style={
              methods.formState.isValid
                ? styles.enabledButton
                : styles.disabledButton
            }
            labelStyle={styles.labelButton}
            disabled={!methods.formState.isValid || isLoading}
            onPress={methods.handleSubmit(onSubmit)}
          >
            Delete
          </Button>
          <View style={styles.gap} />
          <Button
            mode={"contained"}
            style={styles.enabledButton}
            labelStyle={styles.labelButton}
            onPress={hideBottomSheet}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </View>
      </FormProvider>
    </ScrollView>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors.main,
    },
    text: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
    },
    inputContainer: {
      height: 74,
      marginTop: 10,
      paddingHorizontal: 16,
    },
    buttonsContainer: {
      paddingHorizontal: 16,
      marginBottom: 30,
    },
    enabledButton: {
      backgroundColor: theme.colors.accent,
      height: 50,
      justifyContent: "center",
    },
    disabledButton: {
      backgroundColor: theme.colors.disabled,
      height: 50,
      justifyContent: "center",
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    gap: {
      height: 10,
    },
    activityIndicator: {
      color: theme.colors.accent,
    },
  });

export default DeleteAccountBS;
