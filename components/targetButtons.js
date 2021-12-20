import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, View, SafeAreaView, Text, Alert } from 'react-native';
import { Tile } from 'react-native-elements';
import levels from '../levels/levels.json'

export default class TargetBtn extends React.Component {
    constructor(props) {
        super(props)
        this.answer = this.answer.bind(this)
    }

    async answer() {


        if (this.props.correct) {
            let answerData = {
                userID: this.props.userID,
                standardLearnedContent: this.props.content.replace("<", "").replace(">", ""),
                correct: this.props.correct,
                timestamp: Date.now()
            }
            console.log(answerData)

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

            const { data } = await res.json()
            console.log(data)




            this.props.changePlayer()

        } else {
            console.log("Incorrect")
        }
    }


    render() {

        return (
            <View >
                <Button
                    onPress={() => this.answer()}
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
        color: "#24305E"
    },
});