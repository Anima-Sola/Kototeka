import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import Colors from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { shareImage } from "../../utils/functions";

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
          color={Colors.secondaryText}
          isShadow={false}
        />
      );

    if (isDeleteIconEnabled)
      return (
        <TouchableOpacity onPress={onDeleteIconPress}>
          <FontAwesome name="trash-o" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
      );

    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
        <Feather name="arrow-left" size={32} color={Colors.secondaryText} />
      </TouchableOpacity>
      <View style={styles.shareIconsContainer}>
        <View style={styles.icon}>
          {isRequestInProcess ? (
            <ActivityIndicator size={32} color={Colors.secondaryText} />
          ) : (
            treshOrFavouriteIcon()
          )}
        </View>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="share-2" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="download" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.statusBar,
    borderTopColor: Colors.disabled,
    borderBottomColor: Colors.disabled,
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
});

export default ProfileTopBar;

/*

import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import Colors from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { shareImage } from "../../utils/functions";

type ProfileTopBarProps = {
  isFavouriteIconEnabled?: boolean;
  isDeleteIconEnabled?: boolean;
  isFavourite?: boolean;
  isDeleting?: boolean;
  isFavouriteToggling?: boolean;
  onFavouriteIconPress?: () => void;
  onDeleteIconPress?: () => void;
  imageUrl?: string;
};

const ProfileTopBar: FC<ProfileTopBarProps> = ({
  isFavouriteIconEnabled,
  isDeleteIconEnabled,
  isFavourite = false,
  isDeleting = false,
  onFavouriteIconPress,
  onDeleteIconPress,
  isFavouriteToggling = false,
  imageUrl = "",
}) => {
  const router = useRouter();

  const handleShareImage = async () => {
    try {
      await shareImage(imageUrl);
    } catch (error) {
      console.log("Sharing cancelled or failed");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
        <Feather name="arrow-left" size={32} color={Colors.secondaryText} />
      </TouchableOpacity>
      <View style={styles.shareIconsContainer}>
        <View style={styles.icon}>
          {isFavouriteToggling ? (
            <ActivityIndicator size={32} color={Colors.secondaryText} />
          ) : (
            isFavouriteIconEnabled && (
              <FavouriteIcon
                isFavourite={isFavourite}
                onPress={() => {
                  if (onFavouriteIconPress) onFavouriteIconPress();
                }}
                size={32}
                color={Colors.secondaryText}
                isShadow={false}
              />
            )
          )}
          {isDeleting ? (
            <ActivityIndicator size={32} color={Colors.secondaryText} />
          ) : (
            isDeleteIconEnabled && (
              <TouchableOpacity onPress={onDeleteIconPress}>
                <FontAwesome name="trash-o" size={32} color={Colors.secondaryText} />
              </TouchableOpacity>
            )
          )}
        </View>
        <TouchableOpacity style={styles.icon} onPress={handleShareImage}>
          <Feather name="share-2" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="download" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.statusBar,
    borderTopColor: Colors.disabled,
    borderBottomColor: Colors.disabled,
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
});

export default ProfileTopBar;
*/
