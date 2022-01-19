/**
 * Creates the Record for a specifc content in the learner Record
 * 
 * 05 Jaunuary 2022
 * @CaseyRocl
 */
import React from "react";
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types';

//////////////////////
// Component Class
/////////////////////
export default class LevelButton extends React.Component {
    constructor(props) {
        super(props)
        this.playLevel = this.playLevel.bind(this)
    }

    playLevel() {
        let currentPlayerObj = this.props.currentPlayer
        let currentQuestion = this.props.currentQuestion
        this.props.navigation.navigate('Learn', {
            "levelID": currentQuestion.levelID,
            "levelType": currentQuestion.levelType,
            "correctStandardContent": currentQuestion.correctStandardContent,
            "correctTarget": currentQuestion.correctTarget,
            "incorrect": currentQuestion.incorrect,
            "currentPlayerId": currentPlayerObj.id,
            "currentPlayerName": currentPlayerObj.name,
            "questionIndex": currentPlayerObj.questionIndex,
            "currentPlayer": currentPlayerObj,

        })
    }


    render() {
        console.log(this.props.level)
        return (
            <Button
                key={this.props.level}
                buttonStyle={{
                    backgroundColor: "#15DB95",
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: "20%",
                    marginHorizontal: 5,
                    marginVertical: 20,
                }}
                title={this.props.level}
                titleStyle={{ color: "#000000" }}
                onPress={() => this.playLevel()}
            />
        )
    }
}

LevelButton.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
    level: PropTypes.number,
    currentPlayer: PropTypes.object,
    currentQuestion: PropTypes.object,
}

///////////////////////
// Prop Validation
/////////////////////



//////////////////////
// Component Styling
/////////////////////