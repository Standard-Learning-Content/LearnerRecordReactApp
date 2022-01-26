/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';


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
                <Image
                    source={require('../assets/appLogo.png')}
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
                        borderWidth: 3,
                        borderColor: "#000000",
                        borderRadius: 10,
                        position: 'absolute',
                        bottom: 160,
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
                        borderWidth: 3,
                        borderColor: "#000000",
                        borderRadius: 10,
                        position: 'absolute',
                        bottom: 80,
                    }}
                    titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                    title={"How to Play"}
                />
            </View >
        )
    }
}

Title.propTypes = {
    navigation: PropTypes.object
}



const styles = StyleSheet.create({
    background: {
        backgroundColor: '#82b6ff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
    },
    star: {
        width: "100%",
        position: 'absolute',
        top: 10,
        flex: 1,
        resizeMode: "contain",
    },

});




