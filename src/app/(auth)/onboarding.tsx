import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

const OnboardingSwiper = () => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={() => router.replace("/login")}
        onSkip={() => router.replace("/login")}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        controlStatusBar={true}
        pages={[
          {
            backgroundColor: styles.firstPage.backgroundColor,
            image: (
              <Image style={styles.image} source={require("./../../../assets/Images/ex.jpg")} />
            ),
            title: "Welcome!",
            subtitle: "To the cats and dogs gallary",
          },
          {
            backgroundColor: "#fe6e58",
            image: (
              <Image style={styles.image} source={require("./../../../assets/Images/ex.jpg")} />
            ),
            title: "The Title",
            subtitle: "This is the subtitle that sumplements the title.",
          },
          {
            backgroundColor: "#999",
            image: (
              <Image style={styles.image} source={require("./../../../assets/Images/ex.jpg")} />
            ),
            title: "Triangle",
            subtitle: "Beautiful, isn't it?",
          },
        ]}
      />
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      width: 100,
      height: 100,
    },
    firstPage: {
      backgroundColor: theme.colors.placeholder,
    }
  });

export default OnboardingSwiper;
