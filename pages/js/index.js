document.addEventListener("DOMContentLoaded", () => {
    const cities = [
        { name: "New York", lat: 40.7128, lon: -74.0060, offset: -4, flag: "us", continent: "N America" },
        { name: "Sao Paulo", lat: -23.5505, lon: -46.6333, offset: -3, flag: "br", continent: "S America" },
        { name: "London", lat: 51.5074, lon: -0.1278, offset: 1, flag: "gb", continent: "Europe" },
        { name: "Cairo", lat: 30.0444, lon: 31.2357, offset: 2, flag: "eg", continent: "Africa" },
        { name: "Seoul", lat: 37.5665, lon: 126.9780, offset: 9, flag: "kr", continent: "Asia" },
        { name: "Auckland", lat: -36.8485, lon: 174.7633, offset: 12, flag: "nz", continent: "Oceania" },
        { name: "Los Angeles", lat: 34.0522, lon: -118.2437, offset: -7, flag: "us", continent: "N America" },
        { name: "Buenos Aires", lat: -34.6037, lon: -58.3816, offset: -3, flag: "ar", continent: "S America" },
        { name: "Madrid", lat: 40.4168, lon: -3.7038, offset: 2, flag: "es", continent: "Europe" },
        { name: "Johannesburg", lat: -26.2041, lon: 28.0473, offset: 2, flag: "za", continent: "Africa" },
        { name: "Mumbai", lat: 19.0760, lon: 72.8777, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Perth", lat: -31.9505, lon: 115.8605, offset: 8, flag: "au", continent: "Oceania" },
        { name: "Miami", lat: 25.7617, lon: -80.1918, offset: -4, flag: "us", continent: "N America" },
        { name: "Bogota", lat: 4.7110, lon: -74.0721, offset: -5, flag: "co", continent: "S America" },
        { name: "Amsterdam", lat: 52.3676, lon: 4.9041, offset: 2, flag: "nl", continent: "Europe" },
        { name: "Accra", lat: 5.6037, lon: -0.1870, offset: 0, flag: "gh", continent: "Africa" },
        { name: "Shanghai", lat: 31.2304, lon: 121.4737, offset: 8, flag: "cn", continent: "Asia" },
        { name: "Adelaide", lat: -34.9285, lon: 138.6007, offset: 9.5, flag: "au", continent: "Oceania" },
        { name: "San Francisco", lat: 37.7749, lon: -122.4194, offset: -7, flag: "us", continent: "N America" },
        { name: "Quito", lat: -0.1807, lon: -78.4678, offset: -5, flag: "ec", continent: "S America" },
        { name: "Paris", lat: 48.8566, lon: 2.3522, offset: 2, flag: "fr", continent: "Europe" },
        { name: "Nairobi", lat: -1.2921, lon: 36.8219, offset: 3, flag: "ke", continent: "Africa" },
        { name: "Bangkok", lat: 13.7563, lon: 100.5018, offset: 7, flag: "th", continent: "Asia" },
        { name: "Melbourne", lat: -37.8136, lon: 144.9631, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Chicago", lat: 41.8781, lon: -87.6298, offset: -5, flag: "us", continent: "N America" },
        { name: "Lima", lat: -12.0464, lon: -77.0428, offset: -5, flag: "pe", continent: "S America" },
        { name: "Berlin", lat: 52.5200, lon: 13.4050, offset: 2, flag: "de", continent: "Europe" },
        { name: "Lagos", lat: 6.5244, lon: 3.3792, offset: 1, flag: "ng", continent: "Africa" },
        { name: "Singapore", lat: 1.3521, lon: 103.8198, offset: 8, flag: "sg", continent: "Asia" },
        { name: "Brisbane", lat: -27.4698, lon: 153.0251, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Toronto", lat: 43.6532, lon: -79.3832, offset: -4, flag: "ca", continent: "N America" },
        { name: "Santiago", lat: -33.4489, lon: -70.6693, offset: -4, flag: "cl", continent: "S America" },
        { name: "Rome", lat: 41.9028, lon: 12.4964, offset: 2, flag: "it", continent: "Europe" },
        { name: "Addis Ababa", lat: 9.0300, lon: 38.7400, offset: 3, flag: "et", continent: "Africa" },
        { name: "Hong Kong", lat: 22.3193, lon: 114.1694, offset: 8, flag: "hk", continent: "Asia" },
        { name: "Hobart", lat: -42.8821, lon: 147.3272, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Vancouver", lat: 49.2827, lon: -123.1207, offset: -7, flag: "ca", continent: "N America" },
        { name: "Caracas", lat: 10.4806, lon: -66.9036, offset: -4, flag: "ve", continent: "S America" },
        { name: "Vienna", lat: 48.2082, lon: 16.3738, offset: 2, flag: "at", continent: "Europe" },
        { name: "Kampala", lat: 0.3476, lon: 32.5825, offset: 3, flag: "ug", continent: "Africa" },
        { name: "Jakarta", lat: -6.2088, lon: 106.8456, offset: 7, flag: "id", continent: "Asia" },
        { name: "Darwin", lat: -12.4634, lon: 130.8456, offset: 9.5, flag: "au", continent: "Oceania" },
        { name: "Montreal", lat: 45.5017, lon: -73.5673, offset: -4, flag: "ca", continent: "N America" },
        { name: "Montevideo", lat: -34.9011, lon: -56.1645, offset: -3, flag: "uy", continent: "S America" },
        { name: "Stockholm", lat: 59.3293, lon: 18.0686, offset: 2, flag: "se", continent: "Europe" },
        { name: "Algiers", lat: 36.7372, lon: 3.0870, offset: 1, flag: "dz", continent: "Africa" },
        { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869, offset: 8, flag: "my", continent: "Asia" },
        { name: "Wellington", lat: -41.2865, lon: 174.7762, offset: 12, flag: "nz", continent: "Oceania" },
        { name: "Houston", lat: 29.7604, lon: -95.3698, offset: -5, flag: "us", continent: "N America" },
        { name: "Asuncion", lat: -25.2637, lon: -57.5759, offset: -4, flag: "py", continent: "S America" },
        { name: "Zurich", lat: 47.3769, lon: 8.5417, offset: 2, flag: "ch", continent: "Europe" },
        { name: "Dar es Salaam", lat: -6.7924, lon: 39.2083, offset: 3, flag: "tz", continent: "Africa" },
        { name: "Manila", lat: 14.5995, lon: 120.9842, offset: 8, flag: "ph", continent: "Asia" },
        { name: "Canberra", lat: -35.2809, lon: 149.1300, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Dallas", lat: 32.7767, lon: -96.7970, offset: -5, flag: "us", continent: "N America" },
        { name: "La Paz", lat: -16.4897, lon: -68.1193, offset: -4, flag: "bo", continent: "S America" },
        { name: "Prague", lat: 50.0755, lon: 14.4378, offset: 2, flag: "cz", continent: "Europe" },
        { name: "Tunis", lat: 36.8065, lon: 10.1815, offset: 1, flag: "tn", continent: "Africa" },
        { name: "Hanoi", lat: 21.0285, lon: 105.8542, offset: 7, flag: "vn", continent: "Asia" },
        { name: "Christchurch", lat: -43.5320, lon: 172.6362, offset: 12, flag: "nz", continent: "Oceania" },
        { name: "Phoenix", lat: 33.4484, lon: -112.0740, offset: -7, flag: "us", continent: "N America" },
        { name: "Medellin", lat: 6.2442, lon: -75.5812, offset: -5, flag: "co", continent: "S America" },
        { name: "Warsaw", lat: 52.2297, lon: 21.0122, offset: 2, flag: "pl", continent: "Europe" },
        { name: "Casablanca", lat: 33.5731, lon: -7.5898, offset: 1, flag: "ma", continent: "Africa" },
        { name: "Taipei", lat: 25.0330, lon: 121.5654, offset: 8, flag: "tw", continent: "Asia" },
        { name: "Sydney", lat: -33.8688, lon: 151.2093, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Seattle", lat: 47.6062, lon: -122.3321, offset: -7, flag: "us", continent: "N America" },
        { name: "Brasilia", lat: -15.8267, lon: -47.9218, offset: -3, flag: "br", continent: "S America" },
        { name: "Budapest", lat: 47.4979, lon: 19.0402, offset: 2, flag: "hu", continent: "Europe" },
        { name: "Luanda", lat: -8.8390, lon: 13.2894, offset: 1, flag: "ao", continent: "Africa" },
        { name: "Dhaka", lat: 23.8103, lon: 90.4125, offset: 6, flag: "bd", continent: "Asia" },
        { name: "Fiji", lat: -18.1248, lon: 178.4501, offset: 12, flag: "fj", continent: "Oceania" },
        { name: "Boston", lat: 42.3601, lon: -71.0589, offset: -4, flag: "us", continent: "N America" },
        { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, offset: -3, flag: "br", continent: "S America" },
        { name: "Copenhagen", lat: 55.6761, lon: 12.5683, offset: 2, flag: "dk", continent: "Europe" },
        { name: "Khartoum", lat: 15.5007, lon: 32.5599, offset: 2, flag: "sd", continent: "Africa" },
        { name: "Colombo", lat: 6.9271, lon: 79.8612, offset: 5.5, flag: "lk", continent: "Asia" },
        { name: "Port Moresby", lat: -9.4438, lon: 147.1803, offset: 10, flag: "pg", continent: "Oceania" },
        { name: "Denver", lat: 39.7392, lon: -104.9903, offset: -6, flag: "us", continent: "N America" },
        { name: "Guayaquil", lat: -2.1700, lon: -79.9224, offset: -5, flag: "ec", continent: "S America" },
        { name: "Lisbon", lat: 38.7223, lon: -9.1393, offset: 1, flag: "pt", continent: "Europe" },
        { name: "Pretoria", lat: -25.7479, lon: 28.2293, offset: 2, flag: "za", continent: "Africa" },
        { name: "Kathmandu", lat: 27.7172, lon: 85.3240, offset: 5.75, flag: "np", continent: "Asia" },
        { name: "Nauru", lat: -0.5228, lon: 166.9315, offset: 12, flag: "nr", continent: "Oceania" },
        { name: "Atlanta", lat: 33.7490, lon: -84.3880, offset: -4, flag: "us", continent: "N America" },
        { name: "Salvador", lat: -12.9714, lon: -38.5014, offset: -3, flag: "br", continent: "S America" },
        { name: "Athens", lat: 37.9838, lon: 23.7275, offset: 3, flag: "gr", continent: "Europe" },
        { name: "Abidjan", lat: 5.3599, lon: -4.0083, offset: 0, flag: "ci", continent: "Africa" },
        { name: "Islamabad", lat: 33.6844, lon: 73.0479, offset: 5, flag: "pk", continent: "Asia" },
        { name: "Tonga", lat: -21.1393, lon: -175.2049, offset: 13, flag: "to", continent: "Oceania" },
        { name: "Philadelphia", lat: 39.9526, lon: -75.1652, offset: -4, flag: "us", continent: "N America" },
        { name: "Recife", lat: -8.0476, lon: -34.8770, offset: -3, flag: "br", continent: "S America" },
        { name: "Dublin", lat: 53.3498, lon: -6.2603, offset: 1, flag: "ie", continent: "Europe" },
        { name: "Kinshasa", lat: -4.4419, lon: 15.2663, offset: 1, flag: "cd", continent: "Africa" },
        { name: "Karachi", lat: 24.8607, lon: 67.0011, offset: 5, flag: "pk", continent: "Asia" },
        { name: "Samoa", lat: -13.7590, lon: -172.1046, offset: 13, flag: "ws", continent: "Oceania" },
        { name: "Detroit", lat: 42.3314, lon: -83.0458, offset: -4, flag: "us", continent: "N America" },
        { name: "Fortaleza", lat: -3.7172, lon: -38.5434, offset: -3, flag: "br", continent: "S America" },
        { name: "Helsinki", lat: 60.1699, lon: 24.9384, offset: 3, flag: "fi", continent: "Europe" },
        { name: "Bamako", lat: 12.6392, lon: -8.0029, offset: 0, flag: "ml", continent: "Africa" },
        { name: "Lahore", lat: 31.5497, lon: 74.3436, offset: 5, flag: "pk", continent: "Asia" },
        { name: "Vanuatu", lat: -17.7333, lon: 168.3273, offset: 11, flag: "vu", continent: "Oceania" },
        { name: "San Diego", lat: 32.7157, lon: -117.1611, offset: -7, flag: "us", continent: "N America" },
        { name: "Manaus", lat: -3.1190, lon: -60.0217, offset: -4, flag: "br", continent: "S America" },
        { name: "Brussels", lat: 50.8503, lon: 4.3517, offset: 2, flag: "be", continent: "Europe" },
        { name: "Dakar", lat: 14.6928, lon: -17.4467, offset: 0, flag: "sn", continent: "Africa" },
        { name: "Chennai", lat: 13.0827, lon: 80.2707, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Solomon Islands", lat: -9.6457, lon: 160.1562, offset: 11, flag: "sb", continent: "Oceania" },
        { name: "Portland", lat: 45.5152, lon: -122.6784, offset: -7, flag: "us", continent: "N America" },
        { name: "Porto Alegre", lat: -30.0346, lon: -51.2177, offset: -3, flag: "br", continent: "S America" },
        { name: "Oslo", lat: 59.9139, lon: 10.7522, offset: 2, flag: "no", continent: "Europe" },
        { name: "Harare", lat: -17.8252, lon: 31.0534, offset: 2, flag: "zw", continent: "Africa" },
        { name: "Hyderabad", lat: 17.3850, lon: 78.4867, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Kiribati", lat: 1.8709, lon: -157.3626, offset: 14, flag: "ki", continent: "Oceania" },
        { name: "Austin", lat: 30.2672, lon: -97.7431, offset: -5, flag: "us", continent: "N America" },
        { name: "Belo Horizonte", lat: -19.9167, lon: -43.9345, offset: -3, flag: "br", continent: "S America" },
        { name: "Bucharest", lat: 44.4268, lon: 26.1025, offset: 3, flag: "ro", continent: "Europe" },
        { name: "Maputo", lat: -25.9655, lon: 32.5832, offset: 2, flag: "mz", continent: "Africa" },
        { name: "Delhi", lat: 28.7041, lon: 77.1025, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tuvalu", lat: -8.5211, lon: 179.1981, offset: 12, flag: "tv", continent: "Oceania" },
        { name: "San Antonio", lat: 29.4241, lon: -98.4936, offset: -5, flag: "us", continent: "N America" },
        { name: "Curitiba", lat: -25.4290, lon: -49.2671, offset: -3, flag: "br", continent: "S America" },
        { name: "Sofia", lat: 42.6977, lon: 23.3219, offset: 3, flag: "bg", continent: "Europe" },
        { name: "Lusaka", lat: -15.3875, lon: 28.3228, offset: 2, flag: "zm", continent: "Africa" },
        { name: "Kolkata", lat: 22.5726, lon: 88.3639, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Palau", lat: 7.5150, lon: 134.5825, offset: 9, flag: "pw", continent: "Oceania" },
        { name: "Ottawa", lat: 45.4215, lon: -75.6972, offset: -4, flag: "ca", continent: "N America" },
        { name: "Goiania", lat: -16.6869, lon: -49.2648, offset: -3, flag: "br", continent: "S America" },
        { name: "Belgrade", lat: 44.7866, lon: 20.4489, offset: 2, flag: "rs", continent: "Europe" },
        { name: "Antananarivo", lat: -18.8792, lon: 47.5079, offset: 3, flag: "mg", continent: "Africa" },
        { name: "Bangalore", lat: 12.9716, lon: 77.5946, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Marshall Islands", lat: 7.1315, lon: 171.1845, offset: 12, flag: "mh", continent: "Oceania" },
        { name: "Calgary", lat: 51.0447, lon: -114.0719, offset: -6, flag: "ca", continent: "N America" },
        { name: "Campinas", lat: -22.9056, lon: -47.0608, offset: -3, flag: "br", continent: "S America" },
        { name: "Zagreb", lat: 45.8150, lon: 15.9819, offset: 2, flag: "hr", continent: "Europe" },
        { name: "Kigali", lat: -1.9441, lon: 30.0619, offset: 2, flag: "rw", continent: "Africa" },
        { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Micronesia", lat: 6.9167, lon: 158.1561, offset: 11, flag: "fm", continent: "Oceania" },
        { name: "Edmonton", lat: 53.5444, lon: -113.4909, offset: -6, flag: "ca", continent: "N America" },
        { name: "Belem", lat: -1.4558, lon: -48.4902, offset: -3, flag: "br", continent: "S America" },
        { name: "Bratislava", lat: 48.1486, lon: 17.1077, offset: 2, flag: "sk", continent: "Europe" },
        { name: "Mogadishu", lat: 2.0469, lon: 45.3182, offset: 3, flag: "so", continent: "Africa" },
        { name: "Pune", lat: 18.5204, lon: 73.8567, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "New Caledonia", lat: -22.2558, lon: 166.4505, offset: 11, flag: "nc", continent: "Oceania" },
        { name: "Winnipeg", lat: 49.8951, lon: -97.1384, offset: -5, flag: "ca", continent: "N America" },
        { name: "Natal", lat: -5.7793, lon: -35.2009, offset: -3, flag: "br", continent: "S America" },
        { name: "Ljubljana", lat: 46.0569, lon: 14.5058, offset: 2, flag: "si", continent: "Europe" },
        { name: "Juba", lat: 4.8594, lon: 31.5713, offset: 2, flag: "ss", continent: "Africa" },
        { name: "Surat", lat: 21.1702, lon: 72.8311, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tahiti", lat: -17.6509, lon: -149.4260, offset: -10, flag: "pf", continent: "Oceania" },
        { name: "Halifax", lat: 44.6488, lon: -63.5752, offset: -3, flag: "ca", continent: "N America" },
        { name: "Joao Pessoa", lat: -7.1195, lon: -34.8450, offset: -3, flag: "br", continent: "S America" },
        { name: "Riga", lat: 56.9496, lon: 24.1052, offset: 3, flag: "lv", continent: "Europe" },
        { name: "Niamey", lat: 13.5116, lon: 2.1254, offset: 1, flag: "ne", continent: "Africa" },
        { name: "Jaipur", lat: 26.9124, lon: 75.7873, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Guam", lat: 13.4443, lon: 144.7937, offset: 10, flag: "gu", continent: "Oceania" },
        { name: "St. John's", lat: 47.5615, lon: -52.7126, offset: -2.5, flag: "ca", continent: "N America" },
        { name: "Aracaju", lat: -10.9472, lon: -37.0731, offset: -3, flag: "br", continent: "S America" },
        { name: "Tallinn", lat: 59.4370, lon: 24.7535, offset: 3, flag: "ee", continent: "Europe" },
        { name: "Ouagadougou", lat: 12.3714, lon: -1.5197, offset: 0, flag: "bf", continent: "Africa" },
        { name: "Lucknow", lat: 26.8467, lon: 80.9462, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Hawaii", lat: 21.3069, lon: -157.8583, offset: -10, flag: "us", continent: "Oceania" },
        { name: "Quebec City", lat: 46.8139, lon: -71.2080, offset: -4, flag: "ca", continent: "N America" },
        { name: "Teresina", lat: -5.0892, lon: -42.8016, offset: -3, flag: "br", continent: "S America" },
        { name: "Vilnius", lat: 54.6872, lon: 25.2797, offset: 3, flag: "lt", continent: "Europe" },
        { name: "Brazzaville", lat: -4.2634, lon: 15.2429, offset: 1, flag: "cg", continent: "Africa" },
        { name: "Kanpur", lat: 26.4499, lon: 80.3319, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Cook Islands", lat: -21.2367, lon: -159.7777, offset: -10, flag: "ck", continent: "Oceania" },
        { name: "Regina", lat: 50.4452, lon: -104.6189, offset: -6, flag: "ca", continent: "N America" },
        { name: "Maceio", lat: -9.6658, lon: -35.7353, offset: -3, flag: "br", continent: "S America" },
        { name: "Skopje", lat: 41.9981, lon: 21.4254, offset: 2, flag: "mk", continent: "Europe" },
        { name: "Libreville", lat: 0.4162, lon: 9.4673, offset: 1, flag: "ga", continent: "Africa" },
        { name: "Nagpur", lat: 21.1458, lon: 79.0882, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Niue", lat: -19.0544, lon: -169.8672, offset: -11, flag: "nu", continent: "Oceania" },
        { name: "Saskatoon", lat: 52.1332, lon: -106.6700, offset: -6, flag: "ca", continent: "N America" },
        { name: "Sao Luis", lat: -2.5297, lon: -44.3028, offset: -3, flag: "br", continent: "S America" },
        { name: "Sarajevo", lat: 43.8563, lon: 18.4131, offset: 2, flag: "ba", continent: "Europe" },
        { name: "Yaounde", lat: 3.8480, lon: 11.5021, offset: 1, flag: "cm", continent: "Africa" },
        { name: "Indore", lat: 22.7196, lon: 75.8577, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Pitcairn Islands", lat: -25.0667, lon: -130.1015, offset: -8, flag: "pn", continent: "Oceania" },
        { name: "Victoria", lat: 48.4284, lon: -123.3656, offset: -7, flag: "ca", continent: "N America" },
        { name: "Campo Grande", lat: -20.4697, lon: -54.6201, offset: -4, flag: "br", continent: "S America" },
        { name: "Tirana", lat: 41.3275, lon: 19.8187, offset: 2, flag: "al", continent: "Europe" },
        { name: "Ndjamena", lat: 12.1348, lon: 15.0557, offset: 1, flag: "td", continent: "Africa" },
        { name: "Thane", lat: 19.2183, lon: 72.9781, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Norfolk Island", lat: -29.0408, lon: 167.9547, offset: 11, flag: "nf", continent: "Oceania" },
        { name: "Anchorage", lat: 61.2181, lon: -149.9003, offset: -8, flag: "us", continent: "N America" },
        { name: "Cuiaba", lat: -15.6014, lon: -56.0979, offset: -4, flag: "br", continent: "S America" },
        { name: "Chisinau", lat: 47.0105, lon: 28.8638, offset: 3, flag: "md", continent: "Europe" },
        { name: "Lome", lat: 6.1319, lon: 1.2228, offset: 0, flag: "tg", continent: "Africa" },
        { name: "Bhopal", lat: 23.2599, lon: 77.4126, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tokelau", lat: -9.2002, lon: -171.8484, offset: 13, flag: "tk", continent: "Oceania" },
        { name: "Fairbanks", lat: 64.8378, lon: -147.7164, offset: -8, flag: "us", continent: "N America" },
        { name: "Porto Velho", lat: -8.7612, lon: -63.9004, offset: -4, flag: "br", continent: "S America" },
        { name: "Yerevan", lat: 40.1792, lon: 44.4991, offset: 4, flag: "am", continent: "Asia" },
        { name: "Banjul", lat: 13.4549, lon: -16.5790, offset: 0, flag: "gm", continent: "Africa" },
        { name: "Patna", lat: 25.5941, lon: 85.1376, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Wallis and Futuna", lat: -13.7688, lon: -177.1561, offset: 12, flag: "wf", continent: "Oceania" },
        { name: "Juneau", lat: 58.3019, lon: -134.4197, offset: -8, flag: "us", continent: "N America" },
        { name: "Boa Vista", lat: 2.8195, lon: -60.6733, offset: -4, flag: "br", continent: "S America" },
        { name: "Tbilisi", lat: 41.7151, lon: 44.8271, offset: 4, flag: "ge", continent: "Asia" },
        { name: "Conakry", lat: 9.6412, lon: -13.5784, offset: 0, flag: "gn", continent: "Africa" },
        { name: "Ranchi", lat: 23.3441, lon: 85.3096, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "American Samoa", lat: -14.2700, lon: -170.1322, offset: -11, flag: "as", continent: "Oceania" },
        { name: "Whitehorse", lat: 60.7212, lon: -135.0568, offset: -7, flag: "ca", continent: "N America" },
        { name: "Rio Branco", lat: -9.9748, lon: -67.8076, offset: -5, flag: "br", continent: "S America" },
        { name: "Baku", lat: 40.4093, lon: 49.8671, offset: 4, flag: "az", continent: "Asia" },
        { name: "Bissau", lat: 11.8817, lon: -15.6177, offset: 0, flag: "gw", continent: "Africa" },
        { name: "Guwahati", lat: 26.1445, lon: 91.7362, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Easter Island", lat: -27.1127, lon: -109.3497, offset: -6, flag: "cl", continent: "Oceania" },
        { name: "Yellowknife", lat: 62.4540, lon: -114.3718, offset: -6, flag: "ca", continent: "N America" },
        { name: "Galapagos", lat: -0.9538, lon: -90.9656, offset: -6, flag: "ec", continent: "S America" },
        { name: "Porto", lat: 41.1579, lon: -8.6291, offset: 1, flag: "pt", continent: "Europe" },
        { name: "Freetown", lat: 8.4657, lon: -13.2317, offset: 0, flag: "sl", continent: "Africa" },
        { name: "Amman", lat: 31.9539, lon: 35.9106, offset: 3, flag: "jo", continent: "Asia" },
        { name: "St. Louis", lat: 38.6270, lon: -90.1994, offset: -5, flag: "us", continent: "N America" },
        { name: "Milan", lat: 45.4642, lon: 9.1900, offset: 2, flag: "it", continent: "Europe" },
        { name: "Monrovia", lat: 6.3156, lon: -10.8074, offset: 0, flag: "lr", continent: "Africa" },
        { name: "Baghdad", lat: 33.3152, lon: 44.3661, offset: 3, flag: "iq", continent: "Asia" },
        { name: "Kansas City", lat: 39.0997, lon: -94.5786, offset: -5, flag: "us", continent: "N America" },
        { name: "Barcelona", lat: 41.3851, lon: 2.1734, offset: 2, flag: "es", continent: "Europe" },
        { name: "Nouakchott", lat: 18.0735, lon: -15.9582, offset: 0, flag: "mr", continent: "Africa" },
        { name: "Riyadh", lat: 24.7136, lon: 46.6753, offset: 3, flag: "sa", continent: "Asia" },
        { name: "Minneapolis", lat: 44.9778, lon: -93.2650, offset: -5, flag: "us", continent: "N America" },
        { name: "Munich", lat: 48.1351, lon: 11.5820, offset: 2, flag: "de", continent: "Europe" },
        { name: "Cape Verde", lat: 14.9330, lon: -23.5133, offset: -1, flag: "cv", continent: "Africa" },
        { name: "Dubai", lat: 25.2048, lon: 55.2708, offset: 4, flag: "ae", continent: "Asia" },
        { name: "Cleveland", lat: 41.4993, lon: -81.6944, offset: -4, flag: "銓挈⽆⁊N America" },
        { name: "Florence", lat: 43.7696, lon: 11.2558, offset: 2, flag: "it", continent: "Europe" },
        { name: "Sao Tome", lat: 0.3365, lon: 6.7273, offset: 0, flag: "st", continent: "Africa" },
        { name: "Kuwait City", lat: 29.3759, lon: 47.9774, offset: 3, flag: "kw", continent: "Asia" },
        { name: "Tampa", lat: 27.9506, lon: -82.4572, offset: -4, flag: "us", continent: "N America" },
        { name: "Venice", lat: 45.4408, lon: 12.3155, offset: 2, flag: "it", continent: "Europe" },
        { name: "Malabo", lat: 3.7504, lon: 8.7832, offset: 1, flag: "gq", continent: "Africa" }
    ];

    const continentColors = {
        "N America": "#388E3C",
        "Europe": "#FBC02D",
        "Asia": "#F57C00",
        "S America": "#1976D2",
        "Africa": "#303F9F",
        "Oceania": "#7B1FA2"
    };

    // Save custom clocks to localStorage
function saveCustomClocks() {
    localStorage.setItem('customClocks', JSON.stringify(customClocks.map(city => city.name)));
}

// Load custom clocks from localStorage
function loadCustomClocks() {
    const saved = localStorage.getItem('customClocks');
    if (saved) {
        const cityNames = JSON.parse(saved);
        customClocks = cityNames
            .map(name => cities.find(c => c.name.toLowerCase() === name.toLowerCase()))
            .filter(city => city); // 유효한 도시만 포함
        return customClocks;
    }
    return [];
}

    const weatherCache = new Map();
    let allClocks = [];
    let displayedClocks = 0;
    const clocksPerLoad = 25;
    let customClocks = [];

    // Fetch weather data
    async function fetchWeather(lat, lon, city) {
        const cacheKey = `${lat},${lon}`;
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < 30 * 60 * 1000) return cached.data;
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`
            );
            if (!response.ok) throw new Error("Weather API failed");
            const data = await response.json();
            const weather = {
                temp: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                code: data.current.weather_code,
            };
            weatherCache.set(cacheKey, { data: weather, timestamp: Date.now() });
            return weather;
        } catch (error) {
            console.error(`Failed to fetch weather for ${city}:`, error);
            return { temp: "N/A", humidity: "N/A", code: 0 };
        }
    }

    // Map weather code to icon
    function getWeatherIcon(code) {
        const weatherIcons = {
            0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
            51: "🌧️", 53: "🌧️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
            71: "❄️", 73: "❄️", 75: "❄️", 95: "⛈️",
        };
        return weatherIcons[code] || "🌍";
    }

    // Create a clock
    function createClock(city, containerId, isCustom = false) {
        const container = document.createElement("div");
        container.className = "clock-container";
        container.dataset.city = city.name;
        container.dataset.continent = city.continent;

        const flag = document.createElement("img");
        flag.src = `https://flagcdn.com/64x48/${city.flag}.png`;
        flag.alt = `${city.name} flag`;

        const cityName = document.createElement("h2");
        cityName.appendChild(flag);
        cityName.append(` ${city.name}`);

        const time = document.createElement("div");
        time.className = "clock-time";
        time.style.color = continentColors[city.continent] || "#000";

        const weatherInfo = document.createElement("div");
        weatherInfo.className = "weather-info";

        if (isCustom) {
            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-clock";
            removeBtn.textContent = "X";
            removeBtn.setAttribute("aria-label", `Remove ${city.name} clock`);
            container.appendChild(removeBtn);
        }

        container.append(cityName, time, weatherInfo);
        const targetContainer = document.getElementById(containerId);
        if (targetContainer) {
            targetContainer.appendChild(container);
        } else {
            console.error(`Container ${containerId} not found!`);
            return null;
        }

        async function updateWeather() {
            const weather = await fetchWeather(city.lat, city.lon, city.name);
            weatherInfo.innerHTML = `Weather: ${getWeatherIcon(weather.code)} <span class="temp">${weather.temp}°C</span>, Humidity: <span class="humidity">${weather.humidity}%</span>`;
        }

        function updateClock() {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const localTime = new Date(utc + city.offset * 3600000);
            const hours = String(localTime.getHours()).padStart(2, "0");
            const minutes = String(localTime.getMinutes()).padStart(2, "0");
            const seconds = String(localTime.getSeconds()).padStart(2, "0");
            time.innerHTML = `${hours}:${minutes}<span class="seconds">:${seconds}</span>`;
        }

        updateClock();
        updateWeather();
        setInterval(updateClock, 1000);
        setInterval(updateWeather, 30 * 60 * 1000);

        return { clock: container, updateWeather };
    }

    // Initialize main clocks
    async function initializeClocks() {
        const loadMoreBtn = document.getElementById("load-more");
        if (loadMoreBtn) loadMoreBtn.disabled = true;
        const activeContinent = document.querySelector(".filter-btn.active")?.dataset.continent;
        let chunk = cities;

        if (activeContinent && activeContinent !== "") {
            chunk = cities.filter(city => city.continent === activeContinent);
        }
        chunk = chunk.slice(0, 50);

        allClocks = [];
        document.getElementById("clocks-container").innerHTML = "";
        for (const city of chunk) {
            const clock = await createClock(city, "clocks-container");
            if (clock) allClocks.push(clock);
        }
        displayedClocks = chunk.length;

        const totalCities = activeContinent && activeContinent !== ""
            ? cities.filter(city => city.continent === activeContinent).length
            : cities.length;
        if (loadMoreBtn) loadMoreBtn.disabled = displayedClocks >= totalCities;

        filterClocks();
    }

    // Load more clocks
    async function loadMoreClocks() {
        const loadMoreBtn = document.getElementById("load-more");
        if (loadMoreBtn) loadMoreBtn.disabled = true;
        const activeContinent = document.querySelector(".filter-btn.active")?.dataset.continent;
        let chunk;

        if (activeContinent && activeContinent !== "") {
            chunk = cities
                .filter(city => city.continent === activeContinent)
                .slice(displayedClocks, displayedClocks + clocksPerLoad);
        } else {
            chunk = cities.slice(displayedClocks, displayedClocks + clocksPerLoad);
        }

        for (const city of chunk) {
            const clock = await createClock(city, "clocks-container");
            if (clock) allClocks.push(clock);
        }
        displayedClocks += chunk.length;

        const totalCities = activeContinent && activeContinent !== ""
            ? cities.filter(city => city.continent === activeContinent).length
            : cities.length;
        if (loadMoreBtn) loadMoreBtn.disabled = displayedClocks >= totalCities;

        filterClocks();
    }

    // Create filter buttons
    function createFilterButtons() {
        const continents = ["", "Asia", "Europe", "N America", "S America", "Africa", "Oceania"];
        const filterContainer = document.getElementById("filter-buttons");
        if (!filterContainer) return;

        filterContainer.innerHTML = "";
        continents.forEach(continent => {
            const button = document.createElement("button");
            button.className = "filter-btn";
            button.dataset.continent = continent;
            button.textContent = continent || "All";
            button.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                displayedClocks = 0;
                initializeClocks();
            });
            filterContainer.appendChild(button);
        });
        filterContainer.firstChild.classList.add("active");
    }

    // Filter clocks
    function filterClocks() {
        const searchQuery = document.getElementById("search")?.value.toLowerCase() || "";
        const activeContinent = document.querySelector(".filter-btn.active")?.dataset.continent || "";

        allClocks.forEach(({ clock }) => {
            const matchesSearch = searchQuery === "" || clock.dataset.city.toLowerCase().startsWith(searchQuery);
            const matchesContinent = activeContinent === "" || clock.dataset.continent === activeContinent;
            clock.style.display = matchesSearch && matchesContinent ? "block" : "none";
        });
    }

    // Setup search
    function setupSearch() {
        const searchInput = document.getElementById("search");
        if (searchInput) {
            searchInput.addEventListener("input", () => {
                filterClocks();
            });
        }
    }

    // Save custom clocks to localStorage
function saveCustomClocks() {
    const clockNames = customClocks.map(city => city.name);
    localStorage.setItem('customClocks', JSON.stringify(clockNames));
    console.log('Saved to localStorage:', clockNames); // 디버깅 로그
}

// Load custom clocks from localStorage
function loadCustomClocks() {
    const saved = localStorage.getItem('customClocks');
    console.log('Raw localStorage data:', saved); // 디버깅 로그
    if (saved) {
        try {
            const cityNames = JSON.parse(saved);
            console.log('Parsed city names:', cityNames); // 디버깅 로그
            const loadedClocks = cityNames
                .map(name => {
                    const city = cities.find(c => c.name.toLowerCase() === name.toLowerCase());
                    if (!city) console.warn(`City not found in cities array: ${name}`);
                    return city;
                })
                .filter(city => city);
            console.log('Loaded clocks:', loadedClocks); // 디버깅 로그
            return loadedClocks;
        } catch (e) {
            console.error('Error parsing localStorage data:', e);
            return [];
        }
    }
    console.log('No saved clocks found, returning empty array');
    return [];
}

function initializeCustomClocks() {
    console.log('Initializing custom clocks...');
    customClocks = loadCustomClocks();
    console.log('customClocks after load:', customClocks);
    const clocksContainer = document.getElementById("custom-clocks-container");
    if (clocksContainer) {
        clocksContainer.innerHTML = "";
        console.log('Cleared custom-clocks-container');
    } else {
        console.error('custom-clocks-container not found!');
    }

    if (customClocks.length === 0) {
        console.log('No saved clocks, adding default cities...');
        const defaultCities = ["New York", "London"];
        defaultCities.forEach(cityName => {
            const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
            if (city && !customClocks.some(c => c.name.toLowerCase() === cityName.toLowerCase())) {
                customClocks.push(city);
                console.log(`Added default city: ${cityName}`);
            }
        });
    }

    customClocks.forEach(city => {
        console.log(`Rendering clock for: ${city.name}`);
        const newClock = createClock(city, "custom-clocks-container", true);
        if (newClock) {
            const removeBtn = newClock.clock.querySelector(".remove-clock");
            if (removeBtn) {
                removeBtn.addEventListener("click", () => {
                    console.log(`Removing clock: ${city.name}`);
                    customClocks = customClocks.filter(c => c.name !== city.name);
                    newClock.clock.remove();
                    updateClockCount();
                    saveCustomClocks();
                });
            }
        }
    });

    updateClockCount();
    console.log('Clock count updated:', customClocks.length);
    function bindClockEvents() {
        const clocks = document.querySelectorAll('.clock-container');
        console.log('Rebinding clocks:', clocks.length);
        clocks.forEach(clock => {
            clock.removeEventListener('click', handleClick);
            clock.addEventListener('click', handleClick);
        });
    }
    
    const handleClick = async (e) => {
        e.preventDefault();
        const cityName = e.currentTarget.dataset.city?.trim();
        const cityInfoDiv = document.getElementById('city-info');
        if (!cityInfoDiv) return;
        cityInfoDiv.innerHTML = '<p>Loading...</p><span class="close-btn">×</span>';
        cityInfoDiv.classList.add('show');
        try {
            for (const file of ['cities1.json', 'cities2.json', 'cities3.json', 'cities4.json', 'cities5.json']) {
                const response = await fetch(`/assets/data/json/${file}`);
                if (!response.ok) continue;
                const cities = await response.json();
                const city = cities.find(c => c.name?.trim().toLowerCase() === cityName.toLowerCase());
                if (city) {
                    const attractions = (city.topAttractionsForProfessionals || []).map(attr => `
                        <li>${attr.name || 'N/A'}: ${attr.description || 'N/A'} (${attr.proximityToBusinessDistrict || 'N/A'})</li>
                    `).join('');
                    const events = (city.networkingEvents || []).map(event => `
                        <li>${event.name || 'N/A'} (${event.date || 'N/A'}): ${event.description || 'N/A'}</li>
                    `).join('');
                    cityInfoDiv.innerHTML = `
                        <h2>${city.name}</h2>
                        <p><strong>Timezone:</strong> ${city.timezone || 'N/A'}</p>
                        <p><strong>Time Difference:</strong> ${city.timeDifference || 'N/A'}</p>
                        <p><strong>Business Hub:</strong> ${city.businessHub || 'N/A'}</p>
                        <p><strong>Top Attractions for Professionals:</strong></p>
                        <ul>${attractions || 'N/A'}</ul>
                        <p><strong>Local Lifestyle:</strong> ${city.localLifestyle || 'N/A'}</p>
                        <p><strong>Local Culture:</strong> ${city.localCulture || 'N/A'}</p>
                        <p><strong>Signature Dish:</strong> ${city.signatureDish || 'N/A'}</p>
                        <p><strong>Networking Events:</strong></p>
                        <ul>${events || 'N/A'}</ul>
                        <p><strong>Business Tip:</strong> ${city.businessTip || 'N/A'}</p>
                        <span class="close-btn">×</span>
                    `;
                    // 구조화된 데이터 추가
                    const script = document.createElement('script');
                    script.type = 'application/ld+json';
                    script.text = JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Place",
                        "name": city.name,
                        "description": `Timezone: ${city.timezone}, Signature Dish: ${city.signatureDish}, Local Culture: ${city.localCulture}`,
                        "event": city.networkingEvents?.map(event => ({
                            "@type": "Event",
                            "name": event.name,
                            "startDate": event.date,
                            "description": event.description
                        }))
                    });
                    document.head.appendChild(script);
                    cityInfoDiv.classList.add('show');
                    cityInfoDiv.querySelector('.close-btn').addEventListener('click', () => {
                        cityInfoDiv.classList.remove('show');
                        script.remove();
                    });
                    return;
                }
            }
            cityInfoDiv.innerHTML = '<p>City not found</p><span class="close-btn">×</span>';
            cityInfoDiv.querySelector('.close-btn').addEventListener('click', () => {
                cityInfoDiv.classList.remove('show');
            });
        } catch (error) {
            cityInfoDiv.innerHTML = '<p>Error loading data</p><span class="close-btn">×</span>';
            cityInfoDiv.querySelector('.close-btn').addEventListener('click', () => {
                cityInfoDiv.classList.remove('show');
            });
        }
    };

    bindClockEvents();
    // 동적 로드 감지
    const observer = new MutationObserver(bindClockEvents);
    observer.observe(document.getElementById('custom-clocks-section'), { childList: true, subtree: true });
}

function addCustomClock(city) {
    console.log(`Adding custom clock: ${city.name}`); // 디버깅 로그
    if (customClocks.length >= 6) {
        alert("You can only add up to 6 clocks!");
        console.log('Max clock limit reached');
        return;
    }
    if (customClocks.some(c => c.name.toLowerCase() === city.name.toLowerCase())) {
        alert("This city is already added!");
        console.log('City already added:', city.name);
        return;
    }

    customClocks.push(city);
    const newClock = createClock(city, "custom-clocks-container", true);
    if (newClock) {
        const removeBtn = newClock.clock.querySelector(".remove-clock");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                console.log(`Removing clock: ${city.name}`);
                customClocks = customClocks.filter(c => c.name !== city.name);
                newClock.clock.remove();
                updateClockCount();
                saveCustomClocks();
            });
        }
    }

    updateClockCount();
    saveCustomClocks();
    const searchInput = document.getElementById("custom-city-search");
    if (searchInput) {
        searchInput.value = "";
        console.log('Cleared search input');
    }
}

function clearCustomClocks() {
    console.log('Clearing all custom clocks');
    customClocks = [];
    const clocksContainer = document.getElementById("custom-clocks-container");
    if (clocksContainer) {
        clocksContainer.innerHTML = "";
        console.log('Cleared custom-clocks-container');
    } else {
        console.error('custom-clocks-container not found!');
    }
    saveCustomClocks();
    updateClockCount();
    console.log('Custom clocks cleared and saved');
}

    // Update clock count
    function updateClockCount() {
        const countElement = document.querySelector(".clock-count");
        if (countElement) {
            countElement.textContent = `${customClocks.length}/6 Clocks Added`;
        }
    }

    // Setup custom search
    function setupCustomSearch() {
        const searchInput = document.getElementById("custom-city-search");
        const suggestions = document.getElementById("custom-suggestions");
        if (!searchInput || !suggestions) return;

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            suggestions.innerHTML = "";
            suggestions.style.display = query.length >= 2 ? "block" : "none";

            if (query.length >= 2) {
                const matches = cities.filter(city => city.name.toLowerCase().startsWith(query));
                if (matches.length === 0) {
                    suggestions.innerHTML = "<div>No results found</div>";
                } else {
                    matches.forEach(city => {
                        const suggestion = document.createElement("div");
                        suggestion.innerHTML = `<img src="https://flagcdn.com/16x12/${city.flag}.png" alt="${city.name} flag"> ${city.name}`;
                        suggestion.addEventListener("click", () => {
                            if (window.innerWidth <= 480) {
                                addCustomClock(city);
                            } else {
                                searchInput.value = city.name;
                                suggestions.style.display = "none";
                            }
                        });
                        suggestions.appendChild(suggestion);
                    });
                }
            }
        });

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && searchInput.value) {
                const city = cities.find(c => c.name.toLowerCase() === searchInput.value.toLowerCase());
                if (city) addCustomClock(city);
            }
        });

        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.style.display = "none";
            }
        });
    }

    // Handle add custom clock
    function handleAddCustomClock() {
        const searchInput = document.getElementById("custom-city-search");
        const cityName = searchInput.value.trim();
        const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());

        if (city) {
            addCustomClock(city);
            searchInput.value = "";
            document.getElementById("custom-suggestions").style.display = "none";
        } else {
            alert("City not found!");
        }
    }

    // Initialize
    if (document.getElementById("clocks-container")) {
        createFilterButtons();
        setupSearch();
        initializeClocks();
        const loadMoreBtn = document.getElementById("load-more");
        if (loadMoreBtn) loadMoreBtn.addEventListener("click", loadMoreClocks);
    }

    if (document.getElementById("custom-clocks-section")) {
        initializeCustomClocks();
        setupCustomSearch();
        // Bind Add and Clear buttons
const addButton = document.getElementById("add-custom-clock");
const clearButton = document.getElementById("clear-custom-clocks");
if (addButton && clearButton) {
    console.log('Binding buttons for custom clocks');
    addButton.addEventListener("click", () => {
        console.log('Add Clock button clicked');
        handleAddCustomClock();
    });
    clearButton.addEventListener("click", () => {
        console.log('Clear All button clicked');
        clearCustomClocks();
    });
} else {
    console.error('Add or Clear button not found!', { addButton, clearButton });
}
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cityInfoDiv = document.getElementById('city-info');
    const jsonFiles = ['cities1.json', 'cities2.json', 'cities3.json', 'cities4.json', 'cities5.json'];
    console.log('Binding click events to clocks:', document.querySelectorAll('.clock-container').length);
    document.querySelectorAll('.clock-container').forEach(clock => {
        clock.addEventListener('click', async (e) => {
            e.preventDefault();
            const cityName = clock.dataset.city?.trim();
            console.log('Clicked city:', cityName);
            if (!cityInfoDiv) {
                console.error('city-info div not found');
                return;
            }
            if (!cityName) {
                console.error('No city name in dataset');
                cityInfoDiv.innerHTML = '<p>No city selected</p>';
                return;
            }
            cityInfoDiv.innerHTML = '<p>Loading...</p>';
            try {
                for (const file of jsonFiles) {
                    console.log('Fetching:', `/assets/data/json/${file}`);
                    const response = await fetch(`/assets/data/json/${file}`);
                    if (!response.ok) {
                        console.error(`Failed to fetch ${file}: ${response.status}`);
                        continue;
                    }
                    const cities = await response.json();
                    console.log('Loaded cities:', cities.length);
                    const city = cities.find(c => {
                        const name = c.name?.trim();
                        return name && name.toLowerCase() === cityName.toLowerCase();
                    });
                    if (city) {
                        console.log('Found city:', city);
                        cityInfoDiv.innerHTML = `
                            <div>
                                <h2>${city.name}</h2>
                                <p>Timezone: ${city.timezone || 'N/A'}</p>
                                <p>${city.businessHub || 'N/A'}</p>
                                <ul>${(city.topAttractionsForProfessionals || []).map(attr => `<li>${attr.description || 'No description'}</li>`).join('')}</ul>
                            </div>
                        `;
                        return;
                    }
                }
                console.log('City not found in JSON:', cityName);
                cityInfoDiv.innerHTML = '<p>City not found</p>';
            } catch (error) {
                console.error('Fetch error:', error);
                cityInfoDiv.innerHTML = '<p>Error loading data</p>';
            }
        });
    });
});

function bindClockEvents() {
    const clocks = document.querySelectorAll('.clock-container');
    console.log('Rebinding clocks:', clocks.length);
    clocks.forEach(clock => {
        clock.removeEventListener('click', handleClick);
        clock.addEventListener('click', handleClick);
    });
}
const handleClick = async (e) => {
    e.preventDefault();
    const cityName = e.currentTarget.dataset.city?.trim();
    const cityInfoDiv = document.getElementById('city-info');
    if (!cityInfoDiv) {
        console.error('city-info div not found');
        return;
    }
    cityInfoDiv.innerHTML = '<p>Loading...</p><span class="close-btn">×</span>';
    cityInfoDiv.classList.add('show');
    try {
        for (const file of ['cities1.json', 'cities2.json', 'cities3.json', 'cities4.json', 'cities5.json']) {
            const response = await fetch(`/assets/data/json/${file}`);
            if (!response.ok) continue;
            const cities = await response.json();
            const city = cities.find(c => c.name?.trim().toLowerCase() === cityName.toLowerCase());
            if (city) {
                const attractions = (city.topAttractionsForProfessionals || []).map(attr => `
                    <li>${attr.name || 'N/A'}: ${attr.description || 'N/A'} (${attr.proximityToBusinessDistrict || 'N/A'})</li>
                `).join('');
                const events = (city.networkingEvents || []).map(event => `
                    <li>${event.name || 'N/A'} (${event.date || 'N/A'}): ${event.description || 'N/A'}</li>
                `).join('');
                cityInfoDiv.innerHTML = `
                    <h2>${city.name}</h2>
                    <p><strong>Timezone:</strong> ${city.timezone || 'N/A'}</p>
                    <p><strong>Time Difference:</strong> ${city.timeDifference || 'N/A'}</p>
                    <p><strong>Business Hub:</strong> ${city.businessHub || 'N/A'}</p>
                    <p><strong>Top Attractions for Professionals:</strong></p>
                    <ul>${attractions || 'N/A'}</ul>
                    <p><strong>Local Lifestyle:</strong> ${city.localLifestyle || 'N/A'}</p>
                    <p><strong>Local Culture:</strong> ${city.localCulture || 'N/A'}</p>
                    <p><strong>Signature Dish:</strong> ${city.signatureDish || 'N/A'}</p>
                    <p><strong>Networking Events:</strong></p>
                    <ul>${events || 'N/A'}</ul>
                    <p><strong>Business Tip:</strong> ${city.businessTip || 'N/A'}</p>
                    <span class="close-btn">×</span>
                `;
                cityInfoDiv.classList.add('show');
                cityInfoDiv.querySelector('.close-btn').addEventListener('click', () => {
                    cityInfoDiv.classList.remove('show');
                });
                return;
            }
        }
        cityInfoDiv.innerHTML = '<p>City not found</p><span class="close-btn">×</span>';
        cityInfoDiv.querySelector('.close-btn').addEventListener('click', () => {
            cityInfoDiv.classList.remove('show');
        });
    } catch (error) {
        cityInfoDiv.innerHTML = '<p>Error loading data</p><span class="close-btn">×</span>';
        cityInfoDiv.querySelector('.close-btn').addEventListener('click', () => {
            cityInfoDiv.classList.remove('show');
        });
    }
};
bindClockEvents();
const observer = new MutationObserver(bindClockEvents);
observer.observe(document.getElementById('custom-clocks-section'), { childList: true, subtree: true });