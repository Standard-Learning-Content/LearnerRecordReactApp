/**
 * Selects how many users are learning 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, mage } from 'react-native';
import config from '../../config.json'
import uuid from 'react-native-uuid';
import { Audio } from "expo-av"
import Images from './images'

Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    allowsRecordingAndroid: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: true
})

class HeaderChar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            char: "",
            active: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        let newState = {
            char: props.char,
            active: props.active
        }
        return newState
    }



    render() {
        let charState
        if (this.state.active) {
            charState = {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 60,
                marginTop: 0,
                color: "#FC3D14"
            }
        } else {
            charState = {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 60,
                marginTop: 0,
                color: "#000000"
            }
        }
        return (
            <Text style={charState}>
                {this.state.char}
            </Text >
        )
    }
}


export default class TargetSpelling extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCharIndex: "",
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
            userID: this.state.userID + "test",
            standardLearnedContent: this.state.correctStandardContent.replace("<", "").replace(">", ""),
            correct: true,
            timestamp: Date.now()
        }
        const res = await fetch("http://3.132.12.204:4000/writeToLearnerRecord", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Method': 'POST,GET'
            },
            body: JSON.stringify(answerData)
        })

        if (!res.ok) {
            throw new Error('Request returned a non 200 response code')
        }


        const data = await res.text()
        if (config["debug-mode"]) console.log(data)

        this.setState({
            currentCharIndex: "",
            correctTargets: "",
            incorrectTarget: "",
            correctStandardContent: "",
            userID: "",
            fullword: ""
        })
        this.props.updateLocalLearnerRecord(this.props.correctTarget, answerData.standardLearnedContent, answerData.correct)
        this.props.changePlayer()

    }

    async answer(content) {
        if (content == this.state.correctTargets[this.state.currentCharIndex]) {
            this.sound = new Audio.Sound()
            await this.sound.loadAsync(require('../../assets/audio/feedback/Correct.mp3'))
            await this.sound.playAsync()

            setTimeout(async () => {
                await this.sound.unloadAsync();
            }, 1000);

            let temp = this.state.currentCharIndex++
            let newIndex = temp + 1
            this.setState({
                currentCharIndex: newIndex
            })


        }

        if (this.state.currentCharIndex == this.state.correctTargets.length) {
            this.submitAnswer()
        }
    }


    createDynamicHeader() {
        let textArray = []

        let charArray = this.state.fullword.split("")
        let keyCounter = 0
        for (let char of charArray) {
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
            let button = <Button
                key={content + uuid.v4()}
                onPress={() => this.answer(content)}
                color="#15DB95"
                buttonStyle={{ backgroundColor: "#15DB95" }}
                containerStyle={{
                    width: "90%",
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                style={styles.button}
                title={content}
            />
            buttonArray.push(button)
        }

        for (let incorrect of this.state.incorrectTarget) {
            let button = <Button
                key={incorrect.literal + uuid.v4()}
                onPress={() => console.log("Incorrect")}
                color="#15DB95"
                buttonStyle={{ backgroundColor: "#15DB95" }}
                containerStyle={{
                    width: "90%",
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}
                style={styles.button}
                title={incorrect.literal}
            />
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

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetContainer: {
        flex: 1,
        height: "100%",
        width: "90%",
        flexDirection: "row",
        margin: "5%",
        borderRadius: 10,
        backgroundColor: "#E4C580",
        textAlign: 'center'
    },
    targetTextContainer: {
        flex: 1,
        width: "100%",
        textAlign: 'center'
    },
    targetText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 0,
    },
    buttonsContainer: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // marginVertical: 20,
    },
});