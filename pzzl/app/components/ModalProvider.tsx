import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ModalContextType {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  modalVisible: false,
  setModalVisible: () => {},
});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
