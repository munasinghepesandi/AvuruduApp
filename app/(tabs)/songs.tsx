import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function SongsScreen() {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>සාම්ප්‍රදායික ජන ගී</Text>
        <View style={styles.card}>
          <Text style={styles.lyrics}>
            ඉර පායනවා ඉරේ රැස් විහිදෙනවා... {"\n"}
            අත්තම්මාගේ රෙදි මල්ලේ කැවුම් පිරෙනවා...
          </Text>
        </View>
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
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    elevation: 6,
    shadowColor: "#180B03",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  lyrics: {
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 30,
    color: "#4A230E",
  },
});
