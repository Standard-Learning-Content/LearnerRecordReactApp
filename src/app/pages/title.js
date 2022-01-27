/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Background from '../../assets/background.png'


export default class Title extends React.Component {
    constructor(props) {
        super(props);
        this.playGame = this.playGame.bind(this)
        this.instructionPage = this.instructionPage.bind(this)
    }

    playGame() {
        this.props.navigation.navigate("HowManyLearners", {})
    }

    instructionPage() {
        this.props.navigation.navigate("instructions", {})
    }

    render() {

        return (
            <View style={styles.background}>
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <Text style={styles.multi}> Multi</Text>
                    <Image
                        source={require('../../assets/appLogo.png')}
                        style={styles.star}
                    ></Image>
                    <Button
                        onPress={() => this.playGame()}
                        color="#15DB95"
                        buttonStyle={{ backgroundColor: "#ff5994" }}
                        containerStyle={{
                            width: 350,
                            marginHorizontal: 40,
                            marginVertical: 10,
                            borderWidth: 4,
                            borderColor: "#000000",
                            borderRadius: 10,
                            position: 'absolute',
                            bottom: "25%",
                        }}
                        titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                        title={"Play"}
                    />
                    <Button
                        onPress={() => this.instructionPage()}
                        color="#15DB95"
                        buttonStyle={{ backgroundColor: "#ff5994" }}
                        containerStyle={{
                            width: 350,
                            marginHorizontal: 40,
                            marginVertical: 10,
                            borderWidth: 4,
                            borderColor: "#000000",
                            borderRadius: 10,
                            position: 'absolute',
                            bottom: "15%",
                        }}
                        titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                        title={"How to Play"}
                    />
                </ImageBackground>
            </View >
        )
    }
}

Title.propTypes = {
    navigation: PropTypes.object
}



const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    multi: {
        top: "10%",
        position: 'absolute',
        color: "#fff",
        fontSize: 50,
    },
    star: {
        width: "95%",
        position: 'absolute',
        top: "15%",
        flex: 1,
        resizeMode: "contain",
    },

});




