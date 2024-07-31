import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Ajout de useParams pour récupérer le programId
import { useBaseUrl } from '../BaseUrl';


export default function AddTypeProjet() {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { composanteId, programId } = useParams();

  const [typeProjet, setTypeProjet] = useState({
    nom: '',
    description: '',
    type: '',
    composanteId: composanteId,
  });

  const { nom, description, type } = typeProjet;

  const onInputChange = (e) => {
    setTypeProjet({ ...typeProjet, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Soumission du formulaire en cours..."); // Ajout d'une console.log pour le débogage

    try {
      const typeProjetData = {
        nom: nom,
        description: description,
        type: type,
        composanteId: composanteId,
      };

      const response = await axios.post(`${baseUrl}/typeprojet/composante/${composanteId}`, typeProjetData);
      console.log("Réponse de l'API :", response.data); // Ajout d'une console.log pour le débogage

      // Redirection après la soumission réussie du formulaire
      navigate(`/App/program/${programId}/composante/${composanteId}/typeprojet`);

    } catch (error) {
      console.log("Erreur lors de la soumission du formulaire :", error);
    }
  };

  return (
    <div className="Container">
      <div className="row">
        <div className="offset border rounded p-5  pt-4 m-5  shadow">
          <h2 className="text-center m-4">Enregistrer un nouveau Type de Projet</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du Type de Projet"
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

            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le type"
                name="type"
                value={type}
                onChange={onInputChange}
              />
            </div>
            
            <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
           
            <Link className="btn btn-outline-danger mx-5" to={`/App/program/1/composante/2/typeprojet/2`}>
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
