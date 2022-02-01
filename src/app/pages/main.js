import React from "react";
import { StyleSheet, View, Text, ScrollView, ImageBackground } from "react-native";
import LevelButton from "../components/mainComponents/levelButton"
import Background from "../../assets/background.png"
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
    }

    static getDerivedStateFromProps(props, state) {
        let players_len = state.players.length
        let currentPlayerIndex = (state.currentPlayerIndex + 1) % players_len
        if (state.currentPlayerIndex == -1) {
            return ({
                "currentPlayerIndex": currentPlayerIndex,
                "players": props.route.params.players
            })
        } else {
            return ({
                "currentPlayerIndex": currentPlayerIndex,
                "players": state.players
            })
        }
    }


    play() {
        let currentPlayerObj = this.state.players[this.state.currentPlayerIndex]
        let allLevelButtons = []

        for (let level of currentPlayerObj.questions) {
            let levelBtn = <LevelButton
                key={level.levelId}
                requiredPoints={level.requiredPoints}
                correctPoints={level.correctPoints}
                levelId={level.levelId}
                level={level}
                currentPlayer={this.state.players[this.state.currentPlayerIndex]}
                currentQuestionSet={level.levels}
                navigation={this.props.navigation}
            >
            </LevelButton>
            allLevelButtons.push(levelBtn)
        }

        return (
            <View style={styles.page}>
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headline}>
                            {this.state.players[this.state.currentPlayerIndex].name}&apos;s Turn!
                        </Text>
                        <Text style={styles.headline}>
                            Stars: {this.state.players[this.state.currentPlayerIndex].totalPoint}
                        </Text>
                    </View>
                    <ScrollView style={styles.levelButtons}>
                        <View style={styles.mainContainer}>
                            {allLevelButtons}
                        </View >
                    </ScrollView>
                </ImageBackground>

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
        backgroundColor: "#82b6ff",
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "auto"
    },
    headerContainer: {
        margin: 10,
        padding: 5,
        width: "93%",
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "auto",
        backgroundColor: "#ff5994",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#000000",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    headline: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 30,
    },
    levelButtons: {
        borderRadius: 10,
        backgroundColor: "#ffffff55",
        marginHorizontal: "3%",
        marginBottom: "3%",
    },
    contentContainer: {
        flex: 7,
    }
});