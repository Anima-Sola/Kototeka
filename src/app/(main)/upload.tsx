import { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "expo-router";
import useStore from "../../store/store";
import * as ImagePicker from "expo-image-picker";
import TopBar from "../../components/TopBar/TopBar";
import fontSizes from "../../constants/fontSizes";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import uploadPetAPI from "../../API/uploadPet";
import UploadedPetCard from "../../components/PetCard/UploadedPetCard";
import { PetType } from "../../constants/types";
import getUploadedPetsAPI from "../../API/getUploadedPets";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

const Upload = () => {
  const styles = useThemedStyles(createStyles);
  const { uploadedPets, setUploadedPets, addUploadedPet, userId, petsType } =
    useStore();
  const prevPetsTypeRef = useRef(petsType);
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumOfColumns] = useState(2);
  const [isCameraGallaryBtnsVisible, setIsCameraGallaryBtnsVisible] =
    useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFilteredLoading, setIsFilteredLoading] = useState(false);

  const uploadPet = async (image: string) => {
    setIsUploading(true);

    try {
      const uploadPetResult = await uploadPetAPI(image, userId);
      if (uploadPetResult) addUploadedPet(uploadPetResult);
    } catch (error: any) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const fetchUploadedPetsData = async () => {
    setIsLoading(true);

    try {
      const data = await getUploadedPetsAPI(1000, userId);
      if(data) setUploadedPets(data);
      else setUploadedPets([]);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
      setIsFilteredLoading(false);
    }
  };

  const pickImageFromGallary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      uploadPet(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      uploadPet(result.assets[0].uri);
    }
  };

  const addImageButtons = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() =>
            setIsCameraGallaryBtnsVisible(!isCameraGallaryBtnsVisible)
          }
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        {isCameraGallaryBtnsVisible && (
          <View>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={pickImageFromCamera}
            >
              <Feather name="camera" size={24} color={styles.iconColor.color} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.gallaryButton}
              onPress={pickImageFromGallary}
            >
              <Feather name="image" size={24} color={styles.iconColor.color} />
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

  const keyExtractor = (item: PetType, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: PetType }) => (
    <UploadedPetCard pet={item} numOfColumns={numColumns} />
  );

  useFocusEffect(
    useCallback(() => {
      if (prevPetsTypeRef.current !== petsType) {
        setIsFilteredLoading(true);
        fetchUploadedPetsData();
        prevPetsTypeRef.current = petsType;
      }
    }, [petsType]),
  );

  if (isFilteredLoading) {
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} />
          <Text style={styles.loadingText}>Pets are coming!</Text>
        </View>
      </View>
    );
  }

  if (uploadedPets.length === 0) {
    return (
      <View style={styles.container}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
        <View style={styles.emptyContainer}>
          <Ionicons name="paw-sharp" size={50} color={styles.iconColor.color} />
          <Text style={styles.emptyText}>No uploaded pets</Text>
          <Text style={styles.emptyText}>Please, add them from </Text>
          <Text style={styles.emptyText}>the device gallery or camera</Text>
        </View>
        {addImageButtons()}
        {isUploading && UploadingActivityIndicator()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={uploadedPets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchUploadedPetsData()}
        refreshing={isLoading}
        numColumns={numColumns}
        maxToRenderPerBatch={20}
        ListFooterComponent={<View style={styles.footer} />}
        contentContainerStyle={styles.flatListContent}
        scrollIndicatorInsets={{ top: 60 }}
      />
      <View style={styles.topBarContainer}>
        <TopBar setNumOfColumns={setNumOfColumns} numOfColumns={numColumns} />
      </View>
      {addImageButtons()}
      {isUploading && UploadingActivityIndicator()}
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
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
    emptyContainer: {
      flex: 1,
      backgroundColor: theme.colors.main,
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
      backgroundColor: theme.colors.uploadPhotoBtn,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.colors.shadow,
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
      color: theme.colors.accent,
    },
    emptyText: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      alignSelf: "center",
      marginTop: 10,
    },
    loadingText: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
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
      backgroundColor: theme.colors.uploadPhotoBtn,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.colors.shadow,
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
      backgroundColor: theme.colors.uploadPhotoBtn,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.colors.shadow,
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
    iconColor: {
      color: theme.colors.accent,
    },
    topBarContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    flatListContent: {
      paddingTop: 50,
      paddingBottom: 80,
    },
  });

export default Upload;
