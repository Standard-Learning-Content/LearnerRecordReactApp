import React from "react";
import { StyleSheet, View, Text, } from "react-native";
import config from "../config.json"
import PropTypes from "prop-types";

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "currentPlayerIndex": -1,
            "players": this.props.route.params.players,
        }
        if (config["debug-mode"]) console.log(this.state)
        this.play = this.play.bind(this)
        this.gameOver = this.gameOver.bind(this)
        this.nextQuestion = this.nextQuestion.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        let players_len = state.players.length
        let currentPlayerIndex = (state.currentPlayerIndex + 1) % players_len
        if (state.currentPlayerIndex == -1) {
            return ({
                "currentPlayerIndex": currentPlayerIndex,
                "players": props.route.params.players,
                "timer": 3
            })
        } else {
            return ({
                "currentPlayerIndex": currentPlayerIndex,
                "players": state.players,
                "timer": 3
            })
        }
    }


    nextQuestion() {
        setTimeout(() => {
            let currentPlayerObj = this.state.players[this.state.currentPlayerIndex]
            this.props.navigation.navigate("Learn", {
                "levelID": currentPlayerObj.questions[currentPlayerObj.questionIndex].levelId,
                "currentQuestionSet": currentPlayerObj.questions[currentPlayerObj.questionIndex].levels,
                "currentQuestionSetLength": currentPlayerObj.questions[currentPlayerObj.questionIndex].levels.length,
                "currentPlayerId": currentPlayerObj.id,
                "currentPlayerName": currentPlayerObj.name,
                "questionIndex": currentPlayerObj.questionIndex,
                "currentPlayer": currentPlayerObj,
                "level": currentPlayerObj.questions[currentPlayerObj.questionIndex]
            })
        }, 2000);
    }


    play() {
        return (
            <View style={styles.page}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headline}>
                        {this.state.players[this.state.currentPlayerIndex].name}&apos;s Turn! {'\n'}
                    </Text>
                </View>
            </View>
        )
    }

    gameOver() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.completeHeaderContainer}>
                    <Text style={styles.headline}> Congrats!{"\n"}  All the quentions are learned </Text>

                </View>
            </View>

        )
    }


    render() {
        return (
            <View style={styles.page}>
                {this.nextQuestion()}
                {this.state.players != 0 ? this.play() : this.gameOver()}
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
        width: "100%",
        height: "100%",
        alignItems: "center",
        textAlign: "auto",
        backgroundColor: "#ff5994",
        justifyContent: "center",
        // alignItems: "center",
        // textAlign: "auto",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "auto"
    },
    // mainContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     justifyContent: "center"
    // },
    headline: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 50,
        margin: 20,
    },
    // levelButtons: {
    //     borderRadius: 10,
    //     backgroundColor: "#ffffff55",
    //     marginHorizontal: "3%",
    //     marginBottom: "3%",
    // },
    // contentContainer: {
    //     flex: 7,
    // }
});