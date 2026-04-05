import { FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/colors";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type FavouriteIconType = {
  isFavourite: boolean;
  onPress: () => void;
  size: number;
  color?: string;
  isShadow?: boolean;
};

const FavouriteIcon: FC<FavouriteIconType> = ({
  isFavourite,
  onPress,
  size,
  color = '',
  isShadow = true,
}) => {
  const styles = useThemedStyles(createStyles);
  if (!color) color = styles.iconColor.color;
  const iconStyle = isShadow ? styles.icon : {};

  return (
    <View>
      {isFavourite ? (
        <TouchableOpacity onPress={onPress}>
          <FontAwesome name="heart" size={size} color={color} style={iconStyle} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <FontAwesome name="heart-o" size={size} color={color} style={iconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    icon: {
      textShadowOffset: { width: 1, height: 1 },
      textShadowColor: theme.colors.shadow,
    },
    iconColor: {
      color: theme.colors.white,
    }
  });

export default FavouriteIcon;
