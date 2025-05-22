import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

export default function PetitProjet() {
  const baseUrl = useBaseUrl();
  
  const { programId, composanteId, petitprojetId, typeprojetId, nomProjet } = useParams();
  const [petitsProjets, setPetitsProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadPetitsProjets();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadPetitsProjets = async () => {
    try {
      const response = await axios.get(`${baseUrl}/typeprojet/${typeprojetId}/petitprojet`);
      const petitsProjetsData = response.data;
      setPetitsProjets(petitsProjetsData);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des projets :', error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
  };

  const filteredPetitsProjets = petitsProjets.filter((petitProjet) => {
    return (
      petitProjet.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedZone === '' || petitProjet.zoneNom === selectedZone)
    );
  });

  // Obtenez une liste unique de zones
  const uniqueZones = [...new Set(petitsProjets.map((petitProjet) => petitProjet.zoneNom))];

  // Excluez la zone 1 de la liste des zones
  const filteredZones = uniqueZones.filter((zone) => zone !== '1');

  return (
    <div className="container">
      <div className="text-center titretext">Liste des Projets</div>
      <h3 className='titre-title'>Type de Projet: {decodeURIComponent(nomProjet)}</h3>
      <div className="py-1 mt-4 mx-1  beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          
          <Link to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}"}`}>
            {/* <svg
              width="50"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="3 0 5 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              style={{ fontSize: '12px', padding: '3px 5px', color: 'white', marginLeft: "5rem" }}/>
            </svg> */}
          </Link>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Project"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="createreportts">
            <select
              value={selectedZone}
              onChange={(e) => handleZoneChange(e.target.value)}
            >
              <option value="">Toutes les Zones</option>
              {filteredZones.map((zone, index) => (
                <option key={index} value={zone}>
                   {zone}
                </option>
              ))}
            </select>
          </div>
          <Link
            className="btn btn-success mx-3"
            to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/addpetitProjet`}>Nouveau Projet
          </Link>
        </div>

        {isMobile ? (
          <div className="row">
            {filteredPetitsProjets.map((petitProjet, index) => (
              <div className="col-md-4 mb-4" key={petitProjet.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        to={`/App/typeprojet/${typeprojetId}/petitprojet/${petitProjet.id}/beneficiaire/${encodeURIComponent(petitProjet.nom)}`}
                      >
                        {petitProjet.nom}
                      </Link>
                    </h5>
                    <p className="card-text">Statut: <strong>{petitProjet.statut}</strong></p>
                    <p className="card-text">Quartier: <strong>{petitProjet.quartierNom}</strong></p>
                    
                    <p className="card-text">Zone: <strong>{petitProjet.zoneNom}</strong></p>
                    <Link to={`/App/petitprojet/${petitProjet.id}/viewpetitprojet/${petitProjet.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </Link>
                      <Link to={`/App/petitprojet/photoprojet/${petitProjet.id}/${encodeURIComponent(petitProjet.nom)}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        ></svg>
                        <i className="bi bi-image"></i>
                      </Link>
                      <Link to={`/App/petitprojet/editpetitprojet/${petitProjet.id}`}>
                        <svg
                          width="40"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen"
                          viewBox="0 0 10 16"
                        >
                          <path
                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                          />
                        </svg>
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped ">
              <thead className="table-success">
                <tr>
                  <th scope="col">No </th>
                  <th scope="col">Nom</th>
                  <th scope="col">Status</th>
                  <th scope="col">Quartier </th>
                  <th scope="col">Zone </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredPetitsProjets.map((petitProjet, index) => (
                  <tr key={petitProjet.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link
                        to={`/App/typeprojet/${typeprojetId}/petitprojet/${petitProjet.id}/beneficiaire/${encodeURIComponent(petitProjet.nom)}`}
                      >
                        {petitProjet.nom}
                      </Link>
                    </td>
                    <td>{petitProjet.statut}</td>
                    <td>{petitProjet.quartierNom}</td>
                    <td>{petitProjet.zoneNom}</td>
                    <td>
                      <Link to={`/App/petitprojet/viewpetitprojet/${petitProjet.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </Link>
                      <Link to={`/App/petitprojet/photoprojet/${petitProjet.id}/${encodeURIComponent(petitProjet.nom)}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        ></svg>
                        <i className="bi bi-image"></i>
                      </Link>
                      <Link to={`/App/petitprojet/editpetitprojet/${petitProjet.id}`}>
                        <svg
                          width="40"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen"
                          viewBox="0 0 10 16"
                        >
                          <path
                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
