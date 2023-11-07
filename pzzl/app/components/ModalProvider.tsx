import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { PiecePosition } from "../types/types";

interface ModalContextType {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  promotionColor: string;
  setPromotionColor: Dispatch<SetStateAction<string>>;
  promotionPosition: PiecePosition;
  setPromotionPosition: Dispatch<SetStateAction<PiecePosition>>;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  modalVisible: false,
  setModalVisible: () => {},
  promotionColor: "",
  setPromotionColor: () => {},
  promotionPosition: { row: 0, col: 0 },
  setPromotionPosition: () => {},
});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [promotionColor, setPromotionColor] = useState("");
  const [promotionPosition, setPromotionPosition] = useState({
    row: 0,
    col: 0,
  });

  return (
    <ModalContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        promotionColor,
        setPromotionColor,
        promotionPosition,
        setPromotionPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
