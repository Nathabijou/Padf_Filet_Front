import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function PhotoProjet() {
  const { petitProjetId, nomProjet, programId, composanteId, typeprojetId } = useParams();
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No Selected file');
  const [categorie, setCategorie] = useState('avant');
  const [isMobile, setIsMobile] = useState(false);
  const baseUrl = useBaseUrl();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/petitprojet/${petitProjetId}/categorie/${categorie}`);
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        setLoading(false);
      }
    };

    fetchPhotos();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change to true if window width is less than 768px
    };

    handleResize(); // Check initial window width
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    };
  }, [petitProjetId, categorie]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setImage(file);
  };

  const handleSave = async () => {
    if (!image) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('categorie', categorie);

      const response = await axios.post(`${baseUrl}/petitprojet/${petitProjetId}/categorie/${categorie}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Image uploaded successfully:', response.data);
      alert("Photo enregistrée avec succès!");

      setFileName('No Selected file');
      setImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Erreur lors de l'enregistrement de la photo. Veuillez réessayer.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loading ? (
        <div>Chargement en cours...</div>
      ) : (
        <div className="photo-list" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
          <Link to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitProjetId}`}>
            <i className="fleche bi bi-arrow-left"></i>
          </Link>
          <h3 className='titre-title'> {decodeURIComponent(nomProjet)}</h3>
          <div className="barre-soulignement"></div>
          <main className='main-mai'>
            <form action=''>
              <input type='file' accept='image/*' className='input-field' hidden onChange={handleFileUpload} />
              {image ? (
                <img src={URL.createObjectURL(image)} width={60} height={60} alt='fileName' />
              ) : (
                <>
                  <MdCloudUpload color='#1475cf' size={35} onClick={() => document.querySelector(".input-field").click()} />
                  
                </>
              )}
            </form>
            <section className='uploaded-row'>
              <AiFillFileImage color='#1475cf' />
              <span>
                {fileName}
                <MdDelete onClick={() => { setFileName("No Selected File"); setImage(null); }} />
              </span>
            </section>
            <div>
              <button className='bouton-save' onClick={handleSave}>Enregistrer</button>
              <select className='liste-deroulante' value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                <option value="avant">Avant</option>
                <option value="pendant">Pendant</option>
                <option value="apres">Après</option>
              </select>
            </div>

           
          </main> 
          <h2 className='photo-titre'>Photos {categorie.charAt(0).toUpperCase() + categorie.slice(1)} </h2>
          <div className="photo-list">
            {isMobile ? (
              <div className="mobile-photo-list">
                {photos.map((photo, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <img src={`data:image/jpeg;base64,${photo.image}`} className="rounded float-start" alt={`Photo ${photo.id}`} style={{ width: '100%', height: '100%' }} />
                  </div>
                ))}
              </div>
            ) : (
              <table className='photo-table'>
                <tbody className='photo-table'>
                  <tr>
                    {photos.slice(0, 3).map((photo, index) => (
                      <td key={index} style={{ width: 'auto', height: 'auto', backgroundColor: '#f0f0f0', padding: 'auto', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '3 8px 10px 0 rgba(48, 49, 51, 0.653)' }}>
                        <img src={`data:image/jpeg;base64,${photo.image}`} className="rounded float-start" alt={`Photo ${photo.id}`} style={{ width: '100%', height: '50%' }} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoProjet;
