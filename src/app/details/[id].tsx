import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { SportDetail } from "../../services/api";

export default function SportDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [sport, setSport] = useState<SportDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://6a1f5a8fb79eec0d6cf0ac70.mockapi.io/api/v1/Sports/${id}`
        );
        setSport(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0e7490" />
      </View>
    );
  }

  if (!sport) {
    return (
      <View style={styles.center}>
        <Text>Sport not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: "#0e7490" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: sport.image }} style={styles.mainImage} />
          
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons name="star-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.floatingCard}>
            <View style={styles.titleRow}>
              <Ionicons name="american-football-outline" size={24} color="#0e7490" />
              <Text style={styles.sportTitle}>{sport.name}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{sport.category || "Sport"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.infoPillsContainer}>
            {sport.players && (
              <View style={styles.infoPill}>
                <Ionicons name="people-outline" size={16} color="#0e7490" style={styles.pillIcon} />
                <Text style={styles.infoPillText}>{sport.players.substring(0, 15)}...</Text>
              </View>
            )}
            {sport.place && (
              <View style={styles.infoPill}>
                <Ionicons name="partly-sunny-outline" size={16} color="#0e7490" style={styles.pillIcon} />
                <Text style={styles.infoPillText}>Outdoor</Text>
              </View>
            )}
            {sport.time && (
              <View style={styles.infoPill}>
                <Ionicons name="time-outline" size={16} color="#0e7490" style={styles.pillIcon} />
                <Text style={styles.infoPillText}>90 Min</Text>
              </View>
            )}
            <View style={styles.infoPill}>
              <Ionicons name="globe-outline" size={16} color="#0e7490" style={styles.pillIcon} />
              <Text style={styles.infoPillText}>World</Text>
            </View>
          </ScrollView>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{sport.description}</Text>

          {sport.rules && sport.rules.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Basic Rules</Text>
              {sport.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <View style={styles.ruleNumberContainer}>
                    <Text style={styles.ruleNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </>
          )}

          {sport.equipment && sport.equipment.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Equipment</Text>
              <View style={styles.equipmentContainer}>
                {sport.equipment.map((item, index) => (
                  <View key={index} style={styles.equipmentPill}>
                    <Text style={styles.equipmentPillText}>{item}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.galleryButton}>
          <Ionicons name="images-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.galleryButtonText}>Open Photo Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef2f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
  },
  imageContainer: {
    position: "relative",
    height: 300,
    marginBottom: 40,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0e7490",
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 60,
    backgroundColor: "red",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  floatingCard: {
    position: "absolute",
    bottom: -25,
    left: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 150,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sportTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 8,
  },
  categoryBadge: {
    backgroundColor: "#0e7490",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  categoryBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  infoPillsContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  infoPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6dd5df",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  pillIcon: {
    marginRight: 6,
  },
  infoPillText: {
    color: "#0e7490",
    fontWeight: "bold",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
    marginTop: 15,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#4b5563",
    marginBottom: 15,
  },
  ruleItem: {
    flexDirection: "row",
    marginBottom: 15,
    paddingRight: 15,
  },
  ruleNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6dd5df",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  ruleNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  ruleText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#1f2937",
    fontWeight: "500",
  },
  equipmentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  equipmentPill: {
    backgroundColor: "#0e7490",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
  },
  equipmentPillText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 35,
    backgroundColor: "#eef2f5",
  },
  galleryButton: {
    backgroundColor: "#6dd5df",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 30,
  },
  galleryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
