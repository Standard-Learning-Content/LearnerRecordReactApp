/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Background from '../../assets/background.png'


export default class LevelComplete extends React.Component {
    constructor(props) {
        super(props);
        this.backToMap = this.backToMap.bind(this)
        this.renderStars = this.renderStars.bind(this)
    }

    backToMap() {
        this.props.route.params.currentPlayer.updateTotalPoints(this.props.route.params.correctCount, this.props.route.params.level.correctPoints)
        this.props.route.params.level.setCorrectPoints(this.props.route.params.correctCount, this.props.route.params.level.correctPoints)
        this.props.navigation.navigate("Map", {})
    }

    renderStars() {
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

        if (starCount == 3) {
            return (
                <View style={styles.starContainer}>
                    <Image
                        source={require('../../assets/levelBtnStars/threeStars.png')}
                        style={styles.star}
                    ></Image>
                </View>)
        } else if (starCount == 2) {
            return (
                <View style={styles.starContainer}>
                    <Image
                        source={require('../../assets/levelBtnStars/twoStars.png')}
                        style={styles.star}
                    ></Image>
                </View>)
        } else if (starCount == 1) {
            return (
                <View style={styles.starContainer}>
                    <Image
                        source={require('../../assets/levelBtnStars/oneStar.png')}
                        style={styles.star}
                    ></Image>
                </View>)
        } else {
            return (
                <View style={styles.starContainer}>
                    <Image
                        source={require('../../assets/levelBtnStars/zeroStars.png')}
                        style={styles.star}
                    ></Image>
                </View>)
        }
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
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
                        <Text style={styles.headline}> Level Complete! </Text>
                        {this.renderStars()}
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}> {this.props.route.params.currentPlayer.name}&apos;s Points: {this.props.route.params.currentPlayer.totalPoint}</Text>
                            <Text style={styles.infoTextPlus}> + {starCount} </Text>
                        </View>
                        {/* <Text style={styles.infoText}> {this.props.route.params.currentPlayer.name}&apos;s Points: {this.props.route.params.currentPlayer.totalPoint} </Text><Text> + {starCount} </Text> */}
                        <View style={styles.info} >
                            <Button
                                onPress={() => this.backToMap()}
                                color="#15DB95"
                                buttonStyle={{ backgroundColor: "#ff5994" }}
                                containerStyle={{
                                    width: 350,
                                    marginHorizontal: 40,
                                    marginVertical: 10,
                                    borderWidth: 3,
                                    borderColor: "#000000",
                                    borderRadius: 10,
                                }}
                                titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
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
        backgroundColor: '#82b6ff',
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
        fontWeight: 'bold',
        color: "#FFFFFF",
        width: "90%",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
        backgroundColor: "#ff5994",
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 10,
        margin: 20

    },
    starContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#4892fa",
        // borderWidth: 3,
        borderRadius: 50,
        margin: 15
    },
    star: {
        width: 200,
        height: 200,
        flex: 1,
        resizeMode: "contain",
    },
    info: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        margin: 15

    },
    infoTextContainer: {
        flexDirection: "row",
        backgroundColor: "#84ff9f",
        height: "10%",
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 10,
        margin: 15,
        justifyContent: "center",
        alignItems: 'center',
    },
    infoText: {
        fontWeight: 'bold',
        color: "#000",
        fontSize: 30,
        textAlign: "center",
        backgroundColor: "#84ff9f",
    },
    infoTextPlus: {
        fontWeight: 'bold',
        color: "#ff5994",
        fontSize: 30,
        textAlign: "center",
        backgroundColor: "#84ff9f",
    },
});




