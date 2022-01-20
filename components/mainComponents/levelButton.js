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
        let currentQuestionSet = this.props.currentQuestionSet
        let levelID = this.props.level
        this.props.navigation.navigate('Learn', {
            "levelID": levelID,
            "currentQuestionSet": currentQuestionSet,
            "currentQuestionSetLength": currentQuestionSet.length,
            "currentPlayerId": currentPlayerObj.id,
            "currentPlayerName": currentPlayerObj.name,
            "questionIndex": currentPlayerObj.questionIndex,
            "currentPlayer": currentPlayerObj,
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pointContianer}>
                    <Text style={styles.point} > X </Text>
                    <Text style={styles.point}> X </Text>
                    <Text style={styles.point}> X </Text>
                </View>
                <View style={styles.buttonContianer}>
                    <Button
                        key={this.props.level}
                        title={this.props.level}
                        buttonStyle={{
                            borderRadius: 50,
                            // width: "80%",
                            justifyContent: "center",
                            alignContent: "center",
                            backgroundColor: "#15DB95"
                        }}
                        titleStyle={{ color: "#000000" }}
                        onPress={() => this.playLevel()}
                    />
                </View>
            </View>

        )
    }
}

LevelButton.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
    level: PropTypes.string,
    currentPlayer: PropTypes.object,
    currentQuestionSet: PropTypes.array,
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
        textAlign: "center"
    }
});