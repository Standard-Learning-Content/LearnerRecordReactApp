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
            levelType: "",
            correctStandardContent: "",
            correctTarget: "",
            incorrect: "",
            currentPlayerId: "",
        }
        this.renderTargerButtons = this.renderTargerButtons.bind(this)
        this.renderLevel = this.renderLevel.bind(this)
    }

    renderTargerButtons() {
        let buttonArray = []

        let correct = <TargetBtn correctTarget={this.state.correctTarget} changePlayer={this.props.changePlayer} updateLocalLearnerRecord={this.props.updateLocalLearnerRecord} userID={this.state.currentPlayerId} correct={true} content={this.state.correctStandardContent} value={this.state.correctTarget}></TargetBtn>
        buttonArray.push(correct)

        for (let attempt of this.state.incorrect) {

            let incorrect = <TargetBtn correctTarget={this.state.correctTarget} changePlayer={this.props.changePlayer} updateLocalLearnerRecord={this.props.updateLocalLearnerRecord} userID={this.state.currentPlayerId} correct={false} content={attempt.iri} value={attempt.literal}></TargetBtn>
            buttonArray.push(incorrect)
        }
        const shuffled = buttonArray.sort(() => Math.random() - 0.5)

        return shuffled
    }

    static getDerivedStateFromProps(props, state) {
        let questionIndex = props.currentPlayer.questionIndex

        let newState = {
            levelID: props.currentPlayer.questions[questionIndex].levelID,
            levelType: props.currentPlayer.questions[questionIndex].levelType,
            correctStandardContent: props.currentPlayer.questions[questionIndex].correctStandardContent,
            correctTarget: props.currentPlayer.questions[questionIndex].correctTarget,
            incorrect: props.currentPlayer.questions[questionIndex].incorrect,
            currentPlayerId: props.currentPlayer.id,
        }
        return newState
    }

    renderLevel() {
        if (this.state.levelType == "match") {
            return (<View style={styles.container}>
                <Sounds sound={this.state.correctTarget}></Sounds>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {this.state.correctTarget}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.renderTargerButtons()}
                </View>
            </View>)
        } else {
            return (<View style={styles.container}>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {console.log(this.state.levelType)}
                    </Text>
                </View>

            </View>
            )
        }
    }


    render() {
        return (
            <View>
                {this.renderLevel()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    targetContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "5%",
        height: "20%",
        borderRadius: 5,
        backgroundColor: "#E4C580",
        textAlign: 'center'

    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    targetText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
    },
    headline: {
        // textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
    }

});