import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrl';

export default function Payrolls() {
  const baseUrl = useBaseUrl();
  const [payrolls, setPayrolls] = useState([]);
  const { beneficiaireId, projetBeneficiaireId } = useParams();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPayrolls();
  }, [beneficiaireId, projetBeneficiaireId]);

  const loadPayrolls = async () => {
    try {
        const response = await axios.get(`${baseUrl}/payrolls`);
        console.log("Response from backend:", response.data);
        setPayrolls(response.data);
        setLoading(false);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        console.error("Réponse du serveur :", error.response.data);
    }
};



  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPayrolls = payrolls.filter((payroll) =>
    payroll && payroll.nomDuChampCorrespondant && payroll.nomDuChampCorrespondant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="text-center titretext">Payrolls</div>
      <div className="py-4 mt-4 mx-4 dx-3 beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          <Link to={`/App/typeprojet/1/petitprojet/1/beneficiaire`}>
            <svg width="50" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="3 0 5 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <Link
              className='btn btn-success mx-3'
              to={`/App/beneficiaire/${beneficiaireId}/presence/AddPresence`}
              style={{ fontSize: '12px', padding: '3px 5px', color: 'white', marginLeft: "5rem" }}
            >
              + Create Payroll
            </Link>
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Presence"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
        <table className="table table-bordered table-striped ">
            <thead className="table-success">
            <tr>
              <th scope="col" style={{ position: "sticky", top: "0" }}>#</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Montant</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Methode de Paiement</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Debut periode</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Fin Periode</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Status</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredPayrolls.map((payroll) => (
              <tr key={payroll.id}>
                <th scope="row">{payroll.id}</th>
                <td>
                  <Link to={`/viewprogram/${payroll.id}`}>
                    {payroll.montantPaye}
                  </Link>
                </td>
                <td>{payroll.MethodePaiement}</td>
                <td>{payroll.debutperiode}</td>
                <td>{payroll.finperiode}</td>
                <td>{payroll.statut}</td>
                <td>
                  <Link to={`/viewprogram/${payroll.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {/* Remplacez par les chemins SVG réels */}
                    </svg>
                  </Link>
                  <Link to={`/editprogram/${payroll.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      {/* Remplacez par les chemins SVG réels */}
                    </svg>
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
