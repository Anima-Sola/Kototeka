import { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import useStore from "../../store/store";
import ProfileTopBar from "../../components/TopBar/ProfileTopBar";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import { Image } from "expo-image";
import { blurhash } from "../../constants/common";

const imageWidth = Dimensions.get("screen").width;

const FavouriteCatProfile = () => {
  const { favouriteCats } = useStore();
  const { catId } = useLocalSearchParams<{ catId: string }>();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const cat = favouriteCats.find((cat) => cat.id.toString() === catId.toString());
  const breeds = cat?.breeds;

  return (
    <View>
      <ProfileTopBar />
      <Image
        style={{ ...styles.image, width: imageWidth, height: imageWidth }}
        source={cat?.image.url}
        placeholder={{ blurhash }}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        onLoadEnd={() => setIsImageLoading(false)}
        transition={1000}
        onError={() => {
          setIsImageLoading(false);
          setIsImageLoadingError(true);
        }}
      />
      {breeds && (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{breeds.name}</Text>
          <Text selectable style={styles.description}>
            {breeds.description}
          </Text>
        </View>
      )}
      {isImageLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderColor: Colors.secondaryText,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
  description: {
    fontSize: fontSizes.FONT14,
    fontFamily: "ShantellRegular",
    color: Colors.mainText,
  },
});

export default FavouriteCatProfile;
