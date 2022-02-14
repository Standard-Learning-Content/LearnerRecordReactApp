/**
 * Adds all the players to the game by querying for their Learner Record. 
 * Then, using the LR, assign each player their proper questions
 * 
 * 05 January 2022
 * @CaseyRock
 */

import React from "react";
import { View, Alert, StyleSheet, Text, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import NameInput from "../components/addPlayerComponents/playerNameInput"
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Button } from 'react-native-elements';
import GamePlayer from "../components/gamePlayer";
import PropTypes from 'prop-types';
import Background from '../../assets/background.png'
import { startLearningSession } from '../firebase/firebaseLearn'

//////////////////////
// Component Class
/////////////////////
export default class AddPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.inputValue = {}
        this.state = {
            isLoading: false
        };

        this.addInputBoxes = this.addInputBoxes.bind(this)
        this.goToHome = this.goToHome.bind(this)
        this.createPlayers = this.createPlayers.bind(this)
        this.renderButtonOrAnimator = this.renderButtonOrAnimator.bind(this)
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

    async createPlayers() {
        if (Object.keys(this.inputValue).length == this.props.route.params.numPlayers) {
            let allPlayers = []
            let firebasePlayerID = []
            for (let player in this.inputValue) {
                let tempPlayer = new GamePlayer(this.inputValue[player])
                await tempPlayer.setPlayerId(this.inputValue[player])
                await tempPlayer.setLearnerRecord(tempPlayer.id)
                const jsonPlayerStorage = await tempPlayer.getPlayerLocalStorage()
                tempPlayer.setPlayerLevel(jsonPlayerStorage)
                firebasePlayerID.push("cco:Player_" + tempPlayer.id)
                allPlayers.push(tempPlayer)
            }

            let localStorageDeviceId = await AsyncStorage.getItem("deviceID")
            let deviceID = localStorageDeviceId != null ? JSON.parse(localStorageDeviceId) : null;
            if (deviceID == null) {
                deviceID = { "deviceID": uuid.v4() }
                const value = {
                    "deviceID": uuid.v4()
                }
                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem("deviceID", jsonValue)
            }
            startLearningSession(deviceID.deviceID, Date.now(), firebasePlayerID) //Store the players in firebase 
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

    renderButtonOrAnimator() {
        if (!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.headline}> Who is Learning?</Text>
                    {this.addInputBoxes()}
                    < Button
                        color="#ff5994"
                        buttonStyle={{ backgroundColor: "#ff5994" }
                        }
                        disabled={this.state.isLoading}
                        containerStyle={{
                            width: 250,
                            marginHorizontal: 50,
                            marginVertical: 30,
                            borderWidth: 3,
                            borderColor: "#000000",
                            borderRadius: 10,
                        }
                        }
                        titleStyle={{ color: 'black', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                        title="Start Learning"
                        type="outline"
                        onPress={async () => { await this.goToHome() }}
                    />
                </View>

            )
        } else {
            return (
                <View style={styles.LoadingContainer}>
                    <Text style={styles.headline}> Loading Game</Text>
                    <ActivityIndicator size={200} animating={this.state.isLoading} color="#ff5994" />
                </View>
            )
        }





    }

    /**
     * Creates new gamePlayer objects for each player. Then assigns the gameplayer object an id, name, 
     * learner Record, and set of unique question
     * @CR
     */
    async goToHome() {
        this.setState({ isLoading: true })
        await this.createPlayers()
        this.setState({ isLoading: false })


    }


    render() {
        return (
            <View style={styles.background}>
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <ScrollView style={styles.levelButtons}>
                        {this.renderButtonOrAnimator()}
                    </ScrollView>
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
        marginVertical: "15%",
        marginHorizontal: "2%",
        alignItems: 'center',
        flex: 1,
        borderRadius: 10,
        justifyContent: "center",
        borderWidth: 5,
        backgroundColor: "#ffffff33",
    },
    headline: {
        fontWeight: 'bold',
        color: "#000",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
    },
    LoadingContainer: {
        marginVertical: "25%",
        marginHorizontal: "10%",
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#ffffff33",
        borderRadius: 10,
        borderWidth: 4,
    }
});
