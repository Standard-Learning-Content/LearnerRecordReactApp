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

    answer() {

        let answerData = {
            "userID": this.props.userID,
            "standardLearnedContent": this.props.value,
            "correct": this.props.correct,
            "timestamp": Date.now()
        }

        if (this.props.correct) {
            // console.log(answerData)
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