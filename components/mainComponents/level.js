import React from "react";
import uuid from 'react-native-uuid';
import { StyleSheet, View, Text } from 'react-native';
import Sounds from './sounds'
import TargetSpelling from "./targetSpelling";
import TargetBtn from "./targetButtons";
import * as StoreReview from 'expo-store-review';

export default class Level extends React.Component {
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
        this.renderTargetButtons = this.renderTargetButtons.bind(this)
        this.renderSpellingTarget = this.renderSpellingTarget.bind(this)

        this.renderLevel = this.renderLevel.bind(this)
        this.returnMatchLevel = this.returnMatchLevel.bind(this)
        this.returnMatchFirstLevel = this.returnMatchFirstLevel.bind(this)
        this.returnSpellingLevel = this.returnSpellingLevel.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        let questionIndex = props.currentPlayer.questionIndex
        if (questionIndex == 38) {
            StoreReview.requestReview()
        }

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



    renderTargetButtons(correctTarget) {
        let buttonArray = []
        let correct = <TargetBtn
            key={correctTarget + uuid.v4()}
            value={correctTarget}
            changePlayer={this.props.changePlayer}
            updateLocalLearnerRecord={this.props.updateLocalLearnerRecord}
            userID={this.state.currentPlayerId}
            correct={true}
            content={this.state.correctStandardContent}>
        </TargetBtn>
        buttonArray.push(correct)

        for (let attempt of this.state.incorrect) {
            let incorrect = <TargetBtn
                key={attempt.literal + uuid.v4()}
                changePlayer={this.props.changePlayer}
                updateLocalLearnerRecord={this.props.updateLocalLearnerRecord}
                userID={this.state.currentPlayerId}
                correct={false}
                content={attempt.iri}
                value={attempt.literal}>
            </TargetBtn>
            buttonArray.push(incorrect)
        }
        const shuffled = buttonArray.sort(() => Math.random() - 0.5)

        return shuffled
    }

    renderSpellingTarget(correctTargetsArray, fullword) {
        let buttons = <View style={styles.mainContainer}>
            <Sounds sound={fullword}></Sounds>
            <TargetSpelling

                changePlayer={this.props.changePlayer}
                updateLocalLearnerRecord={this.props.updateLocalLearnerRecord}
                userID={this.state.currentPlayerId}
                correctStandardContent={this.state.correctStandardContent}
                correctTarget={correctTargetsArray}
                incorrectTargets={this.state.incorrect}
                fullword={fullword}>
            </TargetSpelling>
        </View>




        return buttons
    }

    returnMatchLevel() {
        return (
            <View style={styles.mainContainer}>
                <Sounds sound={this.state.correctTarget}></Sounds>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {this.state.correctTarget}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.renderTargetButtons(this.state.correctTarget)}
                </View>
            </View>
        )
    }

    returnMatchFirstLevel() {
        let regex = /\(([^)]+)\)/
        var matches = regex.exec(this.state.correctTarget)
        let correctTarget = matches[1]
        let restOfWord = this.state.correctTarget.replace(matches[0], "")
        return (
            <View style={styles.mainContainer}>
                <Sounds sound={correctTarget}></Sounds>
                <View style={styles.targetContainer}>
                    <Text>
                        <Text style={styles.matchFirstTarget}>
                            {correctTarget}
                        </Text>
                        <Text style={styles.matchFirstRest}>
                            {restOfWord}
                        </Text>
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.renderTargetButtons(correctTarget)}
                </View>
            </View>
        )
    }

    returnSpellingLevel() {
        let fullword = this.state.correctTarget.replace(/\|/g, "")
        let targetArray = this.state.correctTarget.split("|")
        return this.renderSpellingTarget(targetArray, fullword)

    }



    renderLevel() {
        switch (this.state.levelType) {
            case "match":
                return this.returnMatchLevel()
            case "matchfirst":
                return this.returnMatchFirstLevel()
            case "spelling":
                return this.returnSpellingLevel()
            default:
                return (<View>
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
            <View style={styles.level}>
                {this.renderLevel()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    level: {
        width: "100%",
        height: "100%",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetContainer: {
        flex: 1,
        width: "90%",
        margin: "5%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#E4C580",
        textAlign: 'center'
    },
    buttonsContainer: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    targetText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
    },
    matchFirstTarget: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
        color: "#FC3D14"
    },
    matchFirstRest: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
    }

});