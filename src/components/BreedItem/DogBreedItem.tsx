import { Text, StyleSheet, Pressable } from "react-native";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

const DogBreedItem = ({ breedId }: { breedId: string }) => {
  const styles = useThemedStyles(createStyles);

  const breed = useStore((state) => state.dogBreeds[breedId]);
  if (!breed?.name) return null;
  const isSelected = useStore(
    (state) => state.selectedDogBreeds[breedId] ?? false,
  );
  const toggleBreed = useStore((state) => state.toggleDogBreed);

  return (
    <Pressable
      style={isSelected ? styles.selectedBreedContainer : styles.breedContainer}
      onPress={() => toggleBreed(breedId)}
    >
      <Text style={isSelected ? styles.selectedText : styles.text}>
        {breed.name}
      </Text>
    </Pressable>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    breedContainer: {
      borderWidth: 1,
      borderColor: theme.colors.mainText,
      padding: 5,
      borderRadius: 20,
      margin: 3,
      paddingHorizontal: 5,
      maxWidth: "48%",
      justifyContent: "center",
    },
    selectedBreedContainer: {
      borderWidth: 1,
      borderColor: theme.colors.accent2,
      backgroundColor: theme.colors.secondary,
      padding: 5,
      borderRadius: 20,
      margin: 3,
      paddingHorizontal: 5,
      maxWidth: "48%",
      justifyContent: "center",
    },
    text: {
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
      color: theme.colors.mainText,
      textAlign: "center",
    },
    selectedText: {
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellRegular",
      color: theme.colors.accent2,
      textAlign: "center",
    },
  });

export default DogBreedItem;
