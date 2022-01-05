import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import AddPlayer from './pages/AddPlayers'
import Main from './pages/main'
import NumLearners from './pages/numLearners'


const Stack = createStackNavigator();


const Routes = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Multi-Learner Questions" component={title} /> */}
            <Stack.Screen name="HowManyLearners" component={NumLearners} />
            <Stack.Screen name="AddPlayers" component={AddPlayer} />
            <Stack.Screen name="LearnerRecord" component={Main} />
        </Stack.Navigator>
    )
}


export default Routes