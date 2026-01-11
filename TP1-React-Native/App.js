import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require('./assets/emsi.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.schoolName}>EMSI MAARIF</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>
            Nom : <Text style={styles.value}>Majdoul</Text>
          </Text>
          <Text style={styles.label}>
            Prénom : <Text style={styles.value}>Nacer allah</Text>
          </Text>
          <Text style={styles.label}>
            Année universitaire : <Text style={styles.value}>2025 / 2026</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    backgroundColor: '#F5F8FB',
    padding: 16,
    borderRadius: 0,        
    borderWidth: 1,        
    borderColor: '#E5E7EB', 
    gap: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logo: {
    width: 100,
    height: 100,
  },

  schoolName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 6,
    letterSpacing: 1,
  },

  info: {
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 8,
  },

  label: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    lineHeight: 22,
  },

  value: {
    fontSize: 17,
    color: '#111827',
    fontWeight: 'bold',
  },
});

