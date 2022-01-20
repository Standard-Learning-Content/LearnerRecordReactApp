/**
 * Creates a target button for match and match first gamemodes 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { Button } from 'react-native-elements';
import config from '../../config.json'
import { playCorrectSound, playIncorrectSound } from '../sounds'
import PropTypes from 'prop-types';


//////////////////////
// Component Class
/////////////////////
export default class TargetBtn extends React.Component {
    constructor(props) {
        super(props)
        this.answer = this.answer.bind(this)
        this.state = {
            buttonColor: "#15DB95"
        }
    }

    async answer() {
        let answerData = {
            userID: this.props.userID,
            standardLearnedContent: this.props.content.replace("<", "").replace(">", ""),
            correct: this.props.correct,
            timestamp: Date.now()
        }
        if (this.props.correct) {
            this.setState({
                buttonColor: "#34c0eb"
            })

            playCorrectSound()

            setTimeout(async () => {
                this.setState({
                    buttonColor: "#15DB95"
                })
                const res = await fetch("http://3.132.12.204:4000/writeToLearnerRecord", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': "*",
                        'Access-Control-Allow-Method': 'POST,GET'
                    },
                    body: JSON.stringify(answerData)
                })

                if (!res.ok) {
                    throw new Error('Request returned af non 200 response code')
                }

                const data = await res.text()
                if (config["debug-mode"]) console.log(data)
                this.props.currentPlayer.updateLocalLearnerRecord(this.props.value, answerData.standardLearnedContent, answerData.correct)
                setTimeout(async () => {
                    this.props.changeQuestion(true)
                }, 500);
            }, 500);

        } else {
            this.setState({
                buttonColor: "#eb4034"
            })
            playIncorrectSound()
            this.props.currentPlayer.updateLocalLearnerRecord(this.props.value, answerData.standardLearnedContent, answerData.correct)
            setTimeout(() => {
                this.setState({
                    buttonColor: "#15DB95"
                })
                setTimeout(async () => {
                    this.props.changeQuestion(false)
                }, 500);
            }, 500);


        }
    }


    render() {

        return (
            <Button
                onPress={() => this.answer()}
                color="#15DB95"
                buttonStyle={{ backgroundColor: this.state.buttonColor }}
                containerStyle={{
                    width: "90%",
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}
                title={this.props.value}
            />
        )
    }
}

///////////////////////
// Prop Validation
/////////////////////
TargetBtn.propTypes = {
    userID: PropTypes.string,
    currentPlayer: PropTypes.object,
    content: PropTypes.string,
    value: PropTypes.string,
    correct: PropTypes.bool,
    updateLocalLearnerRecord: PropTypes.func,
    changeQuestion: PropTypes.func,
    navigation: PropTypes.object
}
