import React, { useState, useEffect } from 'react'
import AjouterMedicament from './AjouterMedicament'
import DetaillerMedicament from './DetaillerMedicament'
import Medicament from './Medicament'
import './pharmacie.css'
import axios from 'axios'

function Pharmacie() {
    const [ medicaments, setMedicaments] = useState([]);

    const [ searchResults, setSearchResults ] = useState(null);
		
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
            
            setMedicaments(prevMeds => {
              return [ ...prevMeds.filter((med) => med.id !== newMedic.id), newMedic ];
            });
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

    function handleSearchChange(e) {
      const terms = e.target.value;

      if(terms === "") {
        // the list is the complete set
        setSearchResults(null);
        
      } else {
        // go through the list
        // filter by name.contains(term)
        // searchResults is the result
        setSearchResults(
          medicaments.filter(medic => medic.nom.includes(terms))
        );
        // if no results, array is []
        // display a message
        // should highlight the term in the results list
        // for that, put 2 tags together and style

      }
    }

    function showResults() {
      if ( searchResults.length === 0 ) {
        return (
          <div>
            Aucun Resultat...
          </div>
        )
      }
      return (
        searchResults.map(
          currentMed => <Medicament key={currentMed.id} medic={currentMed} supprimerMedic={supprimerMedicament} detailler={afficherDetails} />
        )
      )
    }

  return (
    <div className='pharmacie'>
      <div className="search">
        <input type="text" placeholder="Rechercher un Medicament..." onChange={handleSearchChange} />
      </div>
      <AjouterMedicament addMedicament={ajouterMedicament} aModifier={ enModification !== null ? medicamentActif : null } onModifier={modifierMedicament}  />
      { 
        medicamentActif ? 
        <DetaillerMedicament medic={medicamentActif} onModifier={activerModifier} onAnnuler={annulerDetails} /> : ""
      } 
      <h2>Liste des Medicaments</h2>
      { 
        searchResults !== null ? 
        
        showResults()
        
        :
        medicaments.map(
            currentMed => <Medicament key={currentMed.id} medic={currentMed} supprimerMedic={supprimerMedicament} detailler={afficherDetails} />
        )
      }
    </div>
  )
}

export default Pharmacie
