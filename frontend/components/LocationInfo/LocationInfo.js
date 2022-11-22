import * as Location from 'expo-location'
import { Linking, Text, View } from "react-native"
import { useState, useEffect } from "react"


const LocationInfo = () => {
    
    const [status, requestPermission] = Location.useForegroundPermissions()
    const [location, setLocation] = useState()
    const [weatherData, setWeatherData] = useState()

    // checking location permissions - if granted - get current position
    useEffect(() => {

        const getLocation = async () => {

            if (status?.granted === false && status?.canAskAgain !== false) {
                await requestPermission()
            } else if (status?.granted === true) {
                const loc = await Location.getCurrentPositionAsync()
                setLocation(loc)
            } else if (status != null) { 
                Linking.openSettings()
            }
        }

        getLocation();

        //fetching data from API
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${api_key}&units=metric`)
        .then(res => res.json())
            .then(body => { 
            console.log("WEATHER API: ", body)
            console.log("WEATHER; main temp: ", body.main.temp,"MAX", body.main.temp_max,"MIN", body.main.temp_min,"sunrise", body.sys.sunrise)
            setWeatherData(body.main.temp)
            })
        
        
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q={Malmö}&limit=1&appid=${api_key}`)
        .then(res => res.json())
        .then(body => { 
            console.log("GEOLOCATE body", body)
            console.log(body[0].name);
            console.log("LATITUDE", body[0].lat, "LONGITUDE", body[0].lon);
        })


    }, [status])

    if (status === null) {
        console.log("nullvärde på status")
        return <View />
    }


    return (
        <View>
            <Text>Lat: {location?.coords.latitude}, Long: {location?.coords.longitude}</Text>
            <Text>Main temp: {weatherData}C</Text>
        </View>
    )

}

export default LocationInfo;