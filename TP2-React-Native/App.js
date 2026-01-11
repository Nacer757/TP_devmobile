
import React from 'react'; 
import { View,Text, StatusBar, StyleSheet } from 'react-native'; 
// import nommé depuis CardList.js 
import { CardList } from './components/CardList'; 
 
export default function App() { 
  return ( 
    < View style={styles.screen}> 
      <StatusBar /> 
      <Text style={styles.text}>Explorez notre cartes</Text>
      <CardList /> 
    </ View > 
  ); 
} 
 
const styles = StyleSheet.create({ 
  screen: { flex: 1, backgroundColor: '#f6f7fb' },
  text: {
    fontSize: 24,             
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ed0909ff',  
    marginTop: 50,          
    marginBottom: 20,         
  },
}); 