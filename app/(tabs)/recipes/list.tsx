// app/(tabs)/recipes/list.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import client from '../../../lib/contentful';
import RecipeCard from '../../../components/RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'recipe',
          select: 'fields.slug,fields.titel,fields.category,fields.image,fields.description',
          limit: 20,
        });

        const formattedRecipes = response.items.map((item) => {
          return {
            id: item.sys.id,
            title: item.fields.titel,
            slug: item.fields.slug,
            category: item.fields.category,
            description: item.fields.description,
            imageUrl: item.fields.image ? `https:${item.fields.image.fields.file.url}` : null,
          };
        });

        setRecipes(formattedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe List</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RecipeList;
