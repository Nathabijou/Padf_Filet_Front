import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Checkbox, Input, DatePicker } from 'antd';
import axios from 'axios';
import { useBaseUrl } from '../../BaseUrl';

const { Option } = Select;

const CreateReport = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();

   // Déclaration des états
   const [zones, setZones] = useState([]);
   const [composantes, setComposantes] = useState([]);
   const [petitsProjets, setPetitsProjets] = useState([]);
   const [selectedZones, setSelectedZones] = useState([]);
   const [selectedComposantes, setSelectedComposantes] = useState([]);
   const [selectedPetitsProjets, setSelectedPetitsProjets] = useState([]);
   const [reportName, setReportName] = useState('');
   const [reportDate, setReportDate] = useState(null);
   const [dataLoaded, setDataLoaded] = useState(false);

 
  // Utilisation de useEffect pour charger les données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const zonesResponse = await axios.get(`${baseUrl}/zone`);
        setZones(zonesResponse.data);

        const composantesResponse = await axios.get(`${baseUrl}/composante`);
        setComposantes(composantesResponse.data);

        const petitsProjetsResponse = await axios.get(`${baseUrl}/petitprojet`);
        if (Array.isArray(petitsProjetsResponse.data)) {
          setPetitsProjets(petitsProjetsResponse.data);
        } else {
          console.error('La réponse de l\'API pour les petits projets n\'est pas un tableau.', petitsProjetsResponse.data);
        }

        setDataLoaded(true);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);

   // Fonctions de gestion des changements de sélection
   const handleZoneChange = (value) => setSelectedZones(value);
   const handleComposanteChange = (value) => setSelectedComposantes(value);
   const handlePetitProjetChange = (value) => setSelectedPetitsProjets(value);
 
   // Fonction pour générer le rapport
   const handleGenerateReport = async (e) => {
     e.preventDefault();
 
     try {
       // Vérifier que les données sont chargées
       if (!dataLoaded) {
         console.error('Les données ne sont pas encore chargées. Veuillez réessayer.');
         return;
       }
 
       // Vérifier qu'au moins un champ est sélectionné
       if (selectedZones.length === 0 && selectedComposantes.length === 0 && selectedPetitsProjets.length === 0) {
         console.error('Veuillez sélectionner au moins une zone, une composante ou un petit projet.');
         return;
       }
 
       // Collecter les IDs sélectionnés
       const zoneId = selectedZones.join(',');
       const composanteId = selectedComposantes.join(',');
       const petitprojetId = selectedPetitsProjets.join(',');
 
       // Données du rapport
       const reportData = {
         reportName,
         reportDate,
         // Autres propriétés du rapport selon votre modèle de données
       };

      console.log('Données du rapport prêtes');

      const response = await axios.post(`${baseUrl}/report/create/${zoneId || 'all'}/${composanteId || 'all'}/${petitprojetId || 'all'}`,
        reportData
      );

      // Redirection vers la page du rapport
      navigate(`/App/report`);
    } catch (error) {
      console.error('Erreur lors de la génération du rapport', error);
    }
  };


  return (
    <div className=''>
      <diV className="creerun-rapport">
      <h2 >Créer un Rapport</h2>
      </diV>
      <form onSubmit={handleGenerateReport}>
        <div className=''>
          <label>Nom du Rapport:</label>
          <Input
            style={{ width: '100%' }}
            placeholder="Saisissez le nom du rapport"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </div>

        <div className='resize'>
          <label>Date du Rapport:</label>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Sélectionnez la date du rapport"
            value={reportDate}
            onChange={(date) => setReportDate(date)}
          />
        </div>

        <label>Selection</label>

        <div className='resize'>
          <label>Zones:</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Sélectionnez les zones"
            onChange={handleZoneChange}
          >
            {zones.map((zone) => (
              <Option key={zone.id}>{zone.nom}</Option>
            ))}
          </Select>
        </div>

        <div className='resize'>
          <label>Composantes:</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Sélectionnez les composantes"
            onChange={handleComposanteChange}
          >
            {composantes.map((composante) => (
              <Option key={composante.id}>{composante.nom}</Option>
            ))}
          </Select>
        </div>

        <div className='resize'>
          <label>Petits Projets:</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Sélectionnez les petits-projets" riquired
            
            onChange={handlePetitProjetChange}
          >
            {Array.isArray(petitsProjets) && petitsProjets.map((petitProjet) => (
              <Option key={petitProjet.id}>{petitProjet.nom}</Option>
            ))}
          </Select>
        </div>

        <div>
          <Checkbox>Autre option de rapport</Checkbox>
        </div>

        <Button type="primary" htmlType="submit" className='createreports'>
          Générer le Rapport
        </Button>
      </form>
    </div>
  );
};

export default CreateReport;










      // Appel à l'API pour générer le rapport
     

