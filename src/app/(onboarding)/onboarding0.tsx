import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  PanResponder,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PressableScale } from "pressto";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import { usePushNotifications } from "../../functions/notifications";

const Onboarding0 = () => {
  const styles = useThemedStyles(createStyles);
  const { expoPushToken, notification } = usePushNotifications();
  const { setIsOnBoarding } = useStore();
  const router = useRouter();

  console.log(expoPushToken, notification);

  const dots = (currentPage: number) => {
    const pages = [0, 1, 2, 3, 4];

    return pages.map((page) => {
      if (page === currentPage)
        return <View key={page} style={styles.activeDot} />;

      return <View key={page} style={styles.dot} />;
    });
  };

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
      // свайп влево
      if (gestureState.dx < -80) {
        router.push("/onboarding1");
      }
    },
  });

  return (
    <ImageBackground
      source={require("./../../../assets/Images/onBoarding/1.jpg")}
      style={styles.image}
      imageStyle={styles.container}
      {...panResponder.panHandlers}
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
      height: "25%",
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
      bottom: 40,
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    dots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    dot: {
      width: 20,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.disabled,
      marginHorizontal: 4,
    },
    activeDot: {
      width: 22,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.accent3,
      marginHorizontal: 4,
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
      top: 40,
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
