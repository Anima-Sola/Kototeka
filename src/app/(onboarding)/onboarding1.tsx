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

const Onboarding1 = () => {
  const styles = useThemedStyles(createStyles);
  const { setIsOnBoarding } = useStore();
  const router = useRouter();

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
      // свайп вправо
      if (gestureState.dx > 80) {
        router.back();
      }

      // свайп влево
      if (gestureState.dx < -80) {
        router.push("/onboarding2");
      }
    },
  });

  return (
    <ImageBackground
      source={require("./../../../assets/Images/onBoarding/2.jpg")}
      style={styles.image}
      imageStyle={styles.container}
      {...panResponder.panHandlers}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        <PressableScale style={styles.skipButtonContainer} onPress={skip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </PressableScale>
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
          <Text style={styles.headerText}>Discover</Text>
          <Text style={styles.messageText}>
            Explore adorable cats and dogs from our collection.
          </Text>
          <View style={styles.navigationContainer}>
            <View style={styles.dots}>{dots(1)}</View>
            <PressableScale
              style={styles.nextButton}
              onPress={() =>
                router.push({
                  pathname: "/onboarding2",
                })
              }
            >
              <MaterialIcons
                name="chevron-right"
                size={30}
                color={styles.nextIconColor.color}
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
      textAlign: "center",
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
    nextIconColor: {
      color: theme.colors.white,
    },
    backIconColor: {
      color: theme.colors.black,
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
    backButtonContainer: {
      position: "absolute",
      top: 40,
      left: 30,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.whiteTransluscent,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Onboarding1;
