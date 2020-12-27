const express = require("express");
const app = express();
const port = 3000;
require('./database.js');
const LevelDB = require('./models/level.js')

var playCreatedLevel = false
var customLevelData = 0

app.listen(port,()=>{
    console.log(`server in 192.168.0.4:${port}`)
})


app.set('view engine', 'ejs');
app.set('views', __dirname + "/views" )

app.use(express.urlencoded({extended:true}));
app.use("/", express.static(__dirname + "/public"))

app.get("/", (req,res)=>{
    
    if(playCreatedLevel == true){
        res.render('game', {level:'custom', levelData: JSON.stringify(customLevelData)})
    }else{
        res.render('game', {level:'default', levelData: JSON.stringify(customLevelData)})
        //res.redirect('/levellist')
    }

    playCreatedLevel = false
    customLevelData = 0
})

app.get("/levelList", async (req,res)=>{
    let getLevels = await LevelDB.find( (err, allLevels) => {
        if (err){
            console.log(err)
            res.send(err)
        }else{
            res.render('levelSelect', {allLevels})
        }
    })
})

app.post("/addLevel", async (req, res) => {

    let levelToSave = new LevelDB(req.body)
    await levelToSave.save()

    res.redirect('/')
})

app.get("/createlevel", (req,res)=>{
    res.render('levelCreator')
})

app.post('/play', (req,res) => {
    let level = req.body.levelData
    playCreatedLevel = true
   
    customLevelData = []
    
    let data = level
    let filter1 = data.split(',')
    let filter2 = filter1.forEach(elem => {
        let newElem = elem.replace('[', '').replace(']', '').replace('"', '').replace('"', '')
        customLevelData.push(parseInt(newElem))
    })
    
    res.redirect('/')
})