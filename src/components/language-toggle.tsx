import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../context/language-context";

type LanguageOption = "si" | "en";

const OPTIONS: { key: LanguageOption; label: string }[] = [
  { key: "si", label: "සිංහල" },
  { key: "en", label: "English" },
];

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const isActive = option.key === language;

        return (
          <Pressable
            key={option.key}
            style={[styles.option, isActive && styles.activeOption]}
            onPress={() => setLanguage(option.key)}
          >
            <Text
              style={[styles.optionText, isActive && styles.activeOptionText]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 999,
    flexDirection: "row",
    backgroundColor: "rgba(255, 244, 224, 0.95)",
    borderRadius: 999,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  activeOption: {
    backgroundColor: "#B22222",
  },
  optionText: {
    color: "#6A1B0A",
    fontSize: 12,
    fontWeight: "700",
  },
  activeOptionText: {
    color: "#fff",
  },
});
