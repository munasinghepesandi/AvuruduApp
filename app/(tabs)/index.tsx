import { AbhayaLibre_700Bold, useFonts } from "@expo-google-fonts/abhaya-libre";
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
import LanguageToggle from "../../src/components/language-toggle";
import NakathItem from "../../src/components/nakathItems";
import { useLanguage } from "../../src/context/language-context";
import { Nakath, NAKATH_DATA } from "../../src/data/nakath";
import { responsive } from "../../src/utils/responsive";

const IS_WEB = Platform.OS === "web";

type NakathStatus = "completed" | "upcoming";
type NakathWithStatus = Nakath & { status: NakathStatus };

const resolveMonthIndex = (monthLabel: string) => {
  const normalized = monthLabel.toLowerCase();
  if (normalized.includes("මාර්තු") || normalized.includes("march")) return 2;
  if (normalized.includes("අප්") || normalized.includes("april")) return 3;
  return null;
};

const to24Hour = (period: string, hour: number) => {
  const normalized = period.toUpperCase();

  if ((period === "ප.ව." || normalized === "PM") && hour < 12) {
    return hour + 12;
  }

  if ((period === "පෙ.ව." || normalized === "AM") && hour === 12) {
    return 0;
  }

  return hour;
};

const getNakathRange = (timeLabel: string, year: number) => {
  const clean = timeLabel.trim();

  const dayRangeMatch = clean.match(
    /^(මාර්තු|අප්‍රේල්|March|April)\s*(\d{1,2})-(\d{1,2})$/i,
  );
  if (dayRangeMatch) {
    const monthIndex = resolveMonthIndex(dayRangeMatch[1]);
    if (monthIndex === null) return null;

    const startDay = Number(dayRangeMatch[2]);
    const endDay = Number(dayRangeMatch[3]);
    return {
      start: new Date(year, monthIndex, startDay, 0, 0, 0, 0),
      end: new Date(year, monthIndex, endDay, 23, 59, 59, 999),
    };
  }

  const exactTimeMatch = clean.match(
    /^(මාර්තු|අප්‍රේල්|March|April)\s*(\d{1,2})\s*-\s*(පෙ\.ව\.|ප\.ව\.|AM|PM)\s*(\d{1,2}):(\d{2})$/i,
  );
  if (exactTimeMatch) {
    const monthIndex = resolveMonthIndex(exactTimeMatch[1]);
    if (monthIndex === null) return null;

    const day = Number(exactTimeMatch[2]);
    const period = exactTimeMatch[3];
    const hour = to24Hour(period, Number(exactTimeMatch[4]));
    const minute = Number(exactTimeMatch[5]);
    const exact = new Date(year, monthIndex, day, hour, minute, 0, 0);

    return { start: exact, end: exact };
  }

  const dayOnlyMatch = clean.match(
    /^(මාර්තු|අප්‍රේල්|March|April)\s*(\d{1,2})$/i,
  );
  if (dayOnlyMatch) {
    const monthIndex = resolveMonthIndex(dayOnlyMatch[1]);
    if (monthIndex === null) return null;

    const day = Number(dayOnlyMatch[2]);
    return {
      start: new Date(year, monthIndex, day, 0, 0, 0, 0),
      end: new Date(year, monthIndex, day, 23, 59, 59, 999),
    };
  }

  return null;
};

const getNakathStatus = (
  item: Nakath,
  now: Date,
  language: "si" | "en",
): NakathStatus => {
  const timeLabel = language === "si" ? item.time : item.timeEn;
  const range = getNakathRange(timeLabel, now.getFullYear());
  if (!range) return "upcoming";
  return now.getTime() > range.end.getTime() ? "completed" : "upcoming";
};

export default function NakathScreen() {
  const { language } = useLanguage();
  const isSinhala = language === "si";
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedNakath, setSelectedNakath] = useState<Nakath | null>(null);
  const [nakathModalVisible, setNakathModalVisible] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useState(new Animated.Value(1))[0];
  const [fontsLoaded] = useFonts({ AbhayaLibre_700Bold });

  const ui = {
    splashTitle: isSinhala ? "ආයුබෝවන්" : "Welcome",
    splashSubtitle: isSinhala
      ? "සුබ අලුත් අවුරුද්දක් වේවා!"
      : "Happy Sinhala & Tamil New Year!",
    heroTitle: isSinhala
      ? "සුබ අලුත් අවුරුද්දක් වේවා!"
      : "Happy Sinhala & Tamil New Year!",
    clockCaption: isSinhala ? "සජීවී අවුරුදු වේලාව" : "Live Avurudu Time",
    sectionTitle: isSinhala
      ? "සිංහල අලුත් අවුරුදු නැකත්"
      : "Sinhala New Year Nakath",
    completedTitle: isSinhala ? "අවසන් චාරිත්‍ර" : "Completed Rituals",
    upcomingTitle: isSinhala ? "ඉදිරියට ඇති චාරිත්‍ර" : "Upcoming Rituals",
    noCompleted: isSinhala
      ? "තවම අවසන් වූ චාරිත්‍ර නොමැත."
      : "No completed rituals yet.",
    eventCount: isSinhala ? "සිදුවීම්" : "Events",
    timeLabel: isSinhala ? "🕒 වේලාව:" : "🕒 Time:",
    statusCompleted: isSinhala ? "✅ තත්ත්වය: අවසන්" : "✅ Status: Completed",
    statusUpcoming: isSinhala ? "⏳ තත්ත්වය: ඉදිරියට" : "⏳ Status: Upcoming",
    colorLabel: isSinhala ? "🎨 වර්ණය:" : "🎨 Color:",
    noColor: isSinhala ? "නැත" : "None",
    reminderButton: isSinhala ? "මතක් කිරීම දාන්න" : "Set Reminder",
    closeButton: isSinhala ? "වසන්න" : "Close",
    reminderTitle: isSinhala ? "මතක් කිරීමක් සැකසුවා" : "Reminder Set",
    reminderBody: isSinhala
      ? "සඳහා විනාඩි 5කට පෙර දැනුම් දෙනු ඇත."
      : "will be notified 5 minutes earlier.",
    reminderNotificationTitle: isSinhala
      ? "අවුරුදු නැකත් මතක් කිරීම"
      : "Avurudu Nakath Reminder",
    reminderNotificationBody: isSinhala
      ? "සඳහා වේලාව පැමිණ ඇත!"
      : "time has arrived!",
    upcomingBadge: isSinhala ? "ඉදිරියේදී" : "Upcoming",
    completedBadge: isSinhala ? "පසුගිය" : "Completed",
  };

  const getLocalizedEvent = (item: Nakath) =>
    isSinhala ? item.event : item.eventEn;
  const getLocalizedTime = (item: Nakath) =>
    isSinhala ? item.time : item.timeEn;
  const getLocalizedDescription = (item: Nakath) =>
    isSinhala ? item.description : item.descriptionEn;

  // On web, always show the app even if fonts are loading
  const shouldRender = IS_WEB || fontsLoaded;

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

  const formattedTime = currentTime.toLocaleTimeString(
    isSinhala ? "si-LK" : "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    },
  );

  const nakathWithStatus: NakathWithStatus[] = NAKATH_DATA.map((item) => ({
    ...item,
    status: getNakathStatus(item, currentTime, language),
  }));
  const completedNakath = nakathWithStatus.filter(
    (item) => item.status === "completed",
  );
  const upcomingNakath = nakathWithStatus.filter(
    (item) => item.status === "upcoming",
  );
  const selectedNakathStatus = selectedNakath
    ? getNakathStatus(selectedNakath, currentTime, language)
    : null;

  const setReminder = async (event: string) => {
    if (Platform.OS !== "web") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: ui.reminderNotificationTitle,
          body: `${event} ${ui.reminderNotificationBody}`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    }
    Alert.alert(ui.reminderTitle, `${event} ${ui.reminderBody}`);
  };

  if (!shouldRender) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
              <Text style={[styles.splashTitle, styles.font]}>
                {ui.splashTitle}
              </Text>
              <Text style={[styles.splashSubtitle, styles.font]}>
                {ui.splashSubtitle}
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
        <LanguageToggle />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <Text style={[styles.heroBadge, styles.font]}>
              Pesandi Munasinghe | v1.0.0 Avurudu 2026
            </Text>
            <Text style={[styles.heroTitle, styles.font]}>{ui.heroTitle}</Text>

            <View style={styles.clockCard}>
              <Text style={[styles.dateText, styles.font]}>
                {currentTime.toLocaleDateString(isSinhala ? "si-LK" : "en-US")}
              </Text>
              <Text style={styles.liveTime}>{formattedTime}</Text>
              <Text style={styles.clockCaption}>{ui.clockCaption}</Text>
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
              {ui.sectionTitle}
            </Text>
            <Text style={styles.sectionMeta}>
              {NAKATH_DATA.length} {ui.eventCount}
            </Text>
          </View>

          <View style={styles.statusSectionHeader}>
            <Text style={[styles.statusSectionTitle, styles.font]}>
              {ui.completedTitle}
            </Text>
            <Text style={styles.statusSectionCount}>
              {completedNakath.length}
            </Text>
          </View>
          {completedNakath.length === 0 ? (
            <Text style={styles.emptyState}>{ui.noCompleted}</Text>
          ) : (
            completedNakath.map((item) => (
              <Pressable
                key={`completed-${item.id}`}
                onPress={() => handleNakathPress(item)}
                style={({ pressed }) => [
                  styles.itemPressable,
                  pressed && styles.itemPressed,
                ]}
              >
                <NakathItem
                  event={getLocalizedEvent(item)}
                  time={getLocalizedTime(item)}
                  isUpcoming={item.status === "upcoming"}
                  upcomingLabel={ui.upcomingBadge}
                  completedLabel={ui.completedBadge}
                />
              </Pressable>
            ))
          )}

          <View style={styles.statusSectionHeader}>
            <Text style={[styles.statusSectionTitle, styles.font]}>
              {ui.upcomingTitle}
            </Text>
            <Text style={styles.statusSectionCount}>
              {upcomingNakath.length}
            </Text>
          </View>
          {upcomingNakath.map((item) => (
            <Pressable
              key={`upcoming-${item.id}`}
              onPress={() => handleNakathPress(item)}
              style={({ pressed }) => [
                styles.itemPressable,
                pressed && styles.itemPressed,
              ]}
            >
              <NakathItem
                event={getLocalizedEvent(item)}
                time={getLocalizedTime(item)}
                isUpcoming={item.status === "upcoming"}
                upcomingLabel={ui.upcomingBadge}
                completedLabel={ui.completedBadge}
              />
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
                {selectedNakath ? getLocalizedEvent(selectedNakath) : ""}
              </Text>

              <Text style={styles.modalMeta}>
                {ui.timeLabel}{" "}
                {selectedNakath ? getLocalizedTime(selectedNakath) : ""}
              </Text>
              <Text
                style={[
                  styles.modalMeta,
                  selectedNakathStatus === "completed"
                    ? styles.completedMeta
                    : styles.upcomingMeta,
                ]}
              >
                {selectedNakathStatus === "completed"
                  ? ui.statusCompleted
                  : ui.statusUpcoming}
              </Text>
              <Text style={styles.modalMeta}>
                {ui.colorLabel} {selectedNakath?.color?.trim() || ui.noColor}
              </Text>

              <Text style={styles.modalDescription}>
                {selectedNakath ? getLocalizedDescription(selectedNakath) : ""}
              </Text>

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.reminderButton]}
                  onPress={() => {
                    if (selectedNakath) {
                      setReminder(getLocalizedEvent(selectedNakath));
                    }
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    {ui.reminderButton}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.closeButton]}
                  onPress={() => setNakathModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>{ui.closeButton}</Text>
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
    paddingHorizontal: responsive.spacing.lg,
    paddingTop: responsive.spacing["3xl"],
    paddingBottom: 120,
    gap: responsive.spacing.md,
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
    gap: responsive.spacing.xl,
  },
  splashTitle: {
    fontSize: responsive.fontSize["5xl"],
    color: "#FFF0DB",
    fontWeight: "800",
    letterSpacing: 2,
    textShadowColor: "#6A1B0A",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  splashSubtitle: {
    fontSize: responsive.fontSize["2xl"],
    color: "#FFD5A3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },
  splashLoader: {
    flexDirection: "row",
    gap: responsive.spacing.sm,
    marginTop: responsive.spacing.lg,
  },
  loaderDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#B22222",
  },
  heroCard: {
    marginTop: responsive.spacing["3xl"],
    borderRadius: responsive.borderRadius.xl,
    padding: responsive.spacing.lg,
    backgroundColor: "rgba(243, 234, 212, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#e57b11",
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    gap: responsive.spacing.sm,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#B22222",
    color: "#fff",
    paddingHorizontal: responsive.spacing.md,
    paddingVertical: responsive.spacing.xs,
    borderRadius: 999,
    fontSize: responsive.fontSize.xs,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: responsive.fontSize["3xl"],
    textAlign: "center",
    color: "#6A1B0A",
    lineHeight: responsive.fontSize["4xl"],
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
    borderRadius: responsive.borderRadius.full,
    width: "100%",
    alignSelf: "center",
    paddingVertical: responsive.spacing.md,
    paddingHorizontal: responsive.spacing.md,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
  },
  dateText: {
    fontSize: responsive.fontSize.lg,
    color: "#6f0303",
    marginBottom: responsive.spacing.xs,
  },
  liveTime: {
    fontSize: responsive.fontSize["4xl"],
    fontWeight: "800",
    color: "#7a0707",
    letterSpacing: 1,
  },
  clockCaption: {
    marginTop: responsive.spacing.xs,
    fontSize: responsive.fontSize.xs,
    color: "#e22222",
    letterSpacing: 0.3,
  },

  sectionHeaderRow: {
    marginTop: responsive.spacing.xs,
    marginBottom: responsive.spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: responsive.fontSize["2xl"],
    color: "#f5e5e5",
  },
  sectionMeta: {
    fontSize: responsive.fontSize.sm,
    color: "#FFD5A3",
    fontWeight: "600",
  },
  statusSectionHeader: {
    marginTop: responsive.spacing.sm,
    marginBottom: responsive.spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusSectionTitle: {
    fontSize: responsive.fontSize.base,
    color: "#FFF2DE",
  },
  statusSectionCount: {
    fontSize: responsive.fontSize.xs,
    color: "#FFE2B8",
    backgroundColor: "rgba(106, 27, 10, 0.5)",
    paddingHorizontal: responsive.spacing.sm,
    paddingVertical: responsive.spacing.xs,
    borderRadius: 999,
    fontWeight: "700",
  },
  emptyState: {
    color: "#FFEDCF",
    fontSize: responsive.fontSize.sm,
    marginBottom: responsive.spacing.sm,
  },
  itemPressable: {
    borderRadius: responsive.borderRadius.xl,
    marginBottom: responsive.spacing.sm,
  },
  itemPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: responsive.spacing.xl,
  },
  modalCard: {
    backgroundColor: "#FFF5EA",
    borderRadius: responsive.borderRadius.lg,
    padding: responsive.spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  modalTitle: {
    fontSize: responsive.fontSize["2xl"],
    color: "#6A1B0A",
    marginBottom: responsive.spacing.md,
    textAlign: "center",
  },
  modalMeta: {
    fontSize: responsive.fontSize.base,
    color: "#5B2A16",
    marginBottom: responsive.spacing.xs,
    fontWeight: "600",
  },
  completedMeta: {
    color: "#B22222",
  },
  upcomingMeta: {
    color: "#1D6B2A",
  },
  modalDescription: {
    marginTop: responsive.spacing.sm,
    fontSize: responsive.fontSize.base,
    lineHeight: responsive.fontSize.xl,
    color: "#452013",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: responsive.spacing.sm,
    marginTop: responsive.spacing.lg,
  },
  modalButton: {
    flex: 1,
    paddingVertical: responsive.spacing.md,
    borderRadius: responsive.borderRadius.md,
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
