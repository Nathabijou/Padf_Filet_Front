import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrl';
import Select from 'react-select';

export default function AddPetitProjet() {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { typeprojetId, quartierId, petitprojetId, programId, composanteId } = useParams();

  // État pour stocker les données du projet
  const [petitprojet, setPetitProjet] = useState({
    nom: '',
    description: '',
    type: '',
    rangdepriorisation: '',
    datedebut: '',
    datefin: '',
    nmbreFilledirect: '',
    nmbreGarcondirect: '',
    nmbreBeneficiaireIndirect: '',
    secteurdintervention: '',
    phase:'',
    montantmainOeuvreQualifier: '',
    montantmainoeuvreNonQualifier: '',
    code:'',
    montantAssurance: '',
    montantMateriaux: '',
    latitude: '',
    longitude: '',
    quartier: '',
    quartierId: quartierId,
  });


  

  
  // État pour stocker les données des quartiers
  const [quartiers, setQuartiers] = useState([]);

  // Fonction pour mettre à jour les champs de formulaire
  const onInputChange = (e) => {
    const { name, value } = e.target;
    let updatedPetitProjet = { ...petitprojet };
  
    if (name === 'quartier') {
      const selectedQuartier = quartiers.find(quartier => quartier.id === parseInt(value));
      updatedPetitProjet = {
        ...updatedPetitProjet,
        quartier: selectedQuartier ? selectedQuartier.nom : '',
        quartierId: value
      };
    } else if (name === 'rangdepriorisation') {
      // Convertir la valeur en nombre entier avant de l'assigner
      updatedPetitProjet = {
        ...updatedPetitProjet,
        [name]: parseInt(value)
      };
    } else {
      updatedPetitProjet = {
        ...updatedPetitProjet,
        [name]: value
      };
    }
    setPetitProjet({
      ...petitprojet,
      [name]: value
    });
  
    setPetitProjet(updatedPetitProjet);
  };
  
  const updateMontantTotal = () => {
    const total =
      parseFloat(petitprojet.montantmainOeuvreQualifier || 0) +
      parseFloat(petitprojet.montantmainoeuvreNonQualifier || 0) +
      parseFloat(petitprojet.montantAssurance || 0) +
      parseFloat(petitprojet.montantMateriaux || 0);
    setPetitProjet({ ...petitprojet, montantTotal: total });
  };
  









  // Effet pour charger les quartiers depuis l'API lorsqu'un ID de projet est fourni
  useEffect(() => {
    async function fetchQuartiers() {
      try {
        const response = await axios.get(`${baseUrl}/quartier`);
        setQuartiers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    }

    if (petitprojetId) {
      fetchQuartiers();
    }
  }, [petitprojetId, baseUrl]);

  // Fonction pour soumettre le formulaire
  // Fonction pour soumettre le formulaire
  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Assurez-vous que cette valeur est correctement mise à jour
  
    const newPetitProjet = {
      ...petitprojet,
      quartierId: petitprojet.quartierId,
       // Assurez-vous que la valeur est correcte
      longitude: parseFloat(petitprojet.longitude),
      latitude: parseFloat(petitprojet.latitude) // Assurez-vous que la latitude est également envoyée
    };
  
    try {
      await axios.post(`${baseUrl}/petitprojet/typeprojet/${typeprojetId}/quartier/${newPetitProjet.quartierId}`, newPetitProjet);
      navigate(`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/${typeprojetId}`);
    } catch (error) {
      console.error('Erreur lors de la soumission du projet:', error);
    }
  };
  
  

  
  const newPetitProjet = {
    ...petitprojet,
    quartierId,
    // Convertir en entier si nécessaire
  };
  

 
  







  

  return (
    <div >    
<div class="containersss">
    <form onSubmit={onSubmit}>
        <div className='title-project'>Enregistrer un Projet</div>

       {/* <!-- Catégorie: Informations Générales -->*/}
        <div className='project-category'>
            <h3 className='category-title'> Informations Générales</h3>
            <div className='input-box'>
                <span class='detailss'>Code</span>
                <input
                  type="text"
                  class="form-control input-responsive"
                  placeholder="Entrer le code du Projet"
                  name="code"
                  value={petitprojet.code}
                  onChange={onInputChange}
                />
            </div>
            <div class='input-box'>
                <span class='detailss'>Phase</span>
                <select
              className="form-control"
              name="phase"
              value={petitprojet.phase.toString()} // Convertissez le nombre en chaîne de caractères
              onChange={onInputChange} >

              <option value={0}>--None--</option>
              <option value={1}>Phase 1</option>
              <option value={2}>Phase 2</option>
            </select>
            </div>


            


            <div className='input-box'>
                <span class='detailss'>Nom / Titre</span>
                <input
                  type="text"
                  class="form-control input-responsive"
                  placeholder="Entrer le nom du Projet"
                  name="nom"
                  value={petitprojet.nom}
                  onChange={onInputChange}
                />
            </div>





            <div className='input-box'>
                <span class='detailss'>Description</span>
                <input
                  type="text"
                  class="form-control input-responsive"
                  placeholder="Entrer la description du Projet"
                  name="description"
                  value={petitprojet.description}
                  onChange={onInputChange}
                />
            </div>

            <div class='input-box'>
                <span class='detailss'>Type</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  name="type"
                  value={petitprojet.type}
                  onChange={onInputChange}
                />
            </div>

          
          {/** 
            <div className='input-box'>
                <span className='detailss'>Rang de priorisation</span>
                <SelectPriorite
                    value={petitprojet.rangdepriorisation}
                    onChange={value => onInputChange({ target: { name: 'rangdepriorisation', value: value.toString() } })}
                />
            </div>


<div className='input-box'>
    <span className='detailss'>Rang de priorisation</span>
    <select
        className="form-control col-md" // Ajoutez la classe col-md-6 pour définir la largeur à 50%
        name="rangdepriorisation"
        value={petitprojet.rangdepriorisation.toString()}
        onChange={onInputChange} >

        <option value={0}>--None--</option>
        <option value={1}>Rang 1</option>
        <option value={2}>Rang 2</option>
        <option value={3}>Rang 3</option>
        <option value={4}>Rang 4</option>
        <option value={5}>Rang 5</option>
        <option value={6}>Rang 6</option>
        <option value={7}>Rang 7</option>
        <option value={8}>Rang 8</option>
        <option value={9}>Rang 9</option>
    </select>
</div>
*/}


<div className='input-box'>
    <span className='detailss'>Rang de priorisation</span>
    <input
        type="number"
        className="form-control"
        placeholder="Rang de Priorisation"
        name="rangdepriorisation"
        value={petitprojet.rangdepriorisation}
        onChange={onInputChange}
    />
</div>



            <div className='input-box'>
                <span class='detailss'>Date de Début</span>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date de Début"
                  name="datedebut"
                  value={petitprojet.datedebut}
                  onChange={onInputChange}
                />
            </div>

            <div className='input-box'>
                <span class='detailss'>Date de Fin</span>
                    <input
                  type="date"
                  className="form-control"
                  placeholder="Date de Fin"
                  name="datefin"
                  value={petitprojet.datefin}
                  onChange={onInputChange}
                />
            </div>
        </div>

        <div className='input-box'>
            <span className='detailss'>Secteur / Domaine d'intervention</span>
            <input
                type="text"
                className="form-control"
                placeholder="Domaine d'intervention"
                name="secteurdintervention"
                value={petitprojet.secteurdintervention}
                onChange={onInputChange}
            />
        </div>

{/** 
            <div class='input-box'>
                <span class='detailss'>Nombre de bénéficiaires Indirects</span>
                    <input
                  type="text"
                  className="form-control"
                  placeholder="bénéficiaires Indirects"
                  name="nmbreBeneficiaireIndirect"
                  value={petitprojet.nmbreBeneficiaireIndirect}
                  onChange={onInputChange}
                />
            </div>
        
        
            <div className='input-box'>
                <span className='detailss'>Nombre de bénéficiaires directs Hommes</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder="beneficiaires Filles Directs"
                    name="nmbreGarcondirect"
                    value={petitprojet.nmbreGarcondirect}
                    onChange={onInputChange}
                />
            </div>

            <div className='input-box'>
                <span className='detailss'>Nombre de bénéficiaires directs estimé Femmes</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Beneficiaires Garcon Directs"
                    name="nmbreFilledirect"
                    value={petitprojet.nmbreFilledirect}
                    onChange={onInputChange}
                />
            </div>

     */}  

       {/** <!-- Catégorie: Géolocalisation (GPS) -->*/} 
        <div className='project-category'>
            <h3 class='category-title'>Géolocalisation (GPS)</h3>
            <div class='input-box'>
                <span class='detailss'>Longitude</span>
                <input
                    type="number"
                    name="longitude"
                    value={petitprojet.longitude}
                    onChange={onInputChange}
                    className="form-control"
                    placeholder="Longitude"
                  />
         
            </div>
            <div className='input-box'>
                <span class='detailss'>Latitude</span>
                <input
                  type="number"
                  name="latitude"
                  value={petitprojet.latitude}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="Latitude"
                />
            </div>
        </div>

        {/** <!-- Catégorie: Quartier -->*/}
        <div className='project-category'>
            <h3 class='category-title'>Quartier</h3>
            <div class='input-box'>
                <span class='detailss'>Quartier</span>
                <select
                  className="form-control"
                  name="quartierId"
                  value={petitprojet.quartierId}
                  onChange={onInputChange}
                >
                  <option value="">-- Sélectionner le quartier --</option>
                  {quartiers.map((quartier) => (
                    <option key={quartier.id} value={quartier.id}>
                      {quartier.nom}
                    </option>
                  ))}
                </select>
            </div>
            <div className='input-box'>
                <span class='detailss'>Zone</span>
                <input type='text' placeholder=''/>
            </div>
        </div>



      {/**  <!-- Catégorie: Budget --> */}
        <div className='project-category'>
            <h3 className='category-title'>Budget</h3>
            <div className='input-box'>
                <span className='detailss'>Montant Main d'oeuvre Qualifée</span>
                    <input
                    type="curency"
                    className="form-control"
                    placeholder="montant mainOeuvre Qualifier"
                    name="montantmainOeuvreQualifier"
                    value={petitprojet.montantmainOeuvreQualifier}
                    onChange={onInputChange}
                  />
            </div>

            <div className='input-box'>
                <span className='detailss'>Montant Main d'oeuvre Non Qualifée</span>
                 <input
                  type="curency"
                  className="form-control"
                  placeholder="montant main oeuvre NonQualifier"
                  name="montantmainoeuvreNonQualifier"
                  value={petitprojet.montantmainoeuvreNonQualifier}
                  onChange={onInputChange}
                />
            </div>
            <div className='input-box'>
                <span className='detailss'>Montant Assurance</span>
                    <input
                    type="curency"
                    className="form-control"
                    placeholder="Montant Assurance"
                    name="montantAssurance"
                    value={petitprojet.montantAssurance}
                    onChange={onInputChange}
                  />
            </div>
            <div className='input-box'>
                <span className='detailss'>Montant Matériels / Matériaux</span>
                <input
                type="curency"
                className="form-control"
                placeholder="Montant Materiaux"
                name="montantMateriaux"
                value={petitprojet.montantMateriaux}
                onChange={onInputChange}
              />
            </div> 
        </div>
       
        <div className='button-project'>
        <button type="submit" className="btn btn-outline-success">
          Enregistrer
        </button>

        <Link
          className="btn btn-outline-danger mx-5"
          to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/${typeprojetId}`}
        >
          Annuler
        </Link>
      </div>

        {/** <!-- Boutons -->*/}
        
    </form>
</div>



















 {/*


<h2 className="titretext">Enregistrer un Projet</h2>















<div className="row front-col">
  <div className="col">

    <h2 className="information">Information</h2>

*/}{/**
    <form onSubmit={onSubmit}>

    <div class="form-row">
    <div class="col">
      <label for="nom" class="form-label">
        <h2 class="nom-champ">Nom / Titre</h2>
      </label>
      <input
        type="text"
        class="form-control input-responsive"
        placeholder="Entrer le nom du Projet"
        name="nom"
        value={petitprojet.nom}
        onChange={onInputChange}
      />
    </div>
    <div class="col">
      <label for="description" class="form-label">
        <h2 class="nom-champ">Description</h2>
      </label>
      <input
        type="text"
        class="form-control input-responsive"
        placeholder="Entrer la description du Projet"
        name="description"
        value={petitprojet.description}
        onChange={onInputChange}
      />
    </div>
  </div>
  
 */}



{/** 

      <div className="row gps">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="type" className="form-label">
              <h2 className='nom-champ'>Type</h2>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type"
              name="type"
              value={petitprojet.type}
              onChange={onInputChange}
            />
          </div>

          <div className="col">
            <label htmlFor="rangdepriorisation" className="form-label">
              <h2 className='nom-champ'>Rang de priorisation</h2>
            </label>
            <select
              className="form-control"
              name="rangdepriorisation"
              value={petitprojet.rangdepriorisation.toString()} // Convertissez le nombre en chaîne de caractères
              onChange={onInputChange} >

              <option value={0}>--None--</option>
              <option value={1}>Rang 1</option>
              <option value={2}>Rang 2</option>
              <option value={3}>Rang 3</option>
              <option value={4}>Rang 4</option>
              <option value={5}>Rang 5</option>
              <option value={6}>Rang 6</option>
              <option value={7}>Rang 7</option>
              <option value={8}>Rang 8</option>
              <option value={9}>Rang 9</option>
            </select>
          </div>
        </div>
      </div>

      <div className="col date">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="datedebut" className="form-label">
              <h2 className='nom-champ'>Date de Début</h2>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Date de Début"
              name="datedebut"
              value={petitprojet.datedebut}
              onChange={onInputChange}
            />
          </div>

          <div className="col">
            <label htmlFor="datefin" className="form-label">
              <h2 className='nom-champ'>Date de Fin</h2>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Date de Fin"
              name="datefin"
              value={petitprojet.datefin}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>

      <div className="row gps">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nmbreFilledirect" className="form-label">
              <h2 className='nom-champ'>Nombre de Fille Direct</h2>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Nombre de Bénéficiaire Fille Direct"
              name="nmbreFilledirect"
              value={petitprojet.nmbreFilledirect}
              onChange={onInputChange}
            />
          </div>

          <div className="col">
            <label htmlFor="nmbreGarcondirect" className="form-label">
              <h2 className='nom-champ'>Nombre de Garçon Direct</h2>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Nombre de Bénéficiaire Garçon Direct"
              name="nmbreGarcondirect"
              value={petitprojet.nmbreGarcondirect}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>

      <div className="col beneficiaireind">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nmbreBeneficiaireIndirect" className="form-label">
              <h2 className='nom-champ'>Nombre de Bénéficiaire Indirect</h2>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Nombre de Bénéficiaire Indirect"
              name="nmbreBeneficiaireIndirect"
              value={petitprojet.nmbreBeneficiaireIndirect}
              onChange={onInputChange}
            />
          </div>

          <div className="col">
            <label htmlFor="secteurdintervention" className="form-label">
              <h2 className='nom-champ'>Secteur/ Domaine d'Intervention</h2>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Secteur/ Domaine d'Intervention"
              name="secteurdintervention"
              value={petitprojet.secteurdintervention}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>

      <div className="row gps">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="longitude" className="form-label">
              <h2 className='nom-champ'>GPS Longitude</h2>
            </label>
            <input
              type="number"
              name="longitude"
              value={petitprojet.longitude}
              onChange={onInputChange}
              className="form-control"
              placeholder="Longitude"
            />
          </div>

          <div className="col">
            <label htmlFor="latitude" className="form-label">
              <h2 className='nom-champ'>GPS Latitude</h2>
            </label>
            <input
              type="number"
              name="latitude"
              value={petitprojet.latitude}
              onChange={onInputChange}
              className="form-control"
              placeholder="Latitude"
            />
          </div>
        </div>
      </div>

      <div className="col quartier">
        <label htmlFor="quartierId" className="form-label">
          Quartier
        </label>
        <select
          className="form-control"
          name="quartierId"
          value={petitprojet.quartierId}
          onChange={onInputChange}
        >
          <option value="">-- Sélectionner le quartier --</option>
          {quartiers.map((quartier) => (
            <option key={quartier.id} value={quartier.id}>
              {quartier.nom}
            </option>
          ))}
        </select>
      </div>

      <h2 className="budget">Budget</h2>

      <div>
        <div className="row gps">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="montantmainOeuvreQualifier" className="form-label">
                <h2 className='nom-champ'>montant mainOeuvre Qualifier </h2>
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder="montant mainOeuvre Qualifier"
                name="montantmainOeuvreQualifier"
                value={petitprojet.montantmainOeuvreQualifier}
                onChange={onInputChange}
              />
            </div>

            <div className="col">
              <label htmlFor="montantmainoeuvreNonQualifier" className="form-label">
                <h2 className='nom-champ'>montant main oeuvre NonQualifier</h2>
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder="montant main oeuvre NonQualifier"
                name="montantmainoeuvreNonQualifier"
                value={petitprojet.montantmainoeuvreNonQualifier}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>

        <div className="col beneficiaireind">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="montantAssurance" className="form-label">
                <h2 className='nom-champ'>Montant Assurance</h2>
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder="Montant Assurance"
                name="montantAssurance"
                value={petitprojet.montantAssurance}
                onChange={onInputChange}
              />
            </div>

            <div className="col">
              <label htmlFor="montantMateriaux" className="form-label">
                <h2 className='nom-champ'>Montant Materiaux</h2>
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder="Montant Materiaux"
                name="montantMateriaux"
                value={petitprojet.montantMateriaux}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>

        <input type="number" name="montantTotal" value={petitprojet.montantTotal} readOnly />
        <input type="number" name="montantTotalSalaire" value={petitprojet.montantTotalSalaire} readOnly />
      </div>

      <div className='bouton'>
        <button type="submit" className="btn btn-outline-success">
          Enregistrer
        </button>

        <Link
          className="btn btn-outline-danger mx-5"
          to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/${typeprojetId}`}
        >
          Annuler
        </Link>
      </div>
    </form>
  </div>
</div>*/}
    </div>
  );
}
