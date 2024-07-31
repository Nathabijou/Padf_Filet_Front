import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProgram() {
    let navigate=useNavigate( );

    const {id}=useParams()

    const [programs, setPrograms]=useState({
        nom:"",
        description:"",       
        bailleur:"",
        partenaire:"",
        mdod:"",
        mo:""
    })

    const{nom,description,mo,Bailleur,Partenaire,mdod}=programs
    const onInputChange=(e)=>{

        setPrograms({...programs,[e.target.name]: e.target.value});

    };

    useEffect(()=>{

        loadProgram();
    },[]);


    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.put(`http://localhost:8080/program`)

        navigate("/")
    };

    const loadProgram= async()=>{
        const result=await axios.get(`http://localhost:8080/program/${id}`)
        setPrograms(result.data)
    }

    return (
        <div className="Container">
            <div className="row">
                <div className="table border shadow mt-3 mx-5 my-1 mx-5">
                      <h2 className="text-center m-4 ">Editer le Programme</h2>

                      <form onSubmit={(e)=>onSubmit(e)}>
                      <div className="mb-3">
                        <label htmlFor="Nom" className="form-label">Nom</label>
                        <input 
                         type="text" 
                         className="form-control"
                         placeholder="Entrer le nom du Programme"
                         name="nom"
                         value={nom}
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
                        <label htmlFor="Bailleur" className="form-label">Bailleur</label>
                        <input
                         type="text"  
                         className="form-control"
                         placeholder="Bailleur"
                         name="Bailleur"
                         value={Bailleur}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="mo" className="form-label">M.O</label>
                        <input
                         type={"Text"} 
                         className="form-control"
                         placeholder="mo"
                         name="mo"
                         value={mo}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="mdod" className="form-label">MDOD</label>
                        <input
                         type={"Text"} 
                         className="form-control"
                         placeholder="mdod"
                         name="mdod"
                         value={mdod}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Partenaire" className="form-label">Partenaire</label>
                        <input
                         type={"Text"} 
                         className="form-control"
                         placeholder="Partenaire"
                         name="Partenaire"
                         value={Partenaire}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>
                     
                      

                      <button type="submit" className="btn btn-outline-success"> Submit</button>
                      <Link className="btn btn-outline-danger mx-5" to="/"> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}


