import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Svg, { G, Path } from "react-native-svg";
import { Sport } from "../src/services/api";
import { useBookmarkStore } from "../src/store/useBookmarkStore";

export default function HomeScreen() {
  const router = useRouter();
  const { bookmarkedIds, toggleBookmark } = useBookmarkStore();
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          "https://6a1f5a8fb79eec0d6cf0ac70.mockapi.io/api/v1/Sports"
        );
        setSports(response.data);
      } catch (error) {
        console.error("Error fetching sports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  const categories = ["All", ...Array.from(new Set(sports.map((s) => s.category).filter(Boolean)))];

  const filteredSports = selectedCategory === "All"
    ? sports
    : sports.filter((s) => s.category === selectedCategory);

  return (
    <SafeAreaProvider style={styles.container}>

      <View style={styles.header}>
        <Image source={require("../assets/images/Logo.png")} style={styles.logoImage} resizeMode="contain" />
      </View>

      <Text style={styles.title}>Find your next passion 🔥</Text>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterBtn,
              selectedCategory === category && styles.activeFilter,
            ]}
            onPress={() => setSelectedCategory(category as string)}
          >
            <Text
              style={
                selectedCategory === category
                  ? styles.activeText
                  : styles.filterText
              }
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      {loading ? (
        <ActivityIndicator size="large" color="#0e7490" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={filteredSports}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: "/details/[id]", params: { id: item.id } })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.name}</Text>
              </View>

              <TouchableOpacity style={styles.bookmark} onPress={() => toggleBookmark(item.id)}>
                <View style={StyleSheet.absoluteFill}>
                  <Svg width="36" height="88" viewBox="0 0 36 88">
                    <G transform="translate(0, 88) scale(0.1, -0.1)" fill="#FF0000" stroke="none">
                      <Path d="M0 443 l0 -436 85 124 c47 68 89 125 94 127 4 1 45 -54 91 -123 45 -69 84 -125 86 -125 2 0 4 196 4 435 l0 435 -180 0 -180 0 0 -437z" />
                    </G>
                  </Svg>
                </View>
                <Text style={styles.bookmarkStar}>{bookmarkedIds.includes(item.id) ? "★" : "☆"}</Text>
              </TouchableOpacity>

              <View style={styles.content}>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.category}>
                  <Text style={styles.categoryText}>
                    {item.category || "Sport"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
    paddingHorizontal: 15,
  },

  header: {
    height: 100,
    backgroundColor: "#22d3ee",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  logoImage: {
    width: 200,
    height: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  filters: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 20,
  },

  filterBtn: {
    backgroundColor: "#6dd5df",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: "#0e7490",
  },

  filterText: {
    color: "#fff",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 180,
  },

  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tagText: {
    color: "#0e7490",
    fontWeight: "bold",
  },

  bookmark: {
    position: "absolute",
    top: 0,
    right: 15,
    width: 36,
    height: 88,
    alignItems: 'center',
  },
  
  bookmarkStar: {
    color: "#fff",
    fontSize: 20,
    marginTop: 8,
    zIndex: 1,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },

  description: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
  },

  category: {
    backgroundColor: "#0e7490",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "600",
  },
});