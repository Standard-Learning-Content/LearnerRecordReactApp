
let GameLevel = class {
    constructor(levelId, correctPoints, levels, requiredPoints) {
        this._levelId = levelId
        this._correctPoints = correctPoints
        this._levels = levels
        this._requiredPoints = requiredPoints
    }

    get levelId() {
        return this._levelId
    }

    get correctPoints() {
        return this._correctPoints
    }

    get levels() {
        return this._levels
    }

    get requiredPoints() {
        return this._requiredPoints
    }

    setCorrectPoints(score, prevScore) {
        let tempScore
        if (score >= 5) {
            tempScore = 3
        } else if (score == 4 || score == 3) {
            tempScore = 2
        } else if (score == 2 || score == 1) {
            tempScore = 1
        } else {
            tempScore = 0
        }
        if (tempScore >= prevScore) {
            this._correctPoints = tempScore
        } else {
            this._correctPoints = prevScore
        }
        return this._correctPoints
    }

    toString() {
        return "level " + this._levelID
    }
}


export default GameLevel