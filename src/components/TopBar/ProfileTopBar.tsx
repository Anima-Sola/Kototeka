import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { shareImage } from "../../utils/functions";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type ProfileTopBarProps = {
  isFavourite?: boolean;
  isFavouriteIconEnabled?: boolean;
  onFavouriteIconPress?: () => void;
  isDeleteIconEnabled?: boolean;
  onDeleteIconPress?: () => void;
  isRequestInProcess?: boolean;
};

const ProfileTopBar: FC<ProfileTopBarProps> = ({
  isFavourite = false,
  onFavouriteIconPress,
  isFavouriteIconEnabled = false,
  isDeleteIconEnabled = false,
  onDeleteIconPress,
  isRequestInProcess = false,
}) => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  const treshOrFavouriteIcon = () => {
    if (isFavouriteIconEnabled)
      return (
        <FavouriteIcon
          isFavourite={isFavourite}
          onPress={() => {
            if (onFavouriteIconPress) onFavouriteIconPress();
          }}
          size={32}
          color={styles.iconColor.color}
          isShadow={false}
        />
      );

    if (isDeleteIconEnabled)
      return (
        <TouchableOpacity onPress={onDeleteIconPress}>
          <FontAwesome name="trash-o" size={32} color={styles.iconColor.color} />
        </TouchableOpacity>
      );

    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
        <Feather name="arrow-left" size={32} color={styles.iconColor.color} />
      </TouchableOpacity>
      <View style={styles.shareIconsContainer}>
        <View style={styles.icon}>
          {isRequestInProcess ? (
            <ActivityIndicator size={32} color={styles.iconColor.color} />
          ) : (
            treshOrFavouriteIcon()
          )}
        </View>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="share-2" size={32} color={styles.iconColor.color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="download" size={32} color={styles.iconColor.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: theme.colors.statusBar,
      borderTopColor: theme.colors.disabled,
      borderBottomColor: theme.colors.disabled,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon: {
      width: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    shareIconsContainer: {
      flexDirection: "row",
    },
    iconColor: {
      color: theme.colors.accent,
    }
  });

export default ProfileTopBar;