import { Text, StyleSheet, Pressable } from "react-native";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

const BreedItem = ({ breedId }: { breedId: string }) => {
  const styles = useThemedStyles(createStyles);
  const breed = useStore((state) => state.breeds[breedId]);

  if (!breed?.name) return null;

  const isSelected = useStore(
    (state) => state.selectedBreeds[breedId] ?? false,
  );

  const toggleBreed = useStore((state) => state.toggleBreed);

  return (
    <Pressable
      style={isSelected ? styles.selectedBreedContainer : styles.breedContainer}
      onPress={() => toggleBreed(breedId)}
    >
      <Text style={styles.text}>{breed.name}</Text>
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
    },
    selectedBreedContainer: {
      borderWidth: 1,
      borderColor: theme.colors.accent,
      backgroundColor: theme.colors.disabled,
      padding: 5,
      borderRadius: 20,
      margin: 3,
      paddingHorizontal: 5,
    },
    text: {
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellRegular",
      color: theme.colors.mainText,
      textAlign: "center",
    },
  });

export default BreedItem;
