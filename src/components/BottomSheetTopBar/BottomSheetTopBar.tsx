import { View, StyleSheet, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const BottomSheetTopBar = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.bar}>
      <View style={styles.line} />
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors.main,
      height: 20,
    },
    line: {
      marginVertical: 10,
      width: 150,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.accent,
      alignSelf: "center",
    },
  });

export default BottomSheetTopBar;
