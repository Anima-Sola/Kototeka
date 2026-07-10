import { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Text,
  TouchableOpacity,
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
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/1.png")}
            />
          ),
          title: "Welcome!",
          subtitle: "To the cats and dogs gallery.",
        },
        {
          backgroundColor: styles.secondPage.backgroundColor,
          image: (
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/2.png")}
            />
          ),
          title: "Discover",
          subtitle: "Explore adorable cats and dogs from our collection.",
        },
        {
          backgroundColor: styles.thirdPage.backgroundColor,
          image: (
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/3.png")}
            />
          ),
          title: "Save favourites",
          subtitle: "Save your favourite pets and view them anytime.",
        },
        {
          backgroundColor: styles.fourthPage.backgroundColor,
          image: (
            <Image
              style={styles.image}
              source={require("./../../../assets/Images/onBoarding/4.png")}
            />
          ),
          title: "Enjoy together",
          subtitle: "Join our community and share the love.",
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
    },
    title: {
      fontSize: fontSizes.FONT32,
      fontFamily: "Courier",
      color: theme.colors.black,
    },
    subTitle: {
      fontSize: fontSizes.FONT18,
      fontFamily: "Georgia",
      fontStyle: 'italic',
      color: theme.colors.accent,
    },
    image: {
      width: 300,
      height: 300,
      marginTop: -80,
    },
    firstPage: {
      backgroundColor: theme.colors.main,
    },
    secondPage: {
      backgroundColor: theme.colors.main,
    },
    thirdPage: {
      backgroundColor: theme.colors.main,
    },
    fourthPage: {
      backgroundColor: theme.colors.main,
    },
    skipButton: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.black,
      marginLeft: 25,
      marginBottom: Platform.OS === "ios" ? 0 : 40,
      fontFamily: "Courier",
    },
    nextButton: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.black,
      marginRight: 25,
      marginBottom: Platform.OS === "ios" ? 0 : 40,
      fontFamily: "Courier",
    },
    doneButton: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.black,
      marginRight: 25,
      marginBottom: Platform.OS === "ios" ? 0 : 40,
      fontFamily: "Courier",
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
