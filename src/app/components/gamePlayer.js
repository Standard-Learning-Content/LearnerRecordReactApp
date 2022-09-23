import config from "../config.json"
import AsyncStorage from "@react-native-async-storage/async-storage";
import all_levels from "../levels/levels.json"
import GameLevel from "./gameLevel"
import * as Crypto from "expo-crypto";

let GamePlayer = class {
    constructor(name) {
        this._name = name
        this._levelIndex = 0
        this._id = ""
        this._learnerRecord = ""
        this._questions = ""

    }


    ////////////
    // Getters
    ///////////
    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get learnerRecord() {
        return this._learnerRecord
    }

    get levelIndex() {
        return this._levelIndex
    }

    get questions() {
        return this._questions
    }


    getQuestionSetByID(levelId) {
        return this._questions[levelId]
    }

    async getPlayerLocalStorage() {
        const PlayLocalStorage = await AsyncStorage.getItem(this._id)
        const jsonPlayerStorage = PlayLocalStorage != null ? JSON.parse(PlayLocalStorage) : null;
        return jsonPlayerStorage
    }
    //////////////
    // "Setter"
    /////////////

    // If the player get all the questions correct in a level, the will 
    // move to the next level
    async incrementQuesitonIndex(correctCount) {
        if (correctCount == 5) {
            this._levelIndex++
            const jsonValue = JSON.stringify({ "levelIndex": this._levelIndex })
            await AsyncStorage.setItem(this._id, jsonValue)
        }
    }

    setPlayerLevel(jsonPlayerStorage) {
        let playerLevels = []
        let setlevelIndexFromLR = false
        let levelIndexFromLR = 0
        for (let level in all_levels) {
            let levelID = Object.keys(all_levels[level])
            let questionArray = all_levels[level][levelID[0]]
            let gameLevel = new GameLevel(levelID[0], questionArray)
            if (!setlevelIndexFromLR && Object.keys(this._learnerRecord).length > 0) {
                for (let question of questionArray) {
                    if (this._learnerRecord[question.correctStandardContent].countsCorrect < 10) {
                        setlevelIndexFromLR = true
                        break;
                    }
                }
                levelIndexFromLR++
            }

            playerLevels.push(gameLevel)
        }
        this._questions = playerLevels

        if (jsonPlayerStorage != null) {
            if (levelIndexFromLR < jsonPlayerStorage.levelIndex) {
                this._levelIndex = jsonPlayerStorage.levelIndex
            } else {
                this._levelIndex = levelIndexFromLR
            }
        } else {
            this._levelIndex = levelIndexFromLR
        }


    }

    async setLearnerRecord(playerId) {
        let hashed_id = { "userID": playerId }
        const res = await fetch(`${config["api-location"]}/readFromLearnerRecord`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "POST,GET"
            },
            body: JSON.stringify(hashed_id)
        })

        if (!res.ok) {
            throw new Error("Request returned a non 200 response code")
        }

        const data = await res.json()
        this._learnerRecord = data
    }

    async setPlayerId(name) {
        const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            name
        );
        this._id = hash
    }

    updateLocalLearnerRecord(literal, standardLearnedContent, correct) {
        let learnerRecord = this._learnerRecord
        if (Object.keys(learnerRecord).length == 0 || learnerRecord[standardLearnedContent] == undefined) {
            if (correct) {
                Object.assign(learnerRecord,
                    {
                        [standardLearnedContent]: {
                            "countsCorrect": 1,
                            "literal": literal,
                            "totalCounts": 1,
                        }
                    })
            } else {
                Object.assign(learnerRecord,
                    {
                        [standardLearnedContent]: {
                            "countsCorrect": 0,
                            "literal": literal,
                            "totalCounts": 1,
                        }
                    })
            }

        } else {
            let indexedContent = learnerRecord[standardLearnedContent]
            if (correct) {
                indexedContent.countsCorrect = indexedContent.countsCorrect + 1
            }
            indexedContent.totalCounts = indexedContent.totalCounts + 1
        }

    }

    async updateGlobalLearnerRecord(userID, standardLearnedContent, correct) {
        let answerData = {
            userID: userID,
            standardLearnedContent: standardLearnedContent.replace("<", "").replace(">", ""),
            correct: correct,
            timestamp: Date.now()
        }

        const res = await fetch("http://3.132.12.204:4000/writeToLearnerRecord", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(answerData)
        })

        if (!res.ok) {
            throw new Error("Request returned af non 200 response code")
        }

        const data = await res.text()
        if (config["debug-mode"]) console.log(data)
    }

    // async updateTotalPoints(addedPoints, levelCorrectPoints, currentLevelCorrectPoints, levelID) {
    //     if (levelCorrectPoints == 0) {
    //         if (addedPoints >= 5) {
    //             this._totalPoint += 3
    //         } else if (addedPoints == 4 || addedPoints == 3) {
    //             this._totalPoint += 2
    //         } else if (addedPoints == 2 || addedPoints == 1) {
    //             this._totalPoint += 1
    //         } else {
    //             this._totalPoint += 0
    //         }
    //     } else if (levelCorrectPoints == 1) {
    //         if (addedPoints >= 5) {
    //             this._totalPoint += 2
    //         } else if (addedPoints == 4 || addedPoints == 3 && levelCorrectPoints < 2) {
    //             this._totalPoint += 1
    //         } else if (addedPoints == 2 || addedPoints == 1) {
    //             this._totalPoint += 0
    //         } else {
    //             this._totalPoint += 0
    //         }
    //     } else if (levelCorrectPoints == 2) {
    //         if (addedPoints >= 5) {
    //             this._totalPoint += 1
    //         } else if (addedPoints == 4 || addedPoints == 3) {
    //             this._totalPoint += 0
    //         } else if (addedPoints == 2 || addedPoints == 1) {
    //             this._totalPoint += 0
    //         } else {
    //             this._totalPoint += 0
    //         }
    //     }

    //     let value = {
    //         "totalPoint": this._totalPoint,
    //         "levelPoint": {
    //             [levelID]: currentLevelCorrectPoints,
    //         }
    //     }

    //     const jsonValue = JSON.stringify(value)
    //     await AsyncStorage.setItem(this._id, jsonValue)
    //     return this._totalPoint

    // }

    toString() {
        return "Name: " + this._name + ", ID: " + this._id + ", Points: " + this._totalPoint
    }
}


export default GamePlayer