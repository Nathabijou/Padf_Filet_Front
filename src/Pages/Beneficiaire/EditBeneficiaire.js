import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrl';

export default function EditBeneficiaire() {
  const {id, programId, composanteId, typeprojetId, petitprojetId, beneficiaireId } = useParams();

  const navigate = useNavigate();
 const baseUrl= useBaseUrl();
  const [beneficiaire, setBeneficiaire] = useState({
    nom: "",
    prenom: "",
    dob: "",
    sexe: "",
    qualification: "",
    lieudenaissance: "",
    identification: "",
    numeroidentification: "",
    telephonepaiement: "",
    telephonecontact: "",
    operateurpaiement: "",
  });

  const {
    nom,
    prenom,
    dob,
    sexe,
    qualification,
    lieudenaissance,
    identification,
    numeroidentification,
    telephonepaiement,
    telephonecontact,
    operateurpaiement,
  } = beneficiaire;

  const onInputChange = (e) => {
    setBeneficiaire({ ...beneficiaire, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBeneficiaire();
  }, [EditBeneficiaire]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/beneficiaire/${id}`);
      navigate(`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/beneficiaire`);
    } catch (error) {
      console.error('Erreur Axios:', error);
    }
  };

  const loadBeneficiaire = async () => {
    const result = await axios.get(`${baseUrl}/petitprojet/${petitprojetId}/beneficiaire`, beneficiaire);
    setBeneficiaire(result.data);
  };

  return (
    <div className="Container">
      <h2 className="text-center m-4 title">Editer le beneficiaire</h2>
      <div className="row">
        <div className="col shadow">
          <h2 className="information">Information</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row addprojet">
              <div className="col">
                <label htmlFor="Nom" className="form-label">
                  <h2 className="nomchamp">Nom</h2>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrer le nom du Beneficiaire"
                  name="nom"
                  value={nom}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col addprojet">
                <label htmlFor="prenom" className="form-label">
                  <h2 className="nomchamp">Prenom</h2>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrer le prenom"
                  name="prenom"
                  value={prenom}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="row gps">
              <div className="row mb-3">
                <label className="form-label">
                  <h2 className="nomchamp">Sexe</h2>
                </label>
                <div className="col form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="masculinCheckbox"
                    name="sexe"
                    value="MASCULIN"
                    checked={sexe === 'MASCULIN'}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label className="form-check-label" htmlFor="masculinCheckbox">
                    Masculin
                  </label>
                </div>
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="femininCheckbox"
                      name="sexe"
                      value="FEMININ"
                      checked={sexe === 'FEMININ'}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label" htmlFor="femininCheckbox">
                      Féminin
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col date">
              <div className="row mb-3">
                <label className="form-label">
                  <h2 className="nomchamp">Main d'oeuvre</h2>
                </label>
                <div className="col form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="qualifier"
                    name="qualification"
                    value="QUALIFIER"
                    checked={qualification === 'QUALIFIER'}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label className="form-check-label" htmlFor="qualifier">
                    Qualifier
                  </label>
                </div>
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="nonqualifier"
                      name="qualification"
                      value="NONQUALIFIER"
                      checked={qualification === 'NONQUALIFIER'}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label" htmlFor="nonqualifier">
                      Non Qualifier
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row gps">
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="dob" className="form-label">
                    <h2 className="nomchamp">Date de Naissance</h2>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Entrer la date de naissance"
                    name="dob"
                    value={dob}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="lieudenaissance" className="form-label">
                    <h2 className="nomchamp">Lieu de Naissance</h2>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lieu de Naissance"
                    name="lieudenaissance"
                    value={lieudenaissance}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="col beneficiaireind">
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="identification" className="form-label">
                    <h2 className="nomchamp">Identification</h2>
                  </label>
                  <select
                    className="form-control"
                    name="identification"
                    value={identification}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="">--None--</option>
                    <option value="nif">Nif</option>
                    <option value="cin">Cin</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="secteurdintervention" className="form-label">
                    <h2 className="nomchamp">Identification</h2>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer le numero selectionner"
                    name="numeroidentification"
                    value={numeroidentification}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row gps">
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="gps1" className="form-label">
                    <h2 className="nomchamp">Telephone Contact</h2>
                  </label>
                  <input
                    type="text"
                    name="telephonecontact"
                    value={telephonecontact}
                    onChange={(e) => onInputChange(e)}
                    className="form-control"
                    placeholder="Telephone Contact"
                  />
                </div>
                <div className="col">
                  <label htmlFor="gps2" className="form-label">
                    <h2 className="nomchamp">Telephone Paiement</h2>
                  </label>
                  <input
                    type="text"
                    name="telephonepaiement"
                    value={telephonepaiement}
                    onChange={(e) => onInputChange(e)}
                    className="form-control"
                    placeholder="Telephone Paiement"
                  />
                </div>
              </div>
            </div>
            <div className="col quartier">
              <div className="row mb-3">
                <label className="form-label">
                  <h2 className="nomchamp">Operateur de Paiement</h2>
                </label>
                <div className="col form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="moncash"
                    name="operateurpaiement"
                    value="moncash"
                    checked={operateurpaiement === 'moncash'}
                    onChange={(e) => onInputChange(e)}
                  />
                  <label className="form-check-label" htmlFor="moncash">
                    Mon Cash
                  </label>
                </div>
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="lajancash"
                      name="operateurpaiement"
                      value="lajancash"
                      checked={operateurpaiement === 'lajancash'}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label" htmlFor="lajancash">
                      Lajan Cash
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="boutonaddbeneficiaire">
              <button type="submit" className="btn btn-outline-success">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-5" to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/beneficiaire`}>
                Cancel
              </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
