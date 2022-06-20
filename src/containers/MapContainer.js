import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript,Marker  } from '@react-google-maps/api';
// import { PathUrl, Token } from '../config/Config';

function MapContainer(props) {
    // const url = PathUrl().url;
    // const token = Token().token;
    const [locationONMap, setLocationONMap] = useState([])
    useEffect(() => {
        setLocationONMap(props.locations)
        console.log(props.location,"driver location")
    }, [])
    
    const mapStyles = {
        height: "60vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 51.509865, lng: -0.118092
    }
    return (
        <>
            <LoadScript
                googleMapsApiKey='AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok'>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}>
                    {
                       
                        // locationONMap.map(item => {
                        //     return (
                        //         <Marker key={item.full_name} position={item.location} />
                        //     )
                        // })
                    }
                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default MapContainer