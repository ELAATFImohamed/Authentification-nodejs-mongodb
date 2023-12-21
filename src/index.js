const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const LogInCollection = require("./mongodb")

//pour servir les fichier de css et de views 
const tempelatePath = path.join(__dirname, '../view')

const publicPath = path.join(__dirname, '../public')
console.log(publicPath);



app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

app.use(express.urlencoded({ extended: false }))

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})



app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.email })

        if (check.password === req.body.password) {
            console.log("Connexion réussie !");
        }

        else {
            console.log("problem de mdp !");
            res.send("incorrect password")
        }

    } 
    
    catch (e) {
        console.log("PROBLEME !!!!");//pour tester
        res.send("PROBLEME !!!!")
    }
    console.log("Redirection vers /users...");// pour tester 
    res.redirect('/users')
})

app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.email,
        password: req.body.password
    }

    await LogInCollection.insertMany([data])
    res.render("login")
})

//il faut authentifier pour deriger ver la page users
const estReussit = (req, res, next) => {
    if (req.session && req.session.user) {
        // L'utilisateur est authentifié alors  continuer vers la route suivante
        return next();
    } else {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        res.redirect('/login');
    }
};
//securiser la page users 
app.get('/users', estReussit, async (req, res) => {     
        res.render('users');    
});

app.post('/users', async (req, res) => {
    try {
        // recuperer les donnees
        const users = await LogInCollection.find({});
        console.log(users);//test 
        res.render('users', { users: users });
    } catch (error) {
        res.send('Erreur lors de la récupération des utilisateurs.');
    }
});

app.listen(3000, () => {
    console.log('port connected');
})