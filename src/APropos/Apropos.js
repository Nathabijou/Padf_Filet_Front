import React, { useState } from 'react';
 // Importer le fichier CSS pour ce composant

function Apropos() {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique pour envoyer le message par e-mail
        console.log("Message envoyé :", message);
        // Réinitialiser le champ de message après l'envoi
        setMessage('');
    };
    
    return (
        <div className="containers">
            <div className="header">
            <img src="./natha.jpg" alt="Directrice" className="director-photo" />
            <div className="header-content">
                <h2 className="title">À propos du Programme Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes en Haïti</h2>
                <p className="description">Le Programme Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes est une initiative 
                financée par la Banque Interaméricaine de Développement (BID) et mise en œuvre par la Pan American Development Foundation (PADF) 
                en partenariat avec le Fonds d'Assistance Économique et Sociale (FAES) et VIVARIO. Ce programme ambitieux vise à améliorer les 
                conditions de vie des jeunes dans les quartiers les plus vulnérables d'Haïti, en leur fournissant un soutien social temporaire 
                ainsi que des compétences pour leur permettre de s'intégrer pleinement dans la société.</p>
            </div>
</div>

            
            <h3 className="sub-title">Directrice du Programme : Kerline Pierre Rock</h3>
            <p className="description">Kerline Pierre Rock est une professionnelle dévouée qui dirige le 
            Programme Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes en Haïti avec passion et 
            engagement. Titulaire d'un doctorat en gestion de projet, elle apporte une expertise précieuse à cette initiative.
             Avec une vaste expérience dans le domaine du développement social et économique, elle est déterminée à faire une différence 
             significative dans la vie des jeunes Haïtiens en situation de vulnérabilité.</p>
            
            <h3 className="sub-title">Notre mission</h3>
            <p className="description">La mission du Programme est de fournir un filet de sécurité sociale temporaire aux jeunes Haïtiens 
            les plus défavorisés, en leur offrant un soutien financier et des ressources pour répondre à leurs besoins immédiats. En parallèle,
             nous nous engageons à leur fournir des compétences et des formations pour renforcer leurs capacités et leur permettre de devenir 
             des membres actifs et productifs de la société.</p>
            
            <h3 className="sub-title">Notre équipe</h3>
            <p className="description">Nous sommes fiers de compter sur une équipe dévouée et diversifiée, composée de professionnels passionnés
             par la cause du développement social en Haïti. Nos membres d'équipe apportent une expertise variée dans des domaines tels 
             que l'éducation, la santé, l'emploi et le développement communautaire, ce qui nous permet d'aborder les défis complexes auxquels 
             sont confrontés les jeunes dans les quartiers vulnérables.</p>
            
            <h3 className="sub-title">Nos valeurs</h3>
            <p className="description">Au cœur de notre action, nous plaçons des valeurs fondamentales telles que l'équité, la solidarité, 
            l'intégrité et le respect. Nous croyons en l'importance de l'inclusion sociale et de l'égalité des chances pour tous les jeunes, quel que soit leur contexte socio-économique. Nous nous engageons à agir avec transparence et responsabilité dans toutes nos activités, en veillant à ce que les bénéficiaires du Programme soient traités avec dignité et respect.</p>
            
            <h3 className="sub-title">Notre vision</h3>
            <p className="description">
                    Notre vision pour l'avenir est de voir une société haïtienne où tous les jeunes ont accès à des 
                    opportunités équitables et à un soutien adéquat pour réaliser leur plein potentiel. Nous aspirons à un avenir où la pauvreté 
                    et l'exclusion sociale ne sont plus des barrières insurmontables, mais où chaque jeune peut espérer un avenir meilleur grâce 
                    à l'éducation, à l'emploi et à la participation active dans la société.
            </p>
            
            <footer className="footer">
                <h3 className="footer-title">Contact</h3>
                <p className="footer-title">Téléphone : +50946813121</p>
                <p className="footer-title">E-mail : jnbijou@padf.org</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="message" className="footer-label">Envoyez-nous un message :</label><br />
                    <textarea id="message" name="message" value={message} onChange={handleChange} className="footer-textarea" /><br />
                    <button type="submit" className="footer-button">Envoyer</button>
                </form>
            </footer>
        </div>
    );
}

export default Apropos;
