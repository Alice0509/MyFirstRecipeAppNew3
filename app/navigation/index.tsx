// app/(tabs)/index.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeList from '../../components/RecipeList';
import RecipeDetail from '../../components/RecipeDetail';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecipeList">
        <Stack.Screen name="RecipeList" component={RecipeList} options={{ title: 'Recipes' }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ title: 'Recipe Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
