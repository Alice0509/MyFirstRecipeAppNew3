// app/lib/contentful.js
import { createClient } from 'contentful';
import Constants from 'expo-constants';

// 환경 변수 로드
const config = Constants.expoConfig?.extra || {};

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = config;

// 환경 변수 확인
console.log('Contentful Space ID:', CONTENTFUL_SPACE_ID);
console.log('Contentful Access Token:', CONTENTFUL_ACCESS_TOKEN);

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  console.error("Error: Contentful 환경 변수가 제대로 설정되지 않았습니다.");
}

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// 레시피 목록 가져오기 함수
export const getRecipes = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'recipe',
      // select: 'fields', // 이 줄을 제거하여 모든 필드 가져오기
    });
    console.log('Fetched Recipes:', entries.items);
    return entries.items;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// 특정 레시피 가져오기 함수
export const getRecipeById = async (recipeId) => {
  try {
    const entry = await client.getEntry(recipeId, {
      include: 3, // 관련된 참조 필드를 포함
    });
    console.log('Fetched Recipe:', entry);
    return entry;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};
