/**
 * Selects how many users are learning 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { StyleSheet, View, Text } from 'react-native';


export default class Record extends React.Component {
    constructor(props) {
        super(props)
        this.countsCorrect = this.props.countsCorrect
        this.totalCounts = this.props.totalCounts
        this.literalValue = this.props.literalValue
    }

    render() {

        return (
            <View style={styles.item} >
                <Text style={styles.title}>{this.literalValue}</Text>
                <Text style={styles.title}>{this.countsCorrect}</Text>
                <Text style={styles.title}>{this.totalCounts}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
});