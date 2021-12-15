import React, { Component } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Levels from "../components/levels";
import all_levels from '../levels/levels.json'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.players = []
        for (let players of this.props.players) {
            this.players.push(JSON.parse(players))
        }


        this.state = {
            "currentPlayerIndex": 0,
        }
        console.log(this.players[this.state.currentPlayerIndex])
        // this.createPlayer = this.createPlayer.bind(this)
        // this.getPlayerQuestions = this.getPlayerQuestions.bind(this)
    }

    componentDidMount() {
        // this.createPlayer()
    }



    createPlayer = async () => {
        let allPlayers = []
        for (let player in this.props.PlayerName) {

            let id = "12NSNF_2IEHJFUEHA_21345SDG" // Dynamically Create ID

            let temp_data = { "userID": id } // Testing Purposes
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

            let gamePlayer = {
                "questionIndex": 0,
                "id": id,
                "name": this.props.PlayerName[player],
                // "learnerRecord": contentArray,
                "quentions": this.getPlayerQuestions(contentArray)
            }

            allPlayers.push(gamePlayer)
            var joined = this.state.Players.concat(gamePlayer);
            this.setState({
                "Players": joined,

            })

            this.setState(prevState => {
                let player = Object.assign(prevState.currentPlayer, gamePlayer);
                console.log(player)
                return { player };
            })
        }
    }

    // NEED TO GET QUESTION BASED ON THEIR LR
    getPlayerQuestions(learnerRecord) {
        return all_levels
    }

    changeCurrentPlauer(Player) {
        let gamePlayer = {
            "questionIndex": 0,
            "id": id,
            "name": this.props.PlayerName[player],
            // "learnerRecord": contentArray,
            "quentions": this.getPlayerQuestions(contentArray)
        }

        allPlayers.push(gamePlayer)
        var joined = this.state.Players.concat(gamePlayer);
        this.setState({
            "Players": joined
        })

        this.setState(prevState => {
            let player = Object.assign(prevState.currentPlayer, gamePlayer);
            console.log(player)
            return { player };
        })
    }



    render() {
        const testingStateFunction = () => {
            console.log(this.players)
        }
        return (
            <View >
                <Text style={styles.headline}>
                    {this.players[this.state.currentPlayerIndex].name}'s Turn
                </Text>
                <View style={styles.container}>
                    <Levels currentPlayer={this.players[this.state.currentPlayerIndex]} ></Levels>
                </View>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    }
});