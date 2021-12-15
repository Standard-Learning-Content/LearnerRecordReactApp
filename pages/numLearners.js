import React from "react";
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux'


export default class Main extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <Button
                    style={{ padding: 10 }}
                    title="1"
                    type="outline"
                    onPress={() => Actions.addPlayers({ numPlayers: 1 })}
                />
                <Button
                    style={{ padding: 10 }}
                    title="2"
                    type="outline"
                    onPress={() => Actions.addPlayers({ numPlayers: 2 })}
                />
                <Button
                    style={{ padding: 10 }}
                    title="3"
                    type="outline"
                    onPress={() => Actions.addPlayers({ numPlayers: 3 })}
                />
            </View>
        )
    }
}

