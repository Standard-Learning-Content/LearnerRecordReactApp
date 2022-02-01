/**
 * Handles the spelling gamemode 
 * 
 * @CR
 */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import config from "../../config.json"
import uuid from "react-native-uuid";
import Images from "../images"
import { playCorrectSound, playIncorrectSound } from "../sounds"
import HeaderChar from "./targetSpellingHeader"
import SpellingBtn from "./targetSpellingButtons"
import PropTypes from "prop-types";



//////////////////////
// Component Class
/////////////////////
export default class TargetSpelling extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCharIndex: "",
            currentPlayer: "",
            correctTargets: "",
            incorrectTarget: "",
            correctStandardContent: "",
            userID: "",
            fullword: ""
        }

        this.answer = this.answer.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.createButtons = this.createButtons.bind(this)
        this.createDynamicHeader = this.createDynamicHeader.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if (state.currentCharIndex == "") {
            let newState = {
                currentCharIndex: 0,
                currentPlayer: props.currentPlayer,
                correctStandardContent: props.correctStandardContent,
                correctTargets: props.correctTarget,
                incorrectTarget: props.incorrectTargets,
                userID: props.userID,
                fullword: props.fullword
            }
            return newState
        } else {
            return null
        }

    }

    async submitAnswer() {
        let answerData = {
            userID: this.state.userID,
            standardLearnedContent: this.state.correctStandardContent.replace("<", "").replace(">", ""),
            correct: true,
            timestamp: Date.now()
        }
        const res = await fetch("http://3.132.12.204:4000/writeToLearnerRecord", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "POST,GET"
            },
            body: JSON.stringify(answerData)
        })

        if (!res.ok) {
            throw new Error("Request returned a non 200 response code")
        }


        const data = await res.text()
        if (config["debug-mode"]) console.log(data)
        this.props.currentPlayer.updateLocalLearnerRecord(this.props.correctTarget, answerData.standardLearnedContent, answerData.correct)
        this.setState({
            currentCharIndex: "",
            currentPlayer: "",
            correctTargets: "",
            incorrectTarget: "",
            correctStandardContent: "",
            userID: "",
            fullword: ""
        }, () => {
            this.props.changeQuestion(true)
        });
    }

    async answer(content) {
        if (content == this.state.correctTargets[this.state.currentCharIndex]) {
            playCorrectSound()
            let newIndex = this.state.currentCharIndex + 1
            setTimeout(() => {
                this.setState({
                    currentCharIndex: newIndex
                })
                if (newIndex == this.state.correctTargets.length) {
                    this.submitAnswer()
                }
            }, 500)


        } else {
            playIncorrectSound()
            setTimeout(async () => {
                this.setState({
                    currentCharIndex: "",
                    currentPlayer: "",
                    correctTargets: "",
                    incorrectTarget: "",
                    correctStandardContent: "",
                    userID: "",
                    fullword: ""
                }, () => {
                    this.props.changeQuestion(false)
                });
            }, 500);
        }


    }

    createDynamicHeader() {
        let textArray = []
        let keyCounter = 0
        for (let char of this.state.correctTargets) {
            let text = <HeaderChar
                key={keyCounter}
                active={keyCounter == this.state.currentCharIndex}
                char={char}
            >
            </HeaderChar>
            textArray.push(text)
            keyCounter++
        }
        return textArray

    }

    createButtons() {
        let buttonArray = []
        for (let content of this.state.correctTargets) {
            let button = <SpellingBtn
                key={content + uuid.v4()}
                answer={this.answer}
                content={content}
                correct={content == this.state.correctTargets[this.state.currentCharIndex]}
            >
            </SpellingBtn>
            buttonArray.push(button)
        }

        for (let incorrect of this.state.incorrectTarget) {
            let button = <SpellingBtn
                key={incorrect + uuid.v4()}
                answer={this.answer}
                content={incorrect.literal}
                correct={false}
            >
            </SpellingBtn>
            buttonArray.push(button)
        }

        const shuffled = buttonArray.sort(() => Math.random() - 0.5)
        return shuffled
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.targetContainer}>
                    <Text style={styles.targetTextContainer} >
                        {this.createDynamicHeader()}
                    </Text>
                    <Images image={this.state.fullword}></Images>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.createButtons()}
                </View>
            </View>

        )
    }
}

///////////////////////
// Prop Validation
/////////////////////
TargetSpelling.propTypes = {
    correctStandardContent: PropTypes.string,
    incorrectTargets: PropTypes.array,
    userID: PropTypes.string,
    fullword: PropTypes.string,
    updateLocalLearnerRecord: PropTypes.func,
    changePlayer: PropTypes.func,
    correctTarget: PropTypes.array,
    navigation: PropTypes.object,
    currentPlayer: PropTypes.object,
    changeQuestion: PropTypes.func,
}

//////////////////////
// Component Styling
/////////////////////
const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    targetContainer: {
        flex: 1,
        height: "100%",
        width: "90%",
        flexDirection: "row",
        margin: "5%",
        backgroundColor: "#ff5994",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#000000",
        textAlign: "center"
    },
    targetTextContainer: {
        flex: 1,
        width: "100%",
        textAlign: "center"
    },
    targetText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 60,
        marginTop: 0,
    },
    buttonsContainer: {
        flex: 4,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        // marginVertical: 20,
    },
});