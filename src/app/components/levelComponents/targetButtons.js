/**
 * Creates a target button for match and match first gamemodes 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { Button } from "react-native-elements";
import { playCorrectSound, playIncorrectSound } from "../sounds"
import PropTypes from "prop-types";

const debug = false
//////////////////////
// Component Class
/////////////////////
export default class TargetBtn extends React.Component {
    constructor(props) {
        super(props)
        this.answer = this.answer.bind(this)
        this.state = {
            buttonColor: "#edff8f"
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
                buttonColor: "#84ff9f"
            })
            playCorrectSound()

            setTimeout(async () => {
                this.setState({
                    buttonColor: "#edff8f"
                })
                try {
                    const res = await fetch("http://3.132.12.204:4000/writeToLearnerRecord", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Method": "POST,GET"
                        },
                        body: JSON.stringify(answerData)
                    })

                    if (!res.ok) {
                        throw new Error("Request returned a non 200 response code")
                    }

                    const data = await res.text()
                    if (debug) console.log(data)
                } catch (error) {
                    console.log(error)
                }


                this.props.currentPlayer.updateLocalLearnerRecord(this.props.value, answerData.standardLearnedContent, answerData.correct)
                setTimeout(async () => {
                    this.props.changeQuestion(true, this.props.correctValue)
                }, 500);
            }, 500);

        } else {
            this.setState({
                buttonColor: "#ff5994"
            })
            playIncorrectSound()
            this.props.currentPlayer.updateLocalLearnerRecord(this.props.value, answerData.standardLearnedContent, answerData.correct)
            setTimeout(() => {
                this.setState({
                    buttonColor: "#edff8f"
                })
                setTimeout(async () => {
                    this.props.changeQuestion(false, this.props.correctValue)
                }, 500);
            }, 500);


        }
    }


    render() {

        return (
            <Button
                onPress={() => this.answer()}
                color="#000"
                buttonStyle={{ backgroundColor: this.state.buttonColor }}
                containerStyle={{
                    width: 350,
                    marginHorizontal: 40,
                    marginVertical: 10,
                    borderWidth: 4,
                    borderColor: "#000000",
                    borderRadius: 10,
                }}
                titleStyle={{ color: "black", fontWeight: "bold", fontSize: 23 }}
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
    correctValue: PropTypes.string,
    value: PropTypes.string,
    correct: PropTypes.bool,
    updateLocalLearnerRecord: PropTypes.func,
    changeQuestion: PropTypes.func,
    navigation: PropTypes.object
}
