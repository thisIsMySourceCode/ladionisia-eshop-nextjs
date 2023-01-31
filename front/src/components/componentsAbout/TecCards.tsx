
export default function TecCards({name, icon, documentation}){
  return( 
    <div>
      <a href={documentation} target="_blank" >
        <h4>{name}</h4>
        <img src= {icon} alt="img not found" width="64px" height="64px"/>
      </a>
    </div>
      
  )
}