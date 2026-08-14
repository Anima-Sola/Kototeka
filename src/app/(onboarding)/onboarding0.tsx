import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  PanResponder,
  Platform,
  Dimensions,
  PixelRatio,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PressableScale } from "pressto";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import { dots } from "../../functions/common";

const screenHeight = Dimensions.get("screen").height;
const screenHeightPx = PixelRatio.getPixelSizeForLayoutSize(screenHeight);

const Onboarding0 = () => {
  const styles = useThemedStyles(createStyles);
  const { setIsOnBoarding } = useStore();
  const router = useRouter();

  const skip = () => {
    setIsOnBoarding(false);
    router.replace({
      pathname: "/login",
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return (
        Math.abs(gestureState.dx) > 20 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
      );
    },

    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -80) {
        router.push("/onboarding1");
      }
    },
  });

  return (
    <ImageBackground
      source={require("./../../../assets/Images/onBoarding/0.png")}
      style={styles.image}
      imageStyle={styles.container}
      {...panResponder.panHandlers}
      resizeMode="cover"
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        <PressableScale style={styles.skipButtonContainer} onPress={skip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </PressableScale>
        <View style={styles.card}>
          <Text style={styles.headerText}>Welcome!</Text>
          <Text style={styles.messageText}>To the cats and dogs gallery.</Text>
          <Text />
          <View style={styles.navigationContainer}>
            <View style={styles.dots}>{dots(0)}</View>
            <PressableScale
              style={styles.nextButton}
              onPress={() =>
                router.push({
                  pathname: "/onboarding1",
                })
              }
            >
              <MaterialIcons
                name="chevron-right"
                size={30}
                color={styles.iconColor.color}
              />
            </PressableScale>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageStyle: {
      resizeMode: "cover",
    },
    card: {
      alignItems: "center",
      paddingHorizontal: 16,
      position: "absolute",
      backgroundColor: theme.colors.main,
      height: screenHeightPx < 1500 ? "35%" : "27%",
      width: "100%",
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 20,
    },
    headerText: {
      fontSize: fontSizes.FONT30,
      fontFamily: "ShantellBold",
      color: theme.colors.mainText,
    },
    messageText: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellRegular",
      color: theme.colors.secondaryText,
    },
    navigationContainer: {
      position: "absolute",
      width: "100%",
      flexDirection: "row",
      bottom: 55,
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    dots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    nextButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.accent3,
    },
    nextArrow: {
      color: theme.colors.white,
      fontWeight: 400,
      fontSize: fontSizes.FONT25,
    },
    iconColor: {
      color: theme.colors.white,
    },
    skipButtonContainer: {
      position: "absolute",
      top: Platform.OS === "ios" ? 55 : 40,
      right: 30,
    },
    skipButtonText: {
      fontSize: fontSizes.FONT25,
      fontFamily: "ShantellRegular",
      color: theme.colors.white,
      textDecorationLine: "underline",
    },
  });

export default Onboarding0;
