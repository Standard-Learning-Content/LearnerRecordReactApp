import React from "react";
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';


//////////////////////
// Component Class
/////////////////////
export default class SpellingBtn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: "",
            correct: false,
            buttonColor: "#15DB95"
        }
        this.pressHandler = this.pressHandler.bind(this)
    }

    static getDerivedStateFromProps(props) {
        let newState = {
            content: props.content,
            correct: props.correct,
        }
        return newState
    }

    pressHandler() {
        if (this.state.correct) {
            this.setState({
                buttonColor: "#34c0eb"
            })
        } else {
            this.setState({
                buttonColor: "#eb4034"
            })
            setTimeout(() => {
                this.setState({
                    buttonColor: "#15DB95"
                })
            }, 1000);
        }
        this.props.answer(this.state.content)
    }

    render() {
        return (
            <Button
                onPress={() => this.pressHandler()}
                color="#15DB95"
                buttonStyle={{ backgroundColor: this.state.buttonColor }}
                containerStyle={{
                    width: "90%",
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
                title={this.state.content}
            />
        )
    }
}


///////////////////////
// Prop Validation
/////////////////////
SpellingBtn.propTypes = {
    content: PropTypes.string,
    correct: PropTypes.bool,
    answer: PropTypes.func

}