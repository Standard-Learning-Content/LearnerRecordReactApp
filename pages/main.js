import React, { Component } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Levels from "../components/levels";
import config from '../config.json'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "currentPlayerIndex": 0,
            "players": this.props.route.params.players,
        }
        if (config['debug-mode']) console.log(this.state)
        this.changeCurrentPlayer = this.changeCurrentPlayer.bind(this)
        this.play = this.play.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }


    changeCurrentPlayer() {
        let currentPlayer = this.state.players[this.state.currentPlayerIndex]
        let questionLen = this.state.players[this.state.currentPlayerIndex].questions.length

        if (this.state.players[this.state.currentPlayerIndex].questionIndex + 1 == questionLen) {
            if (config['debug-mode']) console.log("Current Player: " + currentPlayer.id + " has finished their questions!")
        }

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
        if (config['debug-mode']) {
            console.log("============================")
            console.log(this.state)
            console.log("============================")
        }
    }

    play() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headline}>
                        {this.state.players[this.state.currentPlayerIndex].name}'s Turn {'\n'}
                        Question #:{this.state.players[this.state.currentPlayerIndex].questionIndex + 1}
                    </Text>
                </View>
                <View style={styles.container}>
                    {this.state.players[this.state.currentPlayerIndex].questions.length > 0 ? <Levels currentPlayer={this.state.players[this.state.currentPlayerIndex]} changePlayer={this.changeCurrentPlayer}></Levels> : this.changeCurrentPlayer()}
                </View>
            </View>

        )
    }

    gameOver() {
        return (
            <View>
                <View style={styles.completeHeaderContainer}>
                    <Text style={styles.headline}> Congrats!{'\n'}  All the quentions are learned </Text>
                </View>
            </View>

        )
    }


    render() {
        return (
            <View style={styles.background}>
                {this.state.players != 0 ? this.play() : this.gameOver()}

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
        height: "15%",
        backgroundColor: '#F8E9A1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    completeHeaderContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: '#F8E9A1',
        justifyContent: 'center',
        alignItems: 'center'
    }
});