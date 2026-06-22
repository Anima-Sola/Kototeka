import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const FullScreenLoadingIndicator = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 100,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default FullScreenLoadingIndicator;
