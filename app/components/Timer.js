// app/components/Timer.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Timer({ initialSeconds, onComplete }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      onComplete && onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{seconds}초 남음</Text>
      <Button
        title={isActive ? "일시정지" : "시작"}
        onPress={() => setIsActive(!isActive)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timer: {
    fontSize: 24,
    marginBottom: 10,
  },
});
