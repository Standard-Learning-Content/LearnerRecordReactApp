
let GameLevel = class {
    //(levelId, correctPoints, levels, requiredPoints)
    constructor(levelId, levels) {
        this._levelId = levelId
        this._levels = levels
    }

    get levelId() {
        return this._levelId
    }


    get levels() {
        return this._levels
    }


    toString() {
        return "level " + this._levelID
    }
}


export default GameLevel