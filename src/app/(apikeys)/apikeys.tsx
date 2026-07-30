import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableScale } from "pressto";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import { CATS_BASE_URL, DOGS_BASE_URL } from "../../constants/urls";

const ApiKeys = () => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [catApiKey, setCatApiKey] = useState("");
  const [dogApiKey, setDogApiKey] = useState("");

  const handleLink = async (link: string) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Error", `Failed to load ${link} page`);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
        . Get your personal API keys and paste them into the fields below - it will
        only take a couple of minutes!
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
          style={styles.button}
          labelStyle={styles.labelButton}
          onPress={() => {}}
        >
          Paste Cat API Key
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
          style={styles.button}
          labelStyle={styles.labelButton}
          onPress={() => {}}
        >
          Paste Dog API Key
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
      alignItems: "center",
      paddingHorizontal: 16,
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
    },
    text: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellRegular",
      color: theme.colors.mainText,
      textAlign: "justify",
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
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellLightItalic",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.mainText,
    },
    placeholderColor: {
      color: theme.colors.placeholder,
    },
    pasteApiButtonContainer: {
      marginTop: 5,
      width: "100%",
      marginBottom: 10,
    },
    button: {
      backgroundColor: theme.colors.accent,
      height: 50,
      justifyContent: "center",
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
  });

export default ApiKeys;
