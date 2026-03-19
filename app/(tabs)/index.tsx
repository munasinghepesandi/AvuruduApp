import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NakathItem from "../../src/components/nakathItems";
import { Nakath, NAKATH_DATA } from "../../src/data/nakath";
// අප පෙර install කළ Font එක භාවිතා කරමු
import { AbhayaLibre_700Bold, useFonts } from "@expo-google-fonts/abhaya-libre";

export default function NakathScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedNakath, setSelectedNakath] = useState<Nakath | null>(null); // තෝරාගත් නැකත තබා ගැනීමට
  const [nakathModalVisible, setNakathModalVisible] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useState(new Animated.Value(1))[0];
  let [fontsLoaded] = useFonts({ AbhayaLibre_700Bold });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Splash screen animation
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
    }, 5000);

    return () => clearTimeout(splashTimer);
  }, [splashOpacity]);

  const handleNakathPress = (item: Nakath) => {
    setSelectedNakath(item);
    setNakathModalVisible(true);
  };

  const formattedTime = currentTime.toLocaleTimeString("si-LK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const setReminder = async (event: string) => {
    if (Platform.OS !== "web") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "අවුරුදු නැකත් මතක් කිරීම",
          body: `${event} සඳහා වේලාව පැමිණ ඇත!`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    }
    Alert.alert(
      "මතක් කිරීමක් සැකසුවා",
      `${event} සඳහා විනාඩි 5කට පෙර දැනුම් දෙනු ඇත.`,
    );
  };

  if (!fontsLoaded) return null;

  return (
    <>
      {showSplash && (
        <Animated.View
          style={[styles.splashContainer, { opacity: splashOpacity }]}
        >
          <ImageBackground
            source={{
              uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
            }}
            style={styles.splashBackground}
          >
            <View style={styles.splashOverlay} />
            <View style={styles.splashContent}>
              <Text style={[styles.splashTitle, styles.font]}>ආයුබෝවන්</Text>
              <Text style={[styles.splashSubtitle, styles.font]}>
                සුබ අලුත් අවුරුද්දක් වේවා!
              </Text>
              <View style={styles.splashLoader}>
                <View style={styles.loaderDot} />
                <View style={styles.loaderDot} />
                <View style={styles.loaderDot} />
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      )}
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
        }}
        style={styles.container}
      >
        <View style={styles.overlay} />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <Text style={[styles.heroBadge, styles.font]}>
              Pesandi Munasinghe | v1.0.0 Avurudu 2026
            </Text>
            <Text style={[styles.heroTitle, styles.font]}>
              සුබ අලුත් අවුරුද්දක් වේවා!
            </Text>

            <View style={styles.clockCard}>
              <Text style={[styles.dateText, styles.font]}>
                {currentTime.toLocaleDateString("si-LK")}
              </Text>
              <Text style={styles.liveTime}>{formattedTime}</Text>
              <Text style={styles.clockCaption}>Live Avurudu Time</Text>
            </View>

            {/* <Image
            source={{
              uri: "https://img.freepik.com/free-vector/realistic-sinhala-tamil-new-year-illustration_23-2148883652.jpg",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          /> */}
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, styles.font]}>
              සිංහල අලුත් අවුරුදු නැකත්
            </Text>
            <Text style={styles.sectionMeta}>{NAKATH_DATA.length} Events</Text>
          </View>

          {NAKATH_DATA.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handleNakathPress(item)}
              style={({ pressed }) => [
                styles.itemPressable,
                pressed && styles.itemPressed,
              ]}
            >
              <NakathItem {...item} />
            </Pressable>
          ))}
        </ScrollView>

        <Modal
          visible={nakathModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setNakathModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={[styles.modalTitle, styles.font]}>
                {selectedNakath?.event}
              </Text>

              <Text style={styles.modalMeta}>
                🕒 වේලාව: {selectedNakath?.time}
              </Text>
              <Text style={styles.modalMeta}>
                🎨 වර්ණය: {selectedNakath?.color || "අදාළ නොවේ"}
              </Text>

              <Text style={styles.modalDescription}>
                {selectedNakath?.description}
              </Text>

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.reminderButton]}
                  onPress={() => {
                    if (selectedNakath) {
                      setReminder(selectedNakath.event);
                    }
                  }}
                >
                  <Text style={styles.modalButtonText}>මතක් කිරීම දාන්න</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.closeButton]}
                  onPress={() => setNakathModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>වසන්න</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 13, 6, 0.48)",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 36,
    gap: 14,
  },
  font: {
    fontFamily: "AbhayaLibre_700Bold",
  },
  splashContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  splashBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 13, 6, 0.55)",
  },
  splashContent: {
    alignItems: "center",
    gap: 20,
  },
  splashTitle: {
    fontSize: 56,
    color: "#FFF0DB",
    fontWeight: "800",
    letterSpacing: 2,
    textShadowColor: "#6A1B0A",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  splashSubtitle: {
    fontSize: 28,
    color: "#FFD5A3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },
  splashLoader: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
  loaderDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#B22222",
  },
  heroCard: {
    borderRadius: 26,
    padding: 18,
    backgroundColor: "rgba(243, 234, 212, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#e57b11",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    gap: 10,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#B22222",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 30,
    textAlign: "center",
    color: "#6A1B0A",
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5C3E2C",
  },
  heroImage: {
    width: "100%",
    height: 150,
    borderRadius: 16,
  },
  clockCard: {
    borderRadius: 24,
    width: "100%",
    alignSelf: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    color: "#6f0303",
    marginBottom: 4,
  },
  liveTime: {
    fontSize: 34,
    fontWeight: "800",
    color: "#7a0707",
    letterSpacing: 1,
  },
  clockCaption: {
    marginTop: 2,
    fontSize: 11,
    color: "#e22222",
    letterSpacing: 0.3,
  },

  sectionHeaderRow: {
    marginTop: 4,
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 27,
    color: "#f5e5e5",
  },
  sectionMeta: {
    fontSize: 13,
    color: "#FFD5A3",
    fontWeight: "600",
  },
  itemPressable: {
    borderRadius: 20,
    marginBottom: 10,
  },
  itemPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#FFF5EA",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  modalTitle: {
    fontSize: 28,
    color: "#6A1B0A",
    marginBottom: 12,
    textAlign: "center",
  },
  modalMeta: {
    fontSize: 15,
    color: "#5B2A16",
    marginBottom: 4,
    fontWeight: "600",
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#452013",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  reminderButton: {
    backgroundColor: "#B22222",
  },
  closeButton: {
    backgroundColor: "#8D5A3B",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
