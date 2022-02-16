/**
 * Creates the Record for a specifc content in the learner Record
 * 
 * 05 Jaunuary 2022
 * @CaseyRocl
 */
import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, View, Image, } from "react-native";
import PropTypes from "prop-types";
import uuid from "react-native-uuid";

//////////////////////
// Component Class
/////////////////////
export default class LevelButton extends React.Component {
    constructor(props) {
        super(props)
        this.playLevel = this.playLevel.bind(this)
        this.getStars = this.getStars.bind(this)
    }

    playLevel() {
        let currentPlayerObj = this.props.currentPlayer
        let currentQuestionSet = this.props.currentQuestionSet
        this.props.navigation.navigate("Learn", {
            "levelID": this.props.levelId,
            "currentQuestionSet": currentQuestionSet,
            "currentQuestionSetLength": currentQuestionSet.length,
            "currentPlayerId": currentPlayerObj.id,
            "currentPlayerName": currentPlayerObj.name,
            "levelIndex": currentPlayerObj.levelIndex,
            "currentPlayer": currentPlayerObj,
            "level": this.props.level
        })
    }

    getStars() {

        if (this.props.correctPoints == 3) {
            return <Image
                source={require("../../../assets/levelBtnStars/threeStars.png")}
                style={styles.star}
            ></Image>
        } else if (this.props.correctPoints == 2) {
            return <Image
                source={require("../../../assets/levelBtnStars/twoStars.png")}
                style={styles.star}
            ></Image>
        } else if (this.props.correctPoints == 1) {
            return <Image
                source={require("../../../assets/levelBtnStars/oneStar.png")}
                style={styles.star}
            ></Image>
        } else {
            return <Image
                source={require("../../../assets/levelBtnStars/zeroStars.png")}
                style={styles.star}
            ></Image>
        }
    }



    render() {
        let button
        if (this.props.requiredPoints <= this.props.currentPlayer.totalPoint) {
            button = <Button
                key={this.props.levelId + uuid.v4()}
                title={this.props.levelId}
                buttonStyle={{
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "#edff8f",
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: "#000000",
                }}
                titleStyle={{ color: "#000000" }}
                onPress={() => this.playLevel()}
            />
        } else {
            button = <Button
                key={this.props.levelId + uuid.v4()}
                title={this.props.levelId}
                buttonStyle={{
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "#ff5994",
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: "#000000",
                }}
                titleStyle={{ color: "#000000" }}
                onPress={() => null}
            />
        }
        return (
            <View style={styles.container}>
                <View style={styles.pointContianer}>
                    {this.getStars()}
                </View>

                <View style={styles.container2}>
                    <View style={styles.buttonContianer}>
                        {button}
                    </View>
                </View>
            </View >

        )
    }
}

LevelButton.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
    level: PropTypes.object,
    currentPlayer: PropTypes.object,
    currentQuestionSet: PropTypes.array,
    correctPoints: PropTypes.number,
    levelId: PropTypes.string,
    requiredPoints: PropTypes.number
}

///////////////////////
// Prop Validation
/////////////////////



//////////////////////
// Component Styling
/////////////////////

const styles = StyleSheet.create({
    container: {
        width: "25%",
        flexDirection: "column",
        marginHorizontal: 15,
        marginVertical: 20,
        borderRadius: 50,
        // borderWidth: 3,
        // borderColor: "#000",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#4892fa"
    },
    container2: {
        borderRadius: 20,
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#84ff9f",
    },
    pointContianer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    buttonContianer: {
        flex: 1,
        width: "80%",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center"
    },
    star: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

});