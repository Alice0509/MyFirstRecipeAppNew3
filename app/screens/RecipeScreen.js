import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getRecipeById } from '../lib/contentful';
import RenderHtml from 'react-native-render-html';

export default function RecipeScreen({ route }) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);

  const { width } = Dimensions.get('window');

  // YouTube 썸네일 생성
  const getYouTubeThumbnail = (url) => {
    let videoId = null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.hostname.includes('youtube.com')) {
        if (urlObj.pathname === '/watch') {
          videoId = urlObj.searchParams.get('v');
        } else if (urlObj.pathname.startsWith('/embed/')) {
          videoId = urlObj.pathname.split('/embed/')[1];
        }
      }
    } catch (error) {
      console.error('Invalid YouTube URL:', url);
    }

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
        if (data.fields.youTubeUrl) {
          setThumbnail(getYouTubeThumbnail(data.fields.youTubeUrl));
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const {
    titel,
    description,
    image,
    category,
    preparationTime,
    servings,
    ingredients,
    instructions,
    youTubeUrl,
  } = recipe.fields;

  // RichText 변환
  const richTextToHtml = (richText) => {
    try {
      const convertNode = (node) => {
        switch (node.nodeType) {
          case 'paragraph':
            return `<p>${node.content.map(convertNode).join('')}</p>`;
          case 'heading-1':
            return `<h1>${node.content.map(convertNode).join('')}</h1>`;
          case 'heading-2':
            return `<h2>${node.content.map(convertNode).join('')}</h2>`;
          case 'unordered-list':
            return `<ul>${node.content.map(convertNode).join('')}</ul>`;
          case 'ordered-list':
            return `<ol>${node.content.map(convertNode).join('')}</ol>`;
          case 'list-item':
            return `<li>${node.content.map(convertNode).join('')}</li>`;
          case 'hyperlink':
            return `<a href="${node.data.uri}">${node.content.map(convertNode).join('')}</a>`;
          case 'text':
            let text = node.value;
            if (node.marks) {
              node.marks.forEach((mark) => {
                if (mark.type === 'bold') {
                  text = `<strong>${text}</strong>`;
                }
                if (mark.type === 'italic') {
                  text = `<em>${text}</em>`;
                }
              });
            }
            return text;
          default:
            return '';
        }
      };
      return richText.content.map(convertNode).join('');
    } catch (error) {
      console.error('Error converting rich text to HTML:', error);
      return '';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 레시피 이미지 */}
      {image && image.length > 0 ? (
        <Image
          source={{ uri: `https:${image[0].fields.file.url}` }}
          style={styles.image}
        />
      ) : thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.image} />
      ) : (
        <Image source={require('../../assets/images/default.png')} style={styles.image} />
      )}

      {/* 제목 */}
      <Text style={styles.title}>{titel || 'Untitled'}</Text>

      {/* 카테고리 */}
      <Text style={styles.sectionHeader}>카테고리:</Text>
      <Text style={styles.text}>{category || 'No Category'}</Text>

      {/* 준비 시간 */}
      <Text style={styles.sectionHeader}>준비 시간:</Text>
      <Text style={styles.text}>{preparationTime ? `${preparationTime} 분` : 'N/A'}</Text>

      {/* 인분 */}
      <Text style={styles.sectionHeader}>인분:</Text>
      <Text style={styles.text}>{servings ? `${servings} 인분` : 'N/A'}</Text>

      {/* 재료 */}
      <Text style={styles.sectionHeader}>재료:</Text>
      <View style={styles.ingredientsContainer}>
        {ingredients && ingredients.length > 0 ? (
          ingredients.map((item, index) => (
            <Text key={index} style={styles.text}>
              - {item.fields.ingredient?.fields.name || 'Unnamed Ingredient'}{' '}
              {item.fields.quantity ? `(${item.fields.quantity})` : ''}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No Ingredients Available</Text>
        )}
      </View>

      {/* 설명 */}
      <Text style={styles.sectionHeader}>설명:</Text>
      {description ? (
        <RenderHtml
          contentWidth={width - 40}
          source={{ html: richTextToHtml(description) }}
        />
      ) : (
        <Text>No Description Available</Text>
      )}

      {/* 조리 방법 */}
      <Text style={styles.sectionHeader}>조리 방법:</Text>
      {instructions ? (
        <RenderHtml
          contentWidth={width - 40}
          source={{ html: richTextToHtml(instructions) }}
        />
      ) : (
        <Text>No Instructions Available</Text>
      )}

      {/* YouTube 영상 */}
      {youTubeUrl && thumbnail && (
        <View style={styles.youtubeContainer}>
          <Text style={styles.sectionHeader}>유튜브 영상:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(youTubeUrl)}>
            <Image source={{ uri: thumbnail }} style={styles.youtubeImage} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  ingredientsContainer: {
    marginTop: 10,
  },
  youtubeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  youtubeImage: {
    width: Dimensions.get('window').width - 40,
    height: (Dimensions.get('window').width - 40) * 9 / 16,
    borderRadius: 8,
  },
});
