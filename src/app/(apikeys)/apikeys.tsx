import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { PressableScale } from "pressto";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import { CATS_BASE_URL, DOGS_BASE_URL } from "../../constants/urls";
import checkApiKeyAPI from "../../API/checkApiKey";
import { getApiErrorMessage } from "../../functions/errorApiMessages";

const ApiKeys = () => {
  const styles = useThemedStyles(createStyles);
  const {
    userId,
    userCatApiKey,
    userDogApiKey,
    setUserCatApiKey,
    setUserDogApiKey,
    showErrorToast,
  } = useStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [catApiKey, setCatApiKey] = useState(userCatApiKey);
  const [dogApiKey, setDogApiKey] = useState(userDogApiKey);
  const [isChekingCatApiKey, setIsChekingCatApiKey] = useState(false);
  const [isChekingDogApiKey, setIsChekingDogApiKey] = useState(false);

  const handleLink = async (link: string) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Error", `Failed to load ${link} page`);
    }
  };

  const isKeyValid = (value: string): boolean => {
    return /^live_[A-Za-z0-9]{64}$/.test(value);
  };

  const checkAndPasteApiKey = async (petsType: "cats" | "dogs") => {
    if (petsType === "cats") setIsChekingCatApiKey(true);
    else setIsChekingDogApiKey(true);

    const clipboardText = await Clipboard.getStringAsync();
    const pastedApiKey = clipboardText.trim();

    if (!isKeyValid(pastedApiKey)) {
      showErrorToast("The API key you are trying to paste is invalid.");
      setIsChekingCatApiKey(false);
      setIsChekingDogApiKey(false);
      return;
    }

    try {
      await checkApiKeyAPI(petsType, pastedApiKey, userId);

      if (petsType === "cats") setCatApiKey(pastedApiKey);
      else setDogApiKey(pastedApiKey);
    } catch (error: any) {
      showErrorToast(
        getApiErrorMessage(
          error,
          "The API key you are trying to paste is invalid.",
        ),
      );
    } finally {
      setIsChekingCatApiKey(false);
      setIsChekingDogApiKey(false);
    }
  };

  const removeCatApiKey = () => setCatApiKey("");
  const removeDogApiKey = () => setDogApiKey("");

  const saveChanges = () => {
    setUserCatApiKey(catApiKey);
    setUserDogApiKey(dogApiKey);
    router.back();
  };

  const isKeysChanged =
    userCatApiKey !== catApiKey || userDogApiKey !== dogApiKey;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={styles.content}>
          <Text style={styles.textHeader}>Api Keys</Text>
          <Text style={styles.text}>
            To enjoy cats and dogs images independently of other users, just
            register on the websites{" "}
            <Text style={styles.link} onPress={() => handleLink(CATS_BASE_URL)}>
              thecatapi.com
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={() => handleLink(DOGS_BASE_URL)}>
              thedogapi.com
            </Text>
            . Get your personal API keys and paste them into the fields below -
            it will only take a couple of minutes!
          </Text>
          <TextInput
            style={styles.input}
            placeholder={"Paste your Cat API key here"}
            placeholderTextColor={styles.placeholderColor.color}
            value={catApiKey}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            multiline={true}
          />
          <View style={styles.pasteApiButtonContainer}>
            <Button
              mode={"contained"}
              style={styles.pasteButton}
              labelStyle={styles.pasteLabelButton}
              onPress={() => checkAndPasteApiKey("cats")}
              loading={isChekingCatApiKey}
            >
              Paste
            </Button>
            <Button
              mode={"contained"}
              style={styles.pasteButton}
              labelStyle={styles.pasteLabelButton}
              onPress={removeCatApiKey}
            >
              Remove
            </Button>
          </View>
          <TextInput
            style={styles.input}
            placeholder={"Paste your Dog API key here"}
            placeholderTextColor={styles.placeholderColor.color}
            value={dogApiKey}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            multiline={true}
          />
          <View style={styles.pasteApiButtonContainer}>
            <Button
              mode={"contained"}
              style={styles.pasteButton}
              labelStyle={styles.pasteLabelButton}
              onPress={() => checkAndPasteApiKey("dogs")}
              loading={isChekingDogApiKey}
            >
              Paste
            </Button>
            <Button
              mode={"contained"}
              style={styles.pasteButton}
              labelStyle={styles.pasteLabelButton}
              onPress={removeDogApiKey}
            >
              Remove
            </Button>
          </View>
          <View style={styles.footer} />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          mode={"contained"}
          style={
            isKeysChanged
              ? styles.saveCancelButton
              : styles.disabledSaveCancelButton
          }
          labelStyle={styles.labelButton}
          disabled={!isKeysChanged}
          onPress={saveChanges}
        >
          Save
        </Button>
        <View style={styles.gap} />
        <Button
          mode={"contained"}
          style={styles.saveCancelButton}
          labelStyle={styles.labelButton}
          onPress={() => router.back()}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
      paddingHorizontal: 16,
    },
    content: {
      flex: 1,
      marginTop: 10,
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
    backIconColor: {
      color: theme.colors.black,
    },
    textHeader: {
      fontSize: fontSizes.FONT40,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      marginTop: Platform.OS === "ios" ? 75 : 60,
      textAlign: "center",
    },
    text: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellRegular",
      color: theme.colors.mainText,
      textAlign: Platform.OS === "android" ? "left" : "justify",
    },
    link: {
      color: "blue",
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellRegular",
      textDecorationLine: "underline",
    },
    input: {
      marginTop: 10,
      width: "100%",
      height: 100,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 0,
      includeFontPadding: false,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellLightItalic",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.mainText,
    },
    placeholderColor: {
      color: theme.colors.placeholder,
    },
    pasteApiButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
      width: "100%",
      marginBottom: 10,
    },
    pasteButton: {
      backgroundColor: "transparent",
      height: 50,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.mainText,
      width: "49%",
    },
    pasteLabelButton: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    buttonsContainer: {
      width: "100%",
      position: "absolute",
      bottom: Platform.OS === "ios" ? 30 : 50,
      alignSelf: "center",
    },
    saveCancelButton: {
      backgroundColor: theme.colors.accent,
      height: 50,
      justifyContent: "center",
    },
    disabledSaveCancelButton: {
      backgroundColor: theme.colors.disabled,
      height: 50,
      justifyContent: "center",
    },
    gap: {
      height: 10,
    },
    footer: {
      height: 190,
    },
  });

export default ApiKeys;
