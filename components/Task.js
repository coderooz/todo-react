import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Task = (props) => {
    return (
    <View style={styles.item}>
        <View style={styles.itemsLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemtext}>{props.keyValue}. {props.text}</Text>
        </View>
        <View style={styles.circular}></View>
    </View>)
}; 

const baseColor = '#55BCF6';

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    itemsLeft:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    square:{
        width:24,
        height:24,
        backgroundColor:baseColor,
        opacity: 0.6,
        borderRadius: 5,
        marginRight: 15
    },
    itemtext:{ 
        maxWidth: '80%',
        fontWeight: '500',
    },
    circular:{
        width: 12,
        height: 12,
        borderColor: baseColor,
        borderWidth: 2,
        borderRadius: 5
    }
});

export default Task;