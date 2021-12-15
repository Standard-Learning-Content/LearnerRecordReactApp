import React from "react";
import TargetBtn from "./targetButtons";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { Tile } from 'react-native-elements';
import levels from '../levels/levels.json'

export default class Levels extends React.Component {
    constructor(props) {
        super(props)
        this.levelID = levels[this.props.currentPlayer.questionIndex].LevelID
        this.correctStandardContent = levels[this.props.currentPlayer.questionIndex].correctStandardContent
        this.correctTarget = levels[this.props.currentPlayer.questionIndex].correctTarget
        this.incorrectStandardContent = levels[this.props.currentPlayer.questionIndex].incorrectStandardContent
        this.incorrectTarget = levels[this.props.currentPlayer.questionIndex].incorrectTarget
        this.currentPlayer = this.props.currentPlayer
    }


    render() {
        return (

            <View style={styles.container}>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {this.correctTarget}
                    </Text>
                </View>
                <TargetBtn userID={this.currentPlayer.id} correct={true} value={this.correctTarget}></TargetBtn>
                <TargetBtn userID={this.currentPlayer.id} correct={false} value={this.incorrectTarget}></TargetBtn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    targetContainer: {
        margin: "5%",
        height: "35%",
        borderRadius: 5,
        backgroundColor: "#CBC3E3",
    },
    targetText: {
        fontSize: 80,
    },
    headline: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    }

});