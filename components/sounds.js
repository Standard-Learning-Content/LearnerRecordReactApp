import React from "react"
import { Audio } from "expo-av"
import { View } from "react-native"
import PropTypes from 'prop-types';

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


export const soundsMap = new Map([
    ["a", require('../assets/audio/a.mp3')],
    ["at", require('../assets/audio/at.mp3')],
    ["eak", require('../assets/audio/eak.mp3')],
    ["et", require('../assets/audio/et.mp3')],
    ["ide", require('../assets/audio/ide.mp3')],
    ["k", require('../assets/audio/k.mp3')],
    ["ot", require('../assets/audio/ot.mp3')],
    ["sp2", require('../assets/audio/sp2.mp3')],
    ["ug", require('../assets/audio/ug.mp3')],
    ["wh", require('../assets/audio/wh.mp3')],
    ["ade", require('../assets/audio/ade.mp3')],
    ["b", require('../assets/audio/b.mp3')],
    ["ean", require('../assets/audio/ean.mp3')],
    ["f", require('../assets/audio/f.mp3')],
    ["if", require('../assets/audio/if.mp3')],
    ["l", require('../assets/audio/l.mp3')],
    ["ox", require('../assets/audio/ox.mp3')],
    ["squ", require('../assets/audio/squ.mp3')],
    ["ule", require('../assets/audio/ule.mp3')],
    ["wr", require('../assets/audio/wr.mp3')],
    ["ake", require('../assets/audio/ake.mp3')],
    ["bl", require('../assets/audio/bl.mp3')],
    ["eat", require('../assets/audio/eat.mp3')],
    ["fl", require('../assets/audio/fl.mp3')],
    ["ike", require('../assets/audio/ike.mp3')],
    ["m", require('../assets/audio/m.mp3')],
    ["p", require('../assets/audio/p.mp3')],
    ["st", require('../assets/audio/st.mp3')],
    ["ume", require('../assets/audio/ume.mp3')],
    ["x", require('../assets/audio/x.mp3')],
    ["ale", require('../assets/audio/ale.mp3')],
    ["br", require('../assets/audio/br.mp3')],
    ["ed", require('../assets/audio/ed.mp3')],
    ["fr", require('../assets/audio/fr.mp3')],
    ["in", require('../assets/audio/in.mp3')],
    ["n", require('../assets/audio/n.mp3')],
    ["pl", require('../assets/audio/pl.mp3')],
    ["str", require('../assets/audio/str.mp3')],
    ["un", require('../assets/audio/un.mp3')],
    ["y", require('../assets/audio/y.mp3')],
    ["am", require('../assets/audio/am.mp3')],
    ["c", require('../assets/audio/c.mp3')],
    ["ee", require('../assets/audio/ee.mp3')],
    ["g", require('../assets/audio/g.mp3')],
    ["ine", require('../assets/audio/ine.mp3')],
    ["o", require('../assets/audio/o.mp3')],
    ["pr", require('../assets/audio/pr.mp3')],
    ["sw", require('../assets/audio/sw.mp3')],
    ["une", require('../assets/audio/une.mp3')],
    ["z", require('../assets/audio/z.mp3')],
    ["ame", require('../assets/audio/ame.mp3')],
    ["ch", require('../assets/audio/ch.mp3')],
    ["eel", require('../assets/audio/eel.mp3')],
    ["gl", require('../assets/audio/gl.mp3')],
    ["ip", require('../assets/audio/ip.mp3')],
    ["obe", require('../assets/audio/obe.mp3')],
    ["q", require('../assets/audio/q.mp3')],
    ["t", require('../assets/audio/t.mp3')],
    ["use", require('../assets/audio/use.mp3')],
    ["an", require('../assets/audio/an.mp3')],
    ["cl", require('../assets/audio/cl.mp3')],
    ["eep", require('../assets/audio/eep.mp3')],
    ["gr", require('../assets/audio/gr.mp3')],
    ["ipe", require('../assets/audio/ipe.mp3')],
    ["ode", require('../assets/audio/ode.mp3')],
    ["r", require('../assets/audio/r.mp3')],
    ["tr", require('../assets/audio/tr.mp3')],
    ["ut", require('../assets/audio/ut.mp3')],
    ["ane", require('../assets/audio/ane.mp3')],
    ["cr", require('../assets/audio/cr.mp3')],
    ["eet", require('../assets/audio/eet.mp3')],
    ["h", require('../assets/audio/h.mp3')],
    ["is", require('../assets/audio/is.mp3')],
    ["oke", require('../assets/audio/oke.mp3')],
    ["s", require('../assets/audio/s.mp3')],
    ["u", require('../assets/audio/u.mp3')],
    ["ute", require('../assets/audio/ute.mp3')],
    ["ap", require('../assets/audio/ap.mp3')],
    ["eg", require('../assets/audio/eg.mp3')],
    ["i", require('../assets/audio/i.mp3')],
    ["ite", require('../assets/audio/ite.mp3')],
    ["ome", require('../assets/audio/ome.mp3')],
    ["sh", require('../assets/audio/sh.mp3')],
    ["ub", require('../assets/audio/ub.mp3')],
    ["v", require('../assets/audio/v.mp3')],
    ["ape", require('../assets/audio/ape.mp3')],
    ["e", require('../assets/audio/e.mp3')],
    ["en", require('../assets/audio/en.mp3')],
    ["ice", require('../assets/audio/ice.mp3')],
    ["j", require('../assets/audio/j.mp3')],
    ["op", require('../assets/audio/op.mp3')],
    ["shr", require('../assets/audio/shr.mp3')],
    ["ue", require('../assets/audio/ue.mp3')],
    ["w", require('../assets/audio/w.mp3')],
    ["mat", require('../assets/audio/mat.mp3')],
    ["pat", require('../assets/audio/pat.mp3')],
    ["tan", require('../assets/audio/tan.mp3')],
    ["tap", require('../assets/audio/tap.mp3')],
    ["cap", require('../assets/audio/cap.mp3')],
    ["nap", require('../assets/audio/nap.mp3')],
    ["can", require('../assets/audio/can.mp3')],
    ["ag", require('../assets/audio/ag.mp3')],
    ["club", require('../assets/audio/club.mp3')],
    ["geg", require('../assets/audio/geg.mp3')],
    ["lag", require('../assets/audio/lag.mp3')],
    ["pan", require('../assets/audio/pan.mp3')],
    ["rug", require('../assets/audio/rug.mp3')],
    ["top", require('../assets/audio/top.mp3')],
    ["as", require('../assets/audio/as.mp3')],
    ["clue", require('../assets/audio/clue.mp3')],
    ["get", require('../assets/audio/get.mp3')],
    ["leg", require('../assets/audio/leg.mp3')],
    ["tree", require('../assets/audio/tree.mp3')],
    ["bat", require('../assets/audio/bat.mp3')],
    ["crane", require('../assets/audio/crane.mp3')],
    ["globe", require('../assets/audio/globe.mp3')],
    ["pane", require('../assets/audio/pane.mp3')],
    ["run", require('../assets/audio/run.mp3')],
    ["tub", require('../assets/audio/tub.mp3')],
    ["blade", require('../assets/audio/blade.mp3')],
    ["glue", require('../assets/audio/glue.mp3')],
    ["lip", require('../assets/audio/lip.mp3')],
    ["pat", require('../assets/audio/pat.mp3')],
    ["rut", require('../assets/audio/rut.mp3')],
    ["tub1", require('../assets/audio/tub1.mp3')],
    ["bleak", require('../assets/audio/bleak.mp3')],
    ["cub", require('../assets/audio/cub.mp3')],
    ["grape", require('../assets/audio/grape.mp3')],
    ["man", require('../assets/audio/man.mp3')],
    ["pig", require('../assets/audio/pig.mp3')],
    ["sheep", require('../assets/audio/sheep.mp3')],
    ["tug", require('../assets/audio/tug.mp3')],
    ["blue", require('../assets/audio/blue.mp3')],
    ["cup", require('../assets/audio/cup.mp3')],
    ["gun", require('../assets/audio/gun.mp3')],
    ["shine", require('../assets/audio/shine.mp3')],
    ["um", require('../assets/audio/um.mp3')],
    ["box", require('../assets/audio/box.mp3')],
    ["cut", require('../assets/audio/cut.mp3')],
    ["hat", require('../assets/audio/hat.mp3')],
    ["map", require('../assets/audio/map.mp3')],
    ["pin", require('../assets/audio/pin.mp3')],
    ["sip", require('../assets/audio/sip.mp3')],
    ["us", require('../assets/audio/us.mp3')],
    ["brake", require('../assets/audio/brake.mp3')],
    ["cute", require('../assets/audio/cute.mp3')],
    ["hen", require('../assets/audio/hen.mp3')],
    ["mat", require('../assets/audio/mat.mp3')],
    ["pit", require('../assets/audio/pit.mp3')],
    ["spike", require('../assets/audio/spike.mp3')],
    ["van", require('../assets/audio/van.mp3')],
    ["den", require('../assets/audio/den.mp3')],
    ["home", require('../assets/audio/home.mp3')],
    ["plane", require('../assets/audio/plane.mp3')],
    ["spine", require('../assets/audio/spine.mp3')],
    ["wed", require('../assets/audio/wed.mp3')],
    ["bug", require('../assets/audio/bug.mp3')],
    ["dog", require('../assets/audio/dog.mp3')],
    ["mop", require('../assets/audio/mop.mp3')],
    ["pleat", require('../assets/audio/pleat.mp3')],
    ["spoke", require('../assets/audio/spoke.mp3')],
    ["wet", require('../assets/audio/wet.mp3')],
    ["egg", require('../assets/audio/egg.mp3')],
    ["hop", require('../assets/audio/hop.mp3')],
    ["mule", require('../assets/audio/mule.mp3')],
    ["pop", require('../assets/audio/pop.mp3')],
    ["squeak", require('../assets/audio/squeak.mp3')],
    ["wheat", require('../assets/audio/wheat.mp3')],
    ["bun", require('../assets/audio/bun.mp3')],
    ["fab", require('../assets/audio/fab.mp3')],
    ["hot", require('../assets/audio/hot.mp3')],
    ["mum", require('../assets/audio/mum.mp3')],
    ["pot", require('../assets/audio/pot.mp3')],
    ["stale", require('../assets/audio/stale.mp3')],
    ["wheel", require('../assets/audio/wheel.mp3')],
    ["bus", require('../assets/audio/bus.mp3')],
    ["fan", require('../assets/audio/fan.mp3')],
    ["hut", require('../assets/audio/hut.mp3')],
    ["muse", require('../assets/audio/muse.mp3')],
    ["pox", require('../assets/audio/pox.mp3')],
    ["strobe", require('../assets/audio/strobe.mp3')],
    ["whine", require('../assets/audio/whine.mp3')],
    ["but", require('../assets/audio/but.mp3')],
    ["fig", require('../assets/audio/fig.mp3')],
    ["ib", require('../assets/audio/ib.mp3')],
    ["nag", require('../assets/audio/nag.mp3')],
    ["price", require('../assets/audio/price.mp3')],
    ["strode", require('../assets/audio/strode.mp3')],
    ["write", require('../assets/audio/write.mp3')],
    ["fin", require('../assets/audio/fin.mp3')],
    ["if", require('../assets/audio/if.mp3')],
    ["nap", require('../assets/audio/nap.mp3')],
    ["prune", require('../assets/audio/prune.mp3')],
    ["sun", require('../assets/audio/sun.mp3')],
    ["yum", require('../assets/audio/yum.mp3')],
    ["ig", require('../assets/audio/ig.mp3')],
    ["neg", require('../assets/audio/neg.mp3')],
    ["quip", require('../assets/audio/quip.mp3')],
    ["sweet", require('../assets/audio/sweet.mp3')],
    ["zip", require('../assets/audio/zip.mp3')],
    ["flute", require('../assets/audio/flute.mp3')],
    ["im", require('../assets/audio/im.mp3')],
    ["net", require('../assets/audio/net.mp3')],
    ["quo", require('../assets/audio/quo.mp3')],
    ["swipe", require('../assets/audio/swipe.mp3')],
    ["is", require('../assets/audio/is.mp3')],
    ["ram", require('../assets/audio/ram.mp3')],
    ["tam", require('../assets/audio/tam.mp3')],
    ["fox", require('../assets/audio/fox.mp3')],
    ["it", require('../assets/audio/it.mp3')],
    ["nip", require('../assets/audio/nip.mp3')],
    ["rat", require('../assets/audio/rat.mp3')],
    ["tan", require('../assets/audio/tan.mp3')],
    ["cat", require('../assets/audio/cat.mp3')],
    ["frame", require('../assets/audio/frame.mp3')],
    ["jet", require('../assets/audio/jet.mp3')],
    ["nut", require('../assets/audio/nut.mp3')],
    ["ride", require('../assets/audio/ride.mp3')],
    ["tap", require('../assets/audio/tap.mp3')],
    ["chide", require('../assets/audio/chide.mp3')],
    ["fume", require('../assets/audio/fume.mp3')],
    ["jug", require('../assets/audio/jug.mp3')],
    ["rode", require('../assets/audio/rode.mp3')],
    ["ted", require('../assets/audio/ted.mp3')],
    ["clean", require('../assets/audio/clean.mp3')],
    ["gag", require('../assets/audio/gag.mp3')],
    ["kid", require('../assets/audio/kid.mp3')],
    ["pam", require('../assets/audio/pam.mp3')],
    ["rub", require('../assets/audio/rub.mp3')],
    ["ten", require('../assets/audio/ten.mp3')]
])

export const playCorrectSound = async () => {
    let sound = new Audio.Sound()
    await sound.loadAsync(require('../assets/audio/feedback/Correct.mp3'))
    await sound.playAsync()

    setTimeout(async () => {
        await sound.unloadAsync();
    }, 500);
}

export const playIncorrectSound = async () => {
    let sound = new Audio.Sound()
    await sound.loadAsync(require('../assets/audio/feedback/Incorrect.mp3'))
    await sound.playAsync()

    setTimeout(async () => {
        await sound.unloadAsync();
    }, 500);
}

export const playContentSounds = async (content) => {
    if (soundsMap.get(content.toLowerCase()) != undefined) {
        let sound = new Audio.Sound()
        await sound.loadAsync(soundsMap.get(content.toLowerCase()))
        await sound.playAsync()

        setTimeout(async () => {
            await sound.unloadAsync();
        }, 1000);
    } else {
        console.log("Audio Is Undefinded: " + content)
    }

}


export default class Sounds extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    static async getDerivedStateFromProps(props) {
        try {
            this.sound = new Audio.Sound()
            await this.sound.loadAsync(soundsMap.get(props.sound.toLowerCase()))
            await this.sound.playAsync()

            setTimeout(async () => {
                await this.sound.unloadAsync();
            }, 500);
        } catch (error) {
            console.log(props.sound.toLowerCase())
            console.log(error)
        }

    }

    render() {
        return (
            <View>
            </View>
        )
    }

}

///////////////////////
// Prop Validation
/////////////////////
Sounds.propTypes = {
    sound: PropTypes.string
}