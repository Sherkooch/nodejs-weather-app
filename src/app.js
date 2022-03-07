const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./forecast')
const geocode = require('./geocode')
const res = require('express/lib/response')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
app.use(express.static(publicDir))
hbs.registerPartials(partialsDir)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Sherkooch'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Sherkooch'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Sheri',
        name: 'Sherkooch'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You Fool have to enter an address.')
    }
    geocode(req.query.address, (error, { latitude, longitude, city_name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: req.query.address
            })

        })

    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        error: 'ریدی'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})