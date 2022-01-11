/**
 * Selects how many user are learnering 
 */
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native';
import Record from "../components/learnerRecordComponents/record";
import PropTypes from 'prop-types';


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

LearnerRecord.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#080F5B',
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
});
