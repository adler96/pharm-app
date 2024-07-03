import React from 'react'

function DetaillerMedicament({ medic, onModifier, onAnnuler }) {
  return (
    <div>
      <h3>Details du medicament pour id: {medic.id} </h3>
      <div>
        <strong>Nom:</strong>
        { medic.nom }
      </div>
      <div>
        <strong>Prix:</strong>
        { medic.prix } F
      </div>
      <div>
        <strong>Description:</strong>
        { medic.description }
      </div>
      <div>
        <button onClick={onModifier}>Modifier</button>
        <button onClick={onAnnuler}>Annuler</button>
      </div>
    </div>
  )
}

export default DetaillerMedicament
