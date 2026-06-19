import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
  Keyboard,
} from "react-native";
import { ITheme } from "../constants/interfaces";
import { useThemedStyles } from "../hooks/useThemedStyles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetContextType {
  showBottomSheet: (content: ReactNode) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const styles = useThemedStyles(createStyles);
  const [visible, setVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const keyboardAnim = useRef(new Animated.Value(0)).current;
  const isOpening = useRef(false);
  const contentHeight = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          hideBottomSheet();
        }
      },
    }),
  ).current;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShowSub = Keyboard.addListener(showEvent, (event: any) => {
      const height = event.endCoordinates?.height || 0;
      setKeyboardHeight(height);
      Animated.timing(keyboardAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    const keyboardHideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
      Animated.timing(keyboardAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowSub.remove();
      keyboardHideSub.remove();
    };
  }, [keyboardAnim]);

  const showBottomSheet = (content: ReactNode) => {
    setBottomSheetContent(content);
    setVisible(true);
    isOpening.current = true; // Отмечаем, что это операция открытия
  };

  const hideBottomSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: contentHeight.current + keyboardHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      setBottomSheetContent(null);
      contentHeight.current = 0;
      isOpening.current = false;
    });
  };

  const handleContentLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;

    if (height > 0 && contentHeight.current === 0) {
      contentHeight.current = height;
      slideAnim.setValue(height);

      if (isOpening.current) {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0.4,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
        isOpening.current = false;
      }
    }
  };

  if (!visible) {
    return (
      <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
        {children}
      </BottomSheetContext.Provider>
    );
  }

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      >
        <TouchableWithoutFeedback onPress={hideBottomSheet}>
          <View style={styles.backdropTouchArea} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.bottomSheet,
            {
              transform: [
                { translateY: slideAnim },
                { translateY: -keyboardHeight },
              ],
            },
          ]}
          onLayout={handleContentLayout}
        >
          {bottomSheetContent}
        </Animated.View>
      </KeyboardAvoidingView>
    </BottomSheetContext.Provider>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.black,
    },
    backdropTouchArea: {
      flex: 1,
    },
    keyboardAvoidingView: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    bottomSheet: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      overflow: "hidden",
    },
  });

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within BottomSheetProvider");
  }
  return context;
};
