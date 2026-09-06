// Delivery-form field behaviour per country: whether an administrative
// division field (state/province/region/...) and a postal-code field are
// shown at all, what each is locally called, and its real dropdown options.
//
// Every country with a region concept gets an actual list of its real
// subdivisions — Hong Kong SAR shows "Hong Kong Island / Kowloon / New
// Territories", not a free-text box standing in for one. Only a small
// handful of places that genuinely have no internal subdivision at all
// (Vatican City, a few uninhabited/administration-only territories) have no
// region field. Postal code follows the same idea: countries with no
// postal-code system (the commonly cited list — UAE, most of West/Central
// Africa, several Pacific and Caribbean nations) don't get a box asking for
// something that doesn't exist.

// label + options per country. Countries not listed here fall back to
// NO_REGION (see below) — every entry is deliberate, not an omission.
const REGION_DATA = {
  "Afghanistan": { label: "Province", options: [
    "Badakhshan", "Badghis", "Baghlan", "Balkh", "Bamyan", "Daykundi",
    "Farah", "Faryab", "Ghazni", "Ghor", "Helmand", "Herat", "Jowzjan",
    "Kabul", "Kandahar", "Kapisa", "Khost", "Kunar", "Kunduz", "Laghman",
    "Logar", "Nangarhar", "Nimruz", "Nuristan", "Paktia", "Paktika",
    "Panjshir", "Parwan", "Samangan", "Sar-e Pol", "Takhar", "Urozgan",
    "Wardak", "Zabul",
  ] },
  "Åland Islands": { label: "Municipality", options: [
    "Brändö", "Eckerö", "Finström", "Föglö", "Geta", "Hammarland",
    "Jomala", "Kumlinge", "Kökar", "Lemland", "Lumparland", "Mariehamn",
    "Saltvik", "Sottunga", "Sund", "Vårdö",
  ] },
  "Albania": { label: "County", options: [
    "Berat", "Dibër", "Durrës", "Elbasan", "Fier", "Gjirokastër",
    "Korçë", "Kukës", "Lezhë", "Shkodër", "Tiranë", "Vlorë",
  ] },
  "Algeria": { label: "Province", options: [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa",
    "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa",
    "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel",
    "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
    "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
    "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès",
    "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma",
    "Aïn Témouchent", "Ghardaïa", "Relizane",
  ] },
  "American Samoa": { label: "District", options: [
    "Eastern District", "Western District", "Manuʻa District",
  ] },
  "Andorra": { label: "Parish", options: [
    "Andorra la Vella", "Canillo", "Encamp", "Escaldes-Engordany",
    "La Massana", "Ordino", "Sant Julià de Lòria",
  ] },
  "Angola": { label: "Province", options: [
    "Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango", "Cuanza Norte",
    "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Luanda", "Lunda Norte",
    "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire",
  ] },
  "Anguilla": { label: "District", options: [
    "Blowing Point", "East End", "George Hill", "Island Harbour",
    "North Hill", "North Side", "Sandy Ground", "Sandy Hill",
    "South Hill", "Stoney Ground", "The Farrington", "The Quarter",
    "The Valley", "West End",
  ] },
  "Antigua & Barbuda": { label: "Parish", options: [
    "Saint George", "Saint John", "Saint Mary", "Saint Paul",
    "Saint Peter", "Saint Philip", "Barbuda", "Redonda",
  ] },
  "Argentina": { label: "Province", options: [
    "Buenos Aires", "Ciudad Autónoma de Buenos Aires", "Catamarca",
    "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
    "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén",
    "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz",
    "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
  ] },
  "Armenia": { label: "Province", options: [
    "Aragatsotn", "Ararat", "Armavir", "Gegharkunik", "Kotayk", "Lori",
    "Shirak", "Syunik", "Tavush", "Vayots Dzor", "Yerevan",
  ] },
  "Aruba": { label: "Region", options: [
    "Noord", "Oranjestad", "Paradera", "Santa Cruz", "Savaneta",
  ] },
  "Australia": { label: "State", options: [
    "Australian Capital Territory", "New South Wales", "Northern Territory",
    "Queensland", "South Australia", "Tasmania", "Victoria",
    "Western Australia",
  ] },
  "Austria": { label: "State", options: [
    "Burgenland", "Carinthia", "Lower Austria", "Salzburg", "Styria",
    "Tyrol", "Upper Austria", "Vienna", "Vorarlberg",
  ] },
  "Azerbaijan": { label: "District", options: [
    "Absheron", "Baku", "Ganja", "Lankaran", "Mingachevir", "Naftalan",
    "Nakhchivan", "Shaki", "Shirvan", "Sumqayit", "Yevlakh",
  ] },
  "Bahamas": { label: "Island", options: [
    "Abaco", "Acklins", "Andros", "Berry Islands", "Bimini",
    "Cat Island", "Crooked Island", "Eleuthera", "Exuma", "Grand Bahama",
    "Inagua", "Long Island", "Mayaguana", "New Providence", "Ragged Island",
    "Rum Cay", "San Salvador",
  ] },
  "Bahrain": { label: "Governorate", options: [
    "Capital", "Muharraq", "Northern", "Southern",
  ] },
  "Bangladesh": { label: "Division", options: [
    "Barisal", "Chittagong", "Dhaka", "Khulna", "Mymensingh",
    "Rajshahi", "Rangpur", "Sylhet",
  ] },
  "Barbados": { label: "Parish", options: [
    "Christ Church", "Saint Andrew", "Saint George", "Saint James",
    "Saint John", "Saint Joseph", "Saint Lucy", "Saint Michael",
    "Saint Peter", "Saint Philip", "Saint Thomas",
  ] },
  "Belarus": { label: "Region", options: [
    "Brest", "Gomel", "Grodno", "Minsk", "Minsk City", "Mogilev", "Vitebsk",
  ] },
  "Belgium": { label: "Province", options: [
    "Antwerp", "East Flanders", "Flemish Brabant", "Hainaut", "Liège",
    "Limburg", "Luxembourg", "Namur", "Walloon Brabant", "West Flanders",
    "Brussels-Capital",
  ] },
  "Belize": { label: "District", options: [
    "Belize", "Cayo", "Corozal", "Orange Walk", "Stann Creek", "Toledo",
  ] },
  "Benin": { label: "Department", options: [
    "Alibori", "Atacora", "Atlantique", "Borgou", "Collines", "Couffo",
    "Donga", "Littoral", "Mono", "Ouémé", "Plateau", "Zou",
  ] },
  "Bermuda": { label: "Parish", options: [
    "Devonshire", "Hamilton", "Paget", "Pembroke", "Saint George's",
    "Sandys", "Smith's", "Southampton", "Warwick",
  ] },
  "Bhutan": { label: "District", options: [
    "Bumthang", "Chukha", "Dagana", "Gasa", "Haa", "Lhuntse", "Mongar",
    "Paro", "Pemagatshel", "Punakha", "Samdrup Jongkhar", "Samtse",
    "Sarpang", "Thimphu", "Trashigang", "Trashiyangtse", "Trongsa",
    "Tsirang", "Wangdue Phodrang", "Zhemgang",
  ] },
  "Bolivia": { label: "Department", options: [
    "Beni", "Chuquisaca", "Cochabamba", "La Paz", "Oruro", "Pando",
    "Potosí", "Santa Cruz", "Tarija",
  ] },
  "Bosnia & Herzegovina": { label: "Entity / District", options: [
    "Federation of Bosnia and Herzegovina", "Republika Srpska",
    "Brčko District",
  ] },
  "Botswana": { label: "District", options: [
    "Central", "Chobe", "Ghanzi", "Kgalagadi", "Kgatleng", "Kweneng",
    "North East", "North West", "South East", "Southern",
  ] },
  "Brazil": { label: "State", options: [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
    "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
    "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima",
    "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
  ] },
  "British Virgin Islands": { label: "District", options: [
    "Anegada", "Jost Van Dyke", "Tortola", "Virgin Gorda",
  ] },
  "Brunei": { label: "District", options: [
    "Belait", "Brunei-Muara", "Temburong", "Tutong",
  ] },
  "Bulgaria": { label: "Province", options: [
    "Blagoevgrad", "Burgas", "Dobrich", "Gabrovo", "Haskovo", "Kardzhali",
    "Kyustendil", "Lovech", "Montana", "Pazardzhik", "Pernik", "Pleven",
    "Plovdiv", "Razgrad", "Ruse", "Shumen", "Silistra", "Sliven",
    "Smolyan", "Sofia", "Sofia City", "Stara Zagora", "Targovishte",
    "Varna", "Veliko Tarnovo", "Vidin", "Vratsa", "Yambol",
  ] },
  "Burkina Faso": { label: "Region", options: [
    "Boucle du Mouhoun", "Cascades", "Centre", "Centre-Est",
    "Centre-Nord", "Centre-Ouest", "Centre-Sud", "Est", "Hauts-Bassins",
    "Nord", "Plateau-Central", "Sahel", "Sud-Ouest",
  ] },
  "Burundi": { label: "Province", options: [
    "Bubanza", "Bujumbura Mairie", "Bujumbura Rural", "Bururi", "Cankuzo",
    "Cibitoke", "Gitega", "Karuzi", "Kayanza", "Kirundo", "Makamba",
    "Muramvya", "Muyinga", "Mwaro", "Ngozi", "Rumonge", "Rutana", "Ruyigi",
  ] },
  "Cambodia": { label: "Province", options: [
    "Banteay Meanchey", "Battambang", "Kampong Cham", "Kampong Chhnang",
    "Kampong Speu", "Kampong Thom", "Kampot", "Kandal", "Kep", "Koh Kong",
    "Kratié", "Mondulkiri", "Oddar Meanchey", "Pailin", "Phnom Penh",
    "Preah Vihear", "Prey Veng", "Pursat", "Ratanakiri", "Siem Reap",
    "Sihanoukville", "Stung Treng", "Svay Rieng", "Takéo", "Tboung Khmum",
  ] },
  "Cameroon": { label: "Region", options: [
    "Adamawa", "Centre", "East", "Far North", "Littoral", "North",
    "Northwest", "South", "Southwest", "West",
  ] },
  "Canada": { label: "Province", options: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick",
    "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
    "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    "Yukon",
  ] },
  "Cape Verde": { label: "Municipality", options: [
    "Boa Vista", "Brava", "Maio", "Mosteiros", "Paul", "Porto Novo",
    "Praia", "Ribeira Brava", "Ribeira Grande", "Ribeira Grande de Santiago",
    "Sal", "Santa Catarina", "Santa Catarina do Fogo", "Santa Cruz",
    "São Domingos", "São Filipe", "São Lourenço dos Órgãos", "São Miguel",
    "São Salvador do Mundo", "São Vicente", "Tarrafal", "Tarrafal de São Nicolau",
  ] },
  "Caribbean Netherlands": { label: "Island", options: [
    "Bonaire", "Saba", "Sint Eustatius",
  ] },
  "Cayman Islands": { label: "District", options: [
    "Bodden Town", "Cayman Brac", "East End", "George Town",
    "Little Cayman", "North Side", "West Bay",
  ] },
  "Central African Republic": { label: "Prefecture", options: [
    "Bamingui-Bangoran", "Bangui", "Basse-Kotto", "Haute-Kotto",
    "Haut-Mbomou", "Kémo", "Lobaye", "Mambéré-Kadéï", "Mbomou",
    "Nana-Grébizi", "Nana-Mambéré", "Ombella-M'Poko", "Ouaka", "Ouham",
    "Ouham-Pendé", "Sangha-Mbaéré", "Vakaga",
  ] },
  "Chad": { label: "Region", options: [
    "Batha", "Borkou", "Chari-Baguirmi", "Ennedi Est", "Ennedi Ouest",
    "Guéra", "Hadjer-Lamis", "Kanem", "Lac", "Logone Occidental",
    "Logone Oriental", "Mandoul", "Mayo-Kebbi Est", "Mayo-Kebbi Ouest",
    "Moyen-Chari", "N'Djamena", "Ouaddaï", "Salamat", "Sila", "Tandjilé",
    "Tibesti", "Wadi Fira",
  ] },
  "Chile": { label: "Region", options: [
    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
    "Valparaíso", "Metropolitana de Santiago", "O'Higgins", "Maule",
    "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos",
    "Aysén", "Magallanes",
  ] },
  "China": { label: "Province", options: [
    "Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong",
    "Guangxi", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan",
    "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin",
    "Liaoning", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai",
    "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan",
    "Zhejiang",
  ] },
  "Christmas Island": { label: "District", options: [
    "Flying Fish Cove", "Poon Saan", "Silver City", "Drumsite",
  ] },
  "Cocos (Keeling) Islands": { label: "Island", options: [
    "West Island", "Home Island",
  ] },
  "Colombia": { label: "Department", options: [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá", "Bolívar",
    "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó",
    "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila",
    "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander",
    "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia",
    "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
  ] },
  "Comoros": { label: "Island", options: [
    "Grande Comore", "Anjouan", "Mohéli",
  ] },
  "Congo - Brazzaville": { label: "Department", options: [
    "Bouenza", "Brazzaville", "Cuvette", "Cuvette-Ouest", "Kouilou",
    "Lékoumou", "Likouala", "Niari", "Plateaux", "Pointe-Noire", "Pool",
    "Sangha",
  ] },
  "Congo - Kinshasa": { label: "Province", options: [
    "Kinshasa", "Kongo Central", "Kwango", "Kwilu", "Mai-Ndombe",
    "Kasaï", "Kasaï-Central", "Kasaï-Oriental", "Lomami", "Sankuru",
    "Maniema", "Sud-Kivu", "Nord-Kivu", "Ituri", "Haut-Uele", "Tshopo",
    "Bas-Uele", "Nord-Ubangi", "Mongala", "Sud-Ubangi", "Équateur",
    "Tshuapa", "Tanganyika", "Haut-Lomami", "Lualaba", "Haut-Katanga",
  ] },
  "Cook Islands": { label: "Island", options: [
    "Rarotonga", "Aitutaki", "Atiu", "Mangaia", "Mauke", "Mitiaro",
    "Palmerston", "Penrhyn", "Pukapuka", "Manihiki", "Rakahanga",
    "Nassau", "Suwarrow",
  ] },
  "Costa Rica": { label: "Province", options: [
    "Alajuela", "Cartago", "Guanacaste", "Heredia", "Limón", "Puntarenas",
    "San José",
  ] },
  "Côte d'Ivoire": { label: "District", options: [
    "Abidjan", "Bas-Sassandra", "Comoé", "Denguélé", "Gôh-Djiboua",
    "Lacs", "Lagunes", "Montagnes", "Sassandra-Marahoué", "Savanes",
    "Vallée du Bandama", "Woroba", "Yamoussoukro", "Zanzan",
  ] },
  "Croatia": { label: "County", options: [
    "Bjelovar-Bilogora", "Brod-Posavina", "Dubrovnik-Neretva", "Istria",
    "Karlovac", "Koprivnica-Križevci", "Krapina-Zagorje", "Lika-Senj",
    "Međimurje", "Osijek-Baranja", "Požega-Slavonia", "Primorje-Gorski Kotar",
    "Šibenik-Knin", "Sisak-Moslavina", "Split-Dalmatia", "Varaždin",
    "Virovitica-Podravina", "Vukovar-Syrmia", "Zadar", "Zagreb",
    "Zagreb City",
  ] },
  "Cuba": { label: "Province", options: [
    "Artemisa", "Camagüey", "Ciego de Ávila", "Cienfuegos",
    "Granma", "Guantánamo", "Havana", "Holguín", "Isla de la Juventud",
    "Las Tunas", "Matanzas", "Mayabeque", "Pinar del Río",
    "Sancti Spíritus", "Santiago de Cuba", "Villa Clara",
  ] },
  "Curaçao": { label: "Region", options: [
    "Banda Abou", "Banda Ariba", "Willemstad",
  ] },
  "Cyprus": { label: "District", options: [
    "Famagusta", "Kyrenia", "Larnaca", "Limassol", "Nicosia", "Paphos",
  ] },
  "Czechia": { label: "Region", options: [
    "Prague", "Central Bohemian", "South Bohemian", "Plzeň", "Karlovy Vary",
    "Ústí nad Labem", "Liberec", "Hradec Králové", "Pardubice", "Vysočina",
    "South Moravian", "Olomouc", "Zlín", "Moravian-Silesian",
  ] },
  "Denmark": { label: "Region", options: [
    "Capital Region", "Zealand", "Southern Denmark", "Central Denmark",
    "North Denmark",
  ] },
  "Djibouti": { label: "Region", options: [
    "Ali Sabieh", "Arta", "Dikhil", "Djibouti", "Obock", "Tadjourah",
  ] },
  "Dominica": { label: "Parish", options: [
    "Saint Andrew", "Saint David", "Saint George", "Saint John",
    "Saint Joseph", "Saint Luke", "Saint Mark", "Saint Patrick",
    "Saint Paul", "Saint Peter",
  ] },
  "Dominican Republic": { label: "Province", options: [
    "Azua", "Bahoruco", "Barahona", "Dajabón", "Distrito Nacional",
    "Duarte", "Elías Piña", "El Seibo", "Espaillat", "Hato Mayor",
    "Hermanas Mirabal", "Independencia", "La Altagracia", "La Romana",
    "La Vega", "María Trinidad Sánchez", "Monseñor Nouel", "Monte Cristi",
    "Monte Plata", "Pedernales", "Peravia", "Puerto Plata", "Samaná",
    "Sánchez Ramírez", "San Cristóbal", "San José de Ocoa", "San Juan",
    "San Pedro de Macorís", "Santiago", "Santiago Rodríguez",
    "Santo Domingo", "Valverde",
  ] },
  "Ecuador": { label: "Province", options: [
    "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi",
    "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja",
    "Los Ríos", "Manabí", "Morona-Santiago", "Napo", "Orellana",
    "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
    "Sucumbíos", "Tungurahua", "Zamora-Chinchipe",
  ] },
  "Egypt": { label: "Governorate", options: [
    "Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo",
    "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia",
    "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley",
    "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea",
    "Sharqia", "Sohag", "South Sinai", "Suez",
  ] },
  "El Salvador": { label: "Department", options: [
    "Ahuachapán", "Cabañas", "Chalatenango", "Cuscatlán", "La Libertad",
    "La Paz", "La Unión", "Morazán", "San Miguel", "San Salvador",
    "San Vicente", "Santa Ana", "Sonsonate", "Usulután",
  ] },
  "Equatorial Guinea": { label: "Province", options: [
    "Annobón", "Bioko Norte", "Bioko Sur", "Centro Sur", "Kié-Ntem",
    "Litoral", "Wele-Nzas",
  ] },
  "Eritrea": { label: "Region", options: [
    "Anseba", "Debub", "Debubawi Keyih Bahri", "Gash-Barka", "Maekel",
    "Semenawi Keyih Bahri",
  ] },
  "Estonia": { label: "County", options: [
    "Harju", "Hiiu", "Ida-Viru", "Järva", "Jõgeva", "Lääne",
    "Lääne-Viru", "Pärnu", "Põlva", "Rapla", "Saare", "Tartu", "Valga",
    "Viljandi", "Võru",
  ] },
  "Eswatini": { label: "Region", options: [
    "Hhohho", "Lubombo", "Manzini", "Shiselweni",
  ] },
  "Ethiopia": { label: "Region", options: [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", "Dire Dawa",
    "Gambela", "Harari", "Oromia", "Sidama", "Somali", "South West",
    "Southern Nations, Nationalities, and Peoples'", "Tigray",
  ] },
  "Falkland Islands": { label: "Region", options: [
    "Stanley", "Camp",
  ] },
  "Faroe Islands": { label: "Region", options: [
    "Norðoyar", "Eysturoy", "Streymoy", "Vágar", "Sandoy", "Suðuroy",
  ] },
  "Fiji": { label: "Division", options: [
    "Central", "Eastern", "Northern", "Western", "Rotuma",
  ] },
  "Finland": { label: "Region", options: [
    "Åland", "Central Finland", "Central Ostrobothnia", "Kainuu",
    "Kanta-Häme", "Kymenlaakso", "Lapland", "North Karelia",
    "North Ostrobothnia", "North Savo", "Ostrobothnia", "Päijänne Tavastia",
    "Pirkanmaa", "Satakunta", "South Karelia", "South Ostrobothnia",
    "South Savo", "Southwest Finland", "Uusimaa",
  ] },
  "France": { label: "Department", options: [
    "Ain", "Aisne", "Allier", "Alpes-de-Haute-Provence", "Hautes-Alpes",
    "Alpes-Maritimes", "Ardèche", "Ardennes", "Ariège", "Aube", "Aude",
    "Aveyron", "Bouches-du-Rhône", "Calvados", "Cantal", "Charente",
    "Charente-Maritime", "Cher", "Corrèze", "Corse-du-Sud", "Haute-Corse",
    "Côte-d'Or", "Côtes-d'Armor", "Creuse", "Dordogne", "Doubs", "Drôme",
    "Eure", "Eure-et-Loir", "Finistère", "Gard", "Haute-Garonne", "Gers",
    "Gironde", "Hérault", "Ille-et-Vilaine", "Indre", "Indre-et-Loire",
    "Isère", "Jura", "Landes", "Loir-et-Cher", "Loire", "Haute-Loire",
    "Loire-Atlantique", "Loiret", "Lot", "Lot-et-Garonne", "Lozère",
    "Maine-et-Loire", "Manche", "Marne", "Haute-Marne", "Mayenne",
    "Meurthe-et-Moselle", "Meuse", "Morbihan", "Moselle", "Nièvre",
    "Nord", "Oise", "Orne", "Paris", "Pas-de-Calais", "Puy-de-Dôme",
    "Pyrénées-Atlantiques", "Hautes-Pyrénées", "Pyrénées-Orientales",
    "Bas-Rhin", "Haut-Rhin", "Rhône", "Haute-Saône", "Saône-et-Loire",
    "Sarthe", "Savoie", "Haute-Savoie", "Seine-Maritime", "Seine-et-Marne",
    "Yvelines", "Deux-Sèvres", "Somme", "Tarn", "Tarn-et-Garonne", "Var",
    "Vaucluse", "Vendée", "Vienne", "Haute-Vienne", "Vosges", "Yonne",
  ] },
  "French Guiana": { label: "Region", options: ["French Guiana"] },
  "French Polynesia": { label: "Island group", options: [
    "Society Islands", "Tuamotu Islands", "Marquesas Islands",
    "Gambier Islands", "Austral Islands",
  ] },
  "Gabon": { label: "Province", options: [
    "Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ngounié", "Nyanga",
    "Ogooué-Ivindo", "Ogooué-Lolo", "Ogooué-Maritime", "Woleu-Ntem",
  ] },
  "Gambia": { label: "Division", options: [
    "Banjul", "Central River", "Lower River", "North Bank",
    "Upper River", "West Coast",
  ] },
  "Georgia": { label: "Region", options: [
    "Abkhazia", "Adjara", "Guria", "Imereti", "Kakheti",
    "Kvemo Kartli", "Mtskheta-Mtianeti", "Racha-Lechkhumi and Kvemo Svaneti",
    "Samegrelo-Zemo Svaneti", "Samtskhe-Javakheti", "Shida Kartli",
    "Tbilisi",
  ] },
  "Germany": { label: "State", options: [
    "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen",
    "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland",
    "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia",
  ] },
  "Ghana": { label: "Region", options: [
    "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern",
    "Greater Accra", "North East", "Northern", "Oti", "Savannah",
    "Upper East", "Upper West", "Volta", "Western", "Western North",
  ] },
  "Gibraltar": { label: "District", options: ["Gibraltar"] },
  "Greece": { label: "Region", options: [
    "Attica", "Central Greece", "Central Macedonia", "Crete",
    "Eastern Macedonia and Thrace", "Epirus", "Ionian Islands",
    "North Aegean", "Peloponnese", "South Aegean", "Thessaly",
    "Western Greece", "Western Macedonia",
  ] },
  "Greenland": { label: "Municipality", options: [
    "Sermersooq", "Kujalleq", "Qeqqata", "Qeqertalik", "Avannaata",
  ] },
  "Grenada": { label: "Parish", options: [
    "Saint Andrew", "Saint David", "Saint George", "Saint John",
    "Saint Mark", "Saint Patrick", "Carriacou and Petite Martinique",
  ] },
  "Guadeloupe": { label: "Region", options: ["Guadeloupe"] },
  "Guam": { label: "Village", options: [
    "Agana Heights", "Agat", "Asan-Maina", "Barrigada", "Chalan Pago-Ordot",
    "Dededo", "Hagåtña", "Inarajan", "Mangilao", "Merizo", "Mongmong-Toto-Maite",
    "Piti", "Santa Rita-Sumai", "Sinajana", "Talofofo", "Tamuning-Tumon-Harmon",
    "Umatac", "Yigo", "Yona",
  ] },
  "Guatemala": { label: "Department", options: [
    "Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula",
    "El Progreso", "Escuintla", "Guatemala", "Huehuetenango", "Izabal",
    "Jalapa", "Jutiapa", "Petén", "Quetzaltenango", "Quiché",
    "Retalhuleu", "Sacatepéquez", "San Marcos", "Santa Rosa", "Sololá",
    "Suchitepéquez", "Totonicapán", "Zacapa",
  ] },
  "Guernsey": { label: "Parish", options: [
    "St Peter Port", "St Sampson", "Vale", "Castel", "St Saviour",
    "St Pierre du Bois", "Torteval", "Forest", "St Martin", "St Andrew",
  ] },
  "Guinea": { label: "Region", options: [
    "Boké", "Conakry", "Faranah", "Kankan", "Kindia", "Labé",
    "Mamou", "Nzérékoré",
  ] },
  "Guinea-Bissau": { label: "Region", options: [
    "Bafatá", "Biombo", "Bissau", "Bolama", "Cacheu", "Gabú", "Oio",
    "Quinara", "Tombali",
  ] },
  "Guyana": { label: "Region", options: [
    "Barima-Waini", "Cuyuni-Mazaruni", "Demerara-Mahaica",
    "East Berbice-Corentyne", "Essequibo Islands-West Demerara",
    "Mahaica-Berbice", "Pomeroon-Supenaam", "Potaro-Siparuni",
    "Upper Demerara-Berbice", "Upper Takutu-Upper Essequibo",
  ] },
  "Haiti": { label: "Department", options: [
    "Artibonite", "Centre", "Grand'Anse", "Nippes", "Nord",
    "Nord-Est", "Nord-Ouest", "Ouest", "Sud", "Sud-Est",
  ] },
  "Honduras": { label: "Department", options: [
    "Atlántida", "Choluteca", "Colón", "Comayagua", "Copán", "Cortés",
    "El Paraíso", "Francisco Morazán", "Gracias a Dios", "Intibucá",
    "Islas de la Bahía", "La Paz", "Lempira", "Ocotepeque", "Olancho",
    "Santa Bárbara", "Valle", "Yoro",
  ] },
  "Hong Kong SAR": { label: "Region", options: [
    "Hong Kong Island", "Kowloon", "New Territories",
  ] },
  "Hungary": { label: "County", options: [
    "Bács-Kiskun", "Baranya", "Békés", "Borsod-Abaúj-Zemplén", "Csongrád-Csanád",
    "Fejér", "Győr-Moson-Sopron", "Hajdú-Bihar", "Heves", "Jász-Nagykun-Szolnok",
    "Komárom-Esztergom", "Nógrád", "Pest", "Somogy", "Szabolcs-Szatmár-Bereg",
    "Tolna", "Vas", "Veszprém", "Zala", "Budapest",
  ] },
  "Iceland": { label: "Region", options: [
    "Capital Region", "Southern Peninsula", "Western Region",
    "Westfjords", "Northwestern Region", "Northeastern Region",
    "Eastern Region", "Southern Region",
  ] },
  "India": { label: "State", options: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  ] },
  "Indonesia": { label: "Province", options: [
    "Aceh", "Bali", "Banten", "Bengkulu", "Central Java",
    "Central Kalimantan", "Central Sulawesi", "East Java",
    "East Kalimantan", "East Nusa Tenggara", "Gorontalo", "Jakarta",
    "Jambi", "Lampung", "Maluku", "North Kalimantan", "North Maluku",
    "North Sulawesi", "North Sumatra", "Papua", "Riau", "Riau Islands",
    "South Kalimantan", "South Sulawesi", "South Sumatra",
    "Southeast Sulawesi", "West Java", "West Kalimantan",
    "West Nusa Tenggara", "West Papua", "West Sulawesi", "West Sumatra",
    "Yogyakarta",
  ] },
  "Iran": { label: "Province", options: [
    "Alborz", "Ardabil", "Bushehr", "Chaharmahal and Bakhtiari",
    "East Azerbaijan", "Fars", "Gilan", "Golestan", "Hamadan", "Hormozgan",
    "Ilam", "Isfahan", "Kerman", "Kermanshah", "Khuzestan",
    "Kohgiluyeh and Boyer-Ahmad", "Kurdistan", "Lorestan", "Markazi",
    "Mazandaran", "North Khorasan", "Qazvin", "Qom", "Razavi Khorasan",
    "Semnan", "Sistan and Baluchestan", "South Khorasan", "Tehran",
    "West Azerbaijan", "Yazd", "Zanjan",
  ] },
  "Iraq": { label: "Governorate", options: [
    "Al Anbar", "Babil", "Baghdad", "Basra", "Dhi Qar", "Diyala",
    "Duhok", "Erbil", "Karbala", "Kirkuk", "Maysan", "Muthanna",
    "Najaf", "Ninawa", "Al-Qādisiyyah", "Salah ad-Din", "Sulaymaniyah",
    "Wasit",
  ] },
  "Ireland": { label: "County", options: [
    "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway",
    "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick",
    "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly",
    "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath",
    "Wexford", "Wicklow",
  ] },
  "Isle of Man": { label: "Sheading", options: [
    "Ayre", "Garff", "Glenfaba", "Michael", "Middle", "Rushen",
  ] },
  "Israel": { label: "District", options: [
    "Central", "Haifa", "Jerusalem", "Northern", "Southern", "Tel Aviv",
  ] },
  "Italy": { label: "Region", options: [
    "Abruzzo", "Aosta Valley", "Apulia", "Basilicata", "Calabria",
    "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio",
    "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Sardinia",
    "Sicily", "Trentino-Alto Adige", "Tuscany", "Umbria", "Veneto",
  ] },
  "Jamaica": { label: "Parish", options: [
    "Clarendon", "Hanover", "Kingston", "Manchester", "Portland",
    "Saint Andrew", "Saint Ann", "Saint Catherine", "Saint Elizabeth",
    "Saint James", "Saint Mary", "Saint Thomas", "Trelawny", "Westmoreland",
  ] },
  "Japan": { label: "Prefecture", options: [
    "Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka",
    "Fukushima", "Gifu", "Gunma", "Hiroshima", "Hokkaido", "Hyogo",
    "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa",
    "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano",
    "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka",
    "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi",
    "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata",
    "Yamaguchi", "Yamanashi",
  ] },
  "Jersey": { label: "Parish", options: [
    "Grouville", "Saint Brelade", "Saint Clement", "Saint Helier",
    "Saint John", "Saint Lawrence", "Saint Martin", "Saint Mary",
    "Saint Ouen", "Saint Peter", "Saint Saviour", "Trinity",
  ] },
  "Jordan": { label: "Governorate", options: [
    "Ajloun", "Amman", "Aqaba", "Balqa", "Irbid", "Jerash", "Karak",
    "Ma'an", "Madaba", "Mafraq", "Tafilah", "Zarqa",
  ] },
  "Kazakhstan": { label: "Region", options: [
    "Abai", "Akmola", "Aktobe", "Almaty", "Almaty Region", "Astana",
    "Atyrau", "East Kazakhstan", "Jambyl", "Jetisu", "Karaganda",
    "Kostanay", "Kyzylorda", "Mangystau", "North Kazakhstan", "Pavlodar",
    "Shymkent", "Turkistan", "Ulytau", "West Kazakhstan",
  ] },
  "Kenya": { label: "County", options: [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
    "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
    "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
    "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
    "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru",
    "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu",
    "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
    "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir",
    "West Pokot",
  ] },
  "Kiribati": { label: "Island group", options: [
    "Gilbert Islands", "Line Islands", "Phoenix Islands",
  ] },
  "Kosovo": { label: "District", options: [
    "Ferizaj", "Gjakova", "Gjilan", "Mitrovica", "Peja", "Prishtina",
    "Prizren",
  ] },
  "Kuwait": { label: "Governorate", options: [
    "Al Ahmadi", "Al Farwaniyah", "Al Jahra", "Capital", "Hawalli",
    "Mubarak Al-Kabeer",
  ] },
  "Kyrgyzstan": { label: "Region", options: [
    "Batken", "Bishkek", "Chuy", "Jalal-Abad", "Naryn", "Osh",
    "Osh City", "Talas", "Issyk-Kul",
  ] },
  "Laos": { label: "Province", options: [
    "Attapeu", "Bokeo", "Bolikhamsai", "Champasak", "Houaphanh",
    "Khammouane", "Luang Namtha", "Luang Prabang", "Oudomxay",
    "Phongsaly", "Salavan", "Savannakhet", "Sekong", "Vientiane",
    "Vientiane Prefecture", "Xaisomboun", "Xayaburi", "Xiangkhouang",
  ] },
  "Latvia": { label: "Region", options: [
    "Courland", "Latgale", "Riga", "Vidzeme", "Zemgale",
  ] },
  "Lebanon": { label: "Governorate", options: [
    "Akkar", "Baalbek-Hermel", "Beirut", "Beqaa", "Mount Lebanon",
    "Nabatieh", "North", "South",
  ] },
  "Lesotho": { label: "District", options: [
    "Berea", "Butha-Buthe", "Leribe", "Mafeteng", "Maseru",
    "Mohale's Hoek", "Mokhotlong", "Qacha's Nek", "Quthing", "Thaba-Tseka",
  ] },
  "Liberia": { label: "County", options: [
    "Bomi", "Bong", "Gbarpolu", "Grand Bassa", "Grand Cape Mount",
    "Grand Gedeh", "Grand Kru", "Lofa", "Margibi", "Maryland",
    "Montserrado", "Nimba", "River Cess", "River Gee", "Sinoe",
  ] },
  "Libya": { label: "District", options: [
    "Al Butnan", "Al Jabal al Akhdar", "Al Jabal al Gharbi", "Al Jfara",
    "Al Kufrah", "Al Marj", "Al Marqab", "Al Wahat", "Az Zawiyah",
    "Benghazi", "Derna", "Ghat", "Misrata", "Murzuq", "Nalut", "Sabha",
    "Sirte", "Tripoli", "Wadi al Hayaa", "Wadi al Shatii",
  ] },
  "Liechtenstein": { label: "Municipality", options: [
    "Balzers", "Eschen", "Gamprin", "Mauren", "Planken", "Ruggell",
    "Schaan", "Schellenberg", "Triesen", "Triesenberg", "Vaduz",
  ] },
  "Lithuania": { label: "County", options: [
    "Alytus", "Kaunas", "Klaipėda", "Marijampolė", "Panevėžys",
    "Šiauliai", "Tauragė", "Telšiai", "Utena", "Vilnius",
  ] },
  "Luxembourg": { label: "District", options: [
    "Diekirch", "Grevenmacher", "Luxembourg",
  ] },
  "Macao SAR": { label: "Parish", options: [
    "Sé", "Santo António", "São Lázaro", "São Lourenço",
    "Nossa Senhora de Fátima", "Cotai", "Coloane",
  ] },
  "Madagascar": { label: "Province", options: [
    "Antananarivo", "Antsiranana", "Fianarantsoa", "Mahajanga",
    "Toamasina", "Toliara",
  ] },
  "Malawi": { label: "Region", options: [
    "Central Region", "Northern Region", "Southern Region",
  ] },
  "Malaysia": { label: "State", options: [
    "Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan", "Melaka",
    "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Putrajaya",
    "Sabah", "Sarawak", "Selangor", "Terengganu",
  ] },
  "Maldives": { label: "Atoll", options: [
    "Addu", "Ari", "Faadhippolhu", "Felidhu", "Haa Alif", "Haa Dhaalu",
    "Kolhumadulu", "Laamu", "Malé", "Meemu", "Mulaku", "Nilandhe",
    "North Maalhosmadulu", "North Miladhunmadulu", "North Thiladhunmathi",
    "Raa", "South Maalhosmadulu", "South Miladhunmadulu",
    "South Thiladhunmathi", "Vaavu",
  ] },
  "Mali": { label: "Region", options: [
    "Bamako", "Gao", "Kayes", "Kidal", "Koulikoro", "Ménaka", "Mopti",
    "Ségou", "Sikasso", "Taoudénit", "Tombouctou",
  ] },
  "Malta": { label: "Region", options: [
    "Gozo and Comino", "Northern", "South Eastern", "Southern Harbour",
    "Western", "Northern Harbour",
  ] },
  "Marshall Islands": { label: "Chain", options: [
    "Ratak Chain", "Ralik Chain",
  ] },
  "Martinique": { label: "Region", options: ["Martinique"] },
  "Mauritania": { label: "Region", options: [
    "Adrar", "Assaba", "Brakna", "Dakhlet Nouadhibou", "Gorgol",
    "Guidimaka", "Hodh Ech Chargui", "Hodh El Gharbi", "Inchiri",
    "Nouakchott Nord", "Nouakchott Ouest", "Nouakchott Sud", "Tagant",
    "Tiris Zemmour", "Trarza",
  ] },
  "Mauritius": { label: "District", options: [
    "Black River", "Flacq", "Grand Port", "Moka", "Pamplemousses",
    "Plaines Wilhems", "Port Louis", "Rivière du Rempart", "Savanne",
    "Rodrigues", "Agalega",
  ] },
  "Mayotte": { label: "Region", options: ["Mayotte"] },
  "Mexico": { label: "State", options: [
    "Aguascalientes", "Baja California", "Baja California Sur",
    "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila",
    "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
    "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
    "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
    "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
    "Yucatán", "Zacatecas",
  ] },
  "Micronesia": { label: "State", options: [
    "Chuuk", "Kosrae", "Pohnpei", "Yap",
  ] },
  "Moldova": { label: "District", options: [
    "Anenii Noi", "Bălți", "Basarabeasca", "Briceni", "Cahul", "Cantemir",
    "Călărași", "Căușeni", "Chișinău", "Cimișlia", "Criuleni", "Dondușeni",
    "Drochia", "Dubăsari", "Edineț", "Fălești", "Florești", "Gagauzia",
    "Glodeni", "Hîncești", "Ialoveni", "Leova", "Nisporeni", "Ocnița",
    "Orhei", "Rezina", "Rîșcani", "Sîngerei", "Soroca", "Strășeni",
    "Șoldănești", "Ștefan Vodă", "Taraclia", "Telenești", "Transnistria",
    "Ungheni",
  ] },
  "Monaco": { label: "Quarter", options: [
    "Monaco-Ville", "La Condamine", "Monte Carlo", "Fontvieille",
    "Moneghetti", "Larvotto", "Saint Roman",
  ] },
  "Mongolia": { label: "Province", options: [
    "Arkhangai", "Bayan-Ölgii", "Bayankhongor", "Bulgan", "Darkhan-Uul",
    "Dornod", "Dornogovi", "Dundgovi", "Govi-Altai", "Govisümber",
    "Khentii", "Khovd", "Khövsgöl", "Ömnögovi", "Orkhon", "Övörkhangai",
    "Selenge", "Sükhbaatar", "Töv", "Ulaanbaatar", "Uvs", "Zavkhan",
  ] },
  "Montenegro": { label: "Municipality", options: [
    "Andrijevica", "Bar", "Berane", "Bijelo Polje", "Budva", "Cetinje",
    "Danilovgrad", "Gusinje", "Herceg Novi", "Kolašin", "Kotor", "Mojkovac",
    "Nikšić", "Petnjica", "Plav", "Pljevlja", "Plužine", "Podgorica",
    "Rožaje", "Šavnik", "Tivat", "Tuzi", "Ulcinj", "Žabljak",
  ] },
  "Montserrat": { label: "Parish", options: [
    "Saint Anthony", "Saint Georges", "Saint Peter",
  ] },
  "Morocco": { label: "Region", options: [
    "Tanger-Tétouan-Al Hoceïma", "Oriental", "Fès-Meknès",
    "Rabat-Salé-Kénitra", "Béni Mellal-Khénifra", "Casablanca-Settat",
    "Marrakech-Safi", "Drâa-Tafilalet", "Souss-Massa",
    "Guelmim-Oued Noun", "Laâyoune-Sakia El Hamra", "Dakhla-Oued Ed-Dahab",
  ] },
  "Mozambique": { label: "Province", options: [
    "Cabo Delgado", "Gaza", "Inhambane", "Manica", "Maputo",
    "Maputo City", "Nampula", "Niassa", "Sofala", "Tete", "Zambezia",
  ] },
  "Myanmar (Burma)": { label: "State/Region", options: [
    "Ayeyarwady", "Bago", "Chin", "Kachin", "Kayah", "Kayin", "Magway",
    "Mandalay", "Mon", "Naypyidaw", "Rakhine", "Sagaing", "Shan",
    "Tanintharyi", "Yangon",
  ] },
  "Namibia": { label: "Region", options: [
    "Erongo", "Hardap", "Karas", "Kavango East", "Kavango West",
    "Khomas", "Kunene", "Ohangwena", "Omaheke", "Omusati", "Oshana",
    "Oshikoto", "Otjozondjupa", "Zambezi",
  ] },
  "Nauru": { label: "District", options: [
    "Aiwo", "Anabar", "Anetan", "Anibare", "Baiti", "Boe", "Buada",
    "Denigomodu", "Ewa", "Ijuw", "Meneng", "Nibok", "Uaboe", "Yaren",
  ] },
  "Nepal": { label: "Province", options: [
    "Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali",
    "Sudurpashchim",
  ] },
  "Netherlands": { label: "Province", options: [
    "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen",
    "Limburg", "North Brabant", "North Holland", "Overijssel",
    "South Holland", "Utrecht", "Zeeland",
  ] },
  "New Caledonia": { label: "Province", options: [
    "North Province", "South Province", "Loyalty Islands Province",
  ] },
  "New Zealand": { label: "Region", options: [
    "Auckland", "Bay of Plenty", "Canterbury", "Gisborne",
    "Hawke's Bay", "Manawatū-Whanganui", "Marlborough", "Nelson",
    "Northland", "Otago", "Southland", "Taranaki", "Tasman", "Waikato",
    "Wellington", "West Coast",
  ] },
  "Nicaragua": { label: "Department", options: [
    "Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada",
    "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa",
    "Nueva Segovia", "Río San Juan", "Rivas",
    "North Caribbean Coast", "South Caribbean Coast",
  ] },
  "Niger": { label: "Region", options: [
    "Agadez", "Diffa", "Dosso", "Maradi", "Niamey", "Tahoua",
    "Tillabéri", "Zinder",
  ] },
  "Nigeria": { label: "State", options: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
    "Enugu", "Federal Capital Territory", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
  ] },
  "Niue": { label: "Village", options: [
    "Alofi", "Avatele", "Hakupu", "Liku", "Mutalau", "Namukulu",
    "Toi", "Tuapa",
  ] },
  "Norfolk Island": { label: "Region", options: ["Norfolk Island"] },
  "North Korea": { label: "Province", options: [
    "Chagang", "North Hamgyong", "South Hamgyong", "North Hwanghae",
    "South Hwanghae", "Kangwon", "North Pyongan", "South Pyongan",
    "Pyongyang", "Rason", "Ryanggang",
  ] },
  "North Macedonia": { label: "Region", options: [
    "East", "Northeast", "Pelagonia", "Polog", "Skopje", "Southeast",
    "Southwest", "Vardar",
  ] },
  "Northern Mariana Islands": { label: "Municipality", options: [
    "Saipan", "Tinian", "Rota", "Northern Islands",
  ] },
  "Norway": { label: "County", options: [
    "Agder", "Innlandet", "Møre og Romsdal", "Nordland", "Oslo",
    "Rogaland", "Troms og Finnmark", "Trøndelag", "Vestfold og Telemark",
    "Vestland", "Viken",
  ] },
  "Oman": { label: "Governorate", options: [
    "Ad Dakhiliyah", "Al Buraimi", "Al Wusta", "Ash Sharqiyah North",
    "Ash Sharqiyah South", "Al Batinah North", "Al Batinah South",
    "Ad Dhahirah", "Dhofar", "Musandam", "Muscat",
  ] },
  "Pakistan": { label: "Province", options: [
    "Azad Kashmir", "Balochistan", "Gilgit-Baltistan", "Islamabad",
    "Khyber Pakhtunkhwa", "Punjab", "Sindh",
  ] },
  "Palau": { label: "State", options: [
    "Aimeliik", "Airai", "Angaur", "Hatohobei", "Kayangel", "Koror",
    "Melekeok", "Ngaraard", "Ngarchelong", "Ngardmau", "Ngatpang",
    "Ngchesar", "Ngeremlengui", "Ngiwal", "Peleliu", "Sonsorol",
  ] },
  "Palestinian Territories": { label: "Governorate", options: [
    "Bethlehem", "Deir al-Balah", "Gaza", "Hebron", "Jenin", "Jericho",
    "Jerusalem", "Khan Yunis", "Nablus", "North Gaza", "Qalqilya",
    "Rafah", "Ramallah and al-Bireh", "Salfit", "Tubas", "Tulkarm",
  ] },
  "Panama": { label: "Province", options: [
    "Bocas del Toro", "Chiriquí", "Coclé", "Colón", "Darién", "Herrera",
    "Los Santos", "Panamá", "Panamá Oeste", "Veraguas",
  ] },
  "Papua New Guinea": { label: "Province", options: [
    "Bougainville", "Central", "Chimbu", "Eastern Highlands",
    "East New Britain", "East Sepik", "Enga", "Gulf", "Hela", "Jiwaka",
    "Madang", "Manus", "Milne Bay", "Morobe", "National Capital District",
    "New Ireland", "Northern", "Southern Highlands", "West New Britain",
    "Western", "Western Highlands", "West Sepik",
  ] },
  "Paraguay": { label: "Department", options: [
    "Alto Paraguay", "Alto Paraná", "Amambay", "Asunción", "Boquerón",
    "Caaguazú", "Caazapá", "Canindeyú", "Central", "Concepción",
    "Cordillera", "Guairá", "Itapúa", "Misiones", "Ñeembucú",
    "Paraguarí", "Presidente Hayes", "San Pedro",
  ] },
  "Peru": { label: "Department", options: [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho",
    "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica",
    "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto",
    "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín",
    "Tacna", "Tumbes", "Ucayali",
  ] },
  "Philippines": { label: "Region", options: [
    "Ilocos", "Cagayan Valley", "Central Luzon", "Calabarzon",
    "Mimaropa", "Bicol", "Western Visayas", "Central Visayas",
    "Eastern Visayas", "Zamboanga Peninsula", "Northern Mindanao",
    "Davao", "Soccsksargen", "Caraga", "Bangsamoro", "Cordillera",
    "National Capital Region",
  ] },
  "Pitcairn Islands": { label: "Island", options: [
    "Pitcairn", "Henderson", "Ducie", "Oeno",
  ] },
  "Poland": { label: "Voivodeship", options: [
    "Greater Poland", "Kuyavian-Pomeranian", "Lesser Poland",
    "Łódź", "Lower Silesian", "Lublin", "Lubusz", "Masovian",
    "Opole", "Podkarpackie", "Podlaskie", "Pomeranian", "Silesian",
    "Świętokrzyskie", "Warmian-Masurian", "West Pomeranian",
  ] },
  "Portugal": { label: "District", options: [
    "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
    "Évora", "Faro", "Guarda", "Leiria", "Lisbon", "Portalegre", "Porto",
    "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu",
    "Azores", "Madeira",
  ] },
  "Puerto Rico": { label: "Municipality", options: [
    "San Juan", "Bayamón", "Carolina", "Ponce", "Caguas", "Guaynabo",
    "Mayagüez", "Trujillo Alto", "Arecibo", "Toa Baja",
  ] },
  "Qatar": { label: "Municipality", options: [
    "Al Daayen", "Al Khor", "Al Rayyan", "Al Shamal", "Al Wakrah",
    "Doha", "Umm Salal", "Al Sheehaniya",
  ] },
  "Réunion": { label: "Region", options: ["Réunion"] },
  "Romania": { label: "County", options: [
    "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud",
    "Botoșani", "Brăila", "Brașov", "București", "Buzău", "Călărași",
    "Caraș-Severin", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj",
    "Galați", "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomița",
    "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt",
    "Prahova", "Sălaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman",
    "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
  ] },
  "Russia": { label: "Region", options: [
    "Adygea", "Altai Krai", "Altai Republic", "Amur", "Arkhangelsk",
    "Astrakhan", "Bashkortostan", "Belgorod", "Bryansk", "Buryatia",
    "Chechnya", "Chelyabinsk", "Chukotka", "Chuvashia", "Dagestan",
    "Ingushetia", "Irkutsk", "Ivanovo", "Kabardino-Balkaria",
    "Kaliningrad", "Kalmykia", "Kaluga", "Kamchatka", "Karachay-Cherkessia",
    "Karelia", "Kemerovo", "Khabarovsk", "Khakassia", "Khanty-Mansi",
    "Kirov", "Komi", "Kostroma", "Krasnodar", "Krasnoyarsk", "Kurgan",
    "Kursk", "Leningrad", "Lipetsk", "Magadan", "Mari El", "Mordovia",
    "Moscow", "Moscow Oblast", "Murmansk", "Nenets", "Nizhny Novgorod",
    "North Ossetia-Alania", "Novgorod", "Novosibirsk", "Omsk", "Orenburg",
    "Oryol", "Penza", "Perm", "Primorsky", "Pskov", "Rostov", "Ryazan",
    "Saint Petersburg", "Sakha", "Sakhalin", "Samara", "Saratov",
    "Smolensk", "Stavropol", "Sverdlovsk", "Tambov", "Tatarstan",
    "Tomsk", "Tula", "Tuva", "Tver", "Tyumen", "Udmurtia", "Ulyanovsk",
    "Vladimir", "Volgograd", "Vologda", "Voronezh", "Yamalo-Nenets",
    "Yaroslavl", "Zabaykalsky",
  ] },
  "Rwanda": { label: "Province", options: [
    "Kigali", "Eastern", "Northern", "Southern", "Western",
  ] },
  "Samoa": { label: "District", options: [
    "A'ana", "Aiga-i-le-Tai", "Atua", "Fa'asaleleaga", "Gaga'emauga",
    "Gaga'ifomauga", "Palauli", "Satupa'itea", "Tuamasaga", "Va'a-o-Fonoti",
    "Vaisigano",
  ] },
  "San Marino": { label: "Municipality", options: [
    "Acquaviva", "Borgo Maggiore", "Chiesanuova", "Domagnano", "Faetano",
    "Fiorentino", "Montegiardino", "San Marino Città", "Serravalle",
  ] },
  "São Tomé & Príncipe": { label: "District", options: [
    "Água Grande", "Cantagalo", "Caué", "Lembá", "Lobata", "Mé-Zóchi",
    "Príncipe",
  ] },
  "Saudi Arabia": { label: "Province", options: [
    "Al Bahah", "Al Jawf", "Al Madinah", "Al Qassim", "Asir", "Eastern",
    "Ha'il", "Jazan", "Makkah", "Najran", "Northern Borders", "Riyadh",
    "Tabuk",
  ] },
  "Senegal": { label: "Region", options: [
    "Dakar", "Diourbel", "Fatick", "Kaffrine", "Kaolack", "Kédougou",
    "Kolda", "Louga", "Matam", "Saint-Louis", "Sédhiou", "Tambacounda",
    "Thiès", "Ziguinchor",
  ] },
  "Serbia": { label: "District", options: [
    "Belgrade", "Bor", "Braničevo", "Central Banat", "Jablanica",
    "Kolubara", "Mačva", "Moravica", "Nišava", "North Bačka",
    "North Banat", "Pčinja", "Pirot", "Podunavlje", "Pomoravlje",
    "Rasina", "Raška", "South Bačka", "South Banat", "Srem", "Šumadija",
    "Toplica", "West Bačka", "Zaječar", "Zlatibor", "Kosovo",
  ] },
  "Seychelles": { label: "District", options: [
    "Anse Boileau", "Anse Etoile", "Anse Royale", "Baie Lazare",
    "Baie Sainte Anne", "Beau Vallon", "Bel Air", "Cascade",
    "English River", "Glacis", "Grand Anse Mahé", "Grand Anse Praslin",
    "La Digue", "Mont Buxton", "Mont Fleuri", "Plaisance", "Pointe La Rue",
    "Port Glaud", "Roche Caiman", "Saint Louis", "Takamaka",
  ] },
  "Sierra Leone": { label: "Province", options: [
    "Eastern", "North West", "Northern", "Southern", "Western Area",
  ] },
  "Singapore": { label: "Region", options: [
    "Central Region", "East Region", "North Region", "North-East Region",
    "West Region",
  ] },
  "Sint Maarten": { label: "District", options: ["Sint Maarten"] },
  "Slovakia": { label: "Region", options: [
    "Banská Bystrica", "Bratislava", "Košice", "Nitra", "Prešov",
    "Trenčín", "Trnava", "Žilina",
  ] },
  "Slovenia": { label: "Region", options: [
    "Central Slovenia", "Coastal-Karst", "Drava", "Gorizia",
    "Littoral-Inner Carniola", "Lower Sava", "Mura", "Savinja",
    "Southeast Slovenia", "Upper Carniola", "Zasavje", "Carinthia",
  ] },
  "Solomon Islands": { label: "Province", options: [
    "Central", "Choiseul", "Guadalcanal", "Isabel", "Makira-Ulawa",
    "Malaita", "Rennell and Bellona", "Temotu", "Western", "Honiara",
  ] },
  "Somalia": { label: "Region", options: [
    "Awdal", "Bakool", "Banaadir", "Bari", "Bay", "Galguduud",
    "Gedo", "Hiran", "Lower Juba", "Lower Shabelle", "Middle Juba",
    "Middle Shabelle", "Mudug", "Nugal", "Sanaag", "Sool", "Togdheer",
    "Woqooyi Galbeed",
  ] },
  "South Africa": { label: "Province", options: [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo",
    "Mpumalanga", "North West", "Northern Cape", "Western Cape",
  ] },
  "South Korea": { label: "Province", options: [
    "Seoul", "Busan", "Daegu", "Incheon", "Gwangju", "Daejeon", "Ulsan",
    "Sejong", "Gyeonggi", "Gangwon", "North Chungcheong",
    "South Chungcheong", "North Jeolla", "South Jeolla",
    "North Gyeongsang", "South Gyeongsang", "Jeju",
  ] },
  "South Sudan": { label: "State", options: [
    "Central Equatoria", "Eastern Equatoria", "Jonglei", "Lakes",
    "Northern Bahr el Ghazal", "Unity", "Upper Nile", "Warrap",
    "Western Bahr el Ghazal", "Western Equatoria",
  ] },
  "Spain": { label: "Province", options: [
    "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias",
    "Ávila", "Badajoz", "Balearic Islands", "Barcelona", "Burgos",
    "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real",
    "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipúzcoa",
    "Huelva", "Huesca", "Jaén", "La Rioja", "Las Palmas", "León",
    "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarre", "Ourense",
    "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife",
    "Segovia", "Seville", "Soria", "Tarragona", "Teruel", "Toledo",
    "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza",
  ] },
  "Sri Lanka": { label: "Province", options: [
    "Central", "Eastern", "North Central", "Northern", "North Western",
    "Sabaragamuwa", "Southern", "Uva", "Western",
  ] },
  "St. Barthélemy": { label: "Region", options: ["St. Barthélemy"] },
  "St. Helena": { label: "Region", options: [
    "Saint Helena", "Ascension Island", "Tristan da Cunha",
  ] },
  "St. Kitts & Nevis": { label: "Parish", options: [
    "Christ Church Nichola Town", "Saint Anne Sandy Point",
    "Saint George Basseterre", "Saint George Gingerland",
    "Saint James Windward", "Saint John Capisterre", "Saint John Figtree",
    "Saint Mary Cayon", "Saint Paul Capisterre", "Saint Paul Charlestown",
    "Saint Peter Basseterre", "Saint Thomas Lowland",
    "Saint Thomas Middle Island", "Trinity Palmetto Point",
  ] },
  "St. Lucia": { label: "District", options: [
    "Anse la Raye", "Castries", "Choiseul", "Dennery", "Gros Islet",
    "Laborie", "Micoud", "Soufrière", "Vieux Fort",
  ] },
  "St. Martin": { label: "Region", options: ["St. Martin"] },
  "St. Pierre & Miquelon": { label: "Region", options: [
    "Saint-Pierre", "Miquelon-Langlade",
  ] },
  "St. Vincent & Grenadines": { label: "Parish", options: [
    "Charlotte", "Grenadines", "Saint Andrew", "Saint David",
    "Saint George", "Saint Patrick",
  ] },
  "Sudan": { label: "State", options: [
    "Al Jazirah", "Blue Nile", "Central Darfur", "East Darfur",
    "Kassala", "Khartoum", "North Darfur", "North Kordofan",
    "Northern", "Red Sea", "River Nile", "Sennar", "South Darfur",
    "South Kordofan", "West Darfur", "West Kordofan", "White Nile",
  ] },
  "Suriname": { label: "District", options: [
    "Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie",
    "Para", "Paramaribo", "Saramacca", "Sipaliwini", "Wanica",
  ] },
  "Svalbard & Jan Mayen": { label: "Region", options: [
    "Svalbard", "Jan Mayen",
  ] },
  "Sweden": { label: "County", options: [
    "Blekinge", "Dalarna", "Gävleborg", "Gotland", "Halland",
    "Jämtland", "Jönköping", "Kalmar", "Kronoberg", "Norrbotten",
    "Örebro", "Östergötland", "Skåne", "Södermanland", "Stockholm",
    "Uppsala", "Värmland", "Västerbotten", "Västernorrland",
    "Västmanland", "Västra Götaland",
  ] },
  "Switzerland": { label: "Canton", options: [
    "Aargau", "Appenzell Innerrhoden", "Appenzell Ausserrhoden",
    "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg", "Geneva",
    "Glarus", "Graubünden", "Jura", "Lucerne", "Neuchâtel", "Nidwalden",
    "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen",
    "Ticino", "Thurgau", "Uri", "Valais", "Vaud", "Zug", "Zürich",
  ] },
  "Syria": { label: "Governorate", options: [
    "Aleppo", "Al-Hasakah", "Damascus", "Daraa", "Deir ez-Zor",
    "Hama", "Homs", "Idlib", "Latakia", "Quneitra", "Raqqa",
    "Rif Dimashq", "Tartus", "As-Suwayda",
  ] },
  "Taiwan": { label: "County / City", options: [
    "Taipei City", "New Taipei City", "Taoyuan City", "Taichung City",
    "Tainan City", "Kaohsiung City", "Keelung", "Hsinchu City",
    "Hsinchu County", "Miaoli", "Changhua", "Nantou", "Yunlin",
    "Chiayi City", "Chiayi County", "Pingtung", "Yilan", "Hualien",
    "Taitung", "Penghu", "Kinmen", "Lienchiang",
  ] },
  "Tajikistan": { label: "Region", options: [
    "Dushanbe", "Gorno-Badakhshan", "Khatlon", "Sughd",
    "Districts of Republican Subordination",
  ] },
  "Tanzania": { label: "Region", options: [
    "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera",
    "Katavi", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara",
    "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Njombe", "Pemba North",
    "Pemba South", "Pwani", "Rukwa", "Ruvuma", "Shinyanga", "Simiyu",
    "Singida", "Songwe", "Tabora", "Tanga", "Unguja North", "Unguja South",
    "Zanzibar Urban/West",
  ] },
  "Thailand": { label: "Province", options: [
    "Samut Prakan", "Bangkok", "Chiang Mai", "Chon Buri", "Nonthaburi",
    "Pathum Thani", "Phuket", "Songkhla",
  ] },
  "Timor-Leste": { label: "Municipality", options: [
    "Aileu", "Ainaro", "Baucau", "Bobonaro", "Cova Lima", "Dili",
    "Ermera", "Lautém", "Liquiçá", "Manatuto", "Manufahi", "Oecusse",
    "Viqueque",
  ] },
  "Togo": { label: "Region", options: [
    "Centrale", "Kara", "Maritime", "Plateaux", "Savanes",
  ] },
  "Tokelau": { label: "Atoll", options: [
    "Atafu", "Fakaofo", "Nukunonu",
  ] },
  "Tonga": { label: "Division", options: [
    "'Eua", "Ha'apai", "Niuas", "Tongatapu", "Vava'u",
  ] },
  "Trinidad & Tobago": { label: "Region", options: [
    "Arima", "Chaguanas", "Couva-Tabaquite-Talparo", "Diego Martin",
    "Mayaro-Rio Claro", "Penal-Debe", "Point Fortin", "Port of Spain",
    "Princes Town", "San Fernando", "San Juan-Laventille", "Sangre Grande",
    "Siparia", "Tobago", "Tunapuna-Piarco",
  ] },
  "Tunisia": { label: "Governorate", options: [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa",
    "Jendouba", "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia",
    "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
    "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
  ] },
  "Turkey": { label: "Province", options: [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara",
    "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl",
    "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
    "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan",
    "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
    "Hakkâri", "Hatay", "Isparta", "Mersin", "Istanbul", "İzmir",
    "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş",
    "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize",
    "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ",
    "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van",
    "Yozgat", "Zonguldak",
  ] },
  "Turkmenistan": { label: "Region", options: [
    "Ashgabat", "Ahal", "Balkan", "Dashoguz", "Lebap", "Mary",
  ] },
  "Turks & Caicos Islands": { label: "District", options: [
    "Grand Turk", "Salt Cay", "South Caicos", "Middle Caicos",
    "North Caicos", "Providenciales",
  ] },
  "Tuvalu": { label: "Island", options: [
    "Funafuti", "Nanumea", "Nanumaga", "Niutao", "Nui", "Nukufetau",
    "Nukulaelae", "Vaitupu",
  ] },
  "Uganda": { label: "District", options: [
    "Central", "Eastern", "Northern", "Western",
  ] },
  "Ukraine": { label: "Region", options: [
    "Cherkasy", "Chernihiv", "Chernivtsi", "Dnipropetrovsk", "Donetsk",
    "Ivano-Frankivsk", "Kharkiv", "Kherson", "Khmelnytskyi", "Kirovohrad",
    "Kyiv", "Kyiv City", "Luhansk", "Lviv", "Mykolaiv", "Odesa",
    "Poltava", "Rivne", "Sumy", "Ternopil", "Vinnytsia", "Volyn",
    "Zakarpattia", "Zaporizhzhia", "Zhytomyr", "Crimea",
  ] },
  "United Arab Emirates": { label: "Emirate", options: [
    "Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah",
    "Sharjah", "Umm Al Quwain",
  ] },
  "U.S. Outlying Islands": { label: "Island", options: [
    "Baker Island", "Howland Island", "Jarvis Island", "Johnston Atoll",
    "Kingman Reef", "Midway Atoll", "Navassa Island", "Palmyra Atoll",
    "Wake Island",
  ] },
  "U.S. Virgin Islands": { label: "District", options: [
    "Saint Croix", "Saint John", "Saint Thomas",
  ] },
  "United Kingdom": { label: "County", options: [
    "Bedfordshire", "Berkshire", "Bristol", "Buckinghamshire",
    "Cambridgeshire", "Cheshire", "Cornwall", "Cumbria", "Derbyshire",
    "Devon", "Dorset", "Durham", "East Sussex", "Essex",
    "Gloucestershire", "Greater London", "Greater Manchester",
    "Hampshire", "Herefordshire", "Hertfordshire", "Isle of Wight",
    "Kent", "Lancashire", "Leicestershire", "Lincolnshire", "Merseyside",
    "Norfolk", "North Yorkshire", "Northamptonshire", "Northumberland",
    "Nottinghamshire", "Oxfordshire", "Rutland", "Shropshire",
    "Somerset", "South Yorkshire", "Staffordshire", "Suffolk", "Surrey",
    "Tyne and Wear", "Warwickshire", "West Midlands", "West Sussex",
    "West Yorkshire", "Wiltshire", "Worcestershire", "Scotland",
    "Wales", "Northern Ireland",
  ] },
  "United States": { label: "State", options: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "District of Columbia", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin",
    "Wyoming",
  ] },
  "Uruguay": { label: "Department", options: [
    "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno",
    "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo",
    "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José",
    "Soriano", "Tacuarembó", "Treinta y Tres",
  ] },
  "Uzbekistan": { label: "Region", options: [
    "Andijan", "Bukhara", "Fergana", "Jizzakh", "Karakalpakstan",
    "Namangan", "Navoiy", "Qashqadaryo", "Samarqand", "Sirdaryo",
    "Surxondaryo", "Tashkent", "Tashkent City", "Xorazm",
  ] },
  "Vanuatu": { label: "Province", options: [
    "Malampa", "Penama", "Sanma", "Shefa", "Tafea", "Torba",
  ] },
  "Venezuela": { label: "State", options: [
    "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar",
    "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital",
    "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas",
    "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo",
    "Vargas", "Yaracuy", "Zulia",
  ] },
  "Vietnam": { label: "Province", options: [
    "An Giang", "Bà Rịa-Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
    "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
    "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
    "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương",
    "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa",
    "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
    "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình",
    "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam",
    "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
    "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế",
    "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
    "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
  ] },
  "Wallis & Futuna": { label: "District", options: [
    "Wallis", "Sigave", "Alo",
  ] },
  "Western Sahara": { label: "Region", options: [
    "Laâyoune-Sakia El Hamra", "Dakhla-Oued Ed-Dahab",
  ] },
  "Yemen": { label: "Governorate", options: [
    "Abyan", "Aden", "Al Bayda", "Al Dhale'e", "Al Hudaydah", "Al Jawf",
    "Al Mahrah", "Al Mahwit", "Amanat Al Asimah", "Amran", "Dhamar",
    "Hadhramaut", "Hajjah", "Ibb", "Lahij", "Marib", "Raymah",
    "Saada", "Sanaa", "Shabwah", "Socotra", "Taiz",
  ] },
  "Zambia": { label: "Province", options: [
    "Central", "Copperbelt", "Eastern", "Luapula", "Lusaka", "Muchinga",
    "Northern", "North-Western", "Southern", "Western",
  ] },
  "Zimbabwe": { label: "Province", options: [
    "Bulawayo", "Harare", "Manicaland", "Mashonaland Central",
    "Mashonaland East", "Mashonaland West", "Masvingo",
    "Matabeleland North", "Matabeleland South", "Midlands",
  ] },
};

// Places with genuinely no internal subdivision used for addressing —
// tiny, single-settlement, or uninhabited administration-only territories.
const NO_REGION_COUNTRIES = new Set([
  "Vatican City",
  "British Indian Ocean Territory",
  "French Southern Territories",
  "South Georgia & South Sandwich Islands",
]);

// Countries with no postal-code system — the postal box disappears
// entirely for these rather than asking for something that doesn't exist.
const NO_POSTAL_COUNTRIES = new Set([
  "Angola", "Antigua & Barbuda", "Aruba", "Bahamas", "Belize", "Benin",
  "Bolivia", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
  "Central African Republic", "Comoros", "Congo - Brazzaville",
  "Congo - Kinshasa", "Cook Islands", "Côte d'Ivoire", "Djibouti",
  "Dominica", "Equatorial Guinea", "Eritrea", "Fiji", "Gambia", "Ghana",
  "Grenada", "Guyana", "Hong Kong SAR", "Kiribati", "Libya", "Macao SAR",
  "Malawi", "Mali", "Mauritania", "Montserrat", "Nauru", "Niue", "Qatar",
  "Rwanda", "São Tomé & Príncipe", "Seychelles", "Sierra Leone",
  "Solomon Islands", "Somalia", "South Sudan", "St. Kitts & Nevis",
  "Suriname", "Syria", "Tanzania", "Timor-Leste", "Togo", "Tokelau",
  "Tonga", "Trinidad & Tobago", "Tuvalu", "Uganda", "United Arab Emirates",
  "Vanuatu", "Yemen", "Zimbabwe",
]);

// Postal codes that mix letters and digits (UK postcodes, Canadian postal
// codes, Irish Eircodes, Dutch postcodes) — inputMode stays "text" rather
// than "numeric" for these so a mobile keyboard doesn't hide the letters.
const ALPHANUMERIC_POSTAL_COUNTRIES = new Set([
  "United Kingdom", "Canada", "Netherlands", "Ireland",
]);

const POSTAL_LABEL_OVERRIDES = {
  "United States": "ZIP code",
  "Philippines": "ZIP code",
  "India": "PIN code",
  "Ireland": "Eircode",
  "United Kingdom": "Postcode",
  "Australia": "Postcode",
  "New Zealand": "Postcode",
  "South Africa": "Postal code",
};

/**
 * Delivery-field shape for a given country name (as used in the Checkout
 * country select). `region`/`postal` are null when that field should not
 * be shown at all for the country. Every non-null `region` carries a real
 * `options` list — the region field is always a dropdown, never free text.
 */
export function getCountryFields(country) {
  const region = NO_REGION_COUNTRIES.has(country)
    ? null
    : REGION_DATA[country] ?? { label: "State / Province", options: null };

  const postal = NO_POSTAL_COUNTRIES.has(country)
    ? null
    : {
        label: POSTAL_LABEL_OVERRIDES[country] ?? "Postal code",
        numeric: !ALPHANUMERIC_POSTAL_COUNTRIES.has(country),
      };

  return { region, postal };
}

// Shown before a country has been chosen — the fullest, most generic shape
// so the form doesn't look broken while the visitor is still deciding.
export const DEFAULT_COUNTRY_FIELDS = {
  region: { label: "State / Province", options: null },
  postal: { label: "Postal code", numeric: true },
};
