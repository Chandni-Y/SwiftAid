"use client"

import mapboxgl from "mapbox-gl"
import { useEffect, useState } from "react"

mapboxgl.accessToken="pk.eyJ1IjoiYWRhcnNoMjkwNCIsImEiOiJjbW1tM25obzYyMDUwMm9zOGl2eHZicDViIn0.e6FMW8TniILZqcKN-w8U6g"

export default function MapView({ emergencyType="medical", incidentSubtype="" }){

const [eta,setEta]=useState(null)

useEffect(()=>{

const map=new mapboxgl.Map({
container:"map",
style:"mapbox://styles/mapbox/satellite-streets-v12",
center:[75.8577,22.7196],
zoom:12
})

map.doubleClickZoom.disable()
map.getCanvas().style.cursor="crosshair"

let routeCounter=0

const incidents={}
const signalMarkers=[]
const activeVehicles={}

async function safeFetch(url){

try{
const res=await fetch(url)
if(!res.ok){
console.error("API error:",res.status)
return null
}
return await res.json()
}catch(err){
console.error("Fetch failed:",err)
return null
}

}




async function loadSignals(){

const signals=await safeFetch("http://127.0.0.1:8000/signals")

if(!signals) return

signals.forEach(signal=>{

const el=document.createElement("div")

el.style.width="14px"
el.style.height="14px"
el.style.borderRadius="50%"
el.style.background="red"
el.style.border="2px solid white"

const marker=new mapboxgl.Marker(el)
.setLngLat([signal.lon,signal.lat])
.addTo(map)

const signalObj={
marker:marker,
forced:false,
state:"red"
}

signalMarkers.push(signalObj)



})

}

loadSignals()

setInterval(async ()=>{

try{

const res=await fetch("http://127.0.0.1:8000/signal-status")
const states=await res.json()

states.forEach(sig=>{

const marker=signalMarkers[sig.id]?.marker

if(!marker) return

const el=marker.getElement()

if(sig.state==="red") el.style.background="red"
if(sig.state==="green") el.style.background="green"
if(sig.state==="yellow") el.style.background="yellow"

})

}catch(err){
console.error("Signal update error",err)
}

},2000)

function cleanupIncident(id){

const inc=incidents[id]

if(!inc) return

if(!map || !map.getStyle) return

if(inc.routes && Array.isArray(inc.routes)){

inc.routes.forEach(layer=>{

if(map.getLayer(layer)) map.removeLayer(layer)
if(map.getSource(layer)) map.removeSource(layer)

})

}

if(inc.vehicles){
Object.values(inc.vehicles).forEach(v=>{
if(v && v.remove) v.remove()
})
}
if(inc.hospital) inc.hospital.remove()
if(inc.accident) inc.accident.remove()

delete incidents[id]

}

map.on("click", async (e)=>{

const lat=e.lngLat.lat
const lon=e.lngLat.lng

const incidentId="incident_"+routeCounter

const accidentMarker=new mapboxgl.Marker({color:"black"})
.setLngLat([lon,lat])
.addTo(map)

const data=await safeFetch(
`http://127.0.0.1:8000/emergency-dispatch?lat=${lat}&lon=${lon}&type=${emergencyType}&subtype=${incidentSubtype}`
)

if(!data){
alert("Server error")
accidentMarker.remove()
return
}

if(data.error){
alert(data.error)
accidentMarker.remove()
return
}

/* ETA */

if(data.routes && data.routes.length>0){

const seconds=data.routes[0].eta
const m=Math.floor(seconds/60)
const s=Math.floor(seconds%60)

setEta(`${m}m ${s}s`)

}

/* SIGNAL PREEMPTION */

if(data.routes && data.routes.length>0){

const signalPlan=data.routes[0].signals


}

/* DRAW ROUTES */

const routeLayers=[]

data.vehicles.forEach((vdata,i)=>{

const r=vdata.route

const coords=r.route.map(p=>[p.lon,p.lat])

const routeId="route_"+routeCounter+"_"+i

/* REMOVE OLD ROUTE IF EXISTS */

if(map.getLayer(routeId)){
map.removeLayer(routeId)
}

if(map.getSource(routeId)){
map.removeSource(routeId)
}

/* ADD ROUTE */

map.addSource(routeId,{
type:"geojson",
data:{
type:"Feature",
geometry:{
type:"LineString",
coordinates:coords
}
}
})

map.addLayer({
id:routeId,
type:"line",
source:routeId,
paint:{
"line-color": i===0 ? "#ff0000" : "#888888",
"line-width": i===0 ? 7 : 4,
"line-opacity": i===0 ? 1 : 0.7,
"line-dasharray": i===0 ? [1,0] : [2,2]
}
})

routeLayers.push(routeId)

})

/* ROUTES */

let routeStage=1

let routeToAccident=[]
let routeToHospital=[]

/* NEW BACKEND FORMAT */

if(data.route_to_accident?.route){
routeToAccident=data.route_to_accident.route.map(p=>[p.lon,p.lat])
}

if(data.route_to_hospital?.route){
routeToHospital=data.route_to_hospital.route.map(p=>[p.lon,p.lat])
}

/* FALLBACK OLD FORMAT */

if(routeToAccident.length===0 && data.routes && data.routes.length>0){
routeToAccident=data.routes[0].route.map(p=>[p.lon,p.lat])
}

if(routeToHospital.length===0 && data.routes && data.routes.length>1){
routeToHospital=data.routes[1].route.map(p=>[p.lon,p.lat])
}

/* DRAW HOSPITAL ROUTE */

if(routeToHospital.length>0){

const hospitalRouteId="hospital_route_"+routeCounter

map.addSource(hospitalRouteId,{
type:"geojson",
data:{
type:"Feature",
geometry:{
type:"LineString",
coordinates:routeToHospital
}
}
})

map.addLayer({
id:hospitalRouteId,
type:"line",
source:hospitalRouteId,
paint:{
"line-color":"#00ff00",
"line-width":6,
"line-opacity":0.9
}
})

routeLayers.push(hospitalRouteId)

}

if(routeToAccident.length===0){
console.error("No accident route",data)
return
}
let vehicleRoutes={}

data.vehicles.forEach(vdata=>{
vehicleRoutes[vdata.vehicle.id]=vdata.route.route.map(p=>[p.lon,p.lat])
})
let mainVehicleId=data.vehicles[0].vehicle.id

let routeCoords=[]

if(routeToAccident.length>0){
routeCoords=[...routeToAccident]
}else if(data.routes && data.routes.length>0){
routeCoords=data.routes[0].route.map(p=>[p.lon,p.lat])
}

let destination={lat:lat,lon:lon}

/* VEHICLE */

data.vehicles.forEach(vdata=>{

const vehicle=vdata.vehicle
const route=vdata.route.route.map(p=>[p.lon,p.lat])

const el=document.createElement("div")

if(vehicle.type==="ambulance") el.innerHTML="🚑"
if(vehicle.type==="fire_truck") el.innerHTML="🔥"
if(vehicle.type==="police") el.innerHTML="🚓"

el.style.fontSize="22px"

if(route.length===0){
console.error("No valid route found",vdata)
return
}

const marker=new mapboxgl.Marker(el)
.setLngLat(route[0])
.addTo(map)

activeVehicles[vehicle.id]=marker
})

let hospitalMarker=null

if(data.hospital){

hospitalMarker=new mapboxgl.Marker({color:"green"})
.setLngLat([
data.hospital.lon,
data.hospital.lat
])
.addTo(map)

}

incidents[incidentId]={
vehicles:{...activeVehicles},
hospital:hospitalMarker,
accident:accidentMarker,
routes:routeLayers
}

let lastReroute=Date.now()
let i=0

function moveVehicle(){

if(!map || !map.getStyle) return

if(i<routeCoords.length){

if(activeVehicles[mainVehicleId]){
activeVehicles[mainVehicleId].setLngLat(routeCoords[i])
}

const remaining=routeCoords.length-i
const seconds=remaining*0.5

setEta(`${Math.floor(seconds/60)}m ${Math.floor(seconds%60)}s`)

const now=Date.now()

/* REROUTE ONLY WHILE GOING TO ACCIDENT */

if(routeStage === 1 && now-lastReroute > 5000){
lastReroute=now

const pos=routeCoords[i]

fetch(`http://127.0.0.1:8000/reroute?current_lat=${pos[1]}&current_lon=${pos[0]}&dest_lat=${destination.lat}&dest_lon=${destination.lon}`)
.then(res=>res.json())
.then(newRoute=>{

if(newRoute.route){

const updatedRoute=newRoute.route.map(p=>[p.lon,p.lat])

/* keep current progress */

routeCoords=updatedRoute

if(i>=routeCoords.length){
i=routeCoords.length-1
}

}

})

}

i++
setTimeout(moveVehicle,500)

}
else{

if(data.vehicles[0].vehicle.type==="ambulance" && routeStage===1 && routeToHospital.length>0){

routeStage=2

routeCoords=[...routeToHospital]

destination={
lat:data.hospital.lat,
lon:data.hospital.lon
}

i=0
moveVehicle()
return

}

data.vehicles.forEach(vdata=>{
fetch(
`http://127.0.0.1:8000/complete-incident?incident_id=${data.incident.id}&vehicle_id=${vdata.vehicle.id}`
)
})

data.vehicles.forEach(vdata=>{
delete activeVehicles[vdata.vehicle.id]
})

cleanupIncident(incidentId)

}

}

moveVehicle()

routeCounter++

})

return ()=>map.remove()

},[emergencyType])

return(

<div style={{height:"100vh",position:"relative"}}>

<div style={{
position:"absolute",
top:"10px",
left:"10px",
zIndex:1,
background:"white",
padding:"10px",
borderRadius:"8px",
boxShadow:"0 2px 10px rgba(0,0,0,0.2)"
}}>


<br/><br/>

<button
onClick={()=>{

const vehicles=Object.values(activeVehicles)

if(vehicles.length===0){
alert("No active vehicles")
return
}

vehicles.forEach(v=>{
if(v && v.getElement()){
v.getElement().style.transform="scale(1.5)"
}
})

}}
>
🚗 Show Active Vehicles
</button>

<div style={{marginTop:"5px",fontSize:"12px"}}>
Selected: <b>{emergencyType}</b>
</div>

<div style={{marginTop:"5px",fontSize:"14px"}}>
ETA: {eta ? eta : "--"}
</div>

</div>

<div id="map" style={{height:"100%"}}></div>

</div>

)

}