import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../lib/contentful';
import { useNavigation } from '@react-navigation/native';
import i18n from '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate('RecipeScreen', { recipeId: item.sys.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 언어 전환 컴포넌트 */}
      <LanguageSwitcher />
      
      {/* 제목과 레시피 리스트 */}
      <Text style={styles.title}>{i18n.t('home_title')}</Text>
      {recipes.length === 0 ? (
        <Text style={styles.noRecipes}>{i18n.t('no_recipes')}</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.sys.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noRecipes: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
  },
});
