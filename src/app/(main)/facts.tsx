import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  Button,
  ActivityIndicator as PaperActivityIndicator,
} from "react-native-paper";
import useStore from "../../store/store";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";
import getDogFactsAPI from "../../API/FactsAPI/getDogFacts";
import getCatFactsAPI from "../../API/FactsAPI/getCatFacts";
import FactItem from "../../components/FactItem/FactItem";

const Facts = () => {
  const { petsType } = useStore();
  const styles = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useState(false);
  const [facts, setFacts] = useState<string[]>([]);

  const getRandomPage = (min: number = 1, max: number = 34): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getCatFacts = async () => {
    setIsLoading(true);

    try {
      let result = await getCatFactsAPI();
      const facts: string[] = [];
      const lastPage = result.last_page;

      const randomPage = getRandomPage(1, lastPage);
      result = await getCatFactsAPI(randomPage);
      result.data.map((fact: any) => {
        facts.push(fact.fact);
      });
      setFacts(facts);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getDogFacts = async () => {
    setIsLoading(true);

    try {
      const result = await getDogFactsAPI();
      const facts: string[] = [];
      result.data.map((fact: any) => {
        facts.push(fact.attributes.body);
      });

      setFacts(facts);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getNewFacts = () => {
    if (petsType === "cats") getCatFacts();
    else getDogFacts();
  };

  useEffect(() => {
    getNewFacts();
  }, [petsType]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <PaperActivityIndicator size={"large"} />
          <Text style={styles.text}>Facts are coming!</Text>
        </View>
      </View>
    );
  }

  const showFacts = () => {
    return facts.map((fact, key) => {
      return <FactItem text={fact} key={key} />;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getNewFacts}
          />
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
