import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useStore from "../../store/store";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../constants/colors";
import TopBar from "../../components/TopBar/TopBar";
import fontSizes from "../../constants/fontSizes";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import uploadCatAPI from "../../API/uploadCat";
import UploadedCatCard from "../../components/CatCard/UploadedCatCard";
import { CatType } from "../../constants/types";
import getUploadedCatsAPI from "../../API/getUploadedCats";

const Upload = () => {
  const { uploadedCats, setUploadedCats, addUploadedCat } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);
  const [isCameraGallaryBtnsVisible, setIsCameraGallaryBtnsVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadCat = async (image: string) => {
    setIsUploading(true);

    try {
      const uploadCatResult = await uploadCatAPI(image);
      if (uploadCatResult) addUploadedCat(uploadCatResult);
    } catch (error: any) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const fetchUploadedCatsData = async () => {
    setIsLoading(true);

    try {
      const req = {
        limit: 1000,
      };

      const data = await getUploadedCatsAPI(req);
      setUploadedCats(data);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const pickImageFromGallary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadCat(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadCat(result.assets[0].uri);
    }
  };

  const addImageButtons = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setIsCameraGallaryBtnsVisible(!isCameraGallaryBtnsVisible)}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        {isCameraGallaryBtnsVisible && (
          <View>
            <TouchableOpacity style={styles.cameraButton} onPress={pickImageFromCamera}>
              <Feather name="camera" size={24} color={Colors.secondaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gallaryButton} onPress={pickImageFromGallary}>
              <Feather name="image" size={24} color={Colors.secondaryText} />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const UploadingActivityIndicator = () => {
    return (
      <View style={styles.uploadingAvtivityIndicatorContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  if (uploadedCats.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} isIconsVisible={false} />
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-sharp" size={50} color={Colors.accent} />
          <Text style={styles.emptyText}>No uploaded cats</Text>
          <Text style={styles.emptyText}>Please, add them from </Text>
          <Text style={styles.emptyText}>the device gallery or camera</Text>
        </View>
        {addImageButtons()}
        {isUploading && UploadingActivityIndicator()}
      </View>
    )
  }

  const keyExtractor = (item: CatType, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: CatType }) => (
    <UploadedCatCard cat={item} numOfColumns={numColumns} />
  );

  return (
    <View style={styles.container}>
      <TopBar setNumOfColumns={setNumOfColumns} />
      <FlatList
        key={numColumns}
        data={uploadedCats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchUploadedCatsData()}
        refreshing={isLoading}
        numColumns={numColumns}
        maxToRenderPerBatch={20}
        ListFooterComponent={<View style={styles.footer} />}
      />
      {addImageButtons()}
      {isUploading && UploadingActivityIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingTop: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  uploadingAvtivityIndicatorContainer: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  plusButton: {
    position: "absolute",
    width: 80,
    height: 80,
    bottom: 130,
    right: 16,
    borderRadius: 40,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: fontSizes.FONT32,
    color: Colors.secondaryText,
  },
  emptyText: {
    fontSize: fontSizes.FONT32,
    color: Colors.mainText,
    fontFamily: "AmaticBold",
    alignSelf: "center",
    marginTop: 10,
  },
  cameraButton: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 290,
    right: 26,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gallaryButton: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 220,
    right: 26,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    height: 190,
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Upload;
