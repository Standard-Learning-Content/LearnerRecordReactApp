/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
import Background from "../../assets/background.png"
import uuid from "react-native-uuid";


export default class LevelComplete extends React.Component {
    constructor(props) {
        super(props);
        this.backToMap = this.backToMap.bind(this)
        this.renderReports = this.renderReports.bind(this)
    }

    async componentDidMount() {
        let prevCorrectPoint = this.props.route.params.level.correctPoints
        let currentCorrectPoints = this.props.route.params.level.setCorrectPoints(this.props.route.params.correctCount, this.props.route.params.level.correctPoints)
        this.props.route.params.currentPlayer.updateTotalPoints(this.props.route.params.correctCount, prevCorrectPoint, currentCorrectPoints, this.props.route.params.level.levelId)
        let correctCounter = 0
        for (let result of this.props.route.params.gameplayResults) {
            if (result.correct) {
                correctCounter++
            }
        }
        this.props.route.params.currentPlayer.incrementQuesitonIndex(correctCounter)
    }


    backToMap() {
        this.props.navigation.navigate("Map", {})
    }

    renderReports() {
        let reportText = []
        for (let result of this.props.route.params.gameplayResults) {
            let text
            if (result.correct) {
                text = <View style={styles.reportsContainerCorrect} key={uuid.v4()}>
                    <Text style={styles.reports}> {result.content}</Text>
                    <Text style={styles.reports}> Correct </Text>
                </View>
            } else {
                text = <View style={styles.reportsContainerIncorrect} key={uuid.v4()}>
                    <Text style={styles.reports}> {result.content}</Text>
                    <Text style={styles.reports}> Incorrect </Text>
                </View>
            }


            reportText.push(text)
        }
        return reportText


    }

    render() {
        return (
            <View style={styles.background}>
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
                        <Text style={styles.headline}> Level Complete! </Text>
                        {this.renderReports()}
                        {/* <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}> {this.props.route.params.currentPlayer.name}&apos;s Points: {this.props.route.params.currentPlayer.totalPoint}</Text>
                            <Text style={styles.infoTextPlus}> + {starCount} </Text>
                        </View> */}
                        {/* <Text style={styles.infoText}> {this.props.route.params.currentPlayer.name}&apos;s Points: {this.props.route.params.currentPlayer.totalPoint} </Text><Text> + {starCount} </Text> */}
                        <View style={styles.info} >
                            <Button
                                onPress={() => this.backToMap()}
                                color="#15DB95"
                                buttonStyle={{ backgroundColor: "#edff8f" }}
                                containerStyle={{
                                    width: 350,
                                    marginHorizontal: 40,
                                    marginVertical: 10,
                                    borderWidth: 4,
                                    borderColor: "#000000",
                                    borderRadius: 10,
                                }}
                                titleStyle={{ color: "black", marginHorizontal: 20, fontWeight: "bold", fontSize: 23 }}
                                title={"Next"}
                            />
                        </View>
                    </View>

                </ImageBackground>

            </View >
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
        backgroundColor: "#82b6ff",
        flex: 1,
    },
    image: {
        flex: 1,
    },
    container: {
        marginVertical: "20%",
        marginHorizontal: "2%",
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff33",
    },
    headline: {
        fontWeight: "bold",
        color: "#000",
        width: "90%",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
        backgroundColor: "#edff8f",
        borderWidth: 4,
        borderColor: "#000000",
        borderRadius: 10,
        margin: 20
    },
    reportsContainerCorrect: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        borderWidth: 4,
        backgroundColor: "#84ff9f",
        borderColor: "#000000",
        borderRadius: 10,
        width: "90%",
        height: "5%"
    },
    reportsContainerIncorrect: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        borderWidth: 4,
        backgroundColor: "#ff5994",
        borderColor: "#000000",
        borderRadius: 10,
        width: "90%",
        height: "5%"
    },
    reports: {
        flex: 1,
        fontWeight: "bold",
        color: "#000000",
        width: "90%",
        fontSize: 30,
    },
    // starContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#4892fa",
    //     // borderWidth: 3,
    //     borderRadius: 50,
    //     margin: 15
    // },
    // star: {
    //     width: 200,
    //     height: 200,
    //     flex: 1,
    //     resizeMode: "contain",
    // },
    // info: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     margin: 15

    // },
    // infoTextContainer: {
    //     flexDirection: "row",
    //     backgroundColor: "#84ff9f",
    //     height: "10%",
    //     borderWidth: 3,
    //     borderColor: "#000000",
    //     borderRadius: 10,
    //     margin: 15,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // infoText: {
    //     fontWeight: "bold",
    //     color: "#000",
    //     fontSize: 30,
    //     textAlign: "center",
    //     backgroundColor: "#84ff9f",
    // },
    // infoTextPlus: {
    //     fontWeight: "bold",
    //     color: "#ff5994",
    //     fontSize: 30,
    //     textAlign: "center",
    //     backgroundColor: "#84ff9f",
    // },
});




