
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/mainStyles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cooking({route, navigation}) {
    const {nam, tags, desc, nutrition, thumbnail, components, instructions} = route.params;
    const [step, setStep] = useState(0)
    console.log("INSTRUCTIONS: "+instructions[step].display_text)
    console.log("STEPS: "+ instructions.length+"/"+step)
    return(
        <ScrollView style={[styles.container,{paddingHorizontal: 15}]}>
                <View 
                    style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20}}>

                    <TouchableOpacity 
                        disabled={step==0?true:false}
                        onPress={()=>{
                            setStep(step==0?0:step-1)
                            console.log(-1)
                        }}
                    style={{width: 50, height: 50, backgroundColor: step==0?"#ddd":"#7cadfc", borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
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
                            width: 80, height: 50,
                            backgroundColor: "#7cadfc", borderRadius: 10,
                            color:"#ffffff",
                            fontWeight:"bold"
                        }}>
                        Step: {step}
                    </Text>

                    <TouchableOpacity 
                        disabled={step==(instructions.length-1)?true:false}
                        onPress={()=>{
                            setStep(step==(instructions.length-1)?(instructions.length-1):step+1)
                            console.log(+1)
                        }}
                    style={{width: 50, height: 50, backgroundColor: step==(instructions.length-1)?"#ddd":"#7cadfc", borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
                        <Icon
                            name='arrow-forward-outline'
                            color="#fff"
                            size={30}
                            />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent:"center"}}>
                    <Text 
                        style={{
                            backgroundColor: "#eeeeee",
                            borderRadius:10,
                            paddingHorizontal:15,
                            paddingVertical:20,
                            textAlign:'justify',
                            fontSize:25,
                            lineHeight:40,
                            marginTop: 20,
                            alignSelf:"center",
                        }}>
                        {instructions[step].display_text}
                    </Text>
                </View>
        </ScrollView>
    )
}