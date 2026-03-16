"use client"

import { useState } from "react"
import MapView from "./MapView"

export default function PublicView(){

const [emergencyType,setEmergencyType] = useState("")
const [incidentSubtype,setIncidentSubtype] = useState("")

return(

<div style={{display:"flex",height:"100vh"}}>

<div style={{width:"300px",padding:"20px",background:"#f5f5f5"}}>

<button onClick={()=>{
setEmergencyType("medical")
setIncidentSubtype("")
}}>🚑 Medical</button>

<button onClick={()=>{
setEmergencyType("fire")
setIncidentSubtype("")
}}>🔥 Fire</button>

<button onClick={()=>{
setEmergencyType("crime")
setIncidentSubtype("")
}}>🚓 Police</button>

<br/><br/>

{emergencyType === "medical" && (
<div>
<h4>Medical Type</h4>
<button onClick={()=>setIncidentSubtype("accident")}>Accident</button>
<button onClick={()=>setIncidentSubtype("fight")}>Fight</button>
<button onClick={()=>setIncidentSubtype("natural")}>Natural Cause</button>
</div>
)}

{emergencyType === "fire" && (
<div>
<h4>Fire Type</h4>
<button onClick={()=>setIncidentSubtype("electrical")}>Electrical Fire</button>
<button onClick={()=>setIncidentSubtype("cylinder")}>Cylinder Blast</button>
<button onClick={()=>setIncidentSubtype("unknown")}>Unknown Fire</button>
<button onClick={()=>setIncidentSubtype("people_trapped")}>People Trapped</button>
</div>
)}

{emergencyType === "crime" && (
<div>
<h4>Crime Type</h4>
<button onClick={()=>setIncidentSubtype("fight")}>Fight</button>
<button onClick={()=>setIncidentSubtype("robbery")}>Robbery</button>
<button onClick={()=>setIncidentSubtype("suspicious")}>Suspicious Activity</button>
</div>
)}

</div>

<div style={{flex:1}}>
<MapView 
emergencyType={emergencyType}
incidentSubtype={incidentSubtype}
/>
</div>

</div>

)

}