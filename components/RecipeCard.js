// components/RecipeCard.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({ recipe }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RecipeDetail', { slug: recipe.slug });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.content} pointerEvents="box-none"> 
        {/* 스타일에 직접 pointerEvents 속성을 사용하여 경고 제거 */}
        <Text style={styles.title}>{recipe.titel}</Text>
        <Text style={styles.category}>{recipe.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    pointerEvents: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecipeCard;
