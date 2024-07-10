import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';


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
				prix: curPrix.toString(),
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
				<Input type="text"  placeholder="Nom du Medicament" onChange={onNomChange} value={curNom != null ? curNom : ""} /> <br/>
{/*         
				<NumberInput
					placeholder="Prix du Medicament"	
					min={0}	
					value={curPrix != null ? curPrix : 0}
					onChange={onPrixChange}
				/> <br/> */}
				<NumberInput
					aria-label="Demo number input"
					placeholder="Type a number…"
				/>

        <textarea onChange={onDescriptionChange} value={curDescription != null ? curDescription : ""} placeholder="Description..."></textarea> <br/>
        
				<Button type="submit" variant="contained">{ aModifier == null ? "Ajouter" : "Modifier" }</Button>
    </form>
  )
}

export default AjouterMedicament
