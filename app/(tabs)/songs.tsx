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

type SongItem = {
  id: string;
  title: string;
  image: string;
};

const SONG_LIST: SongItem[] = [
  {
    id: "1",
    title: "කොහෝ කොහෝ ...",
    image: "https://www.lklyrics.com/img/songs/sanath_nandasiri/koho_koho_.png",
  },
  {
    id: "2",
    title: "මේ අවුරුදු කාලේ ...",
    image:
      "https://www.lklyrics.com/img/songs/lionel_ranwala/me_awurudu_kale.png",
  },
  {
    id: "3",
    title: "මී අඹ අත්තේ ...",
    image:
      "https://www.lklyrics.com/img/songs/milton_mallawarachchi/mee_amba_aththe.png",
  },
  {
    id: "4",
    title: "නාඩන් පුංචි හිරමනේ ...",
    image:
      "https://www.lklyrics.com/img/songs/pradeepa_dharmadasa/nadan_punchi_hiramane.png",
  },
  {
    id: "5",
    title: "බැද්ද පුරා සුදු රෙද්ද ...",
    image:
      "https://www.lklyrics.com/img/songs/amitha_wadisinghe/baddha_pura_sudu_redda.png",
  },
  {
    id: "6",
    title: "එරබදු මල් පිපිලා...",
    image:
      "https://www.lklyrics.com/img/songs/nelu_adhikari/erabadu_mal_pipila.png",
  },
  {
    id: "7",
    title: "ඇවිල්ල ඇවිල්ලා ...",
    image:
      "https://www.lklyrics.com/img/songs/ishark_beg/awilla_awilla_sinhala_aurudda_awilla.png",
  },
  {
    id: "8",
    title: "සිරිලක පිරි අවුරුදු සිරි ...",
    image:
      "https://www.lklyrics.com/img/songs/amal_perera/sirilaka_piri_awurudu_siri.png",
  },
  {
    id: "9",
    title: "ආල පුරන්නට ...",
    image: "https://www.lklyrics.com/img/songs/centigradz/aala_purannata.png",
  },
  {
    id: "10",
    title: "සුබ සිහිනේ යාවී ...",
    image:
      "https://www.lklyrics.com/img/songs/deshan_thuvan/suba_sihine_yavi.png",
  },
  {
    id: "11",
    title: "අවුරුදු ආවා ...",
    image: "https://www.lklyrics.com/img/songs/jothipala_h_r/awurudu_awa.png",
  },
  {
    id: "12",
    title: "රූ වරුණා ...",
    image: "https://www.lklyrics.com/img/songs/centigradz/ru_waruna.png",
  },
  {
    id: "13",
    title: "කන්ද උඩින් ...",
    image:
      "https://song.sgp1.digitaloceanspaces.com/image/lyrics/2020/08/1255.jpg",
  },
  {
    id: "14",
    title: "සූරිය මංගල්ලේ ...",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7fqAZNScrBg7IdLlcINOqVhyYGALxzyYYA&s",
  },
  {
    id: "15",
    title: "අවුරුදු ලගා වුණා ...",
    image:
      "https://www.lklyrics.com/img/songs/jothipala_h_r/awurudu_langa_una.png",
  },
  {
    id: "17",
    title: "පුංචි පැලත් ...",
    image:
      "https://www.lklyrics.com/img/songs/chandraleka_perera/punchi_palath.png",
  },
];

const YOUTUBE_VIDEOS = [
  {
    id: "v1",
    title: "අවුරුදු ගීත එකතුව 1",
    url: "https://youtu.be/ZX5uJRoDPtM?si=u4ewSni3ju59RR4P",
    thumbnail: "https://i.ytimg.com/vi/ZX5uJRoDPtM/mqdefault.jpg",
  },
  {
    id: "v2",
    title: "අවුරුදු ගීත එකතුව 2",
    url: "https://youtu.be/oTllAFW9Jho?si=NxZHJMrNElg0hR4p",
    thumbnail: "https://i.ytimg.com/vi/oTllAFW9Jho/maxresdefault.jpg",
  },
  {
    id: "v3",
    title: "අවුරුදු ගීත එකතුව 3",
    url: "https://youtu.be/AUtr_zNUNzs?si=4yxtKf4YRCWBAkKw",
    thumbnail: "https://i.ytimg.com/vi/AUtr_zNUNzs/sddefault.jpg?v=660f6d56",
  },
];

export default function SongsScreen() {
  const [selectedSong, setSelectedSong] = useState<SongItem | null>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>අවුරුදු ගී එකතුව</Text>

        <View style={styles.videoSection}>
          <Text style={styles.videoSectionTitle}>YouTube Videos</Text>

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
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoAction}>Open on YouTube</Text>
              </View>
            </Pressable>
            
          ))}
        </View>
        <br/>

        <View style={styles.listCard}>
          <Text style={styles.subtitle}>ගීත ලැයිස්තුව (lyrics)</Text>

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
                <Text style={styles.songTitle}>{item.title}</Text>
              </View>
              <Text style={styles.rowAction}>View</Text>
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
  content: { padding: 20, paddingBottom: 110 },
  title: {
    fontSize: 30,
    marginBottom: 16,
    color: "#FFF0DB",
    textAlign: "center",
    fontWeight: "700",
  },
  listCard: {
    backgroundColor: "rgba(255, 248, 236, 0.95)",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    elevation: 6,
    shadowColor: "#180B03",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  subtitle: {
    fontSize: 15,
    color: "#6A1B0A",
    textAlign: "center",
    marginBottom: 14,
    fontWeight: "600",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(74, 35, 14, 0.15)",
    paddingVertical: 12,
    gap: 12,
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
    fontSize: 16,
    color: "#4A230E",
    fontWeight: "700",
  },
  rowAction: {
    fontSize: 12,
    color: "#B22222",
    fontWeight: "700",
    backgroundColor: "rgba(178, 34, 34, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  videoSection: {
    marginTop: 14,
    backgroundColor: "rgba(255, 248, 236, 0.95)",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    gap: 12,
  },
  videoSectionTitle: {
    fontSize: 18,
    color: "#6A1B0A",
    fontWeight: "700",
  },
  videoCard: {
    borderRadius: 14,
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
    height: 170,
  },
  videoTextWrap: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 15,
    color: "#4A230E",
    fontWeight: "700",
  },
  videoAction: {
    marginTop: 4,
    fontSize: 12,
    color: "#B22222",
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.82)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  previewImage: {
    width: "100%",
    height: "88%",
  },
});
