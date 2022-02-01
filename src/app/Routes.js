/**
 * Creates Routes for all the MLQ Pages. 
 * 
 * @CaseyRock
 */

import React from "react"
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import AddPlayer from "./pages/AddPlayers"
import Main from "./pages/main"
import NumLearners from "./pages/numLearners"
import LearnerRecord from "./pages/learnerRecord";
import Level from "./pages/level";
import LevelComplete from "./pages/levelComplete";
import Title from "./pages/title"
import Instructions from "./pages/instructions"


const Stack = createStackNavigator();


const Routes = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Title" component={Title} options={{ headerShown: false }} />
            <Stack.Screen name="instructions" component={Instructions} options={{
                title: "How To Play",
                headerStyle: {
                    backgroundColor: "#84ff9f",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }} />
            <Stack.Screen name="HowManyLearners" component={NumLearners} options={{
                title: "How Many Learners",
                headerStyle: {
                    backgroundColor: "#84ff9f",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }} />
            <Stack.Screen name="AddPlayers" component={AddPlayer} options={{
                title: "Add Players",
                headerStyle: {
                    backgroundColor: "#84ff9f",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }} />
            <Stack.Screen name="Map" component={Main} options={{
                title: "Select a Level",
                headerStyle: {
                    backgroundColor: "#84ff9f",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }} />
            <Stack.Screen name="Learn" component={Level} options={{ headerShown: false }} />
            <Stack.Screen name="levelComplete" component={LevelComplete} options={{ headerShown: false }} />
            <Stack.Screen name="LearnerRecord" component={LearnerRecord} options={{ title: "Report Card" }} />
        </Stack.Navigator>
    )
}


export default Routes