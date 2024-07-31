// Departement.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Departement() {
  let navigate = useNavigate();
  const { zoneId } = useParams();

  const [departement, setDepartement] = useState({
    nom: '',
    zone: zoneId,
  });

  const [zones, setZones] = useState([]);

  const { nom, zone } = departement;

  useEffect(() => {
    async function fetchZones() {
      try {
        const response = await axios.get(`http://localhost:8080/zone`);
        setZones(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    }

    fetchZones();
  }, []);

  const onInputChange = (e) => {
    setDepartement({ ...departement, [e.target.name]: e.target.value });
    console.log('ID de la zone sélectionnée :', e.target.value);
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/zone/${zoneId}/departement`, departement);
      navigate('/App/commune');
    } catch (error) {
      console.error("Erreur lors de l'ajout du département :", error);
    }
  };

  return (
    <div className="Container">
      <div className="hero"></div>
      <div className="row p-4 mt-4 mx-3">
        <div className="offset border rounded p-5 pt-4 m-5 shadow">
          <h2 className="text-center m-4">Ajouter un Département</h2>
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
              <label htmlFor="Zone" className="form-label">
                Ajouter le Département dans une Zone
              </label>
              <select
                className="form-control"
                name="zone"
                value={zone}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">-- Sélectionner la zone --</option>
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.nom}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to="/App/commune">
              Annuler
            </Link>
            <Link className="btn btn-success mx-5" to="/App/Zone">
              Ajouter une Zone
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
