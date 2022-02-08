import { getDatabase, ref, set } from "firebase/database";



export function startLearningSession(phoneID, sessionID, players) {
    // console.log(phoneID)
    // console.log(sessionID)
    // console.log(players)
    const db = getDatabase();
    set(ref(db, phoneID + "/" + sessionID), {
        players: players,
    });
}


