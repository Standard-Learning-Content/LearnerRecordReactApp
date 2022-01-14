/**
 * Selects how many users are learning 
 * 05 Jaunuary 2022
 * @CR
 */
import React from "react";
import { Button } from 'react-native-elements';
import config from '../../config.json'
import { Audio } from "expo-av"

Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    allowsRecordingAndroid: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: true
})

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
            userID: this.props.userID + "test",
            standardLearnedContent: this.props.content.replace("<", "").replace(">", ""),
            correct: this.props.correct,
            timestamp: Date.now()
        }
        if (this.props.correct) {
            this.setState({
                buttonColor: "#34c0eb"
            })

            this.sound = new Audio.Sound()
            await this.sound.loadAsync(require('../../assets/audio/feedback/Correct.mp3'))
            await this.sound.playAsync()

            setTimeout(() => {
                this.setState({
                    buttonColor: "#15DB95"
                })
            }, 1000);




            setTimeout(async () => {
                await this.sound.unloadAsync();
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
                    throw new Error('Request returned a non 200 response code')
                }

                const data = await res.text()
                if (config["debug-mode"]) console.log(data)
                this.props.updateLocalLearnerRecord(this.props.value, answerData.standardLearnedContent, answerData.correct)
                this.props.changePlayer()

            }, 1000);



        } else {
            //Play incorrect sounds
            if (config["debug-mode"]) console.log("Incorrect")
            this.setState({
                buttonColor: "#eb4034"
            })

            setTimeout(() => {
                this.setState({
                    buttonColor: "#15DB95"
                })
            }, 1000);


            this.sound = new Audio.Sound()
            await this.sound.loadAsync(require('../../assets/audio/feedback/Incorrect.mp3'))
            await this.sound.playAsync()

            setTimeout(async () => {
                await this.sound.unloadAsync();
            }, 1000);
            this.props.updateLocalLearnerRecord(this.props.value, answerData.standardLearnedContent, answerData.correct)
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
                style={styles.button}
                title={this.props.value}
            />
        )
    }
}
