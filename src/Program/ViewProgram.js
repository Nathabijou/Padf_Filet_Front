import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrl';

export default function ViewProgram() {
  const { id } = useParams();
  const baseUrl= useBaseUrl();
  const [programs, setProgram] = useState({
    code: '',
    nom: '',
    description: '',
    bailleur: '',
    partenaire: '',
    mdod: '',
    mo: '',
  });

  useEffect(() => {
    let isMounted = true; // Utilisation d'une variable pour suivre si le composant est toujours monté

    const loadProgram = async () => {
      try {
        
        const response = await axios.get(`${baseUrl}/programs/${id}`, programs);

        if (isMounted) {
          const programData = response.data;
          console.log('Program Data:', programData);
          setProgram(programData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du programme :', error);
      }
    };

    loadProgram();

    // Cleanup function pour mettre à jour le statut du composant lorsqu'il est démonté
    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('Program State:', programs);

  return (
    <div className="container">
       <div className='titrereports slideFromRight'>
  &lt;&lt;   Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes    &gt;&gt;
</div>
      <div className="imviews">
        <img src={require('./entete.png')} alt="entete" />
      </div>

      <div className="row">
        <div className="offset border rounded shadow views-table">
          <div className="card">
            <div className="card-header">
              Détails du programme :  {programs.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Code :</b> {programs.code}
                </li>
                <li className="list-group-item">
                  <b>Nom :</b> {programs.nom}
                </li>
                <li className="list-group-item">
                  <b>Déscription :</b> {programs.description}
                </li>
                <li className="list-group-item">
                  <b>Bailleur :</b> {programs.bailleur}
                </li>
                <li className="list-group-item">
                  <b>M.O :</b> {programs.mo}
                </li>
                <li className="list-group-item">
                  <b>MDOD :</b> {programs.mdod}
                </li>
                <li className="list-group-item">
                  <b>Partenaire :</b> {programs.partenaire}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/App">
            Retour
          </Link>
        </div>
      </div>

      <div className="imageresponsable">
        <img
          className="person-photo"
          src={require('./natha.jpg')}
          alt="Photo de la personne"
        />
      </div>
    </div>
  );
}
