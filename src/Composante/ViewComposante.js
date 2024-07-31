import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewComposante() {

    const[composante, setComposante]= useState({
        name:"",
        description:"",     
    });

    const {id}=useParams();

    useEffect(()=>{

        loadComposante()

    },[])

    const loadComposante=async ()=>{
        const result=await axios.get(`http://localhost:8080/composante/${id}`)
        setComposante(result.data)
    }

    return (
        
<       div className="Container">
            <div className="row">
                <div className="offset border rounded p-5  pt-4 m-5  shadow">
                      <h2 className="text-center m-4 ">Détails du Composant</h2>
        <div className="card">
            <div className="card-header">
                details du Composant id: {composante.id}

                <ul className="list-group list-group-flush">

                    <li className="list-groupe-item">
                        <b>name:</b>
                        {composante.name}
                    </li>
                    <li className="list-groupe-item">
                        <b>description:</b>
                        {composante.description}
                    </li>
                    <li className="list-groupe-item">
                        <b>statut:</b>
                        {composante.statut}
                    </li>

                </ul>
            </div>
        </div>
        <Link className="btn btn-primary my-2" to={"/composante"}>Back</Link>
        </div>
        </div>
        </div>
    )
}


