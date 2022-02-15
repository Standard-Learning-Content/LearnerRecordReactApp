import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebaseApp'

initializeApp(firebaseConfig);
const db = getDatabase();
let mainSessionID


export function startLearningSession(phoneID, sessionID, players) {
    mainSessionID = sessionID
    let phone = "Phone_" + phoneID
    let session = "Session_" + sessionID
    set(ref(db, phone + "/" + session), {
        numPlayers: players,
    })
}


export function recordAnswer(phoneID, playerID, levelId, results) {
    let phone = "Phone_" + phoneID
    let session = "Session_" + mainSessionID
    let level = "Level_" + levelId + "_" + Date.now()
    set(ref(db, phone + "/" + session + "/" + "Player_" + playerID + "/" + level), {
        levelID: levelId,
        results: results
    });
}



