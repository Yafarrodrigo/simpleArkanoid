const {Schema, model} = require('mongoose')

const levelSchema = new Schema({

    levelName: {type: String, required: true},
    levelAuthor: {type: String, required: true},
    levelDifficulty: {type: String, required: true},
    levelData: {type: String, required: true}

})

module.exports = model('LevelDB', levelSchema)