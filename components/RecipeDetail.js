// components/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import client from '../lib/contentful';


const RecipeDetail = () => {
  const route = useRoute();
  const { slug } = route.params; // route에서 slug를 가져옴

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Contentful에서 특정 레시피 데이터를 불러옴
    const fetchRecipe = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'recipe',
          'fields.slug': slug,
        });

        if (res.items.length > 0) {
          setRecipe(res.items[0].fields);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [slug]);

  // 로딩 중일 때 표시할 화면
  if (!recipe) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  // 실제 레시피 데이터를 표시
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.titel}</Text>
      <Text style={styles.category}>Category: {recipe.category}</Text>
      <Text style={styles.description}>{recipe.description.content[0].content[0].value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  loading: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RecipeDetail;