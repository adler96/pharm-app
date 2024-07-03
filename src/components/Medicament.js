import React from 'react'

function Medicament({ medic, supprimerMedic, detailler }) {
	
	function onDelete() {
		supprimerMedic(medic.id);
	}

	function onDetails() {
		detailler(medic.id);
	}
  
	return (
    <div>
      <a onClick={ onDetails }>{medic.nom} </a>
      <span>{ medic.prix} F </span>
      <button onClick={onDelete}>Supprimer</button>
    </div>
  )
}

export default Medicament
