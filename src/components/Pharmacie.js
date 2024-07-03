import React, { useState } from 'react'
import AjouterMedicament from './AjouterMedicament'
import DetaillerMedicament from './DetaillerMedicament'
import Medicament from './Medicament'
import './pharmacie.css'

function Pharmacie() {
    const [ medicaments, setMedicaments] = useState([
        {
            id: 1,
            nom: "Doliprane",
            prix: 1589,
            description: "Traitement symptomatique des douleurs d'intensite legere a moderee et/ou des etats febriles"
        },
        {
            id: 2,
            nom: "Fervex",
            prix: 2000,
            description: "Pour les Fievres et Grippes"
        },
        {
            id: 3,
            nom: "Efferalgan",
            prix: 1187,
            description: "Efferalgan pour Douleurs et Fievres"
        }
    ])

    const [ medicamentActif, setMedicamentActif ] = useState(null);
		const [ currentId, setCurrentId ] = useState(4);
		const [ enModification, setEnModification ] = useState(null);

    function ajouterMedicament(medic) {
			
			setMedicaments(prevMedics => {
				medic = { id: currentId, ...medic };
				return [...prevMedics, medic];
			});

			setCurrentId(prevId => prevId + 1);
			
    }

		function supprimerMedicament(id) {
			setMedicaments(prevMedics => {
				return prevMedics.filter((medic) => medic.id !== id);
			})
		}

		function modifierMedicament(medic) {
			// mettre a jour le state
			setMedicaments(prevMedics => {
				return [ ...medicaments.filter(med => med.id !== medic.id), medic ];
			});

			// pas de medicament en modification
			setEnModification(null);
			setMedicamentActif(medic);
		}

		function afficherDetails(id) {
			const medic = medicaments.find(med => med.id === id);
			
			setMedicamentActif(medic);
		}

		function activerModifier() {
			setEnModification(medicamentActif);
		}

		function annulerDetails() {
			setMedicamentActif(null);
			setEnModification(null);
		}


  return (
    <div className='pharmacie'>
      <AjouterMedicament addMedicament={ajouterMedicament} aModifier={ enModification !== null ? medicamentActif : null } onModifier={modifierMedicament}  />
      { 
        medicamentActif ? 
        <DetaillerMedicament medic={medicamentActif} onModifier={activerModifier} onAnnuler={annulerDetails} /> : ""
      } 
      <h2>Liste des Medicaments</h2>
      { 
        medicaments.map(
            currentMed => <Medicament key={currentMed.id} medic={currentMed} supprimerMedic={supprimerMedicament} detailler={afficherDetails} />
        )
      }
    </div>
  )
}

export default Pharmacie
