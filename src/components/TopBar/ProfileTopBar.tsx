import { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Colors from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";

const ProfileTopBar: FC = () => {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
        <Feather name="arrow-left" size={32} color={Colors.secondaryText} />
      </TouchableOpacity>
      <View style={styles.shareIconsContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="share-2" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => {}}>
          <Feather name="download" size={32} color={Colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.statusBar,
    borderTopColor: Colors.disabled,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  shareIconsContainer: {
    flexDirection: 'row',
  },
});

export default ProfileTopBar;
