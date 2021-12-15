import React from "react";
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import NameInput from "../components/playerNameInput"
import all_levels from '../levels/levels.json'


export default class AddPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.inputValue = {}
        this.addInputBoxes = this.addInputBoxes.bind(this)
        this.goToHome = this.goToHome.bind(this)
    }


    addInputBoxes = () => {
        let inputTextArray = []
        for (let i = 0; i < this.props.numPlayers; i++) {
            const eventhandler = data => {
                this.inputValue = Object.assign(this.inputValue, data)
            }
            inputTextArray.push(<NameInput key={i + 1} onChange={eventhandler} number={i + 1} />
            )
        }
        return inputTextArray
    }


    async goToHome() {
        let allPlayers = []
        for (let player in this.inputValue) {
            let id = "12NSNF_2IEHJFUEHA_21345SDG" // Dynamically Create ID

            let temp_data = { "userID": id }
            // const res = await fetch("http://3.132.12.204:4000/readFromLearnerRecord", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': "*",
            //         'Access-Control-Allow-Method': 'POST,GET'
            //     },
            //     body: JSON.stringify(temp_data)
            // })

            // if (!res.ok) {
            //     throw new Error('Request returned a non 200 response code')
            // }

            // const { data } = await res.json()
            let contentArray = []
            // for (let standardContent of data) {
            //     contentArray.push(standardContent.StandardContent.value)
            // }
            let gamePlayer = {}
            gamePlayer.questionIndex = 0
            gamePlayer.id = id
            gamePlayer.name = this.inputValue[player]
            gamePlayer.learnerRecord = contentArray
            gamePlayer.quentions = all_levels

            allPlayers.push(JSON.stringify(gamePlayer))
        }
        Actions.main({ "players": allPlayers })
    }


    render() {




        return (
            <View style={{ padding: 10 }}>
                {this.addInputBoxes()}

                <Button
                    title="Start Learning"
                    onPress={async () => { await this.goToHome() }}
                />
            </View>

        )
    }
}
