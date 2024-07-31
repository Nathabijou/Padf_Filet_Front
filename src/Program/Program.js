import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navleft from "../Navleft/Navleft";
import { useBaseUrl } from "../BaseUrl";

export default function Program() {
  const baseUrl = useBaseUrl();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openProfiles, setOpenProfiles] = useState(false);
  const [maxNomLength, setMaxNomLength] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadPrograms();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //useEffect(() => {
    // Find the maximum length of 'nom' field
    //if (programs.length > 0) {
    //  const max = Math.max(...programs.map((program) => program.nom.length));
     // setMaxNomLength(max);
   // }
 // }, [programs]);

  const loadPrograms = async () => {
    try {
      const response = await axios.get(`${baseUrl}/programs`);
      setPrograms(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des programmes :", error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPrograms = programs.filter((program) =>
    (program.nom ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

 

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
  };

  return (
    <div className="container">
      
      {openProfiles && <Navleft />}

      <nav className="titretext">Programme</nav>

      <div className="marquee-w">
        <div className="marquee">
          <span>
            Filet de Sécurité Sociale Temporaire et Compétence pour les
            Jeunes
          </span>
        </div>
      </div>

      <div className="py 4 mt mx md-6 dx-3  beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          <Link
            to="/App/addprogram"
            style={{
              fontSize: "12px",
              padding: "3px 5px",
              color: "white",
              marginLeft: "50px",
            }}
          >
            {/*+ Nouveau Programme*/}
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Program"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          {isMobile ? (
            <div className="row">
              {filteredPrograms.map((program) => (
                <div className="col-md-4 mb-4" key={program.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link
                          to={`/App/program/${program.id}/composante/${program.id}/${program.nom}`}
                        >
                          {program.nom}
                        </Link>
                      </h5>
                      <h2 className="card-text">BAILLEUR:<strong> {program.bailleur}</strong></h2>
                      <h2 className="card-text">MDO:<strong> {program.mo}</strong></h2>
                      <h2 className="card-text">MDOD: <strong>{program.mdod}</strong></h2>
                      <h2 className="card-text">PARTENAIRE:<strong> {program.partenaire}</strong></h2>
                      <Link
                        to={`/App/program/${program.id}/composante/${program.id}/${program.nom}`}
                        className="btn btn-primary"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-success">
                  <tr>
                    <th >Code</th>
                    {/**style={{ width: maxNomLength > 0 ? maxNomLength + 'ch' : 'auto' }} */}
                    <th >Nom</th>
                    <th>Bailleur</th>
                    <th>M.O</th>
                    <th>MDOD</th>
                    <th>Partenaire</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {filteredPrograms.map((program, index) => (
                    <tr key={program.id}>
                      <td>{program.code}</td>
                      <td style={{ whiteSpace: 10 }}>
                        <Link
                          to={`/App/program/${program.id}/composante/${program.id}/${program.nom}`}>
                          {program.nom}
                        </Link>
                      </td>
                      <td>{program.bailleur}</td>
                      <td>{program.mo}</td>
                      <td>{program.mdod}</td>
                      <td>{program.partenaire}</td>
                      <td>
                        <Link to={`/App/viewprogram/${program.id}`} className="btn ">
                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      fill="currentColor"
                     
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
        
        {selectedProgram && (
          <div className="program-details">
            <h2>Détails du programme:</h2>
            <p>Nom : {selectedProgram.nom}</p>
            <p>Description : {selectedProgram.description}</p>
            {/* Ajoutez d'autres détails ici */}
          </div>
        )}
      </div>
    </div>
  );
}
