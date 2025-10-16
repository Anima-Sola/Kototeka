import { FC, ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
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
  const HeaderIcon: FC<HeaderIcon> = ({ onPress, icon }) => {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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
