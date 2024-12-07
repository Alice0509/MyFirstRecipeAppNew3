import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { getYouTubeThumbnail } from '../lib/getYouTubeThumbnail';

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const RecipeCard = ({ recipe = {}, onPress = () => {} }) => {
  const [thumbnail, setThumbnail] = useState(require('../../assets/images/default.png')); // 기본 이미지 설정

  useEffect(() => {
    const fetchThumbnail = () => {
      if (recipe.fields.image && recipe.fields.image.length > 0) {
        // 1순위: 원래 이미지
        const originalImage = recipe.fields.image[0].fields.file.url;
        setThumbnail(
          originalImage.startsWith('//') ? { uri: `https:${originalImage}` } : { uri: originalImage }
        );
      } else if (recipe.fields.youTubeUrl) {
        // 2순위: 유튜브 썸네일
        const ytThumbnail = getYouTubeThumbnail(recipe.fields.youTubeUrl);
        setThumbnail(ytThumbnail ? { uri: ytThumbnail } : require('../../assets/images/default.png'));
      } else {
        // 3순위: 기본 이미지
        setThumbnail(require('../../assets/images/default.png'));
      }
    };

    fetchThumbnail();
  }, [recipe]);

  const title = recipe.fields.titel || recipe.fields.title || 'Untitled';
  const description =
    recipe.fields.description?.content[0]?.content[0]?.value || 'No description available.';
  const shortDescription = truncateText(description, 50); // 50자로 요약

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={thumbnail}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default RecipeCard;
