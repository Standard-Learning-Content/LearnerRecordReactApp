import React, { Component } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Levels from "../components/levels";
const debug = false

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "currentPlayerIndex": 0,
            "players": this.props.route.params.players,
        }
        if (debug) console.log(this.state)
        this.changeCurrentPlayer = this.changeCurrentPlayer.bind(this)
    }


    changeCurrentPlayer() {
        let currentPlayer = this.state.players[this.state.currentPlayerIndex]
        let questionLen = this.state.players[this.state.currentPlayerIndex].questions.length
        let newQuestionIndex = (this.state.players[this.state.currentPlayerIndex].questionIndex + 1) % questionLen
        let all_players = [
            ...this.state.players.slice(0, this.state.currentPlayerIndex),
            Object.assign(currentPlayer, { "questionIndex": newQuestionIndex }),
            ...this.state.players.slice(this.state.currentPlayerIndex + 1)
        ]

        let players_len = this.state.players.length
        let currentPlayerIndex = (this.state.currentPlayerIndex + 1) % players_len
        this.setState({
            "currentPlayerIndex": currentPlayerIndex,
            "players": all_players
        })
        if (debug) {
            console.log("============================")
            console.log(this.state)
            console.log("============================")
        }
    }



    render() {
        return (
            <View style={styles.background}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headline}>
                        {this.state.players[this.state.currentPlayerIndex].name}'s Turn {'\n'}
                        Question #:{this.state.players[this.state.currentPlayerIndex].questionIndex + 1}
                    </Text>
                </View>
                <View style={styles.container}>
                    {this.state.players[this.state.currentPlayerIndex].questions.length > 0 ? <Levels currentPlayer={this.state.players[this.state.currentPlayerIndex]} changePlayer={this.changeCurrentPlayer}></Levels> : this.changeCurrentPlayer()}
                </View>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#A8D0E6',
        width: "100%",
        height: "100%",
        flex: 1,
    },
    headerContainer: {
        width: "100%",
        height: "12%",
        backgroundColor: '#F8E9A1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 30,
    }
});