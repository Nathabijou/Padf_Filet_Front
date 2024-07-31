import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Quartier() {
  let navigate = useNavigate();
  const {sectionCommualeId } = useParams();

  const [quartier, setQuartier] = useState({
    nom: '',
    sectionCommuale: '', 
  });

  const [quartiers, setSectionCommunales] = useState([]); // Liste des zones existantes

  const { nom, sectionCommunale } = quartier;

  useEffect(() => {
    // Chargez la liste des zones existantes depuis votre API
    async function fetchSectionCommunales() {
      try {
        const response = await axios.get(`http://localhost:8080/sectioncommunale`);
        setSectionCommunales(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    }

    fetchSectionCommunales();
  }, []);

  const onInputChange = (e) => {
    setQuartier({ ...quartier, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/sectioncommunale', quartier);
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
          <h2 className="text-center m-4">Ajouter un Quartier</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nom" className="form-label">
                Nom du Quartier
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du Quartier"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="SectionCommunale" className="form-label">
                Ajouter le quartier dans Section Commuale
              </label>
              <select
                className="form-control"
                name="sectionCommunale"
                value={sectionCommunale}
                onChange={(e) => onInputChange(e)}
              >
                 <Link className="btn btn-outline-success">
                  Enregistrer
                 </Link>
                <option value="">-- Sélectionner la sectionCommuale --</option>
                
                {quartiers.map((quartiers) => (
                  <option key={quartiers.id} value={quartiers.id}>
                    {quartiers.nom}
                   
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to={`/App/program/undefined/composante/undefined/typeprojet/3/petitprojet/3/addpetitProjet`}>
              Annuler
            </Link>
            <Link className="btn btn-success mx-5" to="/App/sectionCommunale">
             Ajouter une Section Commuale
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
