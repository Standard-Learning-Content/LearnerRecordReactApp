import React from "react"
import { View, Image, StyleSheet } from 'react-native';


export const imagesMap = new Map([
    ["can", require('../../assets/images/can.jpeg')],
    ["cap", require('../../assets/images/cap.jpeg')],
    ["cat", require('../../assets/images/cat.jpeg')],
    ["map", require('../../assets/images/map.jpeg')],
    ["mat", require('../../assets/images/mat.jpeg')],
    ["nap", require('../../assets/images/nap.jpeg')],
    ["pan", require('../../assets/images/pan.jpeg')],
    ["pat", require('../../assets/images/pat.jpeg')],
    ["tan", require('../../assets/images/tan.jpeg')],
    ["tap", require('../../assets/images/tap.jpeg')],
])

export default class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: ""
        }

    }

    static getDerivedStateFromProps(props, state) {
        let newState = {
            image: props.image
        }

        return newState
    }



    render() {
        return (
            <Image
                style={styles.tinyLogo}
                source={imagesMap.get(this.state.image)}
            />

        )
    }

}

const styles = StyleSheet.create({
    tinyLogo: {
        flex: 1,
        // width: "%",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: "100%",
    },
});
