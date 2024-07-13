import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';


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
		<Box>
    <form onSubmit={handleSubmit} >
				<TextField 
					type="text"  
					label="Nom du Medicament" 
					onChange={onNomChange} 
					value={curNom != null ? curNom : ""} 
					variant="outlined"
					margin="normal"
					/>
					 <br/>
        
				<TextField
							label="Prix du Medicament"
							type="number"
							value={curPrix != null ? curPrix : 0} 
							onChange={onPrixChange}

							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: 0 }}
							variant="outlined"
							margin="normal"
				/>
				<br />

				<TextField
					label="Description..."
					multiline
					rows={4}
					variant="outlined"
					onChange={onDescriptionChange} 
					value={curDescription != null ? curDescription : ""}
					margin="normal"
				/>

				<br/>
        
				<Button 
					type="submit" 
					variant="contained"
					color="success"
					margin="normal"
				>
						{ aModifier == null ? "Ajouter" : "Modifier" }
				</Button>

    </form>
		</Box>
  )
}

export default AjouterMedicament
