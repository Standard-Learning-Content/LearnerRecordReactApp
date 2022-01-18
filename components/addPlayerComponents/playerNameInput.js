/**
 * Componet that created the name input boxed 
 * 
 * @CaseyRock
 */

import React from "react";
import { TextInput, View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';


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
            <View style={{ padding: 10 }}>
                <Text style={styles.title}>Add Player {this.props.number}&apos;s Name</Text>
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