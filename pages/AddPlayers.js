import React from "react";
import { View, Button } from 'react-native';
import NameInput from "../components/playerNameInput"
import all_levels from '../levels/levels.json'
import { JSHash, CONSTANTS } from 'react-native-hash';


const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;


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
            let contentArray = []
            for (let standardContent of data) {
                contentArray.push(standardContent.StandardContent.value)
            }

            let tempPlayer = new GamePlayer(hash, this.inputValue[player], contentArray, all_levels)
            allPlayers.push(tempPlayer)
        }
        this.props.navigation.navigate('LearnerRecord', { "players": allPlayers })
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
