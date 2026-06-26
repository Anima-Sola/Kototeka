import { View, StyleSheet, Image, StatusBar, Platform } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

const OnboardingSwiper = () => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  const finishOnBoarding = () => {
    router.replace("/login");
  };

  return (
    <Onboarding
      onDone={finishOnBoarding}
      onSkip={finishOnBoarding}
      titleStyles={styles.title}
      subTitleStyles={styles.subTitle}
      controlStatusBar={true}
      containerStyles={styles.pageContainer}
      bottomBarHeight={Platform.OS==='ios' ? 60 : 100}
      pages={[
        {
          backgroundColor: styles.firstPage.backgroundColor,
          image: (
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/1.png")}
            />
          ),
          title: "Welcome!",
          subtitle: "To the cats and dogs gallery",
        },
        {
          backgroundColor: "#fe6e58",
          image: (
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/2.png")}
            />
          ),
          title: "Cats",
          subtitle: "Thousands of cute kittens are waiting for you to pet them",
        },
        {
          backgroundColor: "#999",
          image: (
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/3.png")}
            />
          ),
          title: "Dogs",
          subtitle:
            "Hundreds of adorable dogs are waiting for you to give them a bone",
        },
      ]}
    />
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      justifyContent: "center",
      marginTop: -100,
    },
    title: {
      fontSize: fontSizes.FONT50,
      color: theme.colors.white,
      fontFamily: "AmaticBold",
    },
    subTitle: {
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellBold",
      color: theme.colors.white,
    },
    image: {
      width: 300,
      height: 300,
    },
    firstPage: {
      backgroundColor: theme.colors.placeholder,
    },
  });

export default OnboardingSwiper;
