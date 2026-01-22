import { FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/colors";

type FavouriteIconType = {
  isFavourite: boolean;
  onPress: () => void;
  size: number;
};

const FavouriteIcon: FC<FavouriteIconType> = ({ isFavourite, onPress, size }) => {
  return (
    <View>
      {isFavourite ? (
        <TouchableOpacity onPress={onPress}>
          <FontAwesome
            name="heart"
            size={size}
            color={Colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <FontAwesome
            name="heart-o"
            size={size}
            color={Colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: Colors.black,
  },
});

export default FavouriteIcon;
