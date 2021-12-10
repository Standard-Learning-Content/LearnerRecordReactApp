import React from "react";
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'


export default class AddPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "player1": "",
            "player2": "",
            "player3": ""
        }
        this.addInputBoxes = this.addInputBoxes.bind(this)
    }

    componentDidMount() {
        let obj = {}
        for (let i = 0; i < this.props.numPlayers; i++) {
            obj[`player${i + 1}`] = ""
        }
        this.state = obj
        console.log(this.state)
    }


    addInputBoxes = () => {
        let inputTextArray = []
        for (let i = 0; i < this.props.numPlayers; i++) {
            let placeHolder = `Player ${i + 1}'s Name`
            inputTextArray.push(<TextInput
                style={styles.input}
                key={i + 1}
                // onChangeText={onChangeNumber}
                placeholder={placeHolder}
            />)
        }


        return inputTextArray
    }


    render() {
        const goToHome = () => {
            Actions.main()
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