const fs = require('fs');
let db = JSON.parse(fs.readFileSync('./db/db.json'));
let current_ids = db.map(obj => obj.id);

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        res.json(db);
    });

    app.post('/api/notes', (req,res)=>{
        let data = req.body;
        data['id']=0;
       
        while (current_ids.includes(data['id'])){
            data['id']++;
        }
        db.push(data);
        fs.writeFile('./db/db.json', JSON.stringify(db), 'utf8', (err, data) =>{
            if (err) throw err;
        });
    });

    app.delete('/api/notes/:id', (req, res)=>{
        const id = req.params.id;
        
        db = JSON.parse(fs.readFileSync('./db/db.json'));
        db = db.filter(obj => obj.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(db), 'utf8', (err, data) =>{
            if (err) throw err;
        });
    })
}