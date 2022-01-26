import React from "react"
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


//////////////////////////////
// Static Loads all the images
/////////////////////////////
export const imagesMap = new Map([
    ["can", require('../assets/images/can.jpeg')],
    ["cap", require('../assets/images/cap.jpeg')],
    ["cat", require('../assets/images/cat.jpeg')],
    ["map", require('../assets/images/map.jpeg')],
    ["mat", require('../assets/images/mat.jpeg')],
    ["nap", require('../assets/images/nap.jpeg')],
    ["pan", require('../assets/images/pan.jpeg')],
    ["pat", require('../assets/images/pat.jpeg')],
    ["tan", require('../assets/images/tan.jpeg')],
    ["tap", require('../assets/images/tap.jpeg')],
    ["pin", require('../assets/images/pin.jpeg')],
    ["fin", require('../assets/images/fin.jpeg')],
    ["zip", require('../assets/images/zip.jpeg')],
    ["lip", require('../assets/images/lip.jpeg')],
    ["pit", require('../assets/images/pit.jpeg')],
    ["tug", require('../assets/images/tug.jpeg')],
    ["cub", require('../assets/images/cub.jpeg')],
    ["nut", require('../assets/images/cub.jpeg')],
    ["bug", require('../assets/images/bug.jpeg')],
    ["rug", require('../assets/images/rug.jpeg')],
    ["cut", require('../assets/images/cut.jpeg')],
    ["fox", require('../assets/images/fox.jpeg')],
    ["top", require('../assets/images/top.jpeg')],
    ["pot", require('../assets/images/pot.jpeg')],
    ["hop", require('../assets/images/hop.jpeg')],
    ["box", require('../assets/images/box.jpeg')],
    ["dog", require('../assets/images/dog.jpeg')],
    ["mop", require('../assets/images/mop.jpeg')],
    ["wed", require('../assets/images/wed.jpeg')],
    ["ted", require('../assets/images/ted.jpeg')],
    ["jet", require('../assets/images/jet.jpeg')],
    ["den", require('../assets/images/den.jpeg')],
    ["wet", require('../assets/images/wet.jpeg')],
    ["net", require('../assets/images/net.jpeg')],
    ["ten", require('../assets/images/ten.jpeg')],
    ["bit", require('../assets/images/ten.jpeg')],
    ["brake", require('../assets/images/brake.jpeg')],
    ["grape", require('../assets/images/grape.jpeg')],
    ["plane", require('../assets/images/plane.jpeg')],
    ["crane", require('../assets/images/crane.jpeg')],
    ["frame", require('../assets/images/frame.jpeg')],
    ["whine", require('../assets/images/whine.jpeg')],
    ["spike", require('../assets/images/spike.jpeg')],
    ["blue", require('../assets/images/blue.jpeg')],
    ["flute", require('../assets/images/flute.jpeg')],
    ["glue", require('../assets/images/glue.jpeg')],
    ["sheep", require('../assets/images/sheep.jpeg')],
    ["wheel", require('../assets/images/wheel.jpeg')],
    ["tree", require('../assets/images/tree.jpeg')],
    ["wheat", require('../assets/images/wheat.jpeg')],
    ["sweat", require('../assets/images/sweat.jpeg')],
])



//////////////////////
// Component Class
/////////////////////
export default class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: ""
        }

    }

    static getDerivedStateFromProps(props) {
        let newState = {
            image: props.image
        }

        return newState
    }




    render() {
        let image
        if (imagesMap.get(this.state.image) != undefined) {
            image = <Image
                style={styles.logo}
                source={imagesMap.get(this.state.image)}
            />
        } else {
            console.log("Image is undefined: " + this.state.image)
            image = null
        }
        return image
    }

}

////////////////////
// Prop Validation
///////////////////
Images.propTypes = {
    image: PropTypes.string,
}

//////////////////////
// Component Styling
/////////////////////
const styles = StyleSheet.create({
    logo: {
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: "100%",
    },
});
