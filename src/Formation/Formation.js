import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

function Formation() {
  const baseUrl = useBaseUrl();
  const { typeprojetId } = useParams();
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      const response = await axios.get(`${baseUrl}/typeprojet/${typeprojetId}/formation`);
      const formationsData = response.data;
      console.log(formationsData); // Vérifiez les données récupérées dans la console
      setFormations(formationsData);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des formations :', error);
      setLoading(false);
    }
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredFormations = formations.filter((formation) => {
    return formation.nom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="text-center titretext">Liste des Formations</div>
      <div className="py-1 mt-4 mx-1  beneficiaire-list">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Formation"
            className="form-control form-control-sm search-input"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th scope="col">No </th>
                <th scope="col">Nom</th>
                <th scope="col">Type</th>
                <th scope="col">Date debut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {filteredFormations.map((formation, index) => (
                <tr key={formation.id}>
                  <td>{index + 1}</td>
                  <td>{formation.nom}</td>
                  <td>{formation.type}</td>
                  <td>{formation.datedebut}</td>
                  <td>
                    <Link to={`/formation/${formation.id}`}>
                      Voir les détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Formation;
