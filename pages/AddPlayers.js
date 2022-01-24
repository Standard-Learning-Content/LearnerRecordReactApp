/**
 * Adds all the players to the game by querying for their Learner Record. 
 * Then, using the LR, assign each player their proper questions
 * 
 * 05 January 2022
 * @CaseyRock
 */

import React from "react";
import { View, Alert, StyleSheet, Text } from 'react-native';
import NameInput from "../components/addPlayerComponents/playerNameInput"
import { Button } from 'react-native-elements';
import all_levels from '../levels/levels.json'
import GamePlayer from "../components/gamePlayer";
import { JSHash, CONSTANTS } from 'react-native-hash';
import config from '../config.json'
import PropTypes from 'prop-types';
import GameLevel from "../components/gameLevel";

//////////////////////
// Component Class
/////////////////////
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

            for (let player in this.inputValue) {
                // Currently we are sha256 hashing the first name for the id 
                let hash = await JSHash(this.inputValue[player], CONSTANTS.HashAlgorithms.sha256)

                let hashed_id
                if (config["production"])
                    hashed_id = { "userID": hash }
                else
                    hashed_id = { "userID": hash + "test" }

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

                let requiredPointsCounter = 0
                for (let level in all_levels) {
                    let keys = Object.keys(all_levels[level])
                    let gameLevel = new GameLevel(keys[0], 0, all_levels[level][keys[0]], requiredPointsCounter)
                    playerLevels.push(gameLevel)
                    requiredPointsCounter += 3
                }
                let tempPlayer = new GamePlayer(hash, this.inputValue[player], contentArray, playerLevels)
                allPlayers.push(tempPlayer)
            }
            this.props.navigation.navigate('Map', { "players": allPlayers })
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
                    color="#ff5994"
                    buttonStyle={{ backgroundColor: "#ff5994" }}
                    containerStyle={{
                        width: 250,
                        marginHorizontal: 50,
                        marginVertical: 30,
                        borderWidth: 3,
                        borderColor: "#000000",
                        borderRadius: 10,
                    }}
                    titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                    title="Start Learning"
                    type="outline"
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
        backgroundColor: '#82b6ff',
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
    }
});
