const periodicTableDiv = document.querySelector('.periodic-table');
const elementDetailsDiv = document.getElementById('element-details');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categoryFilter = document.getElementById('category-filter');
const stateFilter = document.getElementById('state-filter');
const toggleMassButton = document.getElementById('toggle-mass');
const toggleConfigButton = document.getElementById('toggle-config');
const toggleMeltingBoilingButton = document.getElementById('toggle-melting-boiling');
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const body = document.body;

let showMass = false;
let showConfig = false;
let showMeltingBoiling = false;
let darkMode = false;
let elementsData = []; // Will store the fetched element data

// French element data (as requested)
const elements = [
    { atomicNumber: 1, symbol: 'H', nameFr: 'Hydrogène', atomicMass: 1.008, category: 'Non-métaux', group: 1, period: 1, electronConfiguration: '1s¹', meltingPoint: '-259.14 °C', boilingPoint: '-252.87 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Hydrog%C3%A8ne' },
    { atomicNumber: 2, symbol: 'He', nameFr: 'Hélium', atomicMass: 4.0026, category: 'Gaz nobles', group: 18, period: 1, electronConfiguration: '1s²', meltingPoint: '-272.20 °C', boilingPoint: '-268.93 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/H%C3%A9lium' },
    { atomicNumber: 3, symbol: 'Li', nameFr: 'Lithium', atomicMass: 6.94, category: 'Métaux alcalins', group: 1, period: 2, electronConfiguration: '[He] 2s¹', meltingPoint: '180.50 °C', boilingPoint: '1330 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Lithium' },
    { atomicNumber: 4, symbol: 'Be', nameFr: 'Béryllium', atomicMass: 9.0122, category: 'Métaux alcalino-terreux', group: 2, period: 2, electronConfiguration: '[He] 2s²', meltingPoint: '1287 °C', boilingPoint: '2471 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/B%C3%A9ryllium' },
    { atomicNumber: 5, symbol: 'B', nameFr: 'Bore', atomicMass: 10.81, category: 'Métalloïdes', group: 13, period: 2, electronConfiguration: '[He] 2s² 2p¹', meltingPoint: '2076 °C', boilingPoint: '4000 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Bore' },
    { atomicNumber: 6, symbol: 'C', nameFr: 'Carbone', atomicMass: 12.011, category: 'Non-métaux', group: 14, period: 2, electronConfiguration: '[He] 2s² 2p²', meltingPoint: '3550 °C', boilingPoint: '4827 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Carbone' },
    { atomicNumber: 7, symbol: 'N', nameFr: 'Azote', atomicMass: 14.007, category: 'Non-métaux', group: 15, period: 2, electronConfiguration: '[He] 2s² 2p³', meltingPoint: '-210.00 °C', boilingPoint: '-195.79 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Azote' },
    { atomicNumber: 8, symbol: 'O', nameFr: 'Oxygène', atomicMass: 15.999, category: 'Non-métaux', group: 16, period: 2, electronConfiguration: '[He] 2s² 2p⁴', meltingPoint: '-218.79 °C', boilingPoint: '-182.95 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Oxyg%C3%A8ne' },
    { atomicNumber: 9, symbol: 'F', nameFr: 'Fluor', atomicMass: 18.998, category: 'Halogènes', group: 17, period: 2, electronConfiguration: '[He] 2s² 2p⁵', meltingPoint: '-219.67 °C', boilingPoint: '-188.11 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Fluor' },
    { atomicNumber: 10, symbol: 'Ne', nameFr: 'Néon', atomicMass: 20.180, category: 'Gaz nobles', group: 18, period: 2, electronConfiguration: '[He] 2s² 2p⁶', meltingPoint: '-248.59 °C', boilingPoint: '-246.08 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/N%C3%A9on' },
    { atomicNumber: 11, symbol: 'Na', nameFr: 'Sodium', atomicMass: 22.990, category: 'Métaux alcalins', group: 1, period: 3, electronConfiguration: '[Ne] 3s¹', meltingPoint: '97.79 °C', boilingPoint: '882.9 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Sodium' },
    { atomicNumber: 12, symbol: 'Mg', nameFr: 'Magnésium', atomicMass: 24.305, category: 'Métaux alcalino-terreux', group: 2, period: 3, electronConfiguration: '[Ne] 3s²', meltingPoint: '650 °C', boilingPoint: '1090 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Magn%C3%A9sium' },
    { atomicNumber: 13, symbol: 'Al', nameFr: 'Aluminium', atomicMass: 26.982, category: 'Métaux post-transition', group: 13, period: 3, electronConfiguration: '[Ne] 3s² 3p¹', meltingPoint: '660.32 °C', boilingPoint: '2470 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Aluminium' },
    { atomicNumber: 14, symbol: 'Si', nameFr: 'Silicium', atomicMass: 28.085, category: 'Métalloïdes', group: 14, period: 3, electronConfiguration: '[Ne] 3s² 3p²', meltingPoint: '1414 °C', boilingPoint: '3265 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Silicium' },
    { atomicNumber: 15, symbol: 'P', nameFr: 'Phosphore', atomicMass: 30.974, category: 'Non-métaux', group: 15, period: 3, electronConfiguration: '[Ne] 3s² 3p³', meltingPoint: '44.15 °C (white)', boilingPoint: '280.5 °C (white)', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Phosphore' },
    { atomicNumber: 16, symbol: 'S', nameFr: 'Soufre', atomicMass: 32.06, category: 'Non-métaux', group: 16, period: 3, electronConfiguration: '[Ne] 3s² 3p⁴', meltingPoint: '115.21 °C', boilingPoint: '444.67 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Soufre' },
    { atomicNumber: 17, symbol: 'Cl', nameFr: 'Chlore', atomicMass: 35.45, category: 'Halogènes', group: 17, period: 3, electronConfiguration: '[Ne] 3s² 3p⁵', meltingPoint: '-101.5 °C', boilingPoint: '-34.04 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Chlore' },
    { atomicNumber: 18, symbol: 'Ar', nameFr: 'Argon', atomicMass: 39.948, category: 'Gaz nobles', group: 18, period: 3, electronConfiguration: '[Ne] 3s² 3p⁶', meltingPoint: '-189.35 °C', boilingPoint: '-185.85 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Argon' },
    { atomicNumber: 19, symbol: 'K', nameFr: 'Potassium', atomicMass: 39.098, category: 'Métaux alcalins', group: 1, period: 4, electronConfiguration: '[Ar] 4s¹', meltingPoint: '63.50 °C', boilingPoint: '759 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Potassium' },
    { atomicNumber: 20, symbol: 'Ca', nameFr: 'Calcium', atomicMass: 40.078, category: 'Métaux alcalino-terreux', group: 2, period: 4, electronConfiguration: '[Ar] 4s²', meltingPoint: '842 °C', boilingPoint: '1484 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Calcium' },
    { atomicNumber: 21, symbol: 'Sc', nameFr: 'Scandium', atomicMass: 44.956, category: 'Métaux de transition', group: 3, period: 4, electronConfiguration: '[Ar] 3d¹ 4s²', meltingPoint: '1541 °C', boilingPoint: '2836 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Scandium' },
    { atomicNumber: 22, symbol: 'Ti', nameFr: 'Titane', atomicMass: 47.867, category: 'Métaux de transition', group: 4, period: 4, electronConfiguration: '[Ar] 3d² 4s²', meltingPoint: '1668 °C', boilingPoint: '3287 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Titane' },
    { atomicNumber: 23, symbol: 'V', nameFr: 'Vanadium', atomicMass: 50.942, category: 'Métaux de transition', group: 5, period: 4, electronConfiguration: '[Ar] 3d³ 4s²', meltingPoint: '1910 °C', boilingPoint: '3407 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Vanadium' },
    { atomicNumber: 24, symbol: 'Cr', nameFr: 'Chrome', atomicMass: 51.996, category: 'Métaux de transition', group: 6, period: 4, electronConfiguration: '[Ar] 3d⁵ 4s¹', meltingPoint: '1907 °C', boilingPoint: '2671 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Chrome' },
    { atomicNumber: 25, symbol: 'Mn', nameFr: 'Manganèse', atomicMass: 54.938, category: 'Métaux de transition', group: 7, period: 4, electronConfiguration: '[Ar] 3d⁵ 4s²', meltingPoint: '1246 °C', boilingPoint: '2061 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Mangan%C3%A8se' },
    { atomicNumber: 26, symbol: 'Fe', nameFr: 'Fer', atomicMass: 55.845, category: 'Métaux de transition', group: 8, period: 4, electronConfiguration: '[Ar] 3d⁶ 4s²', meltingPoint: '1538 °C', boilingPoint: '2862 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Fer' },
    { atomicNumber: 27, symbol: 'Co', nameFr: 'Cobalt', atomicMass: 58.933, category: 'Métaux de transition', group: 9, period: 4, electronConfiguration: '[Ar] 3d⁷ 4s²', meltingPoint: '1495 °C', boilingPoint: '2927 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Cobalt' },
    { atomicNumber: 28, symbol: 'Ni', nameFr: 'Nickel', atomicMass: 58.693, category: 'Métaux de transition', group: 10, period: 4, electronConfiguration: '[Ar] 3d⁸ 4s²', meltingPoint: '1455 °C', boilingPoint: '2730 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Nickel' },
    { atomicNumber: 29, symbol: 'Cu', nameFr: 'Cuivre', atomicMass: 63.546, category: 'Métaux de transition', group: 11, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s¹', meltingPoint: '1085 °C', boilingPoint: '2567 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Cuivre' },
    { atomicNumber: 30, symbol: 'Zn', nameFr: 'Zinc', atomicMass: 65.38, category: 'Métaux de transition', group: 12, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s²', meltingPoint: '419.53 °C', boilingPoint: '907 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Zinc' },
    { atomicNumber: 31, symbol: 'Ga', nameFr: 'Gallium', atomicMass: 69.723, category: 'Métaux post-transition', group: 13, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p¹', meltingPoint: '29.76 °C', boilingPoint: '2204 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Gallium' },
    { atomicNumber: 32, symbol: 'Ge', nameFr: 'Germanium', atomicMass: 72.630, category: 'Métalloïdes', group: 14, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p²', meltingPoint: '938.25 °C', boilingPoint: '2833 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Germanium' },
    { atomicNumber: 33, symbol: 'As', nameFr: 'Arsenic', atomicMass: 74.922, category: 'Métalloïdes', group: 15, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p³', meltingPoint: '817 °C (sublimes)', boilingPoint: '615 °C (sublimes)', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Arsenic' },
    { atomicNumber: 34, symbol: 'Se', nameFr: 'Sélénium', atomicMass: 78.971, category: 'Non-métaux', group: 16, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁴', meltingPoint: '221 °C', boilingPoint: '685 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/S%C3%A9l%C3%A9nium' },
    { atomicNumber: 35, symbol: 'Br', nameFr: 'Brome', atomicMass: 79.904, category: 'Halogènes', group: 17, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁵', meltingPoint: '-7.2 °C', boilingPoint: '58.8 °C', state: 'Liquide', wikiFr: 'https://fr.wikipedia.org/wiki/Brome' },
    { atomicNumber: 36, symbol: 'Kr', nameFr: 'Krypton', atomicMass: 83.798, category: 'Gaz nobles', group: 18, period: 4, electronConfiguration: '[Ar] 3d¹⁰ 4s² 4p⁶', meltingPoint: '-157.37 °C', boilingPoint: '-153.22 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Krypton' },
    { atomicNumber: 37, symbol: 'Rb', nameFr: 'Rubidium', atomicMass: 85.468, category: 'Métaux alcalins', group: 1, period: 5, electronConfiguration: '[Kr] 5s¹', meltingPoint: '39.30 °C', boilingPoint: '688 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Rubidium' },
    { atomicNumber: 38, symbol: 'Sr', nameFr: 'Strontium', atomicMass: 87.62, category: 'Métaux alcalino-terreux', group: 2, period: 5, electronConfiguration: '[Kr] 5s²', meltingPoint: '777 °C', boilingPoint: '1382 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Strontium' },
    { atomicNumber: 39, symbol: 'Y', nameFr: 'Yttrium', atomicMass: 88.906, category: 'Métaux de transition', group: 3, period: 5, electronConfiguration: '[Kr] 4d¹ 5s²', meltingPoint: '1526 °C', boilingPoint: '3345 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Yttrium' },
    { atomicNumber: 40, symbol: 'Zr', nameFr: 'Zirconium', atomicMass: 91.224, category: 'Métaux de transition', group: 4, period: 5, electronConfiguration: '[Kr] 4d² 5s²', meltingPoint: '1855 °C', boilingPoint: '4409 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Zirconium' },
    { atomicNumber: 41, symbol: 'Nb', nameFr: 'Niobium', atomicMass: 92.906, category: 'Métaux de transition', group: 5, period: 5, electronConfiguration: '[Kr] 4d⁴ 5s¹', meltingPoint: '2477 °C', boilingPoint: '4744 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Niobium' },
    { atomicNumber: 42, symbol: 'Mo', nameFr: 'Molybdène', atomicMass: 95.96, category: 'Métaux de transition', group: 6, period: 5, electronConfiguration: '[Kr] 4d⁵ 5s¹', meltingPoint: '2623 °C', boilingPoint: '4639 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Molybd%C3%A8ne' },
    { atomicNumber: 43, symbol: 'Tc', nameFr: 'Technétium', atomicMass: 98, category: 'Métaux de transition', group: 7, period: 5, electronConfiguration: '[Kr] 4d⁵ 5s²', meltingPoint: '2157 °C', boilingPoint: '4265 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Techn%C3%A9tium' },
    { atomicNumber: 44, symbol: 'Ru', nameFr: 'Ruthénium', atomicMass: 101.07, category: 'Métaux de transition', group: 8, period: 5, electronConfiguration: '[Kr] 4d⁷ 5s¹', meltingPoint: '2334 °C', boilingPoint: '4150 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Ruth%C3%A9nium' },
    { atomicNumber: 45, symbol: 'Rh', nameFr: 'Rhodium', atomicMass: 102.91, category: 'Métaux de transition', group: 9, period: 5, electronConfiguration: '[Kr] 4d⁸ 5s¹', meltingPoint: '1964 °C', boilingPoint: '3695 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Rhodium' },
    { atomicNumber: 46, symbol: 'Pd', nameFr: 'Palladium', atomicMass: 106.42, category: 'Métaux de transition', group: 10, period: 5, electronConfiguration: '[Kr] 4d¹⁰', meltingPoint: '1554.9 °C', boilingPoint: '2963 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Palladium' },
    { atomicNumber: 47, symbol: 'Ag', nameFr: 'Argent', atomicMass: 107.87, category: 'Métaux de transition', group: 11, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s¹', meltingPoint: '961.78 °C', boilingPoint: '2162 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Argent_(m%C3%A9tal)' },
    { atomicNumber: 48, symbol: 'Cd', nameFr: 'Cadmium', atomicMass: 112.41, category: 'Métaux de transition', group: 12, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s²', meltingPoint: '321.07 °C', boilingPoint: '767 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Cadmium' },
    { atomicNumber: 49, symbol: 'In', nameFr: 'Indium', atomicMass: 114.82, category: 'Métaux post-transition', group: 13, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p¹', meltingPoint: '156.60 °C', boilingPoint: '2072 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Indium' },
    { atomicNumber: 50, symbol: 'Sn', nameFr: 'Étain', atomicMass: 118.71, category: 'Métaux post-transition', group: 14, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p²', meltingPoint: '231.93 °C', boilingPoint: '2602 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/%C3%89tain' },
    { atomicNumber: 51, symbol: 'Sb', nameFr: 'Antimoine', atomicMass: 121.76, category: 'Métalloïdes', group: 15, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p³', meltingPoint: '630.63 °C', boilingPoint: '1587 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Antimoine' },
    { atomicNumber: 52, symbol: 'Te', nameFr: 'Tellure', atomicMass: 127.60, category: 'Métalloïdes', group: 16, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁴', meltingPoint: '449.5 °C', boilingPoint: '988 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Tellure' },
    { atomicNumber: 53, symbol: 'I', nameFr: 'Iode', atomicMass: 126.90, category: 'Halogènes', group: 17, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁵', meltingPoint: '113.7 °C', boilingPoint: '184.3 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Iode' },
    { atomicNumber: 54, symbol: 'Xe', nameFr: 'Xénon', atomicMass: 131.29, category: 'Gaz nobles', group: 18, period: 5, electronConfiguration: '[Kr] 4d¹⁰ 5s² 5p⁶', meltingPoint: '-111.5 °C', boilingPoint: '-108.0 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/X%C3%A9non' },
    { atomicNumber: 55, symbol: 'Cs', nameFr: 'Césium', atomicMass: 132.91, category: 'Métaux alcalins', group: 1, period: 6, electronConfiguration: '[Xe] 6s¹', meltingPoint: '28.44 °C', boilingPoint: '671 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/C%C3%A9sium' },
    { atomicNumber: 56, symbol: 'Ba', nameFr: 'Baryum', atomicMass: 137.33, category: 'Métaux alcalino-terreux', group: 2, period: 6, electronConfiguration: '[Xe] 6s²', meltingPoint: '727 °C', boilingPoint: '1870 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Baryum' },
    { atomicNumber: 57, symbol: 'La', nameFr: 'Lanthane', atomicMass: 138.91, category: 'Lanthanides', group: 3, period: 6, electronConfiguration: '[Xe] 5d¹ 6s²', meltingPoint: '920 °C', boilingPoint: '3464 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Lanthane' },
    { atomicNumber: 58, symbol: 'Ce', nameFr: 'Cérium', atomicMass: 140.12, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f¹ 5d¹ 6s²', meltingPoint: '795 °C', boilingPoint: '3440 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/C%C3%A9rium' },
    { atomicNumber: 59, symbol: 'Pr', nameFr: 'Praséodyme', atomicMass: 140.91, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f³ 6s²', meltingPoint: '935 °C', boilingPoint: '3520 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Pras%C3%A9odyme' },
    { atomicNumber: 60, symbol: 'Nd', nameFr: 'Néodyme', atomicMass: 144.24, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f⁴ 6s²', meltingPoint: '1024 °C', boilingPoint: '3074 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/N%C3%A9odyme' },
    { atomicNumber: 61, symbol: 'Pm', nameFr: 'Prométhium', atomicMass: 145, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f⁵ 6s²', meltingPoint: '1080 °C', boilingPoint: '3000 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Prom%C3%A9thium' },
    { atomicNumber: 62, symbol: 'Sm', nameFr: 'Samarium', atomicMass: 150.36, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f⁶ 6s²', meltingPoint: '1072 °C', boilingPoint: '1794 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Samarium' },
    { atomicNumber: 63, symbol: 'Eu', nameFr: 'Europium', atomicMass: 151.96, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f⁷ 6s²', meltingPoint: '826 °C', boilingPoint: '1529 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Europium' },
    { atomicNumber: 64, symbol: 'Gd', nameFr: 'Gadolinium', atomicMass: 157.25, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f⁷ 5d¹ 6s²', meltingPoint: '1313 °C', boilingPoint: '3000 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Gadolinium' },
    { atomicNumber: 65, symbol: 'Tb', nameFr: 'Terbium', atomicMass: 158.93, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f⁹ 6s²', meltingPoint: '1356 °C', boilingPoint: '3230 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Terbium' },
    { atomicNumber: 66, symbol: 'Dy', nameFr: 'Dysprosium', atomicMass: 162.50, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f¹⁰ 6s²', meltingPoint: '1412 °C', boilingPoint: '2567 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Dysprosium' },
    { atomicNumber: 67, symbol: 'Ho', nameFr: 'Holmium', atomicMass: 164.93, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f¹¹ 6s²', meltingPoint: '1474 °C', boilingPoint: '2720 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Holmium' },
    { atomicNumber: 68, symbol: 'Er', nameFr: 'Erbium', atomicMass: 167.26, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f¹² 6s²', meltingPoint: '1529 °C', boilingPoint: '2868 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Erbium' },
    { atomicNumber: 69, symbol: 'Tm', nameFr: 'Thulium', atomicMass: 168.93, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f¹³ 6s²', meltingPoint: '1545 °C', boilingPoint: '1950 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Thulium' },
    { atomicNumber: 70, symbol: 'Yb', nameFr: 'Ytterbium', atomicMass: 173.05, category: 'Lanthanides', period: 6, electronConfiguration: '[Xe] 4f¹⁴ 6s²', meltingPoint: '824 °C', boilingPoint: '1196 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Ytterbium' },
    { atomicNumber: 71, symbol: 'Lu', nameFr: 'Lutécium', atomicMass: 174.97, category: 'Lanthanides', group: 3, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹ 6s²', meltingPoint: '1652 °C', boilingPoint: '3402 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Lut%C3%A9cium' },
    { atomicNumber: 72, symbol: 'Hf', nameFr: 'Hafnium', atomicMass: 178.49, category: 'Métaux de transition', group: 4, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d² 6s²', meltingPoint: '2233 °C', boilingPoint: '4603 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Hafnium' },
    { atomicNumber: 73, symbol: 'Ta', nameFr: 'Tantale', atomicMass: 180.95, category: 'Métaux de transition', group: 5, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d³ 6s²', meltingPoint: '3017 °C', boilingPoint: '5458 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Tantale' },
    { atomicNumber: 74, symbol: 'W', nameFr: 'Tungstène', atomicMass: 183.84, category: 'Métaux de transition', group: 6, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d⁴ 6s²', meltingPoint: '3422 °C', boilingPoint: '5930 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Tungst%C3%A8ne' },
    { atomicNumber: 75, symbol: 'Re', nameFr: 'Rhénium', atomicMass: 186.21, category: 'Métaux de transition', group: 7, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d⁵ 6s²', meltingPoint: '3186 °C', boilingPoint: '5596 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Rh%C3%A9nium' },
    { atomicNumber: 76, symbol: 'Os', nameFr: 'Osmium', atomicMass: 190.23, category: 'Métaux de transition', group: 8, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d⁶ 6s²', meltingPoint: '3033 °C', boilingPoint: '5012 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Osmium' },
    { atomicNumber: 77, symbol: 'Ir', nameFr: 'Iridium', atomicMass: 192.22, category: 'Métaux de transition', group: 9, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d⁷ 6s²', meltingPoint: '2466 °C', boilingPoint: '4428 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Iridium' },
    { atomicNumber: 78, symbol: 'Pt', nameFr: 'Platine', atomicMass: 195.08, category: 'Métaux de transition', group: 10, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d⁸ 6s²', meltingPoint: '1768.3 °C', boilingPoint: '3825 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Platine' },
    { atomicNumber: 79, symbol: 'Au', nameFr: 'Or', atomicMass: 196.97, category: 'Métaux de transition', group: 11, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', meltingPoint: '1064 °C', boilingPoint: '2856 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Or_(m%C3%A9tal)' },
    { atomicNumber: 80, symbol: 'Hg', nameFr: 'Mercure', atomicMass: 200.59, category: 'Métaux de transition', group: 12, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', meltingPoint: '-38.83 °C', boilingPoint: '356.73 °C', state: 'Liquide', wikiFr: 'https://fr.wikipedia.org/wiki/Mercure_(m%C3%A9tal)' },
    { atomicNumber: 81, symbol: 'Tl', nameFr: 'Thallium', atomicMass: 204.38, category: 'Métaux post-transition', group: 13, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', meltingPoint: '304 °C', boilingPoint: '1473 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Thallium' },
    { atomicNumber: 82, symbol: 'Pb', nameFr: 'Plomb', atomicMass: 207.2, category: 'Métaux post-transition', group: 14, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', meltingPoint: '327.46 °C', boilingPoint: '1749 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Plomb' },
    { atomicNumber: 83, symbol: 'Bi', nameFr: 'Bismuth', atomicMass: 208.98, category: 'Métaux post-transition', group: 15, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', meltingPoint: '271.5 °C', boilingPoint: '1564 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Bismuth' },
    { atomicNumber: 84, symbol: 'Po', nameFr: 'Polonium', atomicMass: 209, category: 'Métaux post-transition', group: 16, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', meltingPoint: '254 °C', boilingPoint: '962 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Polonium' },
    { atomicNumber: 85, symbol: 'At', nameFr: 'Astate', atomicMass: 210, category: 'Métalloïdes', group: 17, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', meltingPoint: '302 °C (est.)', boilingPoint: '337 °C (est.)', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Astate' },
    { atomicNumber: 86, symbol: 'Rn', nameFr: 'Radon', atomicMass: 222, category: 'Gaz nobles', group: 18, period: 6, electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', meltingPoint: '-71 °C', boilingPoint: '-61.7 °C', state: 'Gaz', wikiFr: 'https://fr.wikipedia.org/wiki/Radon' },
    { atomicNumber: 87, symbol: 'Fr', nameFr: 'Francium', atomicMass: 223, category: 'Métaux alcalins', group: 1, period: 7, electronConfiguration: '[Rn] 7s¹', meltingPoint: '27 °C (est.)', boilingPoint: '677 °C (est.)', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Francium' },
    { atomicNumber: 88, symbol: 'Ra', nameFr: 'Radium', atomicMass: 226, category: 'Métaux alcalino-terreux', group: 2, period: 7, electronConfiguration: '[Rn] 7s²', meltingPoint: '700 °C', boilingPoint: '1737 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Radium' },
    { atomicNumber: 89, symbol: 'Ac', nameFr: 'Actinium', atomicMass: 227, category: 'Actinides', group: 3, period: 7, electronConfiguration: '[Rn] 6d¹ 7s²', meltingPoint: '1050 °C', boilingPoint: '3200 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Actinium' },
    { atomicNumber: 90, symbol: 'Th', nameFr: 'Thorium', atomicMass: 232.04, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 6d² 7s²', meltingPoint: '1750 °C', boilingPoint: '4788 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Thorium' },
    { atomicNumber: 91, symbol: 'Pa', nameFr: 'Protactinium', atomicMass: 231.04, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f² 6d¹ 7s²', meltingPoint: '1568 °C', boilingPoint: '4027 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Protactinium' },
    { atomicNumber: 92, symbol: 'U', nameFr: 'Uranium', atomicMass: 238.03, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f³ 6d¹ 7s²', meltingPoint: '1132 °C', boilingPoint: '3927 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Uranium' },
    { atomicNumber: 93, symbol: 'Np', nameFr: 'Neptunium', atomicMass: 237, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f⁴ 6d¹ 7s²', meltingPoint: '637 °C', boilingPoint: '4000 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Neptunium' },
    { atomicNumber: 94, symbol: 'Pu', nameFr: 'Plutonium', atomicMass: 244, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f⁶ 7s²', meltingPoint: '640 °C', boilingPoint: '3228 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Plutonium' },
    { atomicNumber: 95, symbol: 'Am', nameFr: 'Américium', atomicMass: 243, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f⁷ 7s²', meltingPoint: '1176 °C', boilingPoint: '2011 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Am%C3%A9ricium' },
    { atomicNumber: 96, symbol: 'Cm', nameFr: 'Curium', atomicMass: 247, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f⁷ 6d¹ 7s²', meltingPoint: '1340 °C', boilingPoint: '3110 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Curium' },
    { atomicNumber: 97, symbol: 'Bk', nameFr: 'Berkélium', atomicMass: 247, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f⁹ 7s²', meltingPoint: '986 °C', boilingPoint: '2627 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Berk%C3%A9lium' },
    { atomicNumber: 98, symbol: 'Cf', nameFr: 'Californium', atomicMass: 251, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f¹⁰ 7s²', meltingPoint: '900 °C', boilingPoint: '1743 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Californium' },
    { atomicNumber: 99, symbol: 'Es', nameFr: 'Einsteinium', atomicMass: 252, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f¹¹ 7s²', meltingPoint: '860 °C', boilingPoint: '990 °C', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Einsteinium' },
    { atomicNumber: 100, symbol: 'Fm', nameFr: 'Fermium', atomicMass: 257, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f¹² 7s²', meltingPoint: '1527 °C', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Fermium' },
    { atomicNumber: 101, symbol: 'Md', nameFr: 'Mendélévium', atomicMass: 258, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f¹³ 7s²', meltingPoint: '827 °C', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Mend%C3%A9l%C3%A9vium' },
    { atomicNumber: 102, symbol: 'No', nameFr: 'Nobélium', atomicMass: 259, category: 'Actinides', period: 7, electronConfiguration: '[Rn] 5f¹⁴ 7s²', meltingPoint: '827 °C', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Nob%C3%A9lium' },
    { atomicNumber: 103, symbol: 'Lr', nameFr: 'Lawrencium', atomicMass: 262, category: 'Actinides', group: 3, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹ 7s²', meltingPoint: '1627 °C', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Lawrencium' },
    { atomicNumber: 104, symbol: 'Rf', nameFr: 'Rutherfordium', atomicMass: 267, category: 'Métaux de transition', group: 4, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d² 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Rutherfordium' },
    { atomicNumber: 105, symbol: 'Db', nameFr: 'Dubnium', atomicMass: 268, category: 'Métaux de transition', group: 5, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d³ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Dubnium' },
    { atomicNumber: 106, symbol: 'Sg', nameFr: 'Seaborgium', atomicMass: 271, category: 'Métaux de transition', group: 6, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d⁴ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Seaborgium' },
    { atomicNumber: 107, symbol: 'Bh', nameFr: 'Bohrium', atomicMass: 272, category: 'Métaux de transition', group: 7, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d⁵ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Bohrium' },
    { atomicNumber: 108, symbol: 'Hs', nameFr: 'Hassium', atomicMass: 270, category: 'Métaux de transition', group: 8, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d⁶ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Hassium' },
    { atomicNumber: 109, symbol: 'Mt', nameFr: 'Meitnérium', atomicMass: 276, category: 'Métaux de transition', group: 9, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d⁷ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Meitn%C3%A9rium' },
    { atomicNumber: 110, symbol: 'Ds', nameFr: 'Darmstadtium', atomicMass: 281, category: 'Métaux de transition', group: 10, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d⁸ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Darmstadtium' },
    { atomicNumber: 111, symbol: 'Rg', nameFr: 'Roentgenium', atomicMass: 280, category: 'Métaux de transition', group: 11, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d⁹ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Roentgenium' },
    { atomicNumber: 112, symbol: 'Cn', nameFr: 'Copernicium', atomicMass: 285, category: 'Métaux de transition', group: 12, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', meltingPoint: '—', boilingPoint: '—', state: 'Gaz (prédit)', wikiFr: 'https://fr.wikipedia.org/wiki/Copernicium' },
    { atomicNumber: 113, symbol: 'Nh', nameFr: 'Nihonium', atomicMass: 284, category: 'Métaux post-transition', group: 13, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', meltingPoint: '—', boilingPoint: '—', state: 'Solide', wikiFr: 'https://fr.wikipedia.org/wiki/Nihonium' },
    { atomicNumber: 114, symbol: 'Fl', nameFr: 'Flerovium', atomicMass: 289, category: 'Métaux post-transition', group: 14, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', meltingPoint: '—', boilingPoint: '—', state: 'Solide (prédit)', wikiFr: 'https://fr.wikipedia.org/wiki/Flerovium' },
    { atomicNumber: 115, symbol: 'Mc', nameFr: 'Moscovium', atomicMass: 290, category: 'Métaux post-transition', group: 15, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', meltingPoint: '—', boilingPoint: '—', state: 'Solide (prédit)', wikiFr: 'https://fr.wikipedia.org/wiki/Moscovium' },
    { atomicNumber: 116, symbol: 'Lv', nameFr: 'Livermorium', atomicMass: 293, category: 'Métaux post-transition', group: 16, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', meltingPoint: '—', boilingPoint: '—', state: 'Solide (prédit)', wikiFr: 'https://fr.wikipedia.org/wiki/Livermorium' },
    { atomicNumber: 117, symbol: 'Ts', nameFr: 'Tennesse', atomicMass: 294, category: 'Halogènes', group: 17, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', meltingPoint: '—', boilingPoint: '—', state: 'Solide (prédit)', wikiFr: 'https://fr.wikipedia.org/wiki/Tennesse_(%C3%A9l%C3%A9ment_chimique)' },
    { atomicNumber: 118, symbol: 'Og', nameFr: 'Oganesson', atomicMass: 294, category: 'Gaz nobles', group: 18, period: 7, electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', meltingPoint: '—', boilingPoint: '—', state: 'Gaz (prédit)', wikiFr: 'https://fr.wikipedia.org/wiki/Oganesson' }
];

// Function to create the periodic table elements in the DOM
function createPeriodicTable() {
    elementsData = elements; // Initialize with all elements
    periodicTableDiv.innerHTML = ''; // Clear existing elements
    const lanthanidesRow = document.createElement('div');
    lanthanidesRow.classList.add('lanthanides-row');
    const actinidesRow = document.createElement('div');
    actinidesRow.classList.add('actinides-row');

    elementsData.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.classList.add(`category-${element.category.replace(/ /g, '-')}`);
        elementDiv.dataset.atomicNumber = element.atomicNumber;
        elementDiv.dataset.symbol = element.symbol;
        elementDiv.dataset.nameFr = element.nameFr;
        elementDiv.dataset.atomicMass = element.atomicMass;
        elementDiv.dataset.electronConfiguration = element.electronConfiguration;
        elementDiv.dataset.meltingPoint = element.meltingPoint;
        elementDiv.dataset.boilingPoint = element.boilingPoint;
        elementDiv.dataset.state = element.state;
        elementDiv.dataset.wikiFr = element.wikiFr;
        elementDiv.dataset.category = element.category;

        elementDiv.innerHTML = `
            <div class="element-number">${element.atomicNumber}</div>
            <div class="element-symbol">${element.symbol}</div>
            <div class="element-name-fr">${element.nameFr}</div>
            <div class="element-mass" style="display: ${showMass ? 'block' : 'none'};">${element.atomicMass}</div>
            <a href="${element.wikiFr}" target="_blank">Wiki</a>
        `;

        if (element.period >= 6 && element.atomicNumber >= 57 && element.atomicNumber <= 71) {
            elementDiv.classList.add('lanthanide');
            lanthanidesRow.appendChild(elementDiv);
        } else if (element.period >= 7 && element.atomicNumber >= 89 && element.atomicNumber <= 103) {
            elementDiv.classList.add('actinide');
            actinidesRow.appendChild(elementDiv);
        } else {
            elementDiv.style.gridColumnStart = element.group;
            elementDiv.style.gridRowStart = element.period + 1; // +1 to account for group numbers row
            periodicTableDiv.appendChild(elementDiv);
        }

        elementDiv.addEventListener('click', () => displayElementDetails(element));
    });

    // Add empty divs for proper spacing
    for (let i = 1; i <= 2; i++) {
        for (let j = 3; j <= 12; j++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('element', 'empty');
            emptyDiv.style.gridColumnStart = j;
            emptyDiv.style.gridRowStart = i + 1;
            periodicTableDiv.appendChild(emptyDiv);
        }
    }

    periodicTableDiv.appendChild(lanthanidesRow);
    periodicTableDiv.appendChild(actinidesRow);
}

// Function to display element details
function displayElementDetails(element) {
    elementDetailsDiv.innerHTML = `
        <h2>${element.nameFr} (${element.symbol})</h2>
        <p>Numéro atomique: ${element.atomicNumber}</p>
        <p>Masse atomique: ${element.atomicMass}</p>
        <p>Catégorie: ${element.category}</p>
        <p style="display: ${showConfig ? 'block' : 'none'};">Configuration électronique: ${element.electronConfiguration}</p>
        <p style="display: ${showMeltingBoiling ? 'block' : 'none'};">Point de fusion: ${element.meltingPoint}</p>
        <p style="display: ${showMeltingBoiling ? 'block' : 'none'};">Point d'ébullition: ${element.boilingPoint}</p>
        <p>État à température ambiante: ${element.state} <span class="state-indicator state-${element.state}"></span></p>
        <p><a href="${element.wikiFr}" target="_blank">Page Wikipédia (français)</a></p>
    `;
}

// Search functionality
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterElements(searchTerm);
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterElements(searchTerm);
});

function filterElements(searchTerm) {
    elementsData = elements.filter(element =>
        element.nameFr.toLowerCase().includes(searchTerm) ||
        element.symbol.toLowerCase().includes(searchTerm) ||
        element.atomicNumber.toString().includes(searchTerm)
    );
    createPeriodicTable();
}

// Category filter
categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    elementsData = elements.filter(element => selectedCategory === '' || element.category === selectedCategory);
    createPeriodicTable();
});

// State of matter filter
stateFilter.addEventListener('change', () => {
    const selectedState = stateFilter.value;
    elementsData = elements.filter(element => selectedState === '' || element.state === selectedState);
    createPeriodicTable();
});

// Toggle buttons functionality
toggleMassButton.addEventListener('click', () => {
    showMass = !showMass;
    toggleMassButton.textContent = showMass ? 'Cacher les masses atomiques' : 'Afficher les masses atomiques';
    createPeriodicTable();
});

toggleConfigButton.addEventListener('click', () => {
    showConfig = !showConfig;
    toggleConfigButton.textContent = showConfig ? 'Cacher les configurations électroniques' : 'Afficher les configurations électroniques';
    const details = document.querySelector('#element-details p:nth-child(5)');
    if (details) details.style.display = showConfig ? 'block' : 'none';
});

toggleMeltingBoilingButton.addEventListener('click', () => {
    showMeltingBoiling = !showMeltingBoiling;
    toggleMeltingBoilingButton.textContent = showMeltingBoiling ? 'Cacher les points de fusion/ébullition' : 'Afficher les points de fusion/ébullition';
    const meltingPoint = document.querySelector('#element-details p:nth-child(6)');
    const boilingPoint = document.querySelector('#element-details p:nth-child(7)');
    if (meltingPoint) meltingPoint.style.display = showMeltingBoiling ? 'block' : 'none';
    if (boilingPoint) boilingPoint.style.display = showMeltingBoiling ? 'block' : 'none';
});

// Dark/Light mode toggle
toggleDarkModeButton.addEventListener('click', () => {
    darkMode = !darkMode;
    body.classList.toggle('dark-mode');
    toggleDarkModeButton.textContent = darkMode ? 'Mode Clair' : 'Mode Sombre';
});

// Initial creation of the periodic table
createPeriodicTable();
