const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
//console.log(__filename)
//console.log( path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public',)
const viewPath = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')
hbs.registerPartials(pathPartials)


//Setup handlebars Engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kleber Peres'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kleber Peres'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kleber Peres',
        helpText: 'This is some helpfull text'
    })
})


app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, Location} = {} )  => {
        if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                   return res.send({ error })     
                }

                res.send({
                    forecast: forecastData,
                    Location,
                    address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term.'
        })
    }

    console.log(req.query.search)
    res.send({
      products: []  
    })
})

app.get('/array', (req, res) => {
    res.send([{
        name: 'Kleber',
    }, {
        name: 'Geice'
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Kleber Peres'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Kleber Peres'
    })
    
})

app.listen(port, () => {
    console.log('Server is up on port.' + port)
})
