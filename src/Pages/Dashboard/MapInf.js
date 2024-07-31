import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapInf() {
    const mapRef = useRef(null);

    useEffect(() => {
        // Initialiser la carte Leaflet
        const map = L.map(mapRef.current).setView([0, 0], 2);

        // Ajouter un fond de carte OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Mettre à jour la taille de la carte une fois le rendu terminé
        map.invalidateSize();

        return () => {
            // Nettoyer lors du démontage du composant
            map.remove();
        };
    }, []);

    return <div ref={mapRef} style={{ height: '100px' }}></div>;
}

export default MapInf;
