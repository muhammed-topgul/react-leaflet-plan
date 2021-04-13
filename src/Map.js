import React, {useEffect, useRef} from "react";
import {Map} from "react-leaflet";
import L, {CRS} from "leaflet";
import "leaflet/dist/leaflet.css";
import bio from './bio.png';
import rad from './rad.png';
import chem from './chem.png';

export default (props) => {
    const mapRef = useRef(null);
    const bounds = [[-26.5, -25], [900, 1000]];
    useEffect(() => {
        const map = mapRef.current.leafletElement;
        const image = L.imageOverlay(
            "https://freecadfloorplans.com/wp-content/uploads/2020/07/Residential-building-0707201-min.jpg",
            bounds
        ).addTo(map);
        map.fitBounds(image.getBounds());

        props.data.devices.forEach(device => {
            let message = device.message;
            L.marker(device.location, {
                customId: device.id,
                icon: generateMarker(device.type),
                draggable: true
            }).bindPopup(`<b>Message</b><br>${message}`)
                .on('dragend', function (event) {
                    console.log("Id: ", event.target.options.customId);
                    console.log("LatLong: ", event.target._latlng);
                }).addTo(map);
        });
    }, []);

    const generateMarker = (type) => {
        return L.icon({
            iconUrl: iconType(type),
            iconSize: [29, 29],
            iconAnchor: [29, 29],
            popupAnchor: [-3, -76]
        });
    }

    const iconType = (type) => {
        if (type === 'CHEM') {
            return chem;
        } else if (type === 'RAD') {
            return rad;
        } else {
            return bio;
        }
    }

    return (
        <>
            <Map
                ref={mapRef}
                zoom={1}
                minZoom={0}
                maxZoom={2}
                crs={CRS.Simple}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                boundsOptions={{padding: [50, 50]}}
                style={{height: "100vh", backgroundColor: 'black'}}/>
        </>
    );
};
