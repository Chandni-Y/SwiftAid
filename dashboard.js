import MapView from "../components/MapView"

export default function Dashboard(){

return(

<div style={{display:"flex"}}>

<div style={{
width:"300px",
padding:"20px",
background:"#111",
color:"white",
height:"100vh"
}}>

<h2>Dispatch Control</h2>

<p>Active Ambulance: A1</p>
<p>Status: En Route</p>
<p>Hospital: City Hospital</p>
<p>ETA: 6 minutes</p>

<hr/>

<h3>Signals on Route</h3>

<ul id="signals"></ul>

</div>

<div style={{flex:1}}>
<MapView/>
</div>

</div>

)

}