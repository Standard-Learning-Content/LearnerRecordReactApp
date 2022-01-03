import React from "react"
import { Audio } from "expo-av"
import { View } from "react-native"
import { registerCustomIconType } from "react-native-elements"

export default class Sounds extends React.Component {
    async componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })
        this.sound = new Audio.Sound()
        await this.sound.loadAsync(require('../assets/audio/ade.mp3'))
        await this.sound.playAsync()

    }

    // playSound() {
    //     this.sound.playAsync()
    // }

    render() {
        return (
            <View>
            </View>
        )
    }

}