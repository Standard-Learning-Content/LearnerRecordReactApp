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
            buttonColor: "#15DB95"
        }
        this.pressHandler = this.pressHandler.bind(this)
    }


    pressHandler() {
        if (this.props.correct) {
            this.setState({
                buttonColor: "#34c0eb"
            })
            this.props.answer(this.props.content)
        } else {
            this.setState({
                buttonColor: "#eb4034"
            })

            this.props.answer(this.props.content)


        }

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
                title={this.props.content}
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