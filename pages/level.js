/**
 * The main handler for a creating level and rendering a level. 
 * 
 * @CaseyRock
 */


import React from "react";
import uuid from 'react-native-uuid';
import { StyleSheet, View, Text } from 'react-native';
import { playContentSounds } from '../components/sounds'
import TargetSpelling from "../components/levelComponents/targetSpelling";
import TargetBtn from "../components/levelComponents/targetButtons";
import * as StoreReview from 'expo-store-review';
import PropTypes from 'prop-types';

//////////////////////
// Component Class
/////////////////////
export default class Level extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            corretCount: 0,
            currentQuestionSetLength: "",
            levelID: "",
            currentQuestionSetIndex: -1,
            currentQuestionSet: "",
            currentPlayerId: "",
            currentPlayerName: "",
            currentPlayer: "",
        }
        this.renderTargetButtons = this.renderTargetButtons.bind(this)
        this.renderSpellingTarget = this.renderSpellingTarget.bind(this)
        this.renderLevel = this.renderLevel.bind(this)
        this.returnMatchLevel = this.returnMatchLevel.bind(this)
        this.returnMatchFirstLevel = this.returnMatchFirstLevel.bind(this)
        this.returnSpellingLevel = this.returnSpellingLevel.bind(this)
        this.changeQuestion = this.changeQuestion.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        let questionIndex = props.route.params.questionIndex

        if (questionIndex == 38) {
            StoreReview.requestReview()
        }

        //Only updates the state when navigating from main
        if (state.currentQuestionSetIndex == -1) {
            let newState = {
                currentCount: 0,
                currentQuestionSetLength: props.route.params.currentQuestionSetLength,
                levelID: props.route.params.levelID,
                currentQuestionSetIndex: 0,
                currentQuestionSet: props.route.params.currentQuestionSet,
                currentPlayerId: props.route.params.currentPlayerId,
                currentPlayerName: props.route.params.currentPlayerName,
                currentPlayer: props.route.params.currentPlayer
            }
            return newState
        } else {
            return null
        }

    }


    changeQuestion(correct) {
        let newIndex = this.state.currentQuestionSetIndex + 1
        if (newIndex == this.state.currentQuestionSetLength) {
            this.props.navigation.navigate('levelComplete', { correctCount: this.state.corretCount })
        } else {
            let newCount = this.state.corretCount
            if (correct) {
                newCount + 1
            }
            this.setState({
                currentCount: newCount,
                currentQuestionSetIndex: newIndex
            })
        }
    }


    renderTargetButtons(currentLevel, correctTarget) {
        let buttonArray = []
        let correct = <TargetBtn
            key={correctTarget + uuid.v4()}
            value={correctTarget}
            navigation={this.props.navigation}
            changeQuestion={this.changeQuestion}
            currentPlayer={this.state.currentPlayer}
            userID={this.state.currentPlayerId}
            correct={true}
            content={currentLevel.correctStandardContent}>
        </TargetBtn>
        buttonArray.push(correct)

        for (let attempt of currentLevel.incorrect) {
            let incorrect = <TargetBtn
                key={attempt.literal + uuid.v4()}
                value={attempt.literal}
                navigation={this.props.navigation}
                changeQuestion={this.changeQuestion}
                currentPlayer={this.state.currentPlayer}
                userID={this.state.currentPlayerId}
                correct={false}
                content={attempt.iri}>
            </TargetBtn>
            buttonArray.push(incorrect)
        }
        const shuffled = buttonArray.sort(() => Math.random() - 0.5)

        return shuffled
    }

    renderSpellingTarget(correctTargetsArray, fullword, currentLevel) {
        let buttons = <View style={styles.mainContainer}>
            <TargetSpelling
                changeQuestion={this.changeQuestion}
                navigation={this.props.navigation}
                currentPlayer={this.state.currentPlayer}
                userID={this.state.currentPlayerId}
                correctStandardContent={currentLevel.correctStandardContent}
                correctTarget={correctTargetsArray}
                incorrectTargets={currentLevel.incorrect}
                fullword={fullword}>
            </TargetSpelling>
        </View>




        return buttons
    }


    ///////////////////
    // Returns the level
    ////////////////////
    returnMatchLevel() {
        let currentLevel = this.state.currentQuestionSet[this.state.currentQuestionSetIndex]
        playContentSounds(currentLevel.correctTarget)
        return (
            <View style={styles.mainContainer}>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetText}>
                        {currentLevel.correctTarget}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.renderTargetButtons(currentLevel, currentLevel.correctTarget)}
                </View>
            </View>
        )
    }

    returnMatchFirstLevel() {
        let currentLevel = this.state.currentQuestionSet[this.state.currentQuestionSetIndex]
        let regex = /\(([^)]+)\)/
        var matches = regex.exec(currentLevel.correctTarget)
        let correctTarget = matches[1]
        let restOfWord = currentLevel.correctTarget.replace(matches[0], "")
        playContentSounds(correctTarget)
        return (
            <View style={styles.mainContainer}>
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
                    {this.renderTargetButtons(currentLevel, correctTarget)}
                </View>
            </View>
        )
    }

    returnSpellingLevel() {
        let currentLevel = this.state.currentQuestionSet[this.state.currentQuestionSetIndex]
        let fullword = currentLevel.correctTarget.replace(/\|/g, "")
        let targetArray = currentLevel.correctTarget.split("|")
        playContentSounds(fullword)
        return this.renderSpellingTarget(targetArray, fullword, currentLevel)

    }

    renderLevel() {
        let currentLevel = this.state.currentQuestionSet[this.state.currentQuestionSetIndex]
        switch (currentLevel.levelType) {
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
                            {currentLevel.levelType}
                        </Text>
                    </View>

                </View>
                )
        }
    }

    render() {
        return (
            <View style={styles.levelContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headline}>
                        {this.state.currentPlayerName}&apos;s Turn {'\n'}
                        Question #: {this.state.levelID}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.level}>
                        {this.renderLevel()}
                    </View>
                </View>
            </View>

        )
    }
}


///////////////////////
// Prop Validation
/////////////////////
Level.propTypes = {
    route: PropTypes.object,
    currentPlayer: PropTypes.object,
    changePlayer: PropTypes.func,
    updateLocalLearnerRecord: PropTypes.func,
    navigation: PropTypes.object,
}

//////////////////////
// Component Styling
/////////////////////
const styles = StyleSheet.create({
    level: {
        width: "100%",
        height: "100%",
    },
    levelContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#080F5B',
    },
    headerContainer: {
        flex: 1,
        width: "100%",
        height: "15%",
        backgroundColor: '#0D19AA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 30,
    },
    contentContainer: {
        flex: 7,
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
});