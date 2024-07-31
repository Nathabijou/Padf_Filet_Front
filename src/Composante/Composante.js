import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TypeProjet from '../TypeProjet/TypeProjet';
import { useBaseUrl } from '../BaseUrl';

export default function Composante() {
  const baseUrl= useBaseUrl();
  
  const [composantes, setComposantes] = useState([]);
  const [program, setPrograms] = useState([]);
  const [programDetails, setProgramDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const { programId, nomProjet  } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadComposantes(programId);
    loadProgramDetails(programId); // Chargez les détails du programme ici
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [programId]);

  const loadComposantes = async (programId) => {
    try {
      const response = await axios.get(`${baseUrl}/program/${programId}/composante`);
      setComposantes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des composantes :', error);
    }
  };

  const loadProgramDetails = async (programId) => {
    try {
      const response = await axios.get(`${baseUrl}/program/${programId}`);
      setProgramDetails(response.data);
      console.log('Program Details:', response.data); // Ajoutez un console.log pour vérifier les détails du programme
    } catch (error) {
      console.error('Erreur lors du chargement des détails du programme :', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
  };

  // Filtrer les composantes en fonction du terme de recherche
  const filteredComposantes = composantes.filter((composante) =>
    composante.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered Composantes:', filteredComposantes); // Ajoutez un console.log pour vérifier les composantes filtrées

  return (
    <div className="container">
      <div className="titretext">Les Composantes</div>
      <h3 className='titre-title'>Programme :   {decodeURIComponent(nomProjet)}</h3>

      <div className="py mt-4 mx-md-4 dx-3 beneficiaire-list">
        
        <div className="sticky-buttons d-flex justify-content-between">
          <Link to="/App">
            <svg
              width="50"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="3 0 5 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            
          </Link>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Component"
              className="form-control form-control-sm search-input"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {isMobile ? (
          <div className="row">
            {filteredComposantes.map((composante) => (
              <div className="col-md-4 mb-4" key={composante.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        to={`/App/program/${programId}/composante/${composante.id}/typeprojet/${composante.id}/${encodeURIComponent(composante.nom)}`}
                      >
                        {composante.nom}
                      </Link>
                    </h5>
                    
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
                  <th>Code</th>
                  <th>Nom</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredComposantes.map((composante) => (
                  <tr key={composante.id}>
                    <th scope="row">{composante.id}</th>
                    <td>
                      <Link
                        to={`/App/program/${programId}/composante/${composante.id}/typeprojet/${composante.id}/${encodeURIComponent(composante.nom)}`}
                      >
                        {composante.nom}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/viewprojectcomponent/${composante.id}`}>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
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
