import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  PanResponder,
  Keyboard,
} from "react-native";
import { ITheme } from "../constants/interfaces";
import { useThemedStyles } from "../hooks/useThemedStyles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetContextType {
  showBottomSheet: (content: ReactNode, onClose?: () => void) => void;
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
  const closeCallbackRef = useRef<(() => void) | undefined>(undefined);

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
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
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShowSub = Keyboard.addListener(showEvent, (event: any) => {
      const height = event.endCoordinates?.height || 0;
      setKeyboardHeight(height);
    });
    const keyboardHideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardShowSub.remove();
      keyboardHideSub.remove();
    };
  }, []);

  const showBottomSheet = (content: ReactNode, onClose?: () => void) => {
    setBottomSheetContent(content);
    closeCallbackRef.current = onClose;
    setVisible(true);
    isOpening.current = true; // Отмечаем, что это операция открытия
  };

  const hideBottomSheet = () => {
    Keyboard.dismiss();

    const onClose = closeCallbackRef.current;

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
      closeCallbackRef.current = undefined;
      contentHeight.current = 0;
      isOpening.current = false;
      78;
      onClose?.();
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

      <Animated.View
        style={[styles.bottomSheetWrapper, { paddingBottom: keyboardHeight }]}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
          onLayout={handleContentLayout}
        >
          {bottomSheetContent}
        </Animated.View>
      </Animated.View>
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
    bottomSheetWrapper: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
    },
    bottomSheet: {
      width: "100%",
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
