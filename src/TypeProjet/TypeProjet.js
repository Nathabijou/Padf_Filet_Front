import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Program from '../Program/Program';
import { useBaseUrl } from '../BaseUrl';

export default function TypeProjet() {
  const baseUrl = useBaseUrl();
  const { typeprojetId, nomProjet } = useParams();
  const [typeProjets, setTypeProjets] = useState([]);
  const { composanteId, programId, typeProjetId } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadTypeProjets();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadTypeProjets = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Composante/${composanteId}/typeprojet`);
      setTypeProjets(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error loading TypeProjets:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
  };

  const filteredTypeProjets = typeProjets.filter((typeProjet) =>
    typeProjet.name && typeProjet.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="text-center titretext">Types de Projet</div>
      <h3 className='titre-title'>Type de Projet:   {decodeURIComponent(nomProjet)}</h3>

      <div className="py-1 mt-4 mx-1  beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          {/* <Link to={`/App/program/${programId}/composante/${composanteId}`}> */}
            {/* <svg width="50" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="3 0 5 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg> */}
            {/* <Link className='createreports' to="/App/program/:programId/composante/:composanteId/addtypeProjet"
              style={{ fontSize: '12px', padding: '3px 5 px', color: 'white', marginLeft: "5rem", }}> + Nouveau Type de projet </Link>
          </Link> */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Project type"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {isMobile ? (
          <div className="row">
            {filteredTypeProjets.map((typeProjet) => (
              <div className="col-md-4 mb-4" key={typeProjet.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeProjet.id}/petitprojet/${typeProjet.id}/${encodeURIComponent(typeProjet.name)}`}
                      >
                        {typeProjet.name}
                      </Link>
                    </h5>
                    <p className="card-text"><strong>{typeProjet.description}</strong></p>
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
                  <th scope="col">Code</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredTypeProjets.map((typeProjet) => (
                  <tr key={typeProjet.id}>
                    <th scope="row">{typeProjet.id}</th>
                    <td>
                      <Link
                        to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeProjet.id}/petitprojet/${typeProjet.id}/${encodeURIComponent(typeProjet.name)}`}
                      >
                        {typeProjet.name}
                      </Link>
                    </td>
                    <td>{typeProjet.description}</td>
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
