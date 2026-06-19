import { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import useStore from "../../store/store";
import { Button } from "react-native-paper";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";
import SimpleTextInput from "../TextInputs/SimpleTextInput";
import updateUserName from "../../API/FirebaseAPI/updateUserName";

type ChangeNameBSType = {
  hideBottomSheet: () => void;
  userName: string;
};

type FormValues = {
  name: string;
};

const ChangeNameBS: FC<ChangeNameBSType> = ({ hideBottomSheet, userName }) => {
  const styles = useThemedStyles(createStyles);
  const { setUserName, showSuccessToast, showErrorToast } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const { ...methods } = useForm<FormValues>({
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const name = data.name.trim();

    try {
      setIsLoading(true);
      const newName = await updateUserName(name);
      if (newName) {
        setUserName(newName);
        setTimeout(
          () => showSuccessToast("Your name has been changed successfully"),
          1000,
        );
      }
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      showErrorToast("Error updating user name: " + errorMessage);
    } finally {
      setIsLoading(false);
      hideBottomSheet();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <BottomSheetTopBar title={"Change Name"} />
      <FormProvider {...methods}>
        <View style={styles.inputContainer}>
          <SimpleTextInput
            name="name"
            placeholder="Your name"
            defaultValue={userName}
            compareWithDefaultValue={true}
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
            {isLoading ? null : "Save"}
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

export default ChangeNameBS;
