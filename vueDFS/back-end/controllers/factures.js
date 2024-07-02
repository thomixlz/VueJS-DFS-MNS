const fs = require('fs');
const path = require('path');

module.exports = {
    // Recupère LES factures
    getAll: (req, res) => {
        fs.readFile(path.join(__dirname, '../db/factures.json'), (err, data) => {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            res.send(JSON.parse(data));
        });
    },

    // Récupére UNE facture
    getOne: (req, res) => {
        const id = req.params.id;
        fs.readFile(path.join(__dirname, '../db/factures.json'), (err, data) => {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            const factures = JSON.parse(data);
            const facture = factures.find(facture => facture.id == id);
            if (facture) {
                res.json(facture);
            } else {
                res.status(404).json({ message: "Facture not found" });
            }
        });
    },

    // Créer une nouvelle facture
    postOne: (req, res) => {
        const newFacture = req.body;
        fs.readFile(path.join(__dirname, '../db/factures.json'), (err, data) => {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            const factures = JSON.parse(data);
            factures.push(newFacture);
            fs.writeFile(path.join(__dirname, '../db/factures.json'), JSON.stringify(factures, null, 2), (err) => {
                if (err) {
                    res.sendStatus(500);
                    throw err;
                }
                res.status(201).json(newFacture);
            });
        });
    },

    // Mettre à jour une facture en fonction de son id
    patchOne: (req, res) => {
        const id = req.params.id;
        fs.readFile(path.join(__dirname, '../db/factures.json'), (err, data) => {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            let factures = JSON.parse(data);
            const factureIndex = factures.findIndex(facture => facture.id == id);
            if (factureIndex !== -1) {
                const updatedFacture = { ...factures[factureIndex], ...req.body };
                factures[factureIndex] = updatedFacture;
                fs.writeFile(path.join(__dirname, '../db/factures.json'), JSON.stringify(factures, null, 2), (err) => {
                    if (err) {
                        res.sendStatus(500);
                        throw err;
                    }
                    res.json(updatedFacture);
                });
            } else {
                res.status(404).json({ message: "Facture not found" });
            }
        });
    },

    // supprimer une facture en fonction de son id
    deleteOne: (req, res) => {
        const id = req.params.id;
        fs.readFile(path.join(__dirname, '../db/factures.json'), (err, data) => {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            let factures = JSON.parse(data);
            const factureIndex = factures.findIndex(facture => facture.id == id);
            if (factureIndex !== -1) {
                const deletedFacture = factures.splice(factureIndex, 1);
                fs.writeFile(path.join(__dirname, '../db/factures.json'), JSON.stringify(factures, null, 2), (err) => {
                    if (err) {
                        res.sendStatus(500);
                        throw err;
                    }
                    res.json(deletedFacture[0]);
                });
            } else {
                res.status(404).json({ message: "Facture not found" });
            }
        });
    },
};
