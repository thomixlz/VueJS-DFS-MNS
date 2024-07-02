const express = require('express')
const router = express.Router();
const controller = require('../controllers/factures.js')


// Récupère toutes les factures
router.get('/', controller.getAll)

// Récupère une seule facture en fonction de son :id
router.get('/:id', controller.getOne)

// On crée une nouvelle facture
router.post('/', controller.postOne)

// On modifie une facture existante
router.patch('/:id', controller.patchOne)

// On supprime une facture
router.delete('/:id', controller.deleteOne)

module.exports = router;