import React, { useEffect, useState } from 'react'

function AjouterMedicament({ addMedicament, aModifier, onModifier }) {

	const [ curNom, setCurNom ]  = useState("");
	const [ curPrix, setCurPrix ] = useState(0);
	const [ curDescription, setCurDescription ] = useState("");

	useEffect(() => {
		if (aModifier !== null) {	
			setCurNom(aModifier.nom);
			setCurPrix(aModifier.prix);
			setCurDescription(aModifier.description);
		}
	}, [aModifier]);

	

	function onNomChange(e) {
		setCurNom(e.target.value);
	}

	function onPrixChange(e) {
		setCurPrix(e.target.value);
	}

	function onDescriptionChange(e) {
		setCurDescription(e.target.value);
	}
  
  function handleSubmit(event) {
		
    event.preventDefault();

		if (curNom === "" || curPrix === 0 || curDescription === "") {
			alert('Veuillez remplir tous les champs');
			return;
		}

		let medic = {};

		if(aModifier) {
			medic = {
				id: aModifier.id,
				nom: curNom,
				prix: curPrix,
				description: curDescription
			};

			onModifier(medic);
		} else {
			medic = {
				nom: curNom,
				prix: curPrix,
				description: curDescription
			};

			addMedicament(medic);
		}

		setCurNom("");
		setCurPrix(0);
		setCurDescription("");
		
  }
  
  return (
    <form onSubmit={handleSubmit} >
        <input type="text" onChange={onNomChange} value={curNom != null ? curNom : ""} placeholder="Nom du Medicament" /> <br/>
        <input type="number" onChange={onPrixChange} value={curPrix != null ? curPrix : 0} placeholder="Prix du Medicament" /> <br/>
        <textarea onChange={onDescriptionChange} value={curDescription != null ? curDescription : ""} placeholder="Description..."></textarea> <br/>
        
				<input type="submit" value={ aModifier == null ? "Ajouter" : "Modifier" } />
    </form>
  )
}

export default AjouterMedicament
