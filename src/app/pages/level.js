/**
 * The main handler for a creating level and rendering a level. 
 * 
 * @CaseyRock
 */


import React from "react";
import uuid from 'react-native-uuid';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { playContentSounds } from '../components/sounds'
import TargetSpelling from "../components/levelComponents/targetSpelling";
import TargetBtn from "../components/levelComponents/targetButtons";
import Background from '../../assets/background.png'
import * as StoreReview from 'expo-store-review';
import PropTypes from 'prop-types';

//////////////////////
// Component Class
/////////////////////
export default class Level extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            correctCount: 0,
            currentQuestionSetLength: "",
            levelID: "",
            currentQuestionSetIndex: -1,
            currentQuestionSet: "",
            currentPlayerId: "",
            currentPlayerName: "",
            currentPlayer: "",
            level: "",
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
                correctCount: 0,
                currentQuestionSetLength: props.route.params.currentQuestionSetLength,
                levelID: props.route.params.levelID,
                level: props.route.params.level,
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
        let newCount = correct ? this.state.correctCount + 1 : this.state.correctCount
        let newIndex = this.state.currentQuestionSetIndex + 1
        if (newIndex == this.state.currentQuestionSetLength) {
            this.props.navigation.navigate('levelComplete', { correctCount: newCount, currentPlayer: this.state.currentPlayer, level: this.state.level })
        } else {
            this.setState({
                correctCount: newCount,
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
            case "spell":
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
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
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

                </ImageBackground>

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
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "auto"
    },
    container: {
        marginVertical: "15%",
        marginHorizontal: "10%",
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff33",
    },
    levelContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#82b6ff',
    },
    headerContainer: {
        flex: 1,
        width: "100%",
        height: "15%",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5994",
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#000000",
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
        color: "#fff",
        fontSize: 60,
        marginTop: 0,
    },
    matchFirstTarget: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
        color: "#84ff9f",
    },
    matchFirstRest: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
    },
});