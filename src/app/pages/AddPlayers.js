/**
 * Adds all the players to the game by querying for their Learner Record. 
 * Then, using the LR, assign each player their proper questions
 * 
 * 05 January 2022
 * @CaseyRock
 */

import React from "react";
import { View, Alert, StyleSheet, Text, ImageBackground } from 'react-native';
import NameInput from "../components/addPlayerComponents/playerNameInput"
import { Button } from 'react-native-elements';
import GamePlayer from "../components/gamePlayer";
import PropTypes from 'prop-types';
import Background from '../../assets/background.png'

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
                let tempPlayer = new GamePlayer(this.inputValue[player])
                await tempPlayer.setPlayerId(this.inputValue[player])
                await tempPlayer.setLearnerRecord(tempPlayer.id)
                const jsonPlayerStorage = await tempPlayer.getPlayerLocalStorage()
                tempPlayer.setPlayerLevel(jsonPlayerStorage)
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
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
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
                </ImageBackground>
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
        flex: 1,
    },
    image: {
        flex: 1,
    },
    container: {
        marginVertical: "2%",
        marginHorizontal: "2%",
        alignItems: 'center',
        flex: 1,
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
    }
});
