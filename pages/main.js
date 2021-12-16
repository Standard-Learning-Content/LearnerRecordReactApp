import React, { Component } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Levels from "../components/levels";


export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "currentPlayerIndex": 0,
            "players": this.props.route.params.players,
        }
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

        let playes_len = this.state.players.length
        let currentPlayerIndex = (this.state.currentPlayerIndex + 1) % playes_len
        this.setState({
            "currentPlayerIndex": currentPlayerIndex,
            "players": all_players
        })
        console.log("============================")
        console.log(this.state)
        console.log("============================")
    }



    render() {
        return (
            <View >
                <Text style={styles.headline}>
                    {this.state.players[this.state.currentPlayerIndex].name}'s Turn
                </Text>
                <View style={styles.container}>
                    <Levels currentPlayer={this.state.players[this.state.currentPlayerIndex]} changePlayer={this.changeCurrentPlayer}></Levels>
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