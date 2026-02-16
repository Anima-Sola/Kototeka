import { useState } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import useStore from "../../store/store";
import ProfileTopBar from "../../components/TopBar/ProfileTopBar";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import { Image } from "expo-image";
import { blurhash } from "../../constants/common";

const imageWidth = Dimensions.get("screen").width;

const CatProfile = () => {
  const { cats } = useStore();
  const { catId } = useLocalSearchParams<{ catId: string }>();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const cat = cats.find((cat) => cat.id === catId);
  const breeds = cat?.breeds[0];
  console.log(breeds);

  return (
    <View>
      <ProfileTopBar />
      <ScrollView>
        <Image
          style={{ ...styles.image, width: imageWidth, height: imageWidth }}
          source={cat?.url}
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
            <Text style={styles.header}>{breeds.name}</Text>
            <Text selectable style={styles.text}>
              {breeds.description}
            </Text>
            <Text style={styles.header}>Temperament</Text>
            <Text selectable style={styles.text}>
              {breeds.temperament}
            </Text>
            <Text style={styles.header}>Origin</Text>
            <Text selectable style={styles.text}>
              {breeds.origin}
            </Text>
            <View>
              <Text style={styles.header}>Adaptability</Text>
              <ProgressBar
                progress={(breeds.adaptability * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.adaptability} out of 5`}</Text>
            </View>
            <View>
              <Text style={styles.header}>Affection level</Text>
              <ProgressBar
                progress={(breeds.affection_level * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.affection_level} out of 5`}</Text>
            </View>
            <View>
              <Text style={styles.header}>Energy level</Text>
              <ProgressBar
                progress={(breeds.energy_level * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.energy_level} out of 5`}</Text>
            </View>
            <View>
              <Text style={styles.header}>Dog friendly</Text>
              <ProgressBar
                progress={(breeds.dog_friendly * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.dog_friendly} out of 5`}</Text>
            </View>
            <View>
              <Text style={styles.header}>Child friendly</Text>
              <ProgressBar
                progress={(breeds.child_friendly * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.child_friendly} out of 5`}</Text>
            </View>
            <View>
              <Text style={styles.header}>Grooming</Text>
              <ProgressBar
                progress={(breeds.grooming * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.grooming} out of 5`}</Text>
            </View>
            <View>
              <Text style={styles.header}>Health issues</Text>
              <ProgressBar
                progress={(breeds.health_issues * 20) / 100}
                color={Colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.markText}>{`${breeds.health_issues} out of 5`}</Text>
            </View>
          </View>
        )}
        {isImageLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 200,
  },
  header: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
  text: {
    fontSize: fontSizes.FONT14,
    fontFamily: "ShantellRegular",
    color: Colors.mainText,
    textAlign: "justify",
  },
  markText: {
    color: Colors.accent2,
    position: "absolute",
    alignSelf: "center",
    bottom: 7,
    fontSize: fontSizes.FONT12,
    fontFamily: "ShantellBold",
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default CatProfile;
