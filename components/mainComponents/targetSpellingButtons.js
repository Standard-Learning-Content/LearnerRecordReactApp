/**
 * Selects how many users are learning 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { Button, ThemeConsumer } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import config from '../../config.json'
import uuid from 'react-native-uuid';


export default class TargetSpellingButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCharIndex: 0,
            correctTargets: "",
            incorrectTarget: "",
            correctStandardContent: "",
            userID: ""
        }

        this.answer = this.answer.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.createButtons = this.createButtons.bind(this)
    }

    static getDerivedStateFromProps(props, state) {

        let newState = {
            currentCharIndex: 0,
            correctStandardContent: props.correctStandardContent,
            correctTargets: props.correctTarget,
            incorrectTarget: props.incorrectTargets,
            userID: props.userID
        }
        return newState
    }

    async submitAnswer() {
        let answerData = {
            userID: this.state.userID,
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
        this.props.updateLocalLearnerRecord(this.props.correctTarget, answerData.standardLearnedContent, answerData.correct)
        this.props.changePlayer()

    }

    answer(content) {
        if (content == this.state.correctTargets[this.state.currentCharIndex]) {
            this.state.currentCharIndex++
        }

        if (this.state.currentCharIndex == this.state.correctTargets.length) {
            this.submitAnswer()
        }
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
                    width: 400,
                    marginHorizontal: 50,
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
                    width: 400,
                    marginHorizontal: 50,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
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
            <View >
                {this.createButtons()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: '5%',
        width: '100%',

    },
});