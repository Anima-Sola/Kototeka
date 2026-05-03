import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "react-native-modal";

interface BottomSheetContextType {
  showBottomSheet: (content: ReactNode) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null);

  const showBottomSheet = (content: ReactNode) => {
    setVisible(true);
    setBottomSheetContent(content);
  };

  const hideBottomSheet = () => {
    setVisible(false);
    setBottomSheetContent(null);
  };

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      <Modal
        isVisible={visible}
        animationIn={"slideInUp"}
        animationInTiming={400}
        animationOut={"slideOutDown"}
        animationOutTiming={400}
        swipeDirection={"down"}
        onBackdropPress={hideBottomSheet}
        onSwipeComplete={hideBottomSheet}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        {bottomSheetContent}
      </Modal>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within BottomSheetProvider");
  }
  return context;
};
