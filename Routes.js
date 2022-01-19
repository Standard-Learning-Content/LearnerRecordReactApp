/**
 * Creates Routes for all the MLQ Pages. 
 * 
 * @CaseyRock
 */

import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import AddPlayer from './pages/AddPlayers'
import Main from './pages/main'
import NumLearners from './pages/numLearners'
import LearnerRecord from './pages/learnerRecord';
import Level from './pages/level';


const Stack = createStackNavigator();


const Routes = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Multi-Learner Questions" component={title} /> */}
            <Stack.Screen name="HowManyLearners" component={NumLearners} />
            <Stack.Screen name="AddPlayers" component={AddPlayer} />
            <Stack.Screen name="Map" component={Main} />
            <Stack.Screen name="Learn" component={Level} />
            <Stack.Screen name="LearnerRecord" component={LearnerRecord} />
        </Stack.Navigator>
    )
}


export default Routes