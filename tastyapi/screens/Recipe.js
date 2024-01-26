import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/mainStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import Cooking from './Cooking';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Recipe({route, navigation}) {
    
    const {nam, tags, desc, nutrition, thumbnail, components, instructions} = route.params;
    console.log(instructions)
    const Stack = createStackNavigator()
    return (
            <Stack.Navigator>
                <Stack.Screen 
                    name='Main' 
                    component={Main} 
                    initialParams={{nam, tags, desc, nutrition, thumbnail, components}}
                    options={{headerShown: true, headerTitleStyle: {display: 'none'}, headerStyle:{backgroundColor: "#eeeeee"}}}/>
                <Stack.Screen 
                    name='Cooking' 
                    component={Cooking} 
                    initialParams={{nam, tags, desc, nutrition, thumbnail, components, instructions}}
                    options={{headerShown: true, headerTitleStyle: {display: 'none'}, headerStyle:{backgroundColor: "#eeeeee"}}}
                    />
            </Stack.Navigator>
    )
}

function Main({route,navigation}) {
    const {nam, tags, desc, nutrition, thumbnail, components} = route.params;
    const [opened, setOpened] = useState(false)
    console.log(desc)
    return(
        <ScrollView style={[styles.container, {height:"100%"}]}>
                <View style={[styles.container, {height:"100%"}]}>
                    <Image 
                    style={{width:"100%", height:160}}
                    source={{uri: thumbnail}} />
                    <View style={{paddingHorizontal:15}}>
                        <Text style={{ marginTop: 20, fontSize: 30, fontWeight: 700}}>
                            {nam}
                        </Text>
                        
                        {nutrition == null ? null :  <TouchableOpacity 
                        onPress={()=>{
                            setOpened(!opened)
                        }}
                            style={{
                                backgroundColor: "#eeeeee",
                                paddingVertical:10,
                                borderRadius:10,
                                paddingHorizontal:15,
                                marginVertical:5,
                        }}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{
                                fontSize:18,
                                fontWeight: 'bold',
                            }}>
                                Nutrition Facts
                                
                            </Text>
                            <Icon
                                name= {opened?"arrow-up-circle-outline": 'arrow-down-circle-outline'}
                                color={"#000"}
                                size={20}
                                />
                            </View>

                            <View style={{display: opened?"flex": "none"}}>
                            <Text style={{
                                fontSize:15,
                            }}>
                                Calories: {nutrition.calories}
                            </Text>
                            <Text style={{
                                fontSize:15,
                            }}>
                                Carbohydrates: {nutrition.carbohydrates}
                            </Text>
                            <Text style={{
                                fontSize:15,
                                marginLeft:10,
                            }}>
                                Sugar: {nutrition.sugar}
                            </Text>
                            <Text style={{
                                fontSize:15,
                            }}>
                                Protein: {nutrition.protein}
                            </Text>
                            <Text style={{
                                fontSize:15,
                            }}>
                                Fat: {nutrition.fat}
                            </Text>
                            </View>
                        </TouchableOpacity>} 
                        <View style={{
                            padding: 0,
                            marginBottom: 20,
                            alignContent:'center',
                            justifyContent:'center'
                        }}>
                            <Text style={{marginVertical: 5,fontSize: 15, fontWeight: 700}}>
                            Tags
                        </Text>
                            <FlatList
                            
                            showsHorizontalScrollIndicator={false}
                            data={tags}
                            horizontal={true}
                            renderItem={({item, index})=>(
                                <Text style={{    
                                    alignSelf:"center",
                                    marginRight: 10,
                                    fontSize: 15, 
                                    backgroundColor:"#7cadfc",
                                    padding: 10,
                                    borderRadius: 10,
                                    fontFamily: "Roboto", 
                                    color: "#Ffffff",
                                    fontWeight: 600,
                                }}>
                                    {(item.name.replaceAll("_"," "))}
                                </Text>
                            )}
                            />
                        </View>
                        {desc==""?null:<Text style={{
                            backgroundColor: "#eeeeee",
                            paddingVertical:20,
                            borderRadius:10,
                            paddingHorizontal:15,
                            textAlign:'justify',
                            fontSize:15,
                            lineHeight:25,
                            
                        }}>
                            {desc}
                        </Text>}
                        <View style={{
                            backgroundColor: "#eeeeee",
                            paddingVertical:15,
                            borderRadius:10,
                            paddingHorizontal:10,
                            textAlign:'justify',
                            marginVertical: 10,
                            marginTop: 15,
                            paddingHorizontal: 15
                        }}>
                            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 5}}>
                                Ingredients:
                            </Text>
                            <FlatList
                            scrollEnabled={false}
                            data={components}
                            renderItem={({item,index})=>(
                                <Text style={{
                                    fontSize: 15,
                                    marginVertical:5,
                                    paddingVertical:5,
                                    borderRadius:5}}>
                                    {item.raw_text}
                                </Text>
                            )}
                            />
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: "#7cadfc",
                            paddingVertical:20,
                            borderRadius:10,
                            paddingHorizontal:10,
                            marginVertical: 10,
                            marginTop: 5,
                            paddingHorizontal: 15,
                            justifyContent:'center',
                            alignItems:'center',
                        }}
                        onPress={()=>{
                            navigation.navigate("Cooking", {

                            })
                        }}>
                            <Text style={{fontSize: 25, color:"#ffffff"}}>
                                Start!        
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    )
}