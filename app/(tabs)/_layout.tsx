import { useLanguage } from "@/src/context/language-context";
import { Ionicons } from "@expo/vector-icons";
import { SplashScreen, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const { language } = useLanguage();

  const tabLabels = {
    index: language === "si" ? "නැකත්" : "Nakath",
    explore: language === "si" ? "ක්‍රීඩා" : "Games",
    food: language === "si" ? "කෑම බීම" : "Food",
    songs: language === "si" ? "ජන ගී" : "Songs",
    greetings: language === "si" ? "සුබපැතුම්" : "Greetings",
  };

  useEffect(() => {
    const prepareApp = async () => {
      // Keep splash visible briefly until the tabs are ready.
      await new Promise((resolve) => setTimeout(resolve, 1300));
      setIsAppLoaded(true);
      await SplashScreen.hideAsync();
    };

    prepareApp();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#B22222",
        tabBarInactiveTintColor: "#6E5D53",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 14,
          right: 14,
          bottom: Math.max(insets.bottom, 10) + 10,
          borderRadius: 22,
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "rgba(255, 246, 233, 0.95)",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#1f0d06",
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          display: isAppLoaded ? "flex" : "none",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: tabLabels.index,
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: tabLabels.explore,
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: tabLabels.food,
          tabBarIcon: ({ color }) => (
            <Ionicons name="fast-food" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: tabLabels.songs,
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-notes" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="greetings"
        options={{
          title: tabLabels.greetings,
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
