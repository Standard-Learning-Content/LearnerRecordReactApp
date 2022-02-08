/**
 * Componet that created the name input boxed 
 * 
 * @CaseyRock
 */

import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";


//////////////////////
// Component Class
/////////////////////
export default class NameInput extends React.Component {
    constructor(props) {
        super(props);
        let key = `player_${this.props.number}_name`
        this.state = {
            [key]: ""
        }
    }


    /**
     * 
     * @param {Event} e One text change event 
     * 
     * Set the state to the new name in the input box
     * @CR
     */
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
            <View style={styles.learningBox}>
                <Text style={styles.title}>Add Player {this.props.number}&apos;s Name</Text>
                <TextInput
                    style={styles.input}
                    key={this.props.number}
                    onChangeText={this.handleChange}
                    placeholder={`Player ${this.props.number}'s Name`}
                    placeholderTextColor="#fff"
                />
            </View>

        )
    }
}

///////////////////////
// Prop Validation
/////////////////////
NameInput.propTypes = {
    number: PropTypes.number,
    onChange: PropTypes.func,
}


//////////////////////
// Component Styling
/////////////////////
const styles = StyleSheet.create({
    title: {
        color: "#000",
        fontWeight: "bold"
    },
    learningBox: {
        padding: 10,
        backgroundColor: "#ff5994",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#000000",
        margin: 10,
    },
    input: {
        height: 50,
        width: 300,
        margin: 5,
        borderWidth: 3,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#82b6ff",
    },
});