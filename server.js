const express = require('express')
const Database = require('better-sqlite3')
const app = express()
const db = new Database('users.db')
const bcrypt = require('bcrypt')
const session = require('express-session')


db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        password text not null
    )
`)

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.post('/signup', async (req, res) => {
    const { Uname, Email, pwd } = req.body
    try{
    const hashedPassword = await bcrypt.hash(pwd, 10)
    const insert = db.prepare('Insert into users (username, email, password) VALUES (?,?,?)')
   insert.run(Uname, Email, hashedPassword)
   res.send('User saved!')
   } catch(error){
     if (error.message.includes('UNIQUE constrain failed!')){
        res.send('Username already exists!')
     }
   }
  
})

app.post('/login', async (req, res) => {
    const { Uname, pass } = req.body
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(Uname)

    if (!user) {
        return res.send('User not found!')
    }

    const match = await bcrypt.compare(pass, user.password)
    if(match){
        req.session.user = user.username
        res.redirect('/home')
    }else{
        res.send('Wrong password!')
    }

})

function requireLogin(req, res, next){            //middleware
    if(req.session.user){     
        next()
    }else{
        res.redirect('/login.html')
    }
}

app.get('/home' ,requireLogin, (req, res) =>{
    res.sendFile(__dirname + '/public/home.html')
})

app.get('/logout' , (req, res) => {
    req.session.destroy()
    res.redirect('/login.html')
})

app.listen(3000, () => {
    console.log('Server running  on http://localhost:3000')
})