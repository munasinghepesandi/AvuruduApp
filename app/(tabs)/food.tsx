import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageToggle from "../../src/components/language-toggle";
import { useLanguage } from "../../src/context/language-context";
import { responsive, responsiveFontSize } from "../../src/utils/responsive";

const RECIPES_DATA = [
  {
    name: "කිරිබත්",
    nameEn: "Kiribath (Milk Rice)",
    image:
      "https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_647e4c1aa6.jpg",
    ingredients: "සහල් කෝප්ප 2, පොල් කිරි කෝප්ප 3, ලුණු ස්වල්පයක්",
    ingredientsEn: "2 cups rice, 3 cups coconut milk, a pinch of salt",
    steps:
      "සහල් සෝදා වතුර දමා ලිප තබන්න. බත ඉදීගෙන එන විට පොල්කිරි වලට ලුණු මිශ්‍ර කර බතට දමන්න. කිරි හිඳීගෙන එන විට ලිපෙන් බා තැටියකට දමා කෑලි කපා ගන්න.",
    stepsEn:
      "Wash and cook rice. Add salted coconut milk when rice is almost done. Let it thicken, spread on a tray, and cut into pieces.",
  },
  {
    name: "කැවුම්",
    nameEn: "Kavum",
    image:
      "https://findit-resources.s3.amazonaws.com/trending_items/1662613586937.webp",
    ingredients:
      "සහල් පිටි කෝප්ප 2, පැණි කෝප්ප 1, ලුණු ස්වල්පයක්, තෙල් (බැදීමට)",
    ingredientsEn:
      "2 cups rice flour, 1 cup treacle, a pinch of salt, oil for frying",
    steps:
      "පිටි, පැණි සහ ලුණු මිශ්‍ර කර තද මෘදු මැවූමක් හදාගන්න. පැය 1ක් වසා තබා කුඩා කොටස් ගෙන කැවුම් හැඩයට සාදා උණු තෙලේ රන්වන් පාටට බැදගන්න.",
    stepsEn:
      "Mix flour, treacle, and salt into a soft dough. Rest for 1 hour, shape, and deep fry until golden.",
  },
  {
    name: "කොකිස්",
    nameEn: "Kokis",
    image:
      "https://images.aws.nestle.recipes/original/18c78175066f7a36a4b2de3ab2d98c2e_kokis-recipe.jpg",
    ingredients:
      "සහල් පිටි කෝප්ප 2, පොල් කිරි කෝප්ප 1 1/2, බිත්තර 1, කහ ස්වල්පයක්, ලුණු",
    ingredientsEn:
      "2 cups rice flour, 1 1/2 cups coconut milk, 1 egg, a pinch of turmeric, salt",
    steps:
      "සියලු ද්‍රව්‍ය මිශ්‍ර කර දියර මැවූමක් සාදාගන්න. කොකිස් අච්චුව තෙලේ උණු කර මැවූමට අඩක් මුණගා උණු තෙලට දමා බැදගන්න.",
    stepsEn:
      "Make a thin batter. Heat the kokis mold in oil, dip halfway in batter, and fry until crisp.",
  },
  {
    name: "අලුවා",
    nameEn: "Aluwa",
    image:
      "https://www.shutterstock.com/image-photo/traditional-sri-lankan-sinhala-tamil-260nw-2147297999.jpg",
    ingredients:
      "බැදපු සහල් පිටි කෝප්ප 2, පැණි කෝප්ප 1, එලකිරි කුඩු ස්වල්පයක්, කජු (ඕනෑ නම්)",
    ingredientsEn:
      "2 cups roasted rice flour, 1 cup treacle, a little milk powder, cashews (optional)",
    steps:
      "පැණි (හෝ සීනි දියකර) නූල් පදමට එනතුරු උකු කරන්න. කජු දමා බැදගත් හාල් පිටි ස්වල්පය බැගින් දමා හොඳින් හැඳිගාන්න. තැටියකට පතුල් කර තද වුණාම කැබලි කපාගන්න.",
    stepsEn:
      "Boil treacle (or sugar syrup) to string consistency. Add cashews and roasted flour gradually, mix well, spread on a tray, and cut when firm.",
  },
  {
    name: "අතිරස",
    nameEn: "Athirasa",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpmVh6QUrlDQZ-BN1xR6-gHb3fcMpy1bgq9A&s",
    ingredients: "සහල් පිටි 500g, පැණි කෝප්ප 1, සීනි 100g, එනසාල් කුඩු, තෙල්",
    ingredientsEn:
      "500g rice flour, 1 cup treacle, 100g sugar, cardamom powder, oil",
    steps:
      "පැණි සහ සීනි රත් කර නූල් පදම එන විට හාල් පිටි සහ එනසාල් එකතු කරන්න. හොඳින් කළවම් කර පදම ආ පසු ලිපෙන් බා ගන්න. පසුව රවුම් හැඩයට තැටිකර තෙලේ බැදගන්න.",
    stepsEn:
      "Heat treacle and sugar until syrup forms. Add rice flour and cardamom, mix to a dough, shape into rounds, and fry.",
  },
  {
    name: "ආස්මි",
    nameEn: "Asmi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo878mWig8M63Is0jBTU4BDRyt35Eon5GjUw&s",
    ingredients: "සහල් පිටි කෝප්ප 2, ඉරමුසු කොළ යුෂ ටිකක්, ලුණු, තෙල්, පැණි",
    ingredientsEn:
      "2 cups rice flour, a little herbal leaf extract, salt, oil, treacle",
    steps:
      "පිටි සහ කොළ යුෂ මිශ්‍ර කර මැවූමක් සාදා ආස්මි අච්චුවෙන් තෙලට දැමී බැදගන්න. අවසානයේ උණු පැණි ඉහළින් වැගිරවීමෙන් රස වැඩිවේ.",
    stepsEn:
      "Prepare batter with flour and leaf extract. Fry using the asmi mold and drizzle warm treacle on top.",
  },
  {
    name: "අග්ගලා",
    nameEn: "Aggala",
    image:
      "https://www.elanka.com.au/wp-content/uploads/2024/06/aggala-e1719045194863.jpg",
    ingredients:
      "බැදපු සහල් පිටි , පැණි කෝප්ප 1, ගම්මිරිස් කුඩු ස්වල්පයක්, ගාගත් පොල් කෝප්ප 1/2, ලුණු ස්වල්පයක්",
    ingredientsEn:
      "Roasted rice flour, 1 cup treacle, a little pepper powder, 1/2 cup grated coconut, a pinch of salt",
    steps:
      "සහල් පිටි සහ පොල් ලුණු මිශ්‍ර කර ගන්න. පැණි රත් කර එයට පිටි මිශ්‍රණය සහ ගම්මිරිස් එකතු කර හොඳින් කළවම් කරන්න. පසුව අතින් කුඩා බෝල සාදා ගන්න.",
    stepsEn:
      "Mix flour, coconut, and salt. Heat treacle, add the mixture and pepper, stir well, then shape into small balls.",
  },
  {
    name: "පැණි වළලු",
    nameEn: "Pani Walalu",
    image: "https://pbs.twimg.com/media/Dpelm1NVAAAJCVx.jpg",
    ingredients:
      "උඳු පිටි 500g, සහල් පිටි 100g, පොල්කිරි කෝප්ප 1, කිතුල් පැණි, ලුණු, බැදීමට තෙල්",
    ingredientsEn:
      "500g urad flour, 100g rice flour, 1 cup coconut milk, kithul treacle, salt, oil for frying",
    steps:
      "උඳු පිටි සහ සහල් පිටි පොල්කිරි සමඟ මිශ්‍ර කර පැය 5ක් පමණ තබන්න. රත් වු පැණි එකතු කර හොඳින් කළවම් කරන්න. පසුව කුඩා බෝල සාදා තෙලේ රන්වන් පාටට බැදගන්න.",
    stepsEn:
      "Mix flours with coconut milk and rest for about 5 hours. Add warm treacle, mix, shape, and fry until golden.",
  },
  {
    name: "බටර් කේක්",
    nameEn: "Butter Cake",
    image:
      "https://www.bakingclassinchennai.com/blog/wp-content/uploads/2018/09/vanilla-butter-cake-recipe.jpg",
    ingredients:
      "පාන් පිටි 250g, සීනි 250g, බටර් 250g, බිත්තර 4, බේකින් පවුඩර් තේ හැඳි 2, වැනිලා",
    ingredientsEn:
      "250g flour, 250g sugar, 250g butter, 4 eggs, 2 tsp baking powder, vanilla",
    steps:
      "බටර් සහ සීනි ක්‍රීම් එකක් වන තුරු බීට් කරන්න. බිත්තර එකින් එක දමමින් කළවම් කරන්න. අවසානයේ පිටි සහ බේකින් පවුඩර් එකතු කර සෙල්සියස් 180°C දී විනාඩි 40ක් බේක් කරන්න.",
    stepsEn:
      "Cream butter and sugar. Add eggs one by one. Fold in flour and baking powder, then bake at 180°C for 40 minutes.",
  },
];

export default function FoodScreen() {
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();

  const title = language === "si" ? "අවුරුදු රෙසිපි" : "Avurudu Recipes";
  const ingredientLabel = language === "si" ? "අවශ්‍ය ද්‍රව්‍ය" : "Ingredients";
  const stepsLabel = language === "si" ? "සකස් කරන ආකාරය" : "How to Prepare";

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
        {RECIPES_DATA.map((food, i) => (
          <View key={i} style={styles.card}>
            <Image
              source={{ uri: food.image }}
              style={styles.recipeImage}
              resizeMode="cover"
            />
            <Text style={styles.name}>
              {language === "si" ? food.name : food.nameEn}
            </Text>
            <Text style={styles.sectionLabel}>{ingredientLabel}</Text>
            <Text style={styles.desc}>
              {language === "si" ? food.ingredients : food.ingredientsEn}
            </Text>
            <Text style={styles.sectionLabel}>{stepsLabel}</Text>
            <Text style={styles.desc}>
              {language === "si" ? food.steps : food.stepsEn}
            </Text>
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
  content: { paddingHorizontal: 20, paddingBottom: 110 },
  title: {
    fontSize: responsiveFontSize(30),
    marginBottom: responsive.spacing.md,
    color: "#FFF0DB",
    textAlign: "center",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "rgba(255, 248, 236, 0.93)",
    padding: responsive.spacing.md,
    borderRadius: responsive.borderRadius.lg,
    marginBottom: responsive.spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    elevation: 6,
    shadowColor: "#180B03",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  recipeImage: {
    width: "100%",
    height: responsive.imageHeight.md,
    borderRadius: 14,
    marginBottom: responsive.spacing.sm,
  },
  name: {
    fontSize: responsiveFontSize(22),
    color: "#4A230E",
    marginBottom: responsive.spacing.sm,
    fontWeight: "700",
  },
  sectionLabel: {
    fontSize: responsiveFontSize(14),
    color: "#8B2E10",
    fontWeight: "700",
    marginTop: responsive.spacing.xs,
    marginBottom: responsive.spacing.xs,
  },
  desc: {
    color: "#5f4d45",
    fontSize: responsiveFontSize(15),
    lineHeight: responsiveFontSize(22),
  },
});
