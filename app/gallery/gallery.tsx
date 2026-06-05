import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { SportGallery } from '../../src/services/api';

export default function GalleryScreen() {
  const { width, height } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [gallery, setGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get<SportGallery>(
          `https://6a1f5a8fb79eec0d6cf0ac70.mockapi.io/api/v1/Sports/${id}`
        );
        if (response.data && response.data.gallery) {
          setGallery(response.data.gallery);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGallery();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0e7490" />
      </View>
    );
  }

  if (gallery.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noImagesText}>No images found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={gallery}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.imageWrapper, { width, height }]}>
            
            <Image
              source={{ uri: item }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
              blurRadius={50}
            />
            
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
            
            <Image 
              source={{ uri: item }} 
              style={styles.image} 
              resizeMode="contain" 
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImagesText: {
    color: '#fff',
    fontSize: 18,
  },
  backLink: {
    marginTop: 20,
  },
  backLinkText: {
    color: '#6dd5df',
    fontSize: 16,
  },
});