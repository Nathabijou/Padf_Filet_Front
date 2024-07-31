import React from "react";
import { Link } from 'react-router-dom'

const DropdownProfiles =()=>{
    return(
        <div className="flex flex-col dropDownProfile">
            <ul className="flex flex -col gap-4">
                <li><Link to="/App">Profils</Link></li>
                <li><Link to="/App">Settings</Link></li>
                <li><Link to="/">Log-Out</Link></li>
                
                
            </ul>
        </div>
    )
}
 export  default DropdownProfiles