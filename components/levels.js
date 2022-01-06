import React from "react";
import TargetBtn from "./targetButtons";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Sounds from './sounds'
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
                    <TargetBtn correctTarget={this.state.correctTarget} changePlayer={this.props.changePlayer} updateLocalLearnerRecord={this.props.updateLocalLearnerRecord} userID={this.state.currentPlayer.id} correct={true} content={this.state.correctStandardContent} value={this.state.correctTarget}></TargetBtn>
                    <TargetBtn correctTarget={this.state.correctTarget} changePlayer={this.props.changePlayer} updateLocalLearnerRecord={this.props.updateLocalLearnerRecord} userID={this.state.currentPlayer.id} correct={false} content={this.state.incorrectStandardContent} value={this.state.incorrectTarget}></TargetBtn>
                </View>

            )
        } else {
            return (
                <View>
                    <TargetBtn correctTarget={this.state.correctTarget} changePlayer={this.props.changePlayer} updateLocalLearnerRecord={this.props.updateLocalLearnerRecord} userID={this.state.currentPlayer.id} correct={false} content={this.state.incorrectStandardContent} value={this.state.incorrectTarget}></TargetBtn>
                    <TargetBtn correctTarget={this.state.correctTarget} changePlayer={this.props.changePlayer} updateLocalLearnerRecord={this.props.updateLocalLearnerRecord} userID={this.state.currentPlayer.id} correct={true} content={this.state.correctStandardContent} value={this.state.correctTarget}></TargetBtn>
                </View>

            )
        }


    }

    static getDerivedStateFromProps(props, state) {
        let questionIndex = props.currentPlayer.questionIndex
        let newState = {
            levelID: props.currentPlayer.questions[questionIndex].LevelID,
            correctStandardContent: props.currentPlayer.questions[questionIndex].correctStandardContent,
            correctTarget: props.currentPlayer.questions[questionIndex].correctTarget,
            incorrectStandardContent: props.currentPlayer.questions[questionIndex].incorrectStandardContent,
            incorrectTarget: props.currentPlayer.questions[questionIndex].incorrectTarget,
            currentPlayer: props.currentPlayer,
        }
        return newState
    }

    render() {

        return (

            <View style={styles.container}>
                <Sounds sound={this.state.correctTarget}></Sounds>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {this.state.correctTarget}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.renderTargerButtons()}
                </View>



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
        backgroundColor: "#E4C580",
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    targetText: {
        fontSize: 80,
    },
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    }

});