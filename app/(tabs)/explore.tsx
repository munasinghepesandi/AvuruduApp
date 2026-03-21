import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAMES_DATA } from "../../src/data/games";
import { responsive } from "../../src/utils/responsive";

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop:
              insets.top + responsive.spacing["3xl"] + responsive.spacing.md,
            paddingBottom: insets.bottom + 112,
            paddingHorizontal: isSmallScreen ? 14 : 20,
          },
        ]}
      >
        <Text style={[styles.title, { fontSize: isSmallScreen ? 25 : 30 }]}>
          අවුරුදු ක්‍රීඩා
        </Text>

        {GAMES_DATA.map((game) => (
          <View
            key={game.id}
            style={[styles.gameCard, { padding: isSmallScreen ? 14 : 16 }]}
          >
            <Text
              style={[styles.gameName, { fontSize: isSmallScreen ? 19 : 22 }]}
            >
              🏆 {game.name}
            </Text>
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
    gap: 8,
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
