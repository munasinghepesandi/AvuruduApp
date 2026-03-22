import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

export type AppLanguage = "si" | "en";

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<AppLanguage>("si");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "si" ? "en" : "si")),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
