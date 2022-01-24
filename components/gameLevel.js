
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

    setCorrectPoints(score) {
        if (score >= 5) {
            this._correctPoints = 3
        } else if (score == 4 || score == 3) {
            this._correctPoints = 2
        } else if (score == 2 || score == 1) {
            this._correctPoints = 1
        } else {
            this._correctPoints = 0
        }
    }

    toString() {
        return "level " + this._levelID
    }
}


export default GameLevel