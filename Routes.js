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
import LevelComplete from './pages/levelComplete';


const Stack = createStackNavigator();


const Routes = () => {
    return (
        <Stack.Navigator >
            {/* <Stack.Screen name="Multi-Learner Questions" component={title} /> */}
            <Stack.Screen name="HowManyLearners" component={NumLearners} options={{
                title: 'How Many Learners', headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <Stack.Screen name="AddPlayers" component={AddPlayer} options={{ title: 'Add Players' }} />
            <Stack.Screen name="Map" component={Main} options={{ title: 'Select a Level' }} />
            <Stack.Screen name="Learn" component={Level} options={{
                title: 'Answer The Questions',
                "headerLeft": null
            }} />
            <Stack.Screen name="levelComplete" component={LevelComplete} options={{ title: 'Level Complete', "headerLeft": null }} />
            <Stack.Screen name="LearnerRecord" component={LearnerRecord} options={{ title: 'Report Card' }} />
        </Stack.Navigator>
    )
}


export default Routes