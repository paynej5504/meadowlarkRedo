/*
Author: Jeris Payne
Date: 9/2/2020
Purpose: JavaScript week 3 assignment - working with Express
*/

const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

app.use(express.static(__dirname + '/public'))

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars ({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  /*const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })*/
  res.render('about', { fortune: fortune.getFortune() } )
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log (
    `Express started on http://localhost:${port};` +
    `press Ctrl-C to terminate.`
))


const fortunes = [
  "Some things have to be believed to be seen.",
  "Calm yourself, the storm will pass.",
  "An important person will offer you support.",
  "Believe in yourself and others will too.",
  "Happiness begins when you face life with a smile.",
]
