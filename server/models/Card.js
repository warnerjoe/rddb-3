const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define a schema
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cardType: [{ 
        type: String, 
        enum: ['Superstar', 'Action', 'Maneuver', 'Reversal', 'Pre-match', 'Mid-match'] 
    }],
    maneuverType: {
        type: String,
        enum: ['Strike', 'Grapple', 'Submission', 'High Risk', 'Trademark Finisher']
    },
    reversalType: {
        type: String,
        enum: ['Strike', 'Grapple', 'Submission', 'High Risk', 'Trademark Finisher', 'Special']
    },
    subType: [{
        type: String,
        enum: ['Heel', 'Face', 'Set-Up'],
        default: []
    }],
    rarity: {
        type: String,
        enum: ['Common', 'Uncommon', 'Rare', 'Starter', 'Ultra Rare', 'Promo'],
        required: true
      },
    fortitude: {
        type: Number,
        default: 0
    },
    damage: {
        type: Number,
        default: 0
    },
    stunValue: {
        type: Number,
        default: 0
    },
    unique: {
        type: Boolean,
        default: false
    },
    superstarValue: {
        type: Number,
        default: 0
    },
    startingHandSize: {
        type: Number,
        default: 0
    },
    superstarLogo: [{
        type: String,
    }],
    tagTeam: {
        type: Boolean,
        default: false
    },
    cardText: {
        type: String,
    },
    flavorText: {
        type: String,
        default: ''
    },
    setName: {
        type: String,
        required: true
    },
    collectorNumber: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'cards'});

module.exports = mongoose.model('Card', cardSchema);