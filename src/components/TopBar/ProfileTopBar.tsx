import { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { downloadAndSaveImage } from "../../utils/functions";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import DownloadProgressBar from "../DownloadProgressBar/DownloadProgressBar";
import { downloadResumable } from "../../utils/functions";
import useStore from "../../store/store";

type ProfileTopBarProps = {
  isFavourite?: boolean;
  isFavouriteIconEnabled?: boolean;
  onFavouriteIconPress?: () => void;
  isDeleteIconEnabled?: boolean;
  onDeleteIconPress?: () => void;
  isRequestInProcess?: boolean;
  imageUrl?: string;
};

const ProfileTopBar: FC<ProfileTopBarProps> = ({
  isFavourite = false,
  onFavouriteIconPress,
  isFavouriteIconEnabled = false,
  isDeleteIconEnabled = false,
  onDeleteIconPress,
  isRequestInProcess = false,
  imageUrl = "",
}) => {
  const styles = useThemedStyles(createStyles);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { showSuccessToast, showErrorToast } = useStore();
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
          <FontAwesome
            name="trash-o"
            size={32}
            color={styles.iconColor.color}
          />
        </TouchableOpacity>
      );

    return null;
  };

  const onProgress = (progress: number) => {
    if (progress >= 0 && progress <= 1) setDownloadProgress(progress);
  };

  const downloadImage = async () => {
    if (!imageUrl) return;

    try {
      await downloadAndSaveImage(imageUrl, onProgress);
      setTimeout(() => showSuccessToast("The image has been downloaded"), 500);
    } catch (error) {
      setTimeout(() => showErrorToast("Error when downloading the image"), 500);
    } finally {
      setDownloadProgress(0);
    }
  };

  const onCancelDownloadingImage = async () => {
    if (downloadResumable) {
      downloadResumable.cancelAsync();
      setDownloadProgress(0);
    }
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
        <TouchableOpacity style={styles.icon} onPress={downloadImage}>
          <Feather name="download" size={32} color={styles.iconColor.color} />
        </TouchableOpacity>
      </View>
      {downloadProgress > 0 && downloadProgress < 1 && (
        <DownloadProgressBar progress={downloadProgress} onCancel={onCancelDownloadingImage} />
      )}
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: theme.colors.statusBarTransluscent,
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
    },
  });

export default ProfileTopBar;
