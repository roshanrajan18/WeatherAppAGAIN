const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// Define paths for config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsDirectoryPath)
const app = express()

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (request, response) => {
    response.render('index', {
        title:'Weather app',
        name:'Roshan Rajan'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title:'About Page',
        name:'Roshan Rajan'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title:'Help Page',
        name:'Roshan Rajan',
        helpText: 'This is some help text'
    })
})

app.get('/weather', (request, response) => {
    if (!request.query.address) {
        return response.send({error: 'Address must be provided'})
    }
    findWeather(request.query.address, (data) => response.send(data))
})

const findWeather = (address, callback) => {
    geoCode(address, (errors, data) => {
        console.log(errors)
        if (errors) {
            return callback({errors})
        }
        const location = data.placeName
            forecast(data, (errors, data) => {
                if (errors) {
                    return callback(errors)
                }
                return callback(
                    { location,
                      forecast: data.forecast,
                      address
                    })
            })
    })
}

app.get('/help/*', (request, response) => {
    response.render('404', {
        title:'Help Page Not Found',
        name:'Roshan Rajan',
        errorMsg: 'Could not find the requested Help Page Article'
    })
})

app.get('/*', (request, response) => {
    response.render('404', {
        title:'Page Not Found',
        name:'Roshan Rajan',
        errorMsg: 'Could not find the requested Page'
    })
})



app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})