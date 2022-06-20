import React from 'react'
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

const containerStyle = {
    width: '100vh',
    height: '100vh'
};

const center = { lat:51.5073509, lng: -0.1277583 }

const paths = [
    // { lat: 51.789534, lng: 1.153035 },
    // { lat: 51.280233, lng: 1.0789088999999876 },
    // { lat: 	51.8786707, lng: -0.4200255000000652 },
    // { lat: 51.5073509, lng: 51.5073509 },
    // { lat: 42.467206, lng: -71.287421},
    // { lat: 51.809782, lng: -0.237674 },
    // { lat: 	51.734331, lng: 0.469089 },
    // { lat: 	51.278708, lng: 0.521725 }
    { 
        lat:  51.509865,
        lng:0.118092              
      },
      { 
        lat:51.895927,
        lng: 0.891874
      },
      { 
        lat:51.8786707,
        lng:-0.4200255
      },
      { 
        lat: 51.454266,
        lng: -0.978130
      },
      
      { 
        lat:51.2800275,
        lng: 1.0802533
      },
]

const options = {
    fillColor: "lightblue",
    fillOpacity: 0.2,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
}

const onLoad = polygon => {
    console.log("polygon: ", polygon);
}

function MyComponent() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok"
            region='UK'
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <>
                    <Polygon
                        onLoad={onLoad}
                        paths={paths}
                        options={options}
                    />
                </>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)