import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ProgressBar, Button } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

type DownloadProgressBarType = {
  progress: number;
  onCancel: () => void;
};

const DownloadProgressBar: FC<DownloadProgressBarType> = ({
  progress,
  onCancel,
}) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Downloading... {Math.round(progress * 100)}%
      </Text>
      <ProgressBar
        progress={progress}
        color={styles.filledProgressBar.backgroundColor}
        style={styles.progressBar}
      />
      <TouchableOpacity style={styles.cancelContainer} onPress={onCancel}>
        <Text style={styles.title}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 100,
      left: 0,
      right: 0,
      height: 100,
      marginHorizontal: 16,
      backgroundColor: theme.colors.main,
      padding: 16,
      borderRadius: 8,
      justifyContent: "center",
    },
    title: {
      fontSize: fontSizes.FONT25,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.disabled,
      marginVertical: 8,
    },
    filledProgressBar: {
      backgroundColor: theme.colors.accent,
    },
    cancelContainer: {
      width: "100%",
      justifyContent: "flex-end",
      flexDirection: "row",
    },
  });

export default DownloadProgressBar;
