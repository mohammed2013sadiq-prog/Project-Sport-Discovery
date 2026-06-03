import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const sports = [
  {
    id: "1",
    name: "FootBall",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    description: "The most popular team sport in the world",
    category: "Collective",
  },
  {
    id: "2",
    name: "BasketBall",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
    description: "Fast and spectacular team sport",
    category: "Collective",
  },
  {
    id: "3",
    name: "Tennis",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800",
    description: "Individual sport",
    category: "Individual",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Sport Discovery</Text>
      </View>

      <Text style={styles.title}>Find your next passion 🔥</Text>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}>
          <Text style={styles.activeText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Collective</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Individual</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <FlatList
        data={sports}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.name}</Text>
            </View>

            <TouchableOpacity style={styles.bookmark}>
              <Text style={{ color: "#fff", fontSize: 20 }}>☆</Text>
            </TouchableOpacity>

            <View style={styles.content}>
              <Text style={styles.description}>
                {item.description}
              </Text>

              <View style={styles.category}>
                <Text style={styles.categoryText}>
                  {item.category}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
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

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  filters: {
    flexDirection: "row",
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
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
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