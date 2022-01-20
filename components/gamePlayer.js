
let GamePlayer = class {
    constructor(id, name, learnerRecord, quentions) {
        this._questionIndex = 0
        this._id = id
        this._name = name
        this._learnerRecord = learnerRecord
        this._questions = quentions


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


    toString() {
        return "Name: " + this.name + ", ID: " + this.id
    }
}


export default GamePlayer