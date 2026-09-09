import { FC, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import useStore from "../../store/store";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";
import deleteUserAccount from "../../API/FirebaseAPI/deleteAccount";
import { getFirebaseApiErrorMessage } from "../../functions/errorApiMessages";

type DeleteAccountBSType = {
  hideBottomSheet: () => void;
};

const DeleteGoogleAccountBS: FC<DeleteAccountBSType> = ({
  hideBottomSheet,
}) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const {
    setIsSignedIn,
    showSuccessToast,
    showErrorToast,
    setUserCatApiKey,
    setUserDogApiKey,
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  async function deleteAccount() {
    setIsLoading(true);

    try {
      await deleteUserAccount();
      setIsSignedIn(false);
      setUserCatApiKey("");
      setUserDogApiKey("");
      router.replace("/(auth)/login");
      setTimeout(() => showSuccessToast("Your account has been deleted"), 1000);
    } catch (error: any) {
      showErrorToast(getFirebaseApiErrorMessage(error));
    } finally {
      setIsLoading(false);
      hideBottomSheet();
    }
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <BottomSheetTopBar title={"Delete Account"} />
      <View style={styles.gap} />
      <Text style={styles.text}>
        This is a deletion of a Paws&Love app account, not a Google account.
      </Text>
      <View style={styles.gap} />
      <View
        style={{
          ...styles.buttonsContainer,
          paddingBottom: Platform.OS === "ios" ? 0 : 30,
        }}
      >
        <Button
          mode={"contained"}
          loading={isLoading}
          style={styles.enabledButton}
          labelStyle={styles.labelButton}
          disabled={isLoading}
          onPress={deleteAccount}
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
      paddingHorizontal: 16,
      textAlign: "center",
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

export default DeleteGoogleAccountBS;
