/**
 * Selects how many user are learnering 
 */
import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';


export default class NumLearners extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.background}>
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
        )
    }
}

NumLearners.propTypes = {
    navigation: PropTypes.object
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#82b6ff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        fontWeight: 'bold',
        color: "#FFF",
        fontSize: 30,
        padding: 20,
        textAlign: "center",
    }
});




