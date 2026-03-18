import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NakathProps {
  event: string;
  time: string;
  color: string;
}

function getColorSwatch(colorLabel: string) {
  const label = colorLabel.toLowerCase();

  if (label.includes("රතු") || label.includes("red")) {
    return "#B22222";
  }

  if (label.includes("කොළ") || label.includes("green")) {
    return "#2E7D32";
  }
  
  if (label.includes("සුදු") || label.includes("white")) {
    return "#ffffff";
  }

  if (label.includes("රන්") || label.includes("gold")) {
    return "#d4b424";
  }

  return "#000000db";
}

export default function NakathItem({ event, time, color }: NakathProps) {
  const swatchColor = getColorSwatch(color);

  return (
    <View style={styles.item}>
      <View style={styles.rowTop}>
        <Text style={styles.tag}>NAKATH</Text>
        <View style={[styles.colorDot, { backgroundColor: swatchColor }]} />
      </View>

      <Text style={styles.eventText}>{event}</Text>

      <View style={styles.metaWrap}>
        <Text style={styles.timeText}>⏰ {time}</Text>
        <Text style={styles.colorText}>🎨 වර්ණය: {color}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
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
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tag: {
    fontSize: 11,
    letterSpacing: 0.8,
    color: "#B05A2F",
    fontWeight: "700",
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#000000",
  },
  eventText: {
    fontSize: 22,
    color: "#4A230E",
    lineHeight: 28,
    fontFamily: "AbhayaLibre_700Bold",
  },
  metaWrap: {
    marginTop: 8,
    gap: 4,
  },
  timeText: {
    fontSize: 15,
    color: "#A93D1A",
    fontWeight: "700",
  },
  colorText: {
    fontSize: 14,
    color: "#3E4B2F",
    fontWeight: "600",
  },
});
