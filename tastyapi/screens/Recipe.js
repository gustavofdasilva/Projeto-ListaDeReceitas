import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/mainStyles';

export default function Recipe({route, navigation}) {
    const {name} = route.params;
    return (
        <View style={styles.container}>
            <Text style={{margin: 20, fontSize: 20, fontFamily: "Roboto", fontWeight: 600}}>
                {name}
            </Text>
        </View>
    )
}