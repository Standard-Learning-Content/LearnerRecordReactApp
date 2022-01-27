import React from "react";
import { Text } from 'react-native';
import PropTypes from 'prop-types';

//////////////////////
// Component Class
/////////////////////
export default class HeaderChar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            char: "",
            active: false
        }
    }

    static getDerivedStateFromProps(props) {
        let newState = {
            char: props.char,
            active: props.active
        }
        return newState
    }

    render() {
        let charState
        if (this.state.active) {
            charState = {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 60,
                marginTop: 0,
                color: "#84ff9f"
            }
        } else {
            charState = {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 60,
                marginTop: 0,
                color: "#FFF"
            }
        }
        return (
            <Text style={charState}>
                {this.state.char}
            </Text >
        )
    }
}


///////////////////////
// Prop Validation
/////////////////////
HeaderChar.propTypes = {
    char: PropTypes.string,
    active: PropTypes.bool
}