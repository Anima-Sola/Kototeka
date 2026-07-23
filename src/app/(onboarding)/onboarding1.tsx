import { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import { usePushNotifications } from "../../functions/notifications";

const OnboardingSwiper = () => {
  const styles = useThemedStyles(createStyles);
  const { expoPushToken, notification } = usePushNotifications();
  const { setIsOnBoarding } = useStore();
  const router = useRouter();
  const onboardingRef = useRef<Onboarding>(null);

  console.log(expoPushToken, notification);

  const finishOnBoarding = () => {
    setIsOnBoarding(false);
    router.replace("/login");
  };

  const skipButton = () => {
    return (
      <TouchableOpacity onPress={finishOnBoarding}>
        <Text style={styles.skipButton}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const nextButton = () => {
    return (
      <TouchableOpacity onPress={() => onboardingRef?.current?.goNext()}>
        <Text style={styles.nextButton}>Next</Text>
      </TouchableOpacity>
    );
  };

  const doneButton = () => {
    return (
      <TouchableOpacity onPress={finishOnBoarding}>
        <Text style={styles.doneButton}>Done</Text>
      </TouchableOpacity>
    );
  };

  const dots = ({ selected }: { selected: boolean }) => {
    return (
      <View
        style={{
          ...styles.dots,
          width: selected ? 10 : 6,
          height: selected ? 10 : 6,
          backgroundColor: selected
            ? styles.selectedDot.backgroundColor
            : styles.unselectedDot.backgroundColor,
        }}
      />
    );
  };

  return (
    <Onboarding
      ref={onboardingRef}
      onDone={finishOnBoarding}
      onSkip={finishOnBoarding}
      SkipButtonComponent={skipButton}
      NextButtonComponent={nextButton}
      DoneButtonComponent={doneButton}
      DotComponent={dots}
      titleStyles={styles.title}
      subTitleStyles={styles.subTitle}
      controlStatusBar={true}
      containerStyles={styles.pageContainer}
      bottomBarHeight={Platform.OS === "ios" ? 60 : 100}
      pages={[
        {
          backgroundColor: styles.firstPage.backgroundColor,
          image: (
            <ImageBackground
              source={require("./../../../assets/Images/onBoarding/1.jpg")}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subTitle}>
                  To the cats and dogs gallery.
                </Text>
              </View>
            </ImageBackground>
          ),
          title: "",
          subtitle: "",
        },
        {
          backgroundColor: styles.secondPage.backgroundColor,
          image: (
            <ImageBackground
              source={require("./../../../assets/Images/onBoarding/2.jpg")}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>Discover</Text>
                <Text style={styles.subTitle}>
                  Explore adorable cats and dogs from our collection.
                </Text>
              </View>
            </ImageBackground>
          ),
          title: "",
          subtitle: "",
        },
        {
          backgroundColor: styles.thirdPage.backgroundColor,
          image: (
            <ImageBackground
              source={require("./../../../assets/Images/onBoarding/3.jpg")}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>Save favourites</Text>
                <Text style={styles.subTitle}>
                  Save your favourite pets and view them anytime.
                </Text>
              </View>
            </ImageBackground>
          ),
          title: "",
          subtitle: "",
        },
        {
          backgroundColor: styles.fourthPage.backgroundColor,
          image: (
            <ImageBackground
              source={require("./../../../assets/Images/onBoarding/4.jpg")}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>API Keys</Text>
                <Text style={styles.subTitle}>
                  Get your own API keys in the "Settings" tab for more pets.
                </Text>
              </View>
            </ImageBackground>
          ),
          title: "",
          subtitle: "",
        },
        {
          backgroundColor: styles.fourthPage.backgroundColor,
          image: (
            <ImageBackground
              source={require("./../../../assets/Images/onBoarding/5.jpg")}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>Enjoy together</Text>
                <Text style={styles.subTitle}>
                  Join our community and share the love.
                </Text>
              </View>
            </ImageBackground>
          ),
          title: "",
          subtitle: "",
        },
      ]}
    />
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
    },
    title: {
      fontSize: fontSizes.FONT70,
      fontFamily: "AmaticBold",
      color: theme.colors.accent2,
      textShadowColor: theme.colors.black,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    subTitle: {
      fontSize: fontSizes.FONT25,
      fontFamily: "ShantellBold",
      color: theme.colors.accent2,
      textAlign: "center",
      textShadowColor: theme.colors.black,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    image: {
      width: "100%",
      height: "105%",
    },
    imageStyle: {
      resizeMode: "cover",
    },
    overlay: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      flex: 1,
    },
    firstPage: {
      backgroundColor: theme.colors.accent2,
    },
    secondPage: {
      backgroundColor: theme.colors.accent2,
    },
    thirdPage: {
      backgroundColor: theme.colors.accent2,
    },
    fourthPage: {
      backgroundColor: theme.colors.accent2,
    },
    skipButton: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.white,
      marginLeft: 25,
      marginBottom: Platform.OS === "ios" ? 0 : 40,
      fontFamily: "ShantellRegular",
    },
    nextButton: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.white,
      marginRight: 25,
      marginBottom: Platform.OS === "ios" ? 0 : 40,
      fontFamily: "ShantellRegular",
    },
    doneButton: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.white,
      marginRight: 25,
      marginBottom: Platform.OS === "ios" ? 0 : 40,
      fontFamily: "ShantellRegular",
    },
    dots: {
      borderRadius: 5,
      marginHorizontal: 3,
      marginBottom: Platform.OS === "ios" ? -3 : 40,
    },
    selectedDot: {
      backgroundColor: theme.colors.white,
    },
    unselectedDot: {
      backgroundColor: theme.colors.whiteTransluscent,
    },
  });

export default OnboardingSwiper;