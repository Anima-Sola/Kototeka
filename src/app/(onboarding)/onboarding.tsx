import { useRef } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
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

  console.log(expoPushToken, notification);

  const dots = (currentPage: number) => {
    const pages = [0, 1, 2, 3, 4];

    return pages.map((page) => {
      if (page === currentPage)
        return <View key={page} style={styles.activeDot} />;

      return <View key={page} style={styles.dot} />;
    });
  };

  return (
    <ImageBackground
      source={require("./../../../assets/Images/onBoarding/1.jpg")}
      style={styles.image}
      imageStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerText}>Welcome!</Text>
          <Text style={styles.messageText}>To the cats and dogs gallery.</Text>
          <View style={styles.navigationContainer}>
            <View style={styles.dots}>{dots(0)}</View>
            <View style={styles.nexButton}>
              {/* Pressable anim*/}
            </View>
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
      width: "100%",
      flexDirection: "row",
      marginTop: 25,
    },
    dots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
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
      backgroundColor: theme.colors.accent,
      marginHorizontal: 4,
    },
  });

export default OnboardingSwiper;
