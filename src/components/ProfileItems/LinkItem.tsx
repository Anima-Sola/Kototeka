import { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Linking, Alert } from "react-native";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

type LinkItemType = {
  name: string;
  link: string;
};

const LinkItem: FC<LinkItemType> = ({ name, link }) => {
  if (!link) return null;

  const handleLink = async () => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Ошибка", `Не удалось ${name} page`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <TouchableOpacity onPress={handleLink}>
        <Text selectable style={styles.link}>
          {link}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  header: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
  },
  link: {
    color: "blue",
    fontSize: fontSizes.FONT14,
    fontFamily: "ShantellRegular",
    textDecorationLine: "underline",
    textAlign: "justify",
  },
});

export default LinkItem;
