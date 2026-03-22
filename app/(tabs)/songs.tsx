import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageToggle from "../../src/components/language-toggle";
import { useLanguage } from "../../src/context/language-context";
import { responsive } from "../../src/utils/responsive";

type SongItem = {
  id: string;
  title: string;
  titleEn: string;
  image: string;
};

const SONG_LIST: SongItem[] = [
  {
    id: "1",
    title: "කොහෝ කොහෝ ...",
    titleEn: "Koho Koho...",
    image: "https://www.lklyrics.com/img/songs/sanath_nandasiri/koho_koho_.png",
  },
  {
    id: "2",
    title: "මේ අවුරුදු කාලේ ...",
    titleEn: "Me Avurudu Kale...",
    image:
      "https://www.lklyrics.com/img/songs/lionel_ranwala/me_awurudu_kale.png",
  },
  {
    id: "3",
    title: "මී අඹ අත්තේ ...",
    titleEn: "Mee Amba Atthe...",
    image:
      "https://www.lklyrics.com/img/songs/milton_mallawarachchi/mee_amba_aththe.png",
  },
  {
    id: "4",
    title: "නාඩන් පුංචි හිරමනේ ...",
    titleEn: "Nadan Punchi Hiramane...",
    image:
      "https://www.lklyrics.com/img/songs/pradeepa_dharmadasa/nadan_punchi_hiramane.png",
  },
  {
    id: "5",
    title: "බැද්ද පුරා සුදු රෙද්ද ...",
    titleEn: "Badda Pura Sudu Redda...",
    image:
      "https://www.lklyrics.com/img/songs/amitha_wadisinghe/baddha_pura_sudu_redda.png",
  },
  {
    id: "6",
    title: "එරබදු මල් පිපිලා...",
    titleEn: "Erabadu Mal Pipila...",
    image:
      "https://www.lklyrics.com/img/songs/nelu_adhikari/erabadu_mal_pipila.png",
  },
  {
    id: "7",
    title: "ඇවිල්ල ඇවිල්ලා ...",
    titleEn: "Avilla Avilla...",
    image:
      "https://www.lklyrics.com/img/songs/ishark_beg/awilla_awilla_sinhala_aurudda_awilla.png",
  },
  {
    id: "8",
    title: "සිරිලක පිරි අවුරුදු සිරි ...",
    titleEn: "Sirilaka Piri Avurudu Siri...",
    image:
      "https://www.lklyrics.com/img/songs/amal_perera/sirilaka_piri_awurudu_siri.png",
  },
  {
    id: "9",
    title: "ආල පුරන්නට ...",
    titleEn: "Aala Purannata...",
    image: "https://www.lklyrics.com/img/songs/centigradz/aala_purannata.png",
  },
  {
    id: "10",
    title: "සුබ සිහිනේ යාවී ...",
    titleEn: "Suba Sihine Yavi...",
    image:
      "https://www.lklyrics.com/img/songs/deshan_thuvan/suba_sihine_yavi.png",
  },
  {
    id: "11",
    title: "අවුරුදු ආවා ...",
    titleEn: "Avurudu Awa...",
    image: "https://www.lklyrics.com/img/songs/jothipala_h_r/awurudu_awa.png",
  },
  {
    id: "12",
    title: "රූ වරුණා ...",
    titleEn: "Ru Waruna...",
    image: "https://www.lklyrics.com/img/songs/centigradz/ru_waruna.png",
  },
  {
    id: "13",
    title: "කන්ද උඩින් ...",
    titleEn: "Kanda Udin...",
    image:
      "https://song.sgp1.digitaloceanspaces.com/image/lyrics/2020/08/1255.jpg",
  },
  {
    id: "14",
    title: "සූරිය මංගල්ලේ ...",
    titleEn: "Sooriya Mangalle...",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7fqAZNScrBg7IdLlcINOqVhyYGALxzyYYA&s",
  },
  {
    id: "15",
    title: "අවුරුදු ලගා වුණා ...",
    titleEn: "Avurudu Langa Una...",
    image:
      "https://www.lklyrics.com/img/songs/jothipala_h_r/awurudu_langa_una.png",
  },
  {
    id: "17",
    title: "පුංචි පැලත් ...",
    titleEn: "Punchi Palath...",
    image:
      "https://www.lklyrics.com/img/songs/chandraleka_perera/punchi_palath.png",
  },
];

const YOUTUBE_VIDEOS = [
  {
    id: "v1",
    title: "අවුරුදු ගීත එකතුව 1",
    titleEn: "Avurudu Song Mix 1",
    url: "https://youtu.be/ZX5uJRoDPtM?si=u4ewSni3ju59RR4P",
    thumbnail: "https://i.ytimg.com/vi/ZX5uJRoDPtM/mqdefault.jpg",
  },
  {
    id: "v2",
    title: "අවුරුදු ගීත එකතුව 2",
    titleEn: "Avurudu Song Mix 2",
    url: "https://youtu.be/oTllAFW9Jho?si=NxZHJMrNElg0hR4p",
    thumbnail: "https://i.ytimg.com/vi/oTllAFW9Jho/maxresdefault.jpg",
  },
  {
    id: "v3",
    title: "අවුරුදු ගීත එකතුව 3",
    titleEn: "Avurudu Song Mix 3",
    url: "https://youtu.be/AUtr_zNUNzs?si=4yxtKf4YRCWBAkKw",
    thumbnail: "https://i.ytimg.com/vi/AUtr_zNUNzs/sddefault.jpg?v=660f6d56",
  },
];

export default function SongsScreen() {
  const [selectedSong, setSelectedSong] = useState<SongItem | null>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();

  const title =
    language === "si" ? "අවුරුදු ගී එකතුව" : "Avurudu Song Collection";
  const videoSectionTitle =
    language === "si" ? "යූටියුබ් වීඩියෝ" : "YouTube Videos";
  const openAction =
    language === "si" ? "YouTube එකෙන් අරඹන්න" : "Open on YouTube";
  const listTitle =
    language === "si" ? "ගීත ලැයිස්තුව (lyrics)" : "Song List (Lyrics)";
  const rowAction = language === "si" ? "බලන්න" : "View";

  const openImagePreview = (song: SongItem) => {
    setSelectedSong(song);
    setImageModalVisible(true);
  };

  const openVideo = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/sinhala-avurudu-designs-vector-illustration_1036273-89.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <LanguageToggle />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop:
              insets.top + responsive.spacing["3xl"] + responsive.spacing.md,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>

        <View style={styles.videoSection}>
          <Text style={styles.videoSectionTitle}>{videoSectionTitle}</Text>

          {YOUTUBE_VIDEOS.map((video) => (
            <Pressable
              key={video.id}
              style={({ pressed }) => [
                styles.videoCard,
                pressed && styles.videoCardPressed,
              ]}
              onPress={() => openVideo(video.url)}
            >
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.videoThumbnail}
                resizeMode="cover"
              />
              <View style={styles.videoTextWrap}>
                <Text style={styles.videoTitle}>
                  {language === "si" ? video.title : video.titleEn}
                </Text>
                <Text style={styles.videoAction}>{openAction}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.listCard}>
          <Text style={styles.subtitle}>{listTitle}</Text>

          {SONG_LIST.map((item, index) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.songRow,
                pressed && styles.songRowPressed,
                index === SONG_LIST.length - 1 && styles.lastSongRow,
              ]}
              onPress={() => openImagePreview(item)}
            >
              <View style={styles.songTextWrap}>
                <Text style={styles.songTitle}>
                  {language === "si" ? item.title : item.titleEn}
                </Text>
              </View>
              <Text style={styles.rowAction}>{rowAction}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setImageModalVisible(false)}
        >
          {selectedSong?.image && (
            <Image
              source={{ uri: selectedSong.image }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
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
    paddingHorizontal: responsive.spacing.lg,
    paddingBottom: 110,
  },
  title: {
    fontSize: responsive.fontSize["3xl"],
    marginBottom: responsive.spacing.lg,
    color: "#FFF0DB",
    textAlign: "center",
    fontWeight: "700",
  },
  listCard: {
    backgroundColor: "rgba(255, 248, 236, 0.95)",
    padding: responsive.spacing.md,
    marginTop: responsive.spacing.xl,
    borderRadius: responsive.borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    elevation: 6,
    shadowColor: "#180B03",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  subtitle: {
    fontSize: responsive.fontSize.sm,
    color: "#6A1B0A",
    textAlign: "center",
    marginBottom: responsive.spacing.md,
    fontWeight: "600",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(74, 35, 14, 0.15)",
    paddingVertical: responsive.spacing.md,
    gap: responsive.spacing.sm,
  },
  lastSongRow: {
    borderBottomWidth: 0,
  },
  songRowPressed: {
    opacity: 0.8,
  },
  songTextWrap: {
    flex: 1,
  },
  songTitle: {
    fontSize: responsive.fontSize.base,
    color: "#4A230E",
    fontWeight: "700",
  },
  rowAction: {
    fontSize: responsive.fontSize.xs,
    color: "#B22222",
    fontWeight: "700",
    backgroundColor: "rgba(178, 34, 34, 0.1)",
    paddingHorizontal: responsive.spacing.sm,
    paddingVertical: responsive.spacing.xs,
    borderRadius: 999,
  },
  videoSection: {
    marginTop: responsive.spacing.lg,
    backgroundColor: "rgba(255, 248, 236, 0.95)",
    padding: responsive.spacing.md,
    borderRadius: responsive.borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    gap: responsive.spacing.md,
  },
  videoSectionTitle: {
    fontSize: responsive.fontSize.lg,
    color: "#6A1B0A",
    fontWeight: "700",
  },
  videoCard: {
    borderRadius: responsive.borderRadius.md,
    overflow: "hidden",
    backgroundColor: "#FFF7EE",
    borderWidth: 1,
    borderColor: "rgba(120, 65, 35, 0.2)",
  },
  videoCardPressed: {
    opacity: 0.86,
  },
  videoThumbnail: {
    width: "100%",
    height: responsive.imageHeight.md,
  },
  videoTextWrap: {
    padding: responsive.spacing.md,
  },
  videoTitle: {
    fontSize: responsive.fontSize.base,
    color: "#4A230E",
    fontWeight: "700",
  },
  videoAction: {
    marginTop: responsive.spacing.xs,
    fontSize: responsive.fontSize.sm,
    color: "#B22222",
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.82)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsive.spacing.sm,
  },
  previewImage: {
    width: "100%",
    height: "88%",
  },
});
