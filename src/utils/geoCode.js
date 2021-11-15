const request = require('request')

const geoCode = (Address = {}, callback) => {
    const geoLocationUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(Address) +".json?access_token=pk.eyJ1Ijoicm9zaGFucmFqYW4yMiIsImEiOiJjazVicm0yMTkxYWN2M2ZwbnR1ZHo3cmRqIn0.GRPyovyiUNAwAdb82iXszA&limit=1"

    request({url: geoLocationUrl, json:true}, (errors, {body}) => {
        if (errors) {
            callback('Unable to retrieve information from mapbox', undefined)
        } else if (body.features.length === 0) {
            callback('Entered Location not found ' + body.query[0], undefined)
        } else {
            const geoLocationData = body.features[0]
            const placeName = geoLocationData.place_name
            const longitude = geoLocationData.center[0]
            const lattitude = geoLocationData.center[1]
            callback(undefined, {
                placeName,
                longitude,
                lattitude
            })
        }
    })
}

module.exports = geoCode