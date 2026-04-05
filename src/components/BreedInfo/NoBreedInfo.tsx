import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const NoBreedInfo = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
      <Text style={styles.text}>No breed info</Text>
      <Text style={styles.text}>Just enjoy the picture</Text>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      marginTop: 30,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 200,
    },
    text: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      alignSelf: "center",
    },
    iconColor: {
      color: theme.colors.accent,
    }
  });

export default NoBreedInfo;
