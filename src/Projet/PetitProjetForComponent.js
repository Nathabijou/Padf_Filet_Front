import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PetitProjetForComponent() {
  const [petitProjet, setPetitProjets] = useState([]);
  const { componentId } = useParams(); // Obtenez l'ID du composant de l'URL

  useEffect(() => {
    loadPetitProjets(componentId);
  }, [componentId]);

  const loadPetitProjets = async (componentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/projectcomponent/${componentId}/petitprojet`);
      setPetitProjets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Petits Projets pour le Composant de Projet</h2>

      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Nom</th>
              <th>Description</th>
              {/* Autres colonnes */}
            </tr>
          </thead>
          <tbody>
            {petitProjet.map((petitProjet) => (
              <tr key={petitProjet.id}>
                <td>{petitProjet.code}</td>
                <td>{petitProjet.name}</td>
                <td>{petitProjet.description}</td>
                {/* Autres colonnes */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
