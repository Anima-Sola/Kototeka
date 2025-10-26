import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import getCatsImages from "../../API/getCatsImages";
import Colors from "../../constants/colors";
import CatCard from "../../components/CatCard/CatCard";

const Home = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const req = {
        limit: 10,
      };

      const data = await getCatsImages(req);
      setCats(data);
    } catch (error: any) {
      console.log("Ошибка: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={cats}
        renderItem={({ item }) => <CatCard cat={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchData()}
        refreshing={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingTop: 16,
  },
});

export default Home;
