import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {styles} from "./styles/mainStyles"
import React, { useEffect, useState } from 'react';

export default function App() {

  const [tastyDb, setTastyDb] = useState()
  const [from, setFrom] = useState(0)
  const [size, setSize] = useState(20)

  const [refresh, setRefresh] = useState()

  async function getTasty(from,size) {
        const url = `https://tasty.p.rapidapi.com/recipes/list?from=${from}&size=${size}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'c594636317mshaf53986aea9e15fp1d00a5jsnb8aaf511d4ae',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setTastyDb(result.results)
        } catch (error) {
          console.error(error);
        }
  }

  React.useEffect(()=>{
    getTasty(0,20)
  },[])

  return (
    <View style={styles.container}>
      <View 
        style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 40}}>

        <TouchableOpacity 
          style={{width: 50, height: 50, backgroundColor: "#F0d"}} 
          onPress={()=>{
          from-20 >= 0 && setFrom(from-20)
          size-20 >= 0 && setSize(size-20)
          getTasty(from,size)
        }}>

        </TouchableOpacity>
        <TouchableOpacity 
          style={{width: 50, height: 50, backgroundColor: "#F0d"}}
          onPress={()=>{
          from+20 >= 0 && setFrom(from+20)
          size+20 >= 0 && setSize(size+20)
          getTasty(from,size)
          }}>

        </TouchableOpacity>
      </View>
      <FlatList
        data={tastyDb}
        extraData={from}
        renderItem={({item, index}) => (
          <View style={{padding: 40}}>
            <Text>{item.name}</Text>
          </View>
        )}
        />
    </View>
  );
}
