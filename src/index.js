import React from "react";
import ReactDOM from "react-dom";
import "leaflet/dist/leaflet.css";
import Map from "./Map";
import "./styles.css";

const data = {
    devices: [
        {id: 1, location: [394, 684], type: 'CHEM', message: 'CHEM MARKER'},
        {id: 2, location: [500, 560], type: 'BIO', message: 'BIO MARKER'},
        {id: 3, location: [600, 560], type: 'RAD', message: 'RAD MARKER'},
    ]
};

function App() {
    return <Map data={data}/>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
