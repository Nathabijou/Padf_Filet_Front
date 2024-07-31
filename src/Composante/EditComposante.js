import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

export default function EditComposante() {
    let navigate=useNavigate( );

    const {id}=useParams()
    const baseUrl = useBaseUrl();

    const [Composante, setComposante]=useState({
        name:"",
        description:"",
             
    })

    const{name,description}=Composante
    const onInputChange=(e)=>{

        setComposante({...Composante,[e.target.name]: e.target.value});
    };

    useEffect(()=>{

        loadComposante();
    },[]);


    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.put(`${baseUrl}/composante/${id}`, Composante)

        navigate("/")
    };

    const loadComposante= async()=>{
        const result=await axios.get(`${baseUrl}/composante/${id}`)
        setComposante(result.data)
    }

    return (
        <div className="Container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                      <h2 className="text-center m-4 ">Editer le Composant</h2>

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

                      

                    
                      <button type="submit" className="btn btn-outline-success"> Submit</button>
                      <Link className="btn btn-outline-danger mx-5" to={"/projectcomponent"}> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}


