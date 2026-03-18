import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";
import ColorPicker from "react-native-wheel-color-picker";

export default function GreetingsScreen() {
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
    const uri = await viewShotRef.current.capture();
    await Sharing.shareAsync(uri);
  };

  return (
    <ImageBackground style={styles.screen}>
      <View style={styles.overlay} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
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
            <Text style={styles.btnText}>Photo 🖼️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#B85D1A" }]}
            onPress={() => setShowColorPicker(true)}
          >
            <Text style={styles.btnText}>Color 🎨</Text>
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
              {name ? (
                <Text style={styles.senderText}>මීට - {name}</Text>
              ) : null}
            </View>
          </ImageBackground>
        </ViewShot>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={[styles.btnText, { fontSize: 18 }]}>
            මිතුරන්ට යවන්න 📤
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
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 18,
    color: "#FFF0DB",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "rgba(255, 248, 236, 0.93)",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: "#7A2816",
    padding: 14,
    borderRadius: 14,
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
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  wishText1: {
    fontSize: 15,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowRadius: 8,
  },
  wishText2: {
    fontSize: 34,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowRadius: 8,
  },
  senderText: { fontSize: 22, color: "#fff", marginTop: 15 },
  shareBtn: {
    backgroundColor: "#B22222",
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700", letterSpacing: 0.3 },
  closeBtn: {
    backgroundColor: "#b22222",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
