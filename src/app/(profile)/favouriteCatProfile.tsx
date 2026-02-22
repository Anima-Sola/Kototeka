import { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Button } from "react-native-paper";
import useStore from "../../store/store";
import ProfileTopBar from "../../components/TopBar/ProfileTopBar";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import { Image } from "expo-image";
import { blurhash } from "../../constants/common";
import TextItem from "../../components/ProfileItems/TextItem";
import MarkItem from "../../components/ProfileItems/MarkItem";
import SingleParamItem from "../../components/ProfileItems/SingleParamItem";
import LinkItem from "../../components/ProfileItems/LinkItem";

const imageWidth = Dimensions.get("screen").width;

const FavouriteCatProfile = () => {
  const { favouriteCats } = useStore();
  const router = useRouter();
  const { catId } = useLocalSearchParams<{ catId: string }>();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const cat = favouriteCats.find((cat) => cat.id.toString() === catId.toString());
  const breeds = cat?.breeds;

  return (
    <View style={styles.container}>
      <ProfileTopBar />
      <ScrollView>
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
            <TextItem name={`Name: ${breeds.name}`} text={breeds.description} />
            <TextItem name={"Alternative names"} text={breeds.alt_names} />
            <TextItem name={"Temperament"} text={breeds.temperament} />
            <MarkItem name={"Adaptability"} mark={breeds.adaptability} />
            <MarkItem name={"Affection level"} mark={breeds.affection_level} />
            <MarkItem name={"Energy level"} mark={breeds.energy_level} />
            <MarkItem name={"Dog friendly"} mark={breeds.dog_friendly} />
            <MarkItem name={"Child friendly"} mark={breeds.child_friendly} />
            <MarkItem name={"Stranger friendly"} mark={breeds.stranger_friendly} />
            <MarkItem name={"Grooming"} mark={breeds.grooming} />
            <MarkItem name={"Health issues"} mark={breeds.health_issues} />
            <MarkItem name={"Social needs"} mark={breeds.social_needs} />
            <MarkItem name={"Shedding level"} mark={breeds.shedding_level} />
            <MarkItem name={"Intelligence"} mark={breeds.intelligence} />
            <MarkItem name={"Vocalisation"} mark={breeds.vocalisation} />
            <SingleParamItem name={"Origin"} param={breeds.origin} />
            <SingleParamItem name={"Weight, kg."} param={breeds.weight.metric} />
            <SingleParamItem name={"Life span, years"} param={breeds.life_span} />
            <SingleParamItem
              name={"Experimental"}
              param={breeds.experimental ? "Yes" : "No"}
            />
            <SingleParamItem name={"Hairless"} param={breeds.hairless ? "Yes" : "No"} />
            <SingleParamItem
              name={"Hypoallergenic"}
              param={breeds.hypoallergenic ? "Yes" : "No"}
            />
            <SingleParamItem name={"Indoor"} param={breeds.indoor ? "Yes" : "No"} />
            <SingleParamItem name={"Natural"} param={breeds.natural ? "Yes" : "No"} />
            <SingleParamItem name={"Rare"} param={breeds.rare ? "Yes" : "No"} />
            <SingleParamItem name={"Rex"} param={breeds.rex ? "Yes" : "No"} />
            <SingleParamItem
              name={"Short legs"}
              param={breeds.short_legs ? "Yes" : "No"}
            />
            <SingleParamItem
              name={"Suppressed tail"}
              param={breeds.suppressed_tail ? "Yes" : "No"}
            />
            <LinkItem name={"Cfa page"} link={breeds.cfa_url} />
            <LinkItem name={"Vcahospitals  page"} link={breeds.vcahospitals_url} />
            <LinkItem name={"Vetstreet  page"} link={breeds.vetstreet_url} />
            <LinkItem name={"Wikipedia page"} link={breeds.wikipedia_url} />
          </View>
        )}
        {isImageLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={styles.buttonStyle}
          labelStyle={styles.labelStyle}
          onPress={() => router.back()}
        >
          Go back
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    bottom: Platform.OS === "ios" ? 35 : 55,
    position: "absolute",
  },
  buttonStyle: {
    backgroundColor: Colors.accent,
  },
  labelStyle: {
    color: Colors.secondary,
    fontSize: fontSizes.FONT18,
    fontFamily: "ShantellBold",
    lineHeight: 30,
  },
});

export default FavouriteCatProfile;
