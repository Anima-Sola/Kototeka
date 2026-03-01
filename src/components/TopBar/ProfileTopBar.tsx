import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import Colors from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import { shareImage } from "../../utils/functions";

type ProfileTopBarProps = {
  isFavourite: boolean;
  isFavouriteToggling: boolean;
  onFavouriteIconPress: () => void;
  imageUrl: string;
};

const ProfileTopBar: FC<ProfileTopBarProps> = ({
  isFavourite,
  onFavouriteIconPress,
  isFavouriteToggling,
  imageUrl,
}) => {
  const router = useRouter();

  const handleShareImage = async () => {
    /*try {
      await shareImage(imageUrl);
    } catch (error) {
      console.log("Sharing cancelled or failed");
    }*/
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
            <FavouriteIcon
              isFavourite={isFavourite}
              onPress={onFavouriteIconPress}
              size={32}
              color={Colors.secondaryText}
              isShadow={false}
            />
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
