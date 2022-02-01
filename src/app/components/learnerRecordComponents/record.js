/**
 * Creates the Record for a specifc content in the learner Record
 * 
 * 05 Jaunuary 2022
 * @CaseyRocl
 */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

//////////////////////
// Component Class
/////////////////////
export default class Record extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.item} >
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.literalValue}</Text>
                </View>
                <View style={styles.counts}>
                    <Text style={styles.countsTitle}>Correct: {this.props.countsCorrect}</Text>
                    <Text style={styles.countsTitle}>Attempts: {this.props.totalCounts}</Text>
                </View>

            </View >
        )
    }
}


///////////////////////
// Prop Validation
/////////////////////
Record.propTypes = {
    literalValue: PropTypes.string,
    countsCorrect: PropTypes.number,
    totalCounts: PropTypes.number,
}


//////////////////////
// Component Styling
/////////////////////
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#15DB95",
        borderRadius: 5,
        height: 150,
        marginVertical: 12,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 40,
        color: "#FFFFFF"
    },
    countsTitle: {
        fontSize: 30,
        color: "#FFFFFF"
    },
    content: {
        width: 100,
        height: 100,
        backgroundColor: "#0D19AA",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    counts: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        justifyContent: "center",
    }
});