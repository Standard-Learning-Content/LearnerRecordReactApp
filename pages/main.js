import React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { Header } from 'react-native-elements';

// import { Header } from 'react-native-header';
import Levels from "../components/levels";


export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.learnerRecord

        this.state = {
            "learnerRecord": [],
            "currentLevelContent": [],
            "currentLevelIndex": 0,
        }
        this.loadLearnerRecord = this.loadLearnerRecord.bind(this)
    }


    componentDidMount() {
        this.loadLearnerRecord()
    }

    loadLearnerRecord = () => {
        let data = { "userID": "12NSNF_2IEHJFUEHA_21345SDG" } // Testing Purposes
        fetch("http://3.132.12.204:4000/readFromLearnerRecord", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Method': 'POST,GET'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                let contentArray = []
                for (let standardContent of data) {
                    contentArray.push(standardContent.StandardContent.value)
                }
                this.setState(
                    {
                        "learnerRecord": contentArray,
                    }
                )
            }).catch((error) => {
                console.log(error)
            });
    }



    render() {

        return (
            <View >
                <Header
                    centerComponent={{ text: 'Learner Record', style: { color: '#fff' } }}
                />

                <View style={styles.container}>
                    <Levels></Levels>
                </View>


            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 20,
        flexDirection: "column"
    },
});