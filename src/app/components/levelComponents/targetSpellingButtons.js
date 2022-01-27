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
            buttonColor: "#edff8f"
        }
        this.pressHandler = this.pressHandler.bind(this)
    }


    pressHandler() {
        if (this.props.correct) {
            this.setState({
                buttonColor: "#84ff9f"
            })
            this.props.answer(this.props.content)
        } else {
            this.setState({
                buttonColor: "#ff5994"
            })

            this.props.answer(this.props.content)


        }

    }

    render() {
        return (
            <Button
                onPress={() => this.pressHandler()}
                color="#edff8f"
                buttonStyle={{ backgroundColor: this.state.buttonColor }}
                containerStyle={{
                    width: "90%",
                    marginHorizontal: 50,
                    marginVertical: 5,
                    borderWidth: 4,
                    borderColor: "#000000",
                    textAlign: 'center'
                }}
                titleStyle={{ color: 'black', marginHorizontal: 20, fontWeight: 'bold', fontSize: 23 }}
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