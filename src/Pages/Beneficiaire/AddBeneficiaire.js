import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrl';

export default function AddBeneficiaire() {
  const { petitprojet, petitProjetId } = useParams();
  const { composante, nomProjet } = useParams();
  const { typeprojetId, quartierId, petitprojetId, programId, composanteId, petitProjet } = useParams();
  
  
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();

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
    operateurpaiement: ""
  });

  

  const { nom, prenom, dob, sexe, qualification, lieudenaissance, identification, telephonepaiement, typeidentification, telephonecontact, operateurpaiement } = beneficiaire;

  const onInputChange = (e) => {
    setBeneficiaire({ ...beneficiaire, [e.target.name]: e.target.value });
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Convertissez votre objet beneficiaire en format JSON
      const data = JSON.stringify(beneficiaire);
  
      // Ajoutez l'en-tête Content-Type à la requête
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      // Envoyez les données avec la configuration
      await axios.post(`${baseUrl}/beneficiaire/petitprojet/${petitprojetId}`, data, config);
      navigate(`/App/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/beneficiaire/${encodeURIComponent(petitProjet)}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
 

  return (
    <div className="contain">
      <form onSubmit={onSubmit}>
        <div className='title-t'>Enregistrer un Bénéficiaire</div>
        <h3 className="titre-title">
        Nom du Projet : {decodeURIComponent(nomProjet)}
      </h3>


        <div className='beneficiaire-details'>
          <div className='input-boxs'>
            <span className='details'>Nom</span>
            <input
              type="text"
              className="form-control"
              placeholder="Entrer le nom du Bénéficiaire"
              name="nom"
              value={nom}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className='input-boxs'>
            <span className='details'>Prénom</span>
            <input
              type="text"
              className="form-control"
              placeholder="Entrer le prénom"
              name="prenom"
              value={prenom}
              onChange={onInputChange}
              required
            />
          </div>

          <div className='gender-details'>
              <label htmlFor='sexe'>Sexe:</label>
              <select
                id='sexe'
                name='sexe'
                value={sexe}
                onChange={onInputChange}
                required
              >
                <option value=''>Non spécifié</option>
                <option value='M'>Masculin</option>
                <option value='F'>Féminin</option>
              </select>
            </div>


          <div className='input-boxs'>
            <span className='details'>Date de Naissance</span>
            <input
              type="date"
              className="form-control"
              placeholder="Entrer la date de naissance"
              name="dob"
              value={dob}
              onChange={onInputChange}
              required
            />
          </div>

          <div className='input-boxs'>
            <span className='details'>Lieu de Naissance</span>
            <input
              type="text"
              className="form-control"
              placeholder="Lieu de Naissance"
              name="lieudenaissance"
              value={lieudenaissance}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className='beneficiaire-details'>
           <div className='gender-details'>
            <label htmlFor='typeIdentification'>Type d'Identification:</label>
            <select
              id='typeIdentification'
              name='typeidentification'
              value={typeidentification}
              onChange={onInputChange}
              required
            >
              <option value=''>Sélectionnez un type d'identification</option>
              <option value='NIF'>Nif</option>
              <option value='CIN'>Cin</option>
              <option value='PASSPORT'>Passport</option>
            </select>
          </div>


          <div className='gender-details'>
            <span className='details'>Numéro d'Identification</span>
            <input
              type='text'
              placeholder='Numéro d Identification'
              name='identification'
              value={identification}
              onChange={onInputChange}
              required
            />
          </div>
        </div>


        <div className='beneficiaire-details'>
          



        <div className='gender-details'>
  <label htmlFor='qualification'>Qualification:</label>
  <select
    id='qualification'
    name='qualification'
    value={qualification}
    onChange={onInputChange}
    required
  >
    <option value=''>Non spécifié</option>
    <option value='Q'>Qualifier</option>
    <option value='NQ'>Non Qualifier</option>
  </select>
</div>


          
<div className='gender-details'>
  <label htmlFor='operateurpaiement'>Méthode de paiement:</label>
  <select
    id='operateurpaiement'
    name='operateurpaiement'
    value={operateurpaiement}
    onChange={onInputChange}
    required
  >
    <option value=''>Sélectionnez une méthode de paiement</option>
    <option value='MonCash'>MonCash</option>
    <option value='LajanCash'>LajanCash</option>
    <option value='NatCash'>NatCash</option>
    <option value='Cash'>Cash</option>
  </select>
</div>



        </div>

        <div className='input-boxs'>
          <span className='details'>Téléphone Contact</span>
          <input
            type="tel"
            name="telephonecontact"
            value={telephonecontact}
            onChange={onInputChange}
            className="form-control"
            placeholder="Telephone Contact"
            required
          />
        </div>
        <div className='input-boxs'>
          <span className='details'>Téléphone Paiement</span>
          <input
            type="tel"
            name="telephonepaiement"
            value={telephonepaiement}
            onChange={onInputChange}
            className="form-control"
            placeholder="Telephone Paiement"
            required
          />
        </div>

        <div className='button'>
          <input type='submit' value='Enregistrer' />
        </div>
      </form>
    </div>
  );
}
