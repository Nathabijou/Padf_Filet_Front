import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Commune() {
  let navigate = useNavigate();
  const {departementId } = useParams();

  const [commune, setCommune] = useState({
    nom: '',
    departement: '', // L'ID de la zone associée au département
  });

  const [communes, setDepartements] = useState([]); // Liste des zones existantes

  const { nom, departement } = commune;

  useEffect(() => {
    // Chargez la liste des zones existantes depuis votre API
    async function fetchDepartements() {
      try {
        const response = await axios.get(`http://localhost:8080/departement`);
        setDepartements(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    }

    fetchDepartements();
  }, []);

  const onInputChange = (e) => {
    setCommune({ ...commune, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/commune', commune);
      navigate('/App'); // Rediriger vers la liste des programmes après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du département :', error);
    }
  };

  return (
    <div className="Container">
      <div className='hero'>
      </div>
      <div className="row p-4 mt-4 mx-3">
        <div className="offset border rounded p-5 pt-4 m-5 shadow">
          <h2 className="text-center m-4">Ajouter une commune</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nom" className="form-label">
                Nom du Département
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du Département"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Departement" className="form-label">
                Sélectionner un Departement
              </label>
              <select
                className="form-control"
                name="departement"
                value={departement}
                onChange={(e) => onInputChange(e)}
              >
                 <Link className="btn btn-outline-success">
              Enregistrer
              </Link>
                <option value="">-- Sélectionner une zone --</option>
                
                {communes.map((communes) => (
                  <option key={communes.id} value={communes.id}>
                    {communes.nom}
                   
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to="/App/sectioncommunale">
              Annuler
            </Link>
            <Link className="btn btn-success mx-5" to="/App/departement">
             Ajouter un Departement
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
