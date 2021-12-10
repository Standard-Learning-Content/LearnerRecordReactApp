import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import AddPlayer from './pages/AddPlayers'
import Main from './pages/main'
import NumLearners from './pages/numLearners'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="numLearners" component={NumLearners} title="How Many Learners" initial={true} />
            <Scene key="addPlayers" component={AddPlayer} title="Add Players" />
            <Scene key="main" component={Main} title="Learner Record" />
        </Scene>
    </Router>
)
export default Routes