import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type SuccessToastType = {
  message: string;
};

const SuccessToast: FC<SuccessToastType> = ({ message }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="check-circle" size={40} color={styles.iconColor.color} />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.header}>Success</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      flexDirection: "row",
      top: 60,
      left: 16,
      right: 16,
      backgroundColor: theme.colors.green,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      borderRadius: 5,
    },
    header: {
      color: theme.colors.white,
      fontSize: fontSizes.FONT20,
      fontWeight: "600",

    },
    message: {
      color: theme.colors.white,
      fontSize: fontSizes.FONT14,
      fontWeight: "600",
    },
    iconColor: {
      color: theme.colors.white,
    },
    iconContainer: {
      width: '20%',
    },
    messageContainer: {
      width: '80%',
    },
  });

export default SuccessToast;
