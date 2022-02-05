'use strict'
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch";

window.addEventListener('click',()=>{
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
        provider: provider,
    });

    const map = new L.Map('mapid');
    map.addControl(searchControl);
    document.querySelector('#blog-link').addEventListener('click',(event)=>{
        event.preventDefault();
        if(window.localStorage.getItem('samvel_directory_user_token')){
            window.location.href = "/views/blog.html";
        }
        else{
            window.location.href = "/views/login.html";
        }
    });
});

