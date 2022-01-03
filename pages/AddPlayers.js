import React from "react";
import { View, Button, Alert } from 'react-native';
import NameInput from "../components/playerNameInput"
import all_levels from '../levels/levels.json'
import { JSHash, CONSTANTS } from 'react-native-hash';
import { InputGroup } from "react-bootstrap";


const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;
const debug = true

export default class AddPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.inputValue = {}

        this.addInputBoxes = this.addInputBoxes.bind(this)
        this.goToHome = this.goToHome.bind(this)
    }


    addInputBoxes = () => {
        let inputTextArray = []
        for (let i = 0; i < this.props.route.params.numPlayers; i++) {
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
        let completedPlayers = []
        let GamePlayer = function (id, name, learnerRecord, quentions) {
            this.questionIndex = 0
            this.id = id
            this.name = name
            this.learnerRecord = learnerRecord
            this.questions = quentions
        }



        for (let player in this.inputValue) {
            // Currently we are sha256 hashing the first name
            let hash = await JSHash(this.inputValue[player], CONSTANTS.HashAlgorithms.sha256)
            let hashed_id = { "userID": hash }

            const res = await fetch("http://3.132.12.204:4000/readFromLearnerRecord", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Method': 'POST,GET'
                },
                body: JSON.stringify(hashed_id)
            })

            if (!res.ok) {
                throw new Error('Request returned a non 200 response code')
            }

            const { data } = await res.json()
            let contentArray = data
            let playerLevels = []


            for (level of all_levels) {
                if (contentArray[level.correctStandardContent] == undefined) {
                    playerLevels.push(level)
                } else if (contentArray[level.correctStandardContent].countsCorrect < 10) {
                    playerLevels.push(level)
                }
            }
            let tempPlayer = new GamePlayer(hash, this.inputValue[player], contentArray, playerLevels)
            if (playerLevels.length > 0) {
                allPlayers.push(tempPlayer)
            } else {
                Alert.alert(
                    this.inputValue[player],
                    "has Completed all the questions before",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
                if (debug) console.log(this.inputValue[player] + " has Completed the app")
                completedPlayers.push(tempPlayer)
            }

        }
        this.props.navigation.navigate('LearnerRecord', { "players": allPlayers, "completedPlayer": completedPlayers })
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
