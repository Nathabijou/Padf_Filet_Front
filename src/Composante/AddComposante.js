import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Ajout de useParams pour récupérer le programId
import { useBaseUrl } from '../BaseUrl';

export default function AddComposante() {
  const baseUrl= useBaseUrl();
  const navigate = useNavigate();
  const { programId } = useParams(); // Récupération du programId depuis la route

  const [composante, setComposante] = useState({
    nom: '',
    description: '',
    programId: programId, // Utilisation du programId récupéré depuis la route
  });

  const { nom, description } = composante;

  const onInputChange = (e) => {
    setComposante({ ...composante, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
      // Créez un objet de données correctement formaté
      const composanteData = {
        nom: nom,
        description: description,
        programId: programId,
      };

      const response = await axios.post(`${baseUrl}/composante/program/${programId}`, composanteData);
    navigate(`/App/program/1/composante/1`);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="Container">
      <div className="row">
        <div className="offset border rounded p-5  pt-4 m-5  shadow">
          <h2 className="text-center m-4">Enregistrer une Composante</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom de la Composante"
                name="nom"
                value={nom}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer la description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to={`/App/program/${programId}/composante/1`}>
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
