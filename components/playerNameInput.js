import React from "react";
import { TextInput, View, StyleSheet, Text } from 'react-native';



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
                <Text style={styles.title}>Add Player {this.props.number}'s Name</Text>
                <TextInput
                    style={styles.input}
                    key={this.props.number}
                    onChangeText={this.handleChange}
                    placeholder={"Insert Players Name"}
                    placeholderTextColor="#15DB95"
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: "#FFFFFF",
        margin: 20,
        fontWeight: "bold"
    },
    input: {
        height: 50,
        width: 300,
        margin: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: "#15DB95",
        color: "#15DB95",
    },
});