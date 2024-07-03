import React, { useState, useEffect } from 'react'
import AjouterMedicament from './AjouterMedicament'
import DetaillerMedicament from './DetaillerMedicament'
import Medicament from './Medicament'
import './pharmacie.css'
import axios from 'axios'

function Pharmacie() {
    const [ medicaments, setMedicaments] = useState([]);
		
    const [ isLoading, setIsLoading] = useState(true);
    const [ error, setError ] = useState(null);

		useEffect(() => {
			axios.get('http://localhost:3333/medicaments')
			.then(res => {
					const medics = res.data;
					setMedicaments(medics);
					setIsLoading(false);
			})
			.catch(err => {setError(err); setIsLoading(false);})
	}, []);

    const [ medicamentActif, setMedicamentActif ] = useState(null);
		const [ enModification, setEnModification ] = useState(null);

    function ajouterMedicament(medic) {
			axios.post('http://localhost:3333/medicaments/', { ...medic } )
        .then(response => {
            const newMedic = response.data;
            setMedicaments([...medicaments, newMedic]);
        })
        .catch(error => console.log('MyError = '+error));			
    }

		function supprimerMedicament(id) {
			axios.delete(`http://localhost:3333/medicaments/${id}`)
        .then(res => setMedicaments( prevState => (
            prevState.filter( medic => medic.id !== id)
        )))
        .catch( err => setError(error))
		}

		function modifierMedicament(medic) {
			axios.put(`http://localhost:3333/medicaments/${medic.id}`, { ...medic } )
        .then(response => {
            const newMedic = response.data;
            setMedicaments([...medicaments, newMedic]);
        })
        .catch(error => console.log('MyError = '+error));	

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
