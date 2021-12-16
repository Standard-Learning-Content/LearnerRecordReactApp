import React from "react";
import { View } from 'react-native';
import { Button } from 'react-native-elements';


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
                    onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 1 })}
                />
                <Button
                    style={{ padding: 10 }}
                    title="2"
                    type="outline"
                    onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 2 })}
                />
                <Button
                    style={{ padding: 10 }}
                    title="3"
                    type="outline"
                    onPress={() => this.props.navigation.navigate('AddPlayers', { numPlayers: 3 })}
                />
            </View>
        )
    }
}

