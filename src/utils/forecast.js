const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8203181e5906371b52dd16446feea1f7&query=' + latitude + ' , ' + longitude + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
                callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
                callback('Ops, Unable to find location', undefined)
        }else {
            callback(undefined,"It is now " +  body.current.weather_descriptions +", currently " +  body.current.temperature  + " out. It feels like "  + body.current.feelslike + " degress out. "
            +'Latitude: '+ latitude + ', Longitude: ' + longitude + '. The local time is: '+ body.location.localtime);


        }
    })
}

module.exports = forecast