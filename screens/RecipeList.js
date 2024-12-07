import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import client from "../lib/contentful";

const RecipeList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: "recipe",
          select:
            "fields.slug,fields.titel,fields.category,fields.image,fields.description",
          limit: 12,
        });

        const formattedData = response.items.map((item) => {
          return {
            id: item.sys.id,
            title: item.fields.titel,
            slug: item.fields.slug,
            category: item.fields.category,
            description: item.fields.description,
            imageUrl: item.fields.image
              ? `https:${item.fields.image.fields.file.url}`
              : null,
          };
        });

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9c2ff",
  },
  title: {
    fontSize: 18,
  },
});

export default RecipeList;
