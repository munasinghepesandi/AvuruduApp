import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const FOOD_DATA = [
  {
    name: "කිරිබත්",
    desc: "අලුත් අවුරුද්දේ පළමු ආහාරය. කිරි සහ බත් එක්ව පිසිනු ලබන සුස්වාදු කෑමකි.",
  },
  {
    name: "කැවුම්",
    desc: "සිංහල සංස්කෘතියේ සංකේතයක් බඳු රසකැවිල්ලකි. වතුර සහ සක්කරයින් සාදන ලද.",
  },
  {
    name: "කොකිස්",
    desc: "කුඩා ළමුන්ගේ ප්‍රියතම අවුරුදු කෑමකි. රසවත් සහ කුස්ස clear කිරීම සඳහා මඳ.",
  },
  {
    name: "අලුවා",
    desc: "බඩ turner සහ නිවුඩු පිටි සාදන සරිසැලෙන් ගිණුම්. අවුරුදු සෙතින් සැම දිනම සිදුවන සුස්වාදු.",
  },
  
  {
    name: "දොදොල් ",
    desc: "කිරි, සක්කර සහ සෙතින් සාදන ලද මෘදු සහ රසවත් කෑමකි. අවුරුදු සමයේ විශේෂයෙන් සැලකෙන කෑමකි.",
  },

  {
    name: "ආස්මි",
    desc: "කුඩා ළමුන්ගේ ප්‍රියතම අවුරුදු කෑමකි.",
  },
  
];

export default function FoodScreen() {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>අවුරුදු කෑම වර්ග</Text>
        {FOOD_DATA.map((food, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.name}>{food.name}</Text>
            <Text style={styles.desc}>{food.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 13, 6, 0.38)",
  },
  content: { padding: 20, paddingBottom: 110 },
  title: {
    fontSize: 30,
    marginBottom: 16,
    color: "#FFF0DB",
    textAlign: "center",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "rgba(255, 248, 236, 0.93)",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    elevation: 6,
    shadowColor: "#180B03",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  name: {
    fontSize: 22,
    color: "#4A230E",
    marginBottom: 4,
    fontWeight: "700",
  },
  desc: { color: "#5f4d45", fontSize: 15, lineHeight: 22 },
});
