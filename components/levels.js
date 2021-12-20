import React from "react";
import TargetBtn from "./targetButtons";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { Tile } from 'react-native-elements';

export default class Levels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            levelID: "",
            correctStandardContent: "",
            correctTarget: "",
            incorrectStandardContent: "",
            incorrectTarget: "",
            currentPlayer: "",
        }
        this.renderTargerButtons = this.renderTargerButtons.bind(this)
    }

    renderTargerButtons() {

        let randNum = Math.round(Math.random())

        if (randNum == 0) {
            return (
                <View>
                    <TargetBtn changePlayer={this.props.changePlayer} userID={this.state.currentPlayer.id} correct={true} content={this.state.correctStandardContent} value={this.state.correctTarget}></TargetBtn>
                    <TargetBtn changePlayer={this.props.changePlayer} userID={this.state.currentPlayer.id} correct={false} content={this.state.incorrectStandardContent} value={this.state.incorrectTarget}></TargetBtn>
                </View>

            )
        } else {
            return (
                <View>
                    <TargetBtn changePlayer={this.props.changePlayer} userID={this.state.currentPlayer.id} correct={false} content={this.state.incorrectStandardContent} value={this.state.incorrectTarget}></TargetBtn>
                    <TargetBtn changePlayer={this.props.changePlayer} userID={this.state.currentPlayer.id} correct={true} content={this.state.correctStandardContent} value={this.state.correctTarget}></TargetBtn>
                </View>

            )
        }


    }

    static getDerivedStateFromProps(props, state) {

        // var audio = new Audio(`./assets/audio/${props.currentPlayer.questions[questionIndex].correctTarget}.wax`);
        // audio.play();
        let questionIndex = props.currentPlayer.questionIndex
        let newState = {
            levelID: props.currentPlayer.questions[questionIndex].LevelID,
            correctStandardContent: props.currentPlayer.questions[questionIndex].correctStandardContent,
            correctTarget: props.currentPlayer.questions[questionIndex].correctTarget,
            incorrectStandardContent: props.currentPlayer.questions[questionIndex].incorrectStandardContent,
            incorrectTarget: props.currentPlayer.questions[questionIndex].incorrectTarget,
            currentPlayer: props.currentPlayer,
        }
        console.log(newState)
        return newState
    }

    render() {

        return (

            <View style={styles.container}>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {this.state.correctTarget}
                    </Text>
                </View>
                {this.renderTargerButtons()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    targetContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: "5%",
        height: "35%",
        borderRadius: 5,
        backgroundColor: "#F76C6C",
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