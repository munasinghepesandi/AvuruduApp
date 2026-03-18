import { Ionicons } from "@expo/vector-icons";
import { SplashScreen, Tabs } from "expo-router";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
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
          bottom: 12,
          borderRadius: 22,
          height: 66,
          paddingTop: 8,
          backgroundColor: "rgba(255, 246, 233, 0.95)",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#1f0d06",
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
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
          title: "නැකත්",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "ක්‍රීඩා",
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: "කෑම බීම",
          tabBarIcon: ({ color }) => (
            <Ionicons name="fast-food" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: "ජන ගී",
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-notes" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="greetings"
        options={{
          title: "සුබපැතුම්",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
