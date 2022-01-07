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
                    color="#15DB95"
                    buttonStyle={{ backgroundColor: "#15DB95" }}
                    containerStyle={{
                        width: 350,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                    title="1"
                    type="outline"
                    onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 1 })}
                />
                <Button
                    buttonStyle={{ backgroundColor: "#15DB95" }}
                    containerStyle={{
                        width: 350,
                        marginHorizontal: 40,
                        marginVertical: 10,
                    }}
                    titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                    title="2"
                    type="outline"
                    onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 2 })}
                />
                <Button
                    buttonStyle={{ backgroundColor: "#15DB95" }}
                    containerStyle={{
                        width: 350,
                        marginHorizontal: 50,
                        marginVertical: 10,
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




