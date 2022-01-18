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
        return (
            <Image
                style={styles.logo}
                source={imagesMap.get(this.state.image)}
            />

        )
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
