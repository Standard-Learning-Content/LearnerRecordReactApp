import React from "react";
import { TextInput, View, StyleSheet } from 'react-native';



export default class NameInput extends React.Component {
    constructor(props) {
        super(props);
        let key = `player_${this.props.number}_name`
        this.state = {
            [key]: ""
        }
    }


    handleChange = e => {
        let key = `player_${this.props.number}_name`
        this.setState({ [key]: e }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        })
    };

    render() {
        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={styles.input}
                    key={this.props.number}
                    onChangeText={this.handleChange}
                    placeholder={"Insert Players Name"}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});