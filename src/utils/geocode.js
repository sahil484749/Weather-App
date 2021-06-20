const request = require('request')

const geocode =(address,callback)=>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWdlbnQ0ODQ3NDkiLCJhIjoiY2twbDd2dWRzMDhmbTJ2bzFiYWwwOTF3ZSJ9.InfN3xGBVNYCLSIZ0UKGdQ&limit=1'
    request({url: geoCodeUrl, json:true},(error,{body})=>{
         if(error){
             callback('Unable to Connect to location service!!')
         }else if( body.features.length>0){ //response.statusCode===200 &&
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    placeName: body.features[0].place_name
                })
         }  else{
             callback('Unable to find location')
         }
    })
    
}

module.exports = geocode