/**
 * Selects how many users are learning 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import config from '../config.json'


export default class TargetBtn extends React.Component {
    constructor(props) {
        super(props)
        this.answer = this.answer.bind(this)
    }

    async answer() {
        let answerData = {
            userID: this.props.userID,
            standardLearnedContent: this.props.content.replace("<", "").replace(">", ""),
            correct: this.props.correct,
            timestamp: Date.now()
        }
        if (this.props.correct) {
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
            this.props.updateLocalLearnerRecord(this.props.correctTarget, answerData.userID, answerData.standardLearnedContent, answerData.correct, answerData.timestamp)
            this.props.changePlayer()
        } else {
            if (config["debug-mode"]) console.log("Incorrect")
            this.props.updateLocalLearnerRecord(this.props.correctTarget, answerData.userID, answerData.standardLearnedContent, answerData.correct, answerData.timestamp)
        }
    }


    render() {

        return (
            <View >
                <Button
                    onPress={() => this.answer()}
                    color="#15DB95"
                    buttonStyle={{ backgroundColor: "#15DB95" }}
                    containerStyle={{
                        width: 400,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                    style={styles.button}
                    title={this.props.value}
                />
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