import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {styles} from "./styles/mainStyles"
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Recipe from './screens/Recipe';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';



export default function App() {
  const Stack = createStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}

function Home({navigation}) {
  const [tastyDb, setTastyDb] = useState()
  const [from, setFrom] = useState(0)
  const [size, setSize] = useState(10)
  const [loading, setLoading] = useState(false)


  async function getTasty(from,size) {

        setLoading(true)
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
          const str = JSON.stringify(result, null, 2);
          console.log("from,size: "+from+"/"+size)
          setTastyDb(result.results)
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
  }

  async function getTastyModel(from,size) {
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
      const str = JSON.stringify(result, null, 2);
      console.log(str)
    } catch (error) {
      console.error(error);
    }
}

  React.useEffect(()=>{
    getTasty(0,10)
  },[])

  React.useEffect(()=>{
    console.log("Loading..."+loading)
  },[loading])

  return (
    <View style={[styles.container, {paddingHorizontal: 15}]}>
      <View 
        style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40}}>

        <TouchableOpacity disabled={loading || from == 0}
          style={{width: 50, height: 50, backgroundColor: loading||from==0?"#ddd":"#7cadfc", borderRadius: 10, justifyContent:'center', alignItems:'center'}} 
          onPress={()=>{
            if(!loading) {
              getTasty(from > 0 ? from-10 : 0, 10)
              from > 0 ? setFrom(from-10) : console.log("page 1")
            }
          }}>
        <Icon
          name='arrow-back-outline'
          color="#fff"
          size={30}
        />
        </TouchableOpacity>

        <Text 
            style={{
                fontSize:18,
                textAlign:"center",
                fontWeight: 'normal',
                textAlignVertical:"center",
                width: 120, height: 50,
                backgroundColor: "#7cadfc", borderRadius: 10,
                color:"#ffffff",
                fontWeight:"bold"
            }}>
            Tastyapi!
        </Text>
        <TouchableOpacity disabled={loading}
          style={{width: 50, height: 50, backgroundColor: loading?"#ddd":"#7cadfc", borderRadius: 10, justifyContent:'center', alignItems:'center',}}
          onPress={()=>{
            if(!loading) {
              getTasty(from+10,10)
              setFrom(from+10)  
            }
          }}>
        <Icon
          name='arrow-forward-outline'
          color="#fff"
          size={30}
        />
        </TouchableOpacity>
        
      </View>
      {loading ? <View style={{flex:1, backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center'}}>

        <Image source={require('./assets/Rolling-1s-200px.gif')} style={{width: 90, height: 90}}/>

      </View> :  <FlatList
        style={{marginTop: 20}}
        data={tastyDb}
        extraData={from}
        renderItem={({item, index}) => (
          <TouchableOpacity 
          style={{marginBottom: 15, backgroundColor: "#eeeeee", borderRadius: 10, width:"100%", height:200}}
          onPress={()=>{
            navigation.navigate('Recipe', {
              nam: item.name,
              tags: item.tags,
              desc: item.description,
              nutrition: item.nutrition,
              thumbnail: item.thumbnail_url,
              components: item.sections[0].components,
              instructions: item.instructions
            })
          }}>
            <Image 
            style={{flex:1, width:null, minHeight:null, resizeMode:'cover'}}
            source={{uri: item.thumbnail_url}} />
            <Text style={{fontSize: 20, paddingLeft: 5, fontWeight: 600}}>{item.name}</Text>
          </TouchableOpacity>
        )}
        />}
    </View>
  );
}
