// app/components/LanguageSwitcher.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import i18n from '../i18n';

const LanguageSwitcher = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t('language')}</Text>
      <Button title="English" onPress={() => (i18n.locale = 'en')} />
      <Button title="Deutsch" onPress={() => (i18n.locale = 'de')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;
