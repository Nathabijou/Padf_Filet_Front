import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

export default function AddProgram() {
  let navigate = useNavigate();
  const baseUrl = useBaseUrl();

  const [programs, setPrograms] = useState({
    nom: '',
    description: '',
    bailleur: '',
    partenaire: '',
    mdod: '',
    mo: '',
  });

  const { nom, description, bailleur, partenaire, mdod, mo } = programs;

  const onInputChange = (e) => {
    setPrograms({ ...programs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/programs`);
      navigate('/App'); 
    } catch (error) {
      console.error('Erreur lors de l\'ajout du programme :', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card mt-5">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Enregistrer un Programme</h2>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb">
                  <label htmlFor="nom" className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer le nom du Programme"
                    name="nom"
                    value={nom}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer la description"
                    name="description"
                    value={description}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb">
                  <label htmlFor="bailleur" className="form-label">Bailleur</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bailleur"
                    name="bailleur"
                    value={bailleur}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb">
                  <label htmlFor="mo" className="form-label">M.O</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="M.O"
                    name="mo"
                    value={mo}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb">
                  <label htmlFor="mdod" className="form-label">MDOD</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MDOD"
                    name="mdod"
                    value={mdod}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb">
                  <label htmlFor="partenaire" className="form-label">Partenaire</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Partenaire"
                    name="partenaire"
                    value={partenaire}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
                <Link className="btn btn-danger" to="/App">Annuler</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
