import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import ColorPicker from "react-native-wheel-color-picker";
import { responsive, responsiveFontSize } from "../../src/utils/responsive";

export default function GreetingsScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wishColor, setWishColor] = useState<string>("#FFD700");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const viewShotRef = useRef<any>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();

      if (Platform.OS === "web") {
        if (typeof document === "undefined") {
          Alert.alert(
            "Browser Not Supported",
            "ඔයාගේ browser එක මේ feature එකට support කරන්නේ නැහැ.",
          );
          return;
        }

        const nav = navigator as Navigator & {
          canShare?: (data?: ShareData) => boolean;
        };

        if (typeof nav.share === "function") {
          try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const file = new File([blob], `suba-pathum-${Date.now()}.jpg`, {
              type: blob.type || "image/jpeg",
            });

            if (nav.canShare?.({ files: [file] })) {
              await nav.share({
                title: "සුබ අලුත් අවුරුද්දක් වේවා!",
                text: "මගේ අවුරුදු සුබපැතුම",
                files: [file],
              });
            } else {
              await nav.share({
                title: "සුබ අලුත් අවුරුද්දක් වේවා!",
                text: "මගේ අවුරුදු සුබපැතුම",
              });
            }

            return;
          } catch {
            // If Web Share API fails (or user cancels), fall back to download.
          }
        }

        const link = document.createElement("a");
        link.href = uri;
        link.download = `suba-pathum-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Alert.alert("Download Ready", "පිංතූරය download වුණා.");
        return;
      }

      const canUseExpoShare = await Sharing.isAvailableAsync();
      if (canUseExpoShare) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/jpeg",
          UTI: "public.jpeg",
          dialogTitle: "මිතුරන්ට යවන්න",
        });
        return;
      }

      await Share.share({
        message: "සුබ අලුත් අවුරුද්දක් වේවා!",
        url: uri,
        title: "මිතුරන්ට යවන්න",
      });
    } catch {
      if (Platform.OS === "web") {
        Alert.alert(
          "Browser Not Supported",
          "ඔයාගේ browser එක මේ feature එකට support කරන්නේ නැහැ.",
        );
        return;
      }

      Alert.alert("Share Error", "Share options open කරන්න බැරි වුණා.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
      }}
      style={styles.screen}
    >
      <View style={styles.overlay} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop:
            insets.top + responsive.spacing["3xl"] + responsive.spacing.md,
          paddingBottom: 50,
        }}
      >
        <Text style={styles.title}>ඩිජිටල් සුබපැතුම් පතක් හදමු</Text>

        <TextInput
          style={styles.input}
          placeholder="ඔබේ නම මෙතන ලියන්න..."
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={pickImage}>
            <Text style={styles.btnText}>Photo </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#ad3e07" }]}
            onPress={() => setShowColorPicker(true)}
          >
            <Text style={styles.btnText}>Color </Text>
          </TouchableOpacity>
        </View>

        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
          <ImageBackground
            source={{
              uri:
                selectedImage ||
                "https://elements-resized.envatousercontent.com/elements-video-cover-images/1c58e960-1320-4a7b-894a-2116fdeef6f0/video_preview/video_preview_0000.jpg?w=500&cf_fit=cover&q=85&format=auto&s=950132a778b26ef0c736cc36698d4a91f312485734c210c3100ff9a625e30136",
            }}
            style={styles.card}
          >
            <View style={styles.cardOverlay}>
              <Text style={[styles.wishText1, { color: wishColor }]}>
                ඔබටත් ඔබ පවුලේ සැමටත් සාමය සතුට පිරි
              </Text>
              <Text style={[styles.wishText2, { color: wishColor }]}>
                සුබ අලුත් අවුරුද්දක් වේවා!
              </Text>
              <View style={{ height: 20 }} />
              {name ? (
                <Text style={styles.senderText}>මීට - {name}</Text>
              ) : null}
            </View>
          </ImageBackground>
        </ViewShot>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={[styles.btnText, { fontSize: responsiveFontSize(18) }]}>
            මිතුරන්ට යවන්න
          </Text>
        </TouchableOpacity>

        {/* Color Picker Modal */}
        <Modal visible={showColorPicker} animationType="slide">
          <View style={{ flex: 1, padding: 40, backgroundColor: "#fff" }}>
            <ColorPicker
              color={wishColor}
              onColorChange={setWishColor}
              thumbSize={30}
              noSnap={true}
              row={false}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowColorPicker(false)}
            >
              <Text style={styles.btnText}>Apply Color</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ddecaa" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 13, 6, 0.38)",
  },
  container: { flex: 1, paddingHorizontal: 20 },
  title: {
    fontSize: responsiveFontSize(30),
    textAlign: "center",
    marginTop: responsive.spacing.sm,
    marginBottom: responsive.spacing.lg,
    color: "#FFF0DB",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "rgba(255, 248, 236, 0.93)",
    padding: responsive.spacing.md,
    borderRadius: responsive.borderRadius.md,
    marginBottom: responsive.spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    fontSize: responsiveFontSize(15),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: "#920606",
    padding: responsive.spacing.md,
    borderRadius: responsive.borderRadius.md,
    width: "48%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: 300,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  wishText1: {
    fontSize: responsiveFontSize(15),
    textAlign: "center",
    textShadowColor: "#b00000",
    textShadowRadius: 8,
  },
  wishText2: {
    fontSize: responsiveFontSize(34),
    textAlign: "center",
    textShadowColor: "#000",
    textShadowRadius: 8,
  },
  senderText: {
    fontSize: responsiveFontSize(15),
    color: "#fff",
    marginTop: responsive.spacing.md,
  },
  shareBtn: {
    backgroundColor: "#680e06",
    padding: responsive.spacing.md,
    borderRadius: responsive.borderRadius.md,
    marginTop: responsive.spacing.xl,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.3,
    fontSize: responsiveFontSize(15),
  },
  closeBtn: {
    backgroundColor: "#b22222",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
