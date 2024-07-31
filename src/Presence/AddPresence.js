import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

export default function AddPresence() {
  const { beneficiaireId, composanteId, programId, projetbeneficiaireId } = useParams();
  console.log("projetbeneficiaireId:", projetbeneficiaireId);
 
  

  const navigate = useNavigate();
  const baseUrl = useBaseUrl();

  const initialPresence = {
    date: '',
    heureIn: '',
    heureOut: '',
  };

  const [addpresence, setPresence] = useState(initialPresence);

  const { date, heurein, heureout } = addpresence;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPresence({ ...addpresence, [name]: value });
    
    if (name === 'heureOut') {
      // Calcul de la différence entre les heures de début et de fin
      const startTime = new Date(`01/01/2000 ${addpresence.heureIn}`);
      const endTime = new Date(`01/01/2000 ${value}`);
      const diffHours = (endTime - startTime) / (1000 * 60 * 60); // Convertir la différence en heures
      
      // Mise à jour de l'état avec le nombre d'heures de travail calculé
      setPresence(prevState => ({ ...prevState, nombre_heures_travail: diffHours }));
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await axios.post(`${baseUrl}/presence/beneficiaire/${beneficiaireId}`,  addpresence);
      navigate(`/App/beneficiaire/${beneficiaireId}/presence/${encodeURIComponent(`${beneficiaireId.nom} ${beneficiaireId.prenom}` )}`); 
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };
  return (
    <div className="Container-addbene">
      <h3 className="titre-title">Enregistrer une nouvelle presence</h3>

      <div className="beneficiaire-details">
        <div className="input-boxs">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                <h2 className="nomchamp">Date</h2>
              </label>
              
              <input
                type="date"
                className="form-control"
                placeholder="Entrer date"
                name="date"
                value={date}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="heurein" className="form-label">
                <h2 className="nomchamp">Heure d'arrivée</h2>
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Entrer l'heure"
                name="heurein"
                value={heurein}
                onChange={onInputChange}
                required
              
              />
            </div>

            <div className="mb-3">
              <label htmlFor="heureout" className="form-label">
                <h2 className="nomchamp">Heure de départ</h2>
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Entrer"
                name="heureout"
                value={heureout}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="boutonaddpresence">
              <button type="submit" className="btn btn-outline-success">
                Enregistrer
              </button>

              <Link
                className="btn btn-outline-danger mx-5"
                to={`/App/beneficiaire/${beneficiaireId}/presence`}
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
