// app/(tabs)/recipes/[slug].tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import client from '../../../lib/contentful';

const RecipeDetail = () => {
  const route = useRoute();
  const { slug } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
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

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image.fields.file.url }} style={styles.image} />
      <Text style={styles.title}>{recipe.titel}</Text>
      <Text style={styles.category}>{recipe.category}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      {/* 추가로 재료, 조리 방법 등 표시 */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default RecipeDetail;
