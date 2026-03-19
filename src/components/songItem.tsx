import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface SongProps {
  name: string;
  artist: string;
  description: string;
  image: string;
}

export default function SongItem({
  name,
  artist,
  description,
  image,
}: SongProps) {
  return (
    <View style={styles.item}>
      <Image
        source={{ uri: image }}
        style={styles.songImage}
        resizeMode="cover"
      />
      <View style={styles.rowTop}>
        <Text style={styles.tag}>ගීතය</Text>
        <Text style={styles.musicIcon}>🎵</Text>
      </View>

      <Text style={styles.nameText}>{name}</Text>

      <View style={styles.metaWrap}>
        <Text style={styles.artistText}>🎤 {artist}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    overflow: "hidden",
    backgroundColor: "rgba(255, 248, 236, 0.92)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#180B03",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  songImage: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tag: {
    fontSize: 11,
    letterSpacing: 0.8,
    color: "#B05A2F",
    fontWeight: "700",
  },
  musicIcon: {
    fontSize: 18,
  },
  nameText: {
    fontSize: 22,
    color: "#4A230E",
    lineHeight: 28,
    fontFamily: "AbhayaLibre_700Bold",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  metaWrap: {
    gap: 4,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  artistText: {
    fontSize: 15,
    color: "#A93D1A",
    fontWeight: "700",
  },
  descriptionText: {
    fontSize: 13,
    color: "#6B4423",
    lineHeight: 18,
    marginTop: 6,
  },
});
