import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrl';

function EditPresence() {
  const { beneficiaireId, presenceId } = useParams();
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

  const [presence, setPresence] = useState({
    date: '',
    heurein: '',
    heureout: '',
  });

  useEffect(() => {
    async function fetchPresence() {
      try {
        const response = await axios.get(`${baseUrl}/presence/${presenceId}`);
        const presenceData = response.data;
        setPresence(presenceData);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération de la présence :", error);
      }
    }
    fetchPresence();
  }, [baseUrl, presenceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPresence(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/presence/${presenceId}/beneficiaire/${beneficiaireId}`, presence);
      navigate(`/App/beneficiaire/${beneficiaireId}/presence`);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la modification de la présence :", error);
    }
  };

  return (
    <div className="Container editpresence">
      <h2 className="text-center m-4 title">Modifier la présence</h2>
      <div className="row sec">
        <div className="shadow sec">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                <h2 className="nomchamp">Date</h2>
              </label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={presence.date}
                onChange={handleInputChange}
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
                name="heurein"
                value={presence.heurein}
                onChange={handleInputChange}
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
                name="heureout"
                value={presence.heureout}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="boutoneditpresence">
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

export default EditPresence;
