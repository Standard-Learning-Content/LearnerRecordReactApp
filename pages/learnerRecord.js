/**
 * Selects how many user are learnering 
 */
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native';
import Record from "../components/record";


export default class LearnerRecord extends React.Component {
    constructor(props) {
        super(props);

        this.getReportCard = this.getReportCard.bind(this)
    }

    getReportCard = () => {
        let results = []
        for (let key in this.props.route.params.player.learnerRecord) {
            let content = this.props.route.params.player.learnerRecord[key]
            let viewContent = <Record key={key} literalValue={content.literal} countsCorrect={content.countsCorrect} totalCounts={content.totalCounts}> </Record>
            results.push(viewContent)
        }
        return results
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {this.getReportCard()}
                </ScrollView>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
});