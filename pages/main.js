import React from "react";
import { StyleSheet, Button, View, Text } from 'react-native';
import Level from "../components/mainComponents/level";
import config from '../config.json'
import PropTypes from 'prop-types';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "currentPlayerIndex": 0,
            "players": this.props.route.params.players,
        }
        if (config['debug-mode']) console.log(this.state)
        this.changeCurrentPlayer = this.changeCurrentPlayer.bind(this)
        this.updateLocalLearnerRecord = this.updateLocalLearnerRecord.bind(this)
        this.play = this.play.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }


    updateLocalLearnerRecord(literal, standardLearnedContent, correct) {
        let learnerRecord = this.state.players[this.state.currentPlayerIndex].learnerRecord
        if (Object.keys(learnerRecord).length == 0 || learnerRecord[standardLearnedContent] == undefined) {
            if (correct) {
                Object.assign(learnerRecord,
                    {
                        [standardLearnedContent]: {
                            "countsCorrect": 1,
                            "literal": literal,
                            "totalCounts": 1,
                        }
                    })
            } else {
                Object.assign(learnerRecord,
                    {
                        [standardLearnedContent]: {
                            "countsCorrect": 0,
                            "literal": literal,
                            "totalCounts": 1,
                        }
                    })
            }

        } else {
            let indexedContent = learnerRecord[standardLearnedContent]
            if (correct) {
                indexedContent.countsCorrect = indexedContent.countsCorrect + 1
            }
            indexedContent.totalCounts = indexedContent.totalCounts + 1
        }

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
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headline}>
                        {this.state.players[this.state.currentPlayerIndex].name}&apos;s Turn {'\n'}
                        Question #:{this.state.players[this.state.currentPlayerIndex].questionIndex + 1}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    {this.state.players[this.state.currentPlayerIndex].questions.length > 0 ? <Level updateLocalLearnerRecord={this.updateLocalLearnerRecord} currentPlayer={this.state.players[this.state.currentPlayerIndex]} changePlayer={this.changeCurrentPlayer}></Level> : this.changeCurrentPlayer()}
                </View>
            </View>

        )
    }

    gameOver() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.completeHeaderContainer}>
                    <Text style={styles.headline}> Congrats!{'\n'}  All the quentions are learned </Text>
                </View>
            </View>

        )
    }


    render() {
        return (
            <View style={styles.page}>
                {this.state.players != 0 ? this.play() : this.gameOver()}
                <Button
                    style={{ padding: 10 }}
                    title={`View ${this.state.players[this.state.currentPlayerIndex].name}'s Report Card`}
                    titleStyle={{ color: "#000000" }}
                    onPress={() => this.props.navigation.navigate('LearnerRecord', { player: this.state.players[this.state.currentPlayerIndex] })}
                />
            </View >

        )
    }
}

Main.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#080F5B',
        width: "100%",
        height: "100%",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
    },
    headerContainer: {
        flex: 1,
        width: "100%",
        height: "15%",
        backgroundColor: '#0D19AA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 30,
    },
    completeHeaderContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: '#F8E9A1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 7,
    }
});