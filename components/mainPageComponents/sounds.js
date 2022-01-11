import React from "react"
import { Audio } from "expo-av"
import { View } from "react-native"

const soundsMap = new Map([
    ["a", require('../../assets/audio/a.mp3')],
    ["ade", require('../../assets/audio/ade.mp3')],
    ["ake", require('../../assets/audio/ake.mp3')],
    ["ale", require('../../assets/audio/ale.mp3')],
    ["am", require('../../assets/audio/am.mp3')],
    ["ame", require('../../assets/audio/ame.mp3')],
    ["an", require('../../assets/audio/an.mp3')],
    ["ane", require('../../assets/audio/ane.mp3')],
    ["ap", require('../../assets/audio/ap.mp3')],
    ["ape", require('../../assets/audio/ape.mp3')],
    ["at", require('../../assets/audio/at.mp3')],
    ["b", require('../../assets/audio/b.mp3')],
    ["bl", require('../../assets/audio/bl.mp3')],
    ["br", require('../../assets/audio/br.mp3')],
    ["c", require('../../assets/audio/c.mp3')],
    ["ch", require('../../assets/audio/ch.mp3')],
    ["cl", require('../../assets/audio/cl.mp3')],
    ["cr", require('../../assets/audio/cr.mp3')],
    ["d", require('../../assets/audio/d.mp3')],
    ["e", require('../../assets/audio/e.mp3')],
    ["eak", require('../../assets/audio/eak.mp3')],
    ["ean", require('../../assets/audio/ean.mp3')],
    ["eat", require('../../assets/audio/eat.mp3')],
    ["ed", require('../../assets/audio/ed.mp3')],
    ["ee", require('../../assets/audio/ee.mp3')],
    ["eel", require('../../assets/audio/eel.mp3')],
    ["eep", require('../../assets/audio/eep.mp3')],
    ["eet", require('../../assets/audio/eet.mp3')],
    ["eg", require('../../assets/audio/eg.mp3')],
    ["en", require('../../assets/audio/en.mp3')],
    ["f", require('../../assets/audio/f.mp3')],
    ["fl", require('../../assets/audio/fl.mp3')],
    ["fr", require('../../assets/audio/fr.mp3')],
    ["g", require('../../assets/audio/g.mp3')],
    ["gl", require('../../assets/audio/gl.mp3')],
    ["gr", require('../../assets/audio/gr.mp3')],
    ["h", require('../../assets/audio/h.mp3')],
    ["i", require('../../assets/audio/i.mp3')],
    ["ice", require('../../assets/audio/ice.mp3')],
    ["ide", require('../../assets/audio/ide.mp3')],
    ["if", require('../../assets/audio/if.mp3')],
    ["ike", require('../../assets/audio/ike.mp3')],
    ["in", require('../../assets/audio/in.mp3')],
    ["ine", require('../../assets/audio/ine.mp3')],
    ["ip", require('../../assets/audio/ip.mp3')],
    ["ipe", require('../../assets/audio/ipe.mp3')],
    ["is", require('../../assets/audio/is.mp3')],
    ["ite", require('../../assets/audio/ite.mp3')],
    ["j", require('../../assets/audio/j.mp3')],
    ["k", require('../../assets/audio/k.mp3')],
    ["l", require('../../assets/audio/l.mp3')],
    ["m", require('../../assets/audio/m.mp3')],
    ["n", require('../../assets/audio/n.mp3')],
    ["o", require('../../assets/audio/o.mp3')],
    ["obe", require('../../assets/audio/obe.mp3')],
    ["ode", require('../../assets/audio/ode.mp3')],
    ["oke", require('../../assets/audio/oke.mp3')],
    ["ome", require('../../assets/audio/ome.mp3')],
    ["op", require('../../assets/audio/op.mp3')],
    ["ot", require('../../assets/audio/ot.mp3')],
    ["ox", require('../../assets/audio/ox.mp3')],
    ["p", require('../../assets/audio/p.mp3')],
    ["pl", require('../../assets/audio/pl.mp3')],
    ["pr", require('../../assets/audio/pr.mp3')],
    ["qu", require('../../assets/audio/qu.mp3')],
    ["r", require('../../assets/audio/r.mp3')],
    ["s", require('../../assets/audio/s.mp3')],
    ["sh", require('../../assets/audio/sh.mp3')],
    ["shr", require('../../assets/audio/shr.mp3')],
    ["sp", require('../../assets/audio/sp.mp3')],
    ["squ", require('../../assets/audio/squ.mp3')],
    ["st", require('../../assets/audio/st.mp3')],
    ["str", require('../../assets/audio/str.mp3')],
    ["sw", require('../../assets/audio/sw.mp3')],
    ["t", require('../../assets/audio/t.mp3')],
    ["tr", require('../../assets/audio/tr.mp3')],
    ["u", require('../../assets/audio/u.mp3')],
    ["ub", require('../../assets/audio/ub.mp3')],
    ["ue", require('../../assets/audio/ue.mp3')],
    ["ule", require('../../assets/audio/ule.mp3')],
    ["ume", require('../../assets/audio/ume.mp3')],
    ["un", require('../../assets/audio/un.mp3')],
    ["une", require('../../assets/audio/une.mp3')],
    ["use", require('../../assets/audio/use.mp3')],
    ["ut", require('../../assets/audio/ut.mp3')],
    ["ute", require('../../assets/audio/ute.mp3')],
    ["v", require('../../assets/audio/v.mp3')],
    ["w", require('../../assets/audio/w.mp3')],
    ["x", require('../../assets/audio/x.mp3')],
    ["y", require('../../assets/audio/y.mp3')],
    ["z", require('../../assets/audio/z.mp3')],
    ["cat", require('../../assets/audio/cat.mp3')],
    ["pan", require('../../assets/audio/pan.mp3')],
    ["mat", require('../../assets/audio/mat.mp3')],
    ["pat", require('../../assets/audio/pat.mp3')],
    ["tan", require('../../assets/audio/tan.mp3')],
    ["map", require('../../assets/audio/map.mp3')],
    ["tap", require('../../assets/audio/tap.mp3')],
    ["cap", require('../../assets/audio/cap.mp3')],
    ["nap", require('../../assets/audio/nap.mp3')],
    ["can", require('../../assets/audio/can.mp3')],
])

export default class Sounds extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    static async getDerivedStateFromProps(props, state) {
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
        this.sound = new Audio.Sound()
        await this.sound.loadAsync(soundsMap.get(props.sound.toLowerCase()))
        await this.sound.playAsync()
    }

    render() {
        return (
            <View>
            </View>
        )
    }

}