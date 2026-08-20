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

const Onboarding6 = () => {
  const styles = useThemedStyles(createStyles);
  const { setIsOnBoarding } = useStore();
  const router = useRouter();

  const toLogin = () => {
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
      if (gestureState.dx > 80) {
        router.back();
      }
    },
  });

  return (
    <ImageBackground
      source={require("./../../../assets/Images/onBoarding/6.png")}
      style={styles.image}
      imageStyle={styles.container}
      {...panResponder.panHandlers}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
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
        <View style={styles.card}>
          <Text style={styles.headerText}>Enjoy together</Text>
          <Text style={styles.messageText}>
            Join our community and share the love.
          </Text>
          <View style={styles.navigationContainer}>
            <View style={styles.dots}>{dots(6)}</View>
            <PressableScale style={styles.nextButton} onPress={toLogin}>
              <Text style={styles.nextText}>Go</Text>
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
      textAlign: "center",
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
      width: 100,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.accent3,
    },
    nextText: {
      color: theme.colors.white,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellBold",
    },
    backIconColor: {
      color: theme.colors.black,
    },
    backButtonContainer: {
      position: "absolute",
      top: Platform.OS === 'ios' ? 55 : 40,
      left: 30,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.whiteTransluscent,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Onboarding6;
