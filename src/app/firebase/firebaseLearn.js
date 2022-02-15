import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebaseApp'

initializeApp(firebaseConfig);
const db = getDatabase();


export function startLearningSession(phoneID, sessionID, players) {
    // console.log(phoneID)
    // console.log(sessionID)
    // console.log(players)

    // set(ref(db, phoneID + "/" + sessionID), {
    //     players: players,
    // });
}


