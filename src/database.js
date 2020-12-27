const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://Arkanoid:majuky1992@arkanoidlevles.qafsq.mongodb.net/levelsDB?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then( db => console.log('connected'))
    .catch( err => console.log(err))