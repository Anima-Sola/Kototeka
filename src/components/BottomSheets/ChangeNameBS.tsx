import { View, Text, StyleSheet } from "react-native";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";

const ChangeNameBS = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <BottomSheetTopBar />
      <Text style={styles.text.color}>Bottom Sheet</Text>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 200,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors.main,
    },
    text: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
    },
  });

export default ChangeNameBS;
