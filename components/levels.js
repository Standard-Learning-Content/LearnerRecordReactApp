import React from "react";
import TargetBtn from "./targetButtons";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { Tile } from 'react-native-elements';
import levels from '../levels/levels.json'

export default class Levels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "CurrentLevelIndex": 0,
            "levelID ": '',
            "correctStandardContent": '',
            "correctTarget": '',
            "incorrectStandardContent": '',
            "incorrectTarget": ''
        }
    }

    componentDidMount() {
        let levelID = levels[this.state.CurrentLevelIndex].LevelID
        let correctStandardContent = levels[this.state.CurrentLevelIndex].correctStandardContent
        let correctTarget = levels[this.state.CurrentLevelIndex].correctTarget
        let incorrectStandardContent = levels[this.state.CurrentLevelIndex].incorrectStandardContent
        let incorrectTarget = levels[this.state.CurrentLevelIndex].incorrectTarget

        this.setState({
            "CurrentLevelIndex": 0,
            "levelID ": levelID,
            "correctStandardContent": correctStandardContent,
            "correctTarget": correctTarget,
            "incorrectStandardContent": incorrectStandardContent,
            "incorrectTarget": incorrectTarget
        })
    }



    render() {

        return (

            <View style={styles.container}>
                <TargetBtn value={this.state.correctTarget}></TargetBtn>
                <TargetBtn value={this.state.incorrectTarget}></TargetBtn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
    }

});