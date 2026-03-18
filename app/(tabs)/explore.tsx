import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { GAMES_DATA } from "../../src/data/games"; // Path එක නිවැරදිදැයි බලන්න

export default function ExploreScreen() {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>අවුරුදු ක්‍රීඩා</Text>

        {GAMES_DATA.map((game) => (
          <View key={game.id} style={styles.gameCard}>
            <Text style={styles.gameName}>🏆 {game.name}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
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
  content: {
    padding: 20,
    paddingBottom: 110,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 16,
    color: "#FFF0DB",
    fontWeight: "700",
  },
  gameCard: {
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
  gameName: {
    fontSize: 22,
    color: "#4A230E",
    marginBottom: 6,
    fontWeight: "700",
  },
  gameDescription: { fontSize: 15, color: "#5f4d45", lineHeight: 22 },
});
