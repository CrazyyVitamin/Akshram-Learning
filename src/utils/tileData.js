/**
 * Hindi Varnmala (Devanagari Alphabet) Tile Data
 * 
 * This file contains all the Hindi characters used for the Mahjong tiles.
 * Characters are categorized into vowels (स्वर), consonants (व्यंजन),
 * and conjunct consonants (संयुक्त अक्षर).
 */

// Hindi Vowels (स्वर) - 13 characters
export const VOWELS = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ',
    'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'
];

// Hindi Consonants (व्यंजन) - 33 characters
export const CONSONANTS = [
    // Velar (कवर्ग)
    'क', 'ख', 'ग', 'घ', 'ङ',
    // Palatal (चवर्ग)
    'च', 'छ', 'ज', 'झ', 'ञ',
    // Retroflex (टवर्ग)
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    // Dental (तवर्ग)
    'त', 'थ', 'द', 'ध', 'न',
    // Labial (पवर्ग)
    'प', 'फ', 'ब', 'भ', 'म',
    // Semi-vowels and Sibilants (अंतस्थ और ऊष्म)
    'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'
];

// Conjunct Consonants (संयुक्त अक्षर) - 4 characters
export const CONJUNCTS = ['क्ष', 'त्र', 'ज्ञ', 'श्र'];

// All characters combined
export const ALL_CHARACTERS = [...VOWELS, ...CONSONANTS, ...CONJUNCTS];

/**
 * Difficulty level configurations
 */
export const DIFFICULTY_LEVELS = {
    navagantuk: {
        id: 'navagantuk',
        name: 'नवागंतुक',
        subtitle: 'Navagantuk',
        description: 'Easy',
        tileCount: 36,
        pairs: 18,
        // Use only vowels and first 5 consonants for beginners
        characters: [...VOWELS.slice(0, 11), ...CONSONANTS.slice(0, 7)],
        hints: 5,
        shuffles: 3
    },
    anubhavi: {
        id: 'anubhavi',
        name: 'अनुभवी',
        subtitle: 'Anubhavi',
        description: 'Medium',
        tileCount: 72,
        pairs: 36,
        // Use all vowels and most consonants
        characters: [...VOWELS, ...CONSONANTS.slice(0, 23)],
        hints: 3,
        shuffles: 2
    },
    shreshtha: {
        id: 'shreshtha',
        name: 'श्रेष्ठ',
        subtitle: 'Shreshtha',
        description: 'Hard',
        tileCount: 144,
        pairs: 72,
        // Use all characters including conjuncts
        characters: ALL_CHARACTERS,
        hints: 2,
        shuffles: 1
    }
};

export default DIFFICULTY_LEVELS;
