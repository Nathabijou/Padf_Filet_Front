import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function PhotoBeneficiaire() {
  const { beneficiaireId, nomBeneficiaire } = useParams(); 
  const { petitprojetId ,nomProjet} = useParams();
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No Selected file');
  const baseUrl = useBaseUrl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/beneficiaire/${beneficiaireId}`);
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [beneficiaireId]);

  useEffect(() => {
    handleResize(); // Pour définir isMobile lors du chargement initial
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Définir isMobile en fonction de la largeur de l'écran
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setImage(file);
  };

  const handleSave = async () => {
    // Vérifiez si une image est sélectionnée
    if (!image) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image); // Ajoutez l'image à FormData

      const response = await axios.post(`${baseUrl}/beneficiaire/${beneficiaireId}`,
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
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loading ? (
        <div>Chargement en cours...</div>
      ) : (
        <div className="photo-list" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
          <h3 className='titre-title'>  Projet {decodeURIComponent(nomProjet)} </h3>
          
          <div className="barre-soulignement"></div>
          <main className='main-mai'>
            <form action=''>
              <input type='file' accept='image/*' className='input-field' hidden onChange={handleFileUpload} />
              {image ? (
                <img src={URL.createObjectURL(image)} width={60} height={60} alt='fileName' />
              ) : (
                <>
                  <MdCloudUpload color='#1475cf' size={35} onClick={() => document.querySelector(".input-field").click()} />
                  <p className='browse'>Browse Files To Upload</p>
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
            <button className='bouton-save' onClick={handleSave}>Enregistrer</button>
          </main>
          <h2 className='photo-titre'>Photos de: {decodeURIComponent(nomBeneficiaire)}</h2>

          <div className="photo-list">
            {isMobile ? (
              <div className="vertical-photos">
                {photos.map((photo, index) => (
                  <img key={index} src={`data:image/jpeg;base64,${photo.image}`} className="rounded float-start" alt={`Photo ${photo.id}`} style={{ width: '100%', height: 'auto' }} />
                ))}
              </div>
            ) : (
              <table className='photo-table'>
                <tbody className='photo-table'>
                  <tr>
                    {photos.map((photo, index) => (
                      <td key={index} style={{ width: 'auto', height: '300px', marginTop:'20px', backgroundColor: '#f0f0f0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '3 8px 10px 0 rgba(48, 49, 51, 0.653)' }}>
                        <img src={`data:image/jpeg;base64,${photo.image}`} className="rounded float-start" alt={`Photo ${photo.id}`} style={{ width: '100%', height: '100%' }} />
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

export default PhotoBeneficiaire;
