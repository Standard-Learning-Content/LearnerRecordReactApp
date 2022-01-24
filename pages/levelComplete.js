/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';


export default class LevelComplete extends React.Component {
    constructor(props) {
        super(props);
        this.backToMap = this.backToMap.bind(this)
    }

    backToMap() {
        this.props.route.params.currentPlayer.updateTotalPoints(this.props.route.params.correctCount)
        this.props.route.params.level.setCorrectPoints(this.props.route.params.correctCount)
        this.props.navigation.navigate("Map", {})
    }

    render() {
        let starCount
        if (this.props.route.params.correctCount >= 5) {
            starCount = 3
        } else if (this.props.route.params.correctCount == 4 || this.props.route.params.correctCount == 3) {
            starCount = 2
        } else if (this.props.route.params.correctCount == 2 || this.props.route.params.correctCount == 1) {
            starCount = 1
        } else {
            starCount = 0
        }
        return (
            <View style={styles.background}>
                <Text style={styles.headline}> Level Complete! </Text>
                <Text style={styles.headline}> {this.props.route.params.currentPlayer.name}&apos;s Points: {this.props.route.params.currentPlayer.totalPoint} + {starCount}  </Text>
                <Button
                    onPress={() => this.backToMap()}
                    color="#15DB95"
                    buttonStyle={{ backgroundColor: "#15DB95" }}
                    containerStyle={{
                        width: "90%",
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                    title={"Next"}
                />
            </View>
        )
    }
}

LevelComplete.propTypes = {
    route: PropTypes.object,
    navigation: PropTypes.object,
    correctCount: PropTypes.number,
    currentPlayer: PropTypes.object
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#080F5B',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    headline: {
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
    }
});




