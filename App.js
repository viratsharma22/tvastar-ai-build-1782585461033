import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

export default function App() {
  const [quantity, setQuantity] = useState(0);
  const [goal, setGoal] = useState(2000);
  const progress = useRef(new Animated.Value(0)).current;

  const increment = () => {
    const newQty = Math.min(quantity + 250, goal);
    setQuantity(newQty);
    Animated.timing(progress, {
      toValue: newQty / goal,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.title}>Water Tracker</Text>
      <Text style={styles.subtitle}>Goal: {goal} ml</Text>
      <Text style={styles.amount}>Current: {quantity} ml</Text>
      <Animated.View style={[styles.progressContainer, {backgroundColor: '#2ecc71'}]}>
        <Animated.View
          style={[styles.progressBar,
            {width: progress.interpolate({inputRange: [0, 1], outputRange: [0, 100]})}]}
        />
      </Animated.View>
      <Button title='Add 250 ml' onPress={increment} />
      <Text style={styles.note}>Tap to add water</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 10,
  },
  amount: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },
  progressContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'circle',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'transparent',
  },
  note: {
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});