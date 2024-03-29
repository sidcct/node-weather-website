const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Use static directory to serve
app.use(express.static(PublicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Siddharth Agrawal'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Siddharth Agrawal'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
       title: 'Help',
       name: 'Siddharth Agrawal',
     helpText: 'Get the help'
    })
})

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Siddharth'
//         },
//         {
//             name: 'Anshul'
//         }
//     ])

// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About the Page</h1>')

// })

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
        })

        
        })


    })
     // res.send({
    //     forecast: '30 Degrees',
    //     location: 'Noida',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddharth',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Siddharth',
        errorMessage: 'Page not found'
    })

})

app.listen(port, () => {
    console.log('Server is up on port ' +port+'.')
})