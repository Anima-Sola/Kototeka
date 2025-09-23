import { FC, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { IconType } from "../../constants/types";
import fontSizes from "../../constants/fontSizes";

type HeaderIcon = {
  onPress?: () => void;
  icon: ReactNode;
};

type HeaderProps = {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
};

const Header: FC<HeaderProps> = ({
  title = "",
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
}) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  const HeaderIcon: FC<HeaderIcon> = ({ onPress, icon }) => {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  };

  return (
    <View>
      <View style={{ ...styles.statusBar, height: statusBarHeight }} />
      <View style={styles.bar}>
        {leftIcon ? (
          <HeaderIcon onPress={onLeftIconPress} icon={leftIcon} />
        ) : (
          <View style={styles.empty} />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightIcon ? (
          <HeaderIcon onPress={onRightIconPress} icon={rightIcon} />
        ) : (
          <View style={styles.empty} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.statusBar,
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: Colors.mainText,
    fontSize: fontSizes.FONT20,
    fontFamily: "ShantellBold",
  },
  empty: {
    width: 24,
  },
});

export default Header;
