/**
 * Creates the Record for a specifc content in the learner Record
 * 
 * 05 Jaunuary 2022
 * @CaseyRocl
 */
import React from "react";
import { Button } from 'react-native-elements'
import { StyleSheet, View, Text, } from 'react-native';
import PropTypes from 'prop-types';
import uuid from 'react-native-uuid';

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
        this.props.navigation.navigate('Learn', {
            "levelID": this.props.levelId,
            "currentQuestionSet": currentQuestionSet,
            "currentQuestionSetLength": currentQuestionSet.length,
            "currentPlayerId": currentPlayerObj.id,
            "currentPlayerName": currentPlayerObj.name,
            "questionIndex": currentPlayerObj.questionIndex,
            "currentPlayer": currentPlayerObj,
            "level": this.props.level
        })
    }

    getStars() {
        let stars = []
        for (let i = 0; i < this.props.correctPoints; i++) {
            let star = <Text key={uuid.v4()} style={styles.point}>*</Text>
            stars.push(star)
        }

        return stars
    }



    render() {
        let button
        if (this.props.requiredPoints <= this.props.currentPlayer.totalPoint) {
            button = <Button
                key={this.props.levelId + uuid.v4()}
                title={this.props.levelId}
                buttonStyle={{
                    borderRadius: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "#15DB95"
                }}
                titleStyle={{ color: "#000000" }}
                onPress={() => this.playLevel()}
            />
        } else {
            button = <Button
                key={this.props.levelId + uuid.v4()}
                title={this.props.levelId}
                buttonStyle={{
                    borderRadius: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "#181818"
                }}
                titleStyle={{ color: "#000000" }}
                onPress={() => console.log("Need More Points")}
            />
        }
        return (
            <View style={styles.container}>
                <View style={styles.pointContianer}>
                    {this.getStars()}
                </View>
                <View style={styles.buttonContianer}>
                    {button}
                </View>
            </View>

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
    levelId: PropTypes.string
}

///////////////////////
// Prop Validation
/////////////////////



//////////////////////
// Component Styling
/////////////////////

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderRadius: 20,
        width: "20%",
        flexDirection: "column",
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: "#0D19AA",

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
        // marginHorizontal: 20,
        // marginVertical: 20,
    },
    point: {
        color: "#FFFFFF",
        fontSize: 30,
        textAlign: "center"
    }
});