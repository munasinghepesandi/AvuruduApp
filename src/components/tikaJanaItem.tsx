import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface TikaJanaItemProps {
  name: string;
  artist: string;
  description: string;
  image: string;
}

export default function TikaJanaItem({
  name,
  artist,
  description,
  image,
}: TikaJanaItemProps) {
  return (
    <View style={styles.item}>
      <Image
        source={{ uri: image }}
        style={styles.tikaJanaImage}
        resizeMode="cover"
      />
      <View style={styles.rowTop}>
        <Text style={styles.tag}>ටිකා ජන</Text>
        <Text style={styles.musicIcon}>🎶</Text>
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
    backgroundColor: "rgba(240, 255, 240, 0.92)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#034003",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  tikaJanaImage: {
    width: "100%",
    height: 140,
    backgroundColor: "rgba(200, 220, 200, 0.3)",
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tag: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2d5016",
    backgroundColor: "rgba(100, 200, 100, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  musicIcon: {
    fontSize: 18,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a3a0f",
    marginTop: 12,
    paddingHorizontal: 16,
  },
  metaWrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: 8,
  },
  artistText: {
    fontSize: 13,
    color: "#3d6e1f",
    fontWeight: "500",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 12,
    color: "#558833",
    lineHeight: 16,
  },
});
