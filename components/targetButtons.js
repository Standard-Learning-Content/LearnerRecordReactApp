import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, View, SafeAreaView, Text, Alert } from 'react-native';
import { Tile } from 'react-native-elements';
import levels from '../levels/levels.json'

export default class TargetBtn extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }



    render() {

        return (
            <View >
                <Button
                    style={styles.button}
                    title={this.props.value}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: '5%',
        width: '100%',
    },
});