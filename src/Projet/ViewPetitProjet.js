import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewPettitProjet() {
    const { programId, composanteId, typeprojetId, petitprojetId } = useParams();
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
        gps2:"",
        totalbeneficiaire:""
    });


    const {id}=useParams();

    useEffect(()=>{

        loadPetitProjet()

    },[])

    const loadPetitProjet=async ()=>{
        const result=await axios.get(`http://localhost:8080/petitprojet/${id}`)
        setPetitProjet(result.data)
    }

    return (
        
<       div className="Container">
            <div className="row">
                <div className="offset border rounded p-5  pt-4 m-5  shadow">
                      <h2 className="text-center m-4 ">Détails du Projet</h2>
        <div className="card">
            <div className="card-header">
                Details du Composant id: {petitprojet.id}

                <ul className="list-group list-group-flush">

                    <li className="list-groupe-item">
                        <b>Name:</b>
                        {petitprojet.name}
                    </li>
                    <li className="list-groupe-item">
                        <b>Description:</b>
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

                    <li className="list-groupe-item">
                        <b>Total Beneficiaire:</b>
                        {petitprojet.totalbeneficiaire}
                    </li>

                </ul>
            </div>
        </div>
        <Link className="btn btn-primary my-2" to={`/App/program/1/composante/1/typeprojet/6/petitprojet/6`}>Back</Link>
        </div>
        </div>
        </div>
    )
}


