import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

export default function EditPetitProjet() {
    let navigate=useNavigate( );

    const {id}=useParams()
    const baseUrl = useBaseUrl();

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
    })

    const{name,description,type,Rangdepriorisation,datedebut,datefin,nmbreFilledirect,nmbreGarcondirect, nmbreBeneficiaireIndirect
        ,secteurdintervention,gps1,gps2}=petitprojet
    const onInputChange=(e)=>{

        setPetitProjet({...petitprojet,[e.target.name]: e.target.value});

    };

    useEffect(()=>{

        loadPetitProjet();
    },[]);


    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.put(`${baseUrl}/petitprojet/${id}`, petitprojet)

        navigate("/")
    };

    const loadPetitProjet= async()=>{
        const result=await axios.get(`${baseUrl}/petitprojet/${id}`)
        setPetitProjet(result.data)
    }

    return (

        <div className="Container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                      <h2 className="text-center m-4 ">Etiter le Projet</h2>
                       
                      <form onSubmit={(e)=>onSubmit(e)}>                   
                        <div className="mb-3">
                         <label htmlFor="Name" className="form-label">Name</label>
                            <input 
                                 type="text" 
                                 className="form-control"
                                 placeholder="Entrer le nom du Programme"
                                 name="name"
                                 value={name}
                                onChange={(e)=>onInputChange(e)}
                            />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <input
                         type="text"  
                         className="form-control"
                         placeholder="Entrer la déscription"
                         name="description"
                         value={description}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Type" className="form-label">Type</label>
                        <input
                         type="text" 
                         className="form-control"
                         placeholder="type"
                         name="type"
                         value={type}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Rangdepriorisation" className="form-label">Rang de priorisation</label>                       
                        <select className="form-control" aria-label="Default select example">
                             <option selected>None</option>
                             <option value="1">Rang 1</option>
                             <option value="2">Rang 2</option>
                             <option value="3">Rang 3</option>
                             <option value="3">Rang 4</option>
                             <option value="3">Rang 5</option>
                             <option value="3">Rang 6</option>
                             <option value="3">Rang 7</option>
                             <option value="3">Rang 8</option>
                             <option value="3">Rang 9</option>
                              value={Rangdepriorisation}
                             onChange={(e)=>onInputChange(e)}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="datedebut" className="form-label">Date de Debut</label>
                        <input
                         type={"date"} 
                         className="form-control"
                         placeholder="Partener"
                         name="datedebut"
                         value={datedebut}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="datefin" className="form-label">date de Fin</label>
                        <input
                         type={"date"} 
                         className="form-control"
                         placeholder="datefin"
                         name="datefin"
                         value={datefin}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="nmbreFilledirect" className="form-label">Nombre de Beneficiaire Fille direct</label>
                        <input
                         type={"number"} 
                         className="form-control"
                         placeholder="nombre de beneficiaire Fille direct"
                         name="nmbreFilledirect"
                         value={nmbreFilledirect}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="nmbreGarcondirect" className="form-label">Nombre de Beneficiaire Garcon direct</label>
                        <input
                         type={"number"} 
                         className="form-control"
                         placeholder="nombre de beneficiaire Garcon direct"
                         name="nmbreGarcondirect"
                         value={nmbreGarcondirect}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="nmbreBeneficiaireIndirect" className="form-label">Nombre de Beneficiaire indirect</label>
                        <input
                         type={"number"} 
                         className="form-control"
                         placeholder="Nombre de Beneficiaire indirect"
                         name="nmbreBeneficiaireIndirect"
                         value={nmbreBeneficiaireIndirect}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>             
                      
                      <div className="mb-3">
                        <label htmlFor="secteurdintervention" className="form-label">Secteur/ Domaine d'Intervention</label>
                        <input
                         type={"text"} 
                         className="form-control"
                         placeholder="Secteur/ Domaine d'Intervention"
                         name="secteurdintervention"
                         value={secteurdintervention}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="GPS" className="form-label">GPS</label>
                        <form>
                        <div className="row">
                           <div className="col">
                              <input type="number" 
                               name="gps1" 
                               value={gps1}   
                               onChange={(e)=>onInputChange(e)}
                               className="form-control"  placeholder="Longitude"/>
                          </div>

                          <div className="col">  
                              <input type="number" 
                              name="gps2" 
                                 value={gps2}  
                                 onChange={(e)=>onInputChange(e)} 
                                 className="form-control"
                                 placeholder="Latitude"/>
                           </div>
                         </div>
                          </form>
                      </div>

                      <button type="submit" className="btn btn-outline-success"> Submit</button>
                      
                      <Link className="btn btn-outline-danger mx-5" to={"/petitprojet"}> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}


