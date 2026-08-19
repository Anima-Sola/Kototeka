import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-paper";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import FactItem from "../../components/FactItem/FactItem";
import { CAT_FACTS } from "../../constants/catFacts";
import { DOG_FACTS } from "../../constants/dogFacts";

const Facts = () => {
  const { petsType } = useStore();
  const styles = useThemedStyles(createStyles);
  const [facts, setFacts] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  function getRandomFacts(arr: string[], count = 5): string[] {
    const result = [...arr];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result.slice(0, count);
  }

  const getNewFacts = () => {
    if (petsType === "cats") {
      setFacts(getRandomFacts(CAT_FACTS));
    } else setFacts(getRandomFacts(DOG_FACTS));

    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    getNewFacts();
  }, [petsType]);

  const showFacts = () => {
    return facts.map((fact, key) => {
      return <FactItem text={fact} key={key} />;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        alwaysBounceVertical
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getNewFacts} />
        }
        style={styles.content}
      >
        <Text style={styles.textHeader}>Facts about {petsType}</Text>
        <View>{showFacts()}</View>
        <Button
          mode={"contained"}
          style={styles.button}
          labelStyle={styles.labelButton}
          onPress={getNewFacts}
        >
          More facts
        </Button>
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

export const createStyles = (
  theme: ITheme,
): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.colors.main,
      paddingTop: 200,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
    },
    content: {
      paddingHorizontal: 16,
    },
    textHeader: {
      fontSize: fontSizes.FONT40,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      marginTop: 20,
      textAlign: "center",
      marginBottom: 10,
    },
    text: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      textAlign: "center",
      marginTop: 10,
    },
    button: {
      backgroundColor: theme.colors.accent,
      height: 50,
      justifyContent: "center",
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    footer: {
      height: 190,
    },
  });

export default Facts;
