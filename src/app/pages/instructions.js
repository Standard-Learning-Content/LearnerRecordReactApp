/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Text, ImageBackground, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { Button } from 'react-native-elements';
import uuid from "react-native-uuid";
import Background from '../../assets/background.png'


export default class Instructions extends React.Component {
    constructor(props) {
        super(props);
        this.renderPlayer = this.renderPlayer.bind(this)
    }

    renderPlayer() {
        let playerArray = []
        for (let player of this.props.route.params.players) {
            let playerComponent = <View style={styles.playerContainer} key={uuid.v4()}>
                <Text style={styles.playerText}> {player.name}</Text>
                <Text style={styles.playerText}> Level: {player.questionIndex} </Text>
            </View>
            playerArray.push(playerComponent)
        }
        return playerArray
    }

    render() {

        return (
            <View style={styles.background}>
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.container}>
                            <Text style={styles.header}> Players</Text>
                            {this.renderPlayer()}
                            <Text style={styles.header}> Instructions</Text>
                            <View style={styles.InstructionsContainer}>
                                <Text style={styles.InstructionsText}> 1. Each player takes turns answering questions</Text>
                                <Text style={styles.InstructionsText}> 2. Get all 5 question correct to move on</Text>
                            </View>
                            < Button
                                color="#ff5994"
                                buttonStyle={{ backgroundColor: "#ff5994" }
                                }
                                containerStyle={{
                                    width: 250,
                                    marginHorizontal: 50,
                                    marginVertical: 30,
                                    borderWidth: 3,
                                    borderColor: "#000000",
                                    borderRadius: 10,
                                }
                                }
                                titleStyle={{ color: 'black', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                                title="Start Learning"
                                type="outline"
                                onPress={() => {
                                    this.props.navigation.navigate('Map', {
                                        players: this.props.route.params.players,
                                        deviceID: this.props.route.params.deviceID,
                                        sessonId: this.props.route.params.sessonId
                                    })
                                }}
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>

            </View >
        )
    }
}

Instructions.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}



const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
    },
    container: {
        marginVertical: "15%",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: 'center',
        // backgroundColor: "#84ff9f",
    },
    playerContainer: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        borderWidth: 4,
        backgroundColor: "#84ff9f",
        borderColor: "#000000",
        borderRadius: 10,
        width: "90%",
        height: "10%"
    },
    header: {
        margin: 10,
        fontWeight: "bold",
        color: "#000000",
        width: "90%",
        fontSize: 25,
        textAlign: "center"
    },
    InstructionsContainer: {
        margin: 20,
        backgroundColor: "#edff8f",
        padding: 5,
        width: "90%",
        height: "35%",
        borderWidth: 4,
        borderColor: "#000000",
        borderRadius: 10,
    },
    InstructionsText: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 20,
        margin: 5
    },
    playerText: {
        flex: 1,
        fontWeight: "bold",
        color: "#000000",
        fontSize: 30,
    },


});




