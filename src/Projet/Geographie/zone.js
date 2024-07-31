import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Zone() {
  let navigate = useNavigate();

  const [zones, setZones] = useState({
    nom: '',
   
  });

  const { nom } = zones;

  const onInputChange = (e) => {
    setZones({ ...zones, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/zone', zones);
      navigate('/App/departement'); // Rediriger vers la liste des programmes après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du programme :', error);
    }
  };

  return (
    <div className="Container">


      <div className='hero'>

        
      </div>

      <div className="row p-4 mt-4 mx-3">
        <div className="offset border rounded p-5 pt-4 m-5 shadow">
          <h2 className="text-center m-4">Ajouter une Zone</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du Programme"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
              <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to="/App/departement">
              Annuler
            </Link>
            </div>            
          </form>
        </div>
      </div>
    </div>
  );
}
