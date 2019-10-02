const request = require('request')

const forecast = (latitude, longitude, callback)=> {
    const url = 'https://api.darksky.net/forecast/55537ec703daa15df2a0c94d73d9c5b0/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''

    request({url, json: true}, (error, {body})=>{
        if (error){
               callback('Unable to Connect to the weather Service!', undefined)
        } else if(body.error) {
               callback('Unable to fetch the Location', undefined)
        } else {
            
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' +body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain. The high today is '+body.daily.data[0].temperatureHigh+' and the low is '+body.daily.data[0].temperatureLow+' .')

        }
    })
}

module.exports = forecast