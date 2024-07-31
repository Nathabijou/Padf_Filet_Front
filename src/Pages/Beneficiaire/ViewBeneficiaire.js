import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useBaseUrl } from '../../BaseUrl';

export default function ViewPettitProjet() {
    const baseUrl= useBaseUrl();

    const [petitprojet, setPetitProjet]=useState({
        name:"",
        description:"",
        Rangdepriorisation:"",
        datedebut:"",
        datefin:"",
        nmbreFilledirect:"",
        nmbreGarcondirect:"",
        nmbreBeneficiaireIndirect:"",
        secteurdintervention:"",
        gps1:"",
        gps2:""
    });


    const {id}=useParams();

    useEffect(()=>{

        loadPetitProjet()

    },[])

    const loadPetitProjet=async ()=>{
        const result=await axios.get(`${baseUrl}/beneficiaire/${id}`)
        setPetitProjet(result.data)
    }

    return (
        
<       div className="Container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                      <h2 className="text-center m-4 ">Détails du Projet</h2>
        <div className="card">
            <div className="card-header">
                details du Composant id: {petitprojet.id}

                <ul className="list-group list-group-flush">

                    <li className="list-groupe-item">
                        <b>name:</b>
                        {petitprojet.name}
                    </li>
                    <li className="list-groupe-item">
                        <b>description:</b>
                        {petitprojet.description}
                    </li>
                    <li className="list-groupe-item">
                        <b>Rang de priorisation:</b>
                        {petitprojet.Rangdepriorisation}
                    </li>
                    <li className="list-groupe-item">
                        <b>Date de debut:</b>
                        {petitprojet.datedebut}
                    </li>
                    <li className="list-groupe-item">
                        <b>Date de Fin:</b>
                        {petitprojet.datefin}
                    </li>
                    <li className="list-groupe-item">
                        <b>Nombre de Beneficiaire direct Fille:</b>
                        {petitprojet.nmbreFilledirect}
                    </li>
                    <li className="list-groupe-item">
                        <b>Nombre de Beneficiaire indirect Garcon:</b>
                        {petitprojet.nmbreGarcondirect}
                    </li>
                    <li className="list-groupe-item">
                        <b>Nombre de Beneficiaire indirect:</b>
                        {petitprojet.nmbreBeneficiaireIndirect}
                    </li>
                    <li className="list-groupe-item">
                        <b>Secteur / domaine d'intervention:</b>
                        {petitprojet.secteurdintervention}
                    </li>
                    <li className="list-groupe-item">
                        <b>Longitude:</b>
                        {petitprojet.gps1}
                    </li>
                    <li className="list-groupe-item">
                        <b>Latitude:</b>
                        {petitprojet.gps2}
                    </li>

                </ul>
            </div>
        </div>
        <Link className="btn btn-primary my-2" to={"/petitprojet"}>Back</Link>
        </div>
        </div>
        </div>
    )
}


