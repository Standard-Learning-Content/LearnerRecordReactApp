/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Background from '../../assets/background.png'


export default class NumLearners extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.background}>
                <ImageBackground source={Background} resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
                        <Text style={styles.headline}> Select The Number Of Learners</Text>
                        <Button
                            color="#ff5994"
                            buttonStyle={{ backgroundColor: "#ff5994" }}
                            containerStyle={{
                                width: 350,
                                marginHorizontal: 50,
                                marginVertical: 10,
                                borderWidth: 3,
                                borderColor: "#000000",
                                borderRadius: 10,
                            }}
                            titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                            title="1"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 1 })}
                        />
                        <Button
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
                            title="2"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 2 })}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: "#ff5994" }}
                            containerStyle={{
                                width: 350,
                                marginHorizontal: 50,
                                marginVertical: 10,
                                borderWidth: 3,
                                borderColor: "#000000",
                                borderRadius: 10,
                            }}
                            titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                            title="3"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 3 })}
                        />
                    </View>

                </ImageBackground>

            </View>
        )
    }
}

NumLearners.propTypes = {
    navigation: PropTypes.object
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    container: {
        marginVertical: "30%",
        marginHorizontal: "2%",
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        backgroundColor: "#ffffff33",
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFF",
        fontSize: 30,
        padding: 40,
        textAlign: "center",
    }
});




