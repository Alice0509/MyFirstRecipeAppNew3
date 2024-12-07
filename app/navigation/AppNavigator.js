import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeScreen from '../screens/RecipeScreen';
import IngredientScreen from '../screens/IngredientScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ title: '레시피 목록' }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ title: '레시피 상세' }}
      />
      <Stack.Screen
        name="Ingredient"
        component={IngredientScreen}
        options={{ title: '재료 상세' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: '설정' }}
      />
    </Stack.Navigator>
  );
}
