const request = require('request')
const forecast = (data, callback) => {
    const weatherUrl = "http://api.weatherstack.com/current?access_key=dea9c94752df6dfea950b20de0b9ea12&query=" +data.lattitude+','+data.longitude

    request({url: weatherUrl, json:true}, (errors, {body}) => {
        if (errors) {
            callback('Unable to retrieve information from weatherStack', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const weather = body.current
            const temp = weather.temperature
            const feelsLike = weather.feelslike
            const weatherDescription = weather.weather_descriptions[0]
            const forecast = weatherDescription + ".It is currently " + temp + " ,but feels like " + feelsLike
            callback(undefined, {forecast})
        }
    })
}

module.exports = forecast