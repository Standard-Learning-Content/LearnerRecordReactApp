/**
 * Adds all the players to the game by querying for their Learner Record. 
 * Then, using the LR, assign each player their proper questions
 * 
 * 05 January 2022
 * @CaseyRock
 */

import React from "react";
import { View, Button, Alert, StyleSheet, Text } from 'react-native';
import NameInput from "../components/addPlayerComponents/playerNameInput"
import all_levels from '../levels/levels.json'
import { JSHash, CONSTANTS } from 'react-native-hash';
import config from '../config.json'
import PropTypes from 'prop-types';


export default class AddPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.inputValue = {}

        this.addInputBoxes = this.addInputBoxes.bind(this)
        this.goToHome = this.goToHome.bind(this)
    }


    /**
     * 
     * Created name input boxes equal to the number of players
     * @returns {NameInput} array of nameInput boxes 
     * @CR 
     */
    addInputBoxes = () => {
        let inputTextArray = []
        for (let i = 0; i < this.props.route.params.numPlayers; i++) {
            const eventhandler = data => {
                this.inputValue = Object.assign(this.inputValue, data)
            }
            inputTextArray.push(<NameInput key={i + 1} onChange={eventhandler} number={i + 1} />)
        }
        return inputTextArray
    }

    /**
     * Creates new gamePlayer objects for each player. Then assigns the gameplayer object an id, name, 
     * learner Record, and set of unique question
     * @CR
     */
    async goToHome() {


        if (Object.keys(this.inputValue).length == this.props.route.params.numPlayers) {
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
                if (player == "") {
                    console.log("yooo")
                }
                // Currently we are sha256 hashing the first name for the id 
                let hash = await JSHash(this.inputValue[player], CONSTANTS.HashAlgorithms.sha256)
                let hashed_id = { "userID": hash }

                //Fetches for the Learner Record 
                const res = await fetch(`${config["api-location"]}/readFromLearnerRecord`, {
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

                const data = await res.json()
                let contentArray = data
                let playerLevels = []

                // If the player has leared the contentless then 10 time, we add it to the set of questions
                for (let level of all_levels) {
                    if (contentArray[level.correctStandardContent] == undefined) {
                        playerLevels.push(level)
                    } else if (contentArray[level.correctStandardContent].countsCorrect < 30) {
                        playerLevels.push(level)
                    }
                }
                let tempPlayer = new GamePlayer(hash, this.inputValue[player], contentArray, playerLevels)
                if (playerLevels.length > 0) {
                    allPlayers.push(tempPlayer)
                } else {
                    Alert.alert(
                        this.inputValue[player],
                        "Has completed all the questions before!",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            { text: "OK" }
                        ]
                    )

                    if (config["debug-mode"]) console.log(this.inputValue[player] + " has Completed the app")
                    completedPlayers.push(tempPlayer)
                }
            }
            this.props.navigation.navigate('Learn', { "players": allPlayers, "completedPlayer": completedPlayers })
        } else {
            Alert.alert(
                "Missing Learner's Names",
                "Make sure to add all the learner's names",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { text: "OK" }
                ]
            )
        }


    }


    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.headline}> Who is Learning?</Text>
                {this.addInputBoxes()}
                <Button
                    title="Start Learning"
                    color="#F4E4C1"
                    type="outline"
                    style={{ padding: 10 }}
                    onPress={async () => { await this.goToHome() }}
                />
            </View>

        )
    }
}


AddPlayers.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#080F5B',
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 30,
        padding: 20,
        textAlign: "center"
    }
});
