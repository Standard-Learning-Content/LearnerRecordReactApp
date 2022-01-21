
let GamePlayer = class {
    constructor(id, name, learnerRecord, quentions) {
        this._questionIndex = 0
        this._id = id
        this._name = name
        this._learnerRecord = learnerRecord
        this._questions = quentions
        this._totalPoint = 0

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

    get questionIndex() {
        return this._questionIndex
    }

    get questions() {
        return this._questions
    }

    get totalPoint() {
        return this._totalPoint
    }

    getQuestionSetByID(levelId) {
        return this._questions[levelId]
    }

    //////////////
    // "Setter"
    /////////////
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

    updateTotalPoints(addedPoints) {
        this._totalPoint = this._totalPoint + addedPoints
    }

    toString() {
        return "Name: " + this._name + ", ID: " + this._id + ", Points: " + this._totalPoint
    }
}


export default GamePlayer