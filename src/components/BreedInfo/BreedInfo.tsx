import { FC } from "react";
import { View, StyleSheet } from "react-native";
import TextItem from "../ProfileItems/TextItem";
import MarkItem from "../ProfileItems/MarkItem";
import SingleParamItem from "../ProfileItems/SingleParamItem";
import LinkItem from "../ProfileItems/LinkItem";

type BreedInfoProps = {
  breeds: any; //Todo: Make type detailed
};

const BreedInfo: FC<BreedInfoProps> = ({ breeds }) => {
  return (
    <View style={styles.container}>
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
      <SingleParamItem name={"Experimental"} param={breeds.experimental ? "Yes" : "No"} />
      <SingleParamItem name={"Hairless"} param={breeds.hairless ? "Yes" : "No"} />
      <SingleParamItem
        name={"Hypoallergenic"}
        param={breeds.hypoallergenic ? "Yes" : "No"}
      />
      <SingleParamItem name={"Indoor"} param={breeds.indoor ? "Yes" : "No"} />
      <SingleParamItem name={"Natural"} param={breeds.natural ? "Yes" : "No"} />
      <SingleParamItem name={"Rare"} param={breeds.rare ? "Yes" : "No"} />
      <SingleParamItem name={"Rex"} param={breeds.rex ? "Yes" : "No"} />
      <SingleParamItem name={"Short legs"} param={breeds.short_legs ? "Yes" : "No"} />
      <SingleParamItem
        name={"Suppressed tail"}
        param={breeds.suppressed_tail ? "Yes" : "No"}
      />
      <LinkItem name={"Cfa page"} link={breeds.cfa_url} />
      <LinkItem name={"Vcahospitals  page"} link={breeds.vcahospitals_url} />
      <LinkItem name={"Vetstreet  page"} link={breeds.vetstreet_url} />
      <LinkItem name={"Wikipedia page"} link={breeds.wikipedia_url} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
});

export default BreedInfo;
