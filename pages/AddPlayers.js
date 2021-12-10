import React from "react";
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import NameInput from "../components/playerNameInput"


export default class AddPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.inputValue = {}
        this.addInputBoxes = this.addInputBoxes.bind(this)
    }


    addInputBoxes = () => {
        let inputTextArray = []
        for (let i = 0; i < this.props.numPlayers; i++) {
            const eventhandler = data => {
                this.inputValue = Object.assign(this.inputValue, data)
            }
            inputTextArray.push(<NameInput onChange={eventhandler} number={i + 1} />
            )
        }
        return inputTextArray
    }


    render() {
        const goToHome = () => {
            Actions.main({ "PlayerName": this.inputValue })
        }



        return (
            <View style={{ padding: 10 }}>
                {this.addInputBoxes()}

                <Button
                    title="Start Learning"
                    onPress={goToHome}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});