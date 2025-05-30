document.addEventListener("DOMContentLoaded", () => {
    const cities = [
        { name: "New York", lat: 40.7128, lon: -74.0060, offset: -4, flag: "us", continent: "N America" },
        { name: "Seoul", lat: 37.5665, lon: 126.9780, offset: 9, flag: "kr", continent: "Asia" },
        { name: "London", lat: 51.5074, lon: -0.1278, offset: 1, flag: "gb", continent: "Europe" },
        { name: "Sao Paulo", lat: -23.5505, lon: -46.6333, offset: -3, flag: "br", continent: "S America" },
        { name: "Cairo", lat: 30.0444, lon: 31.2357, offset: 2, flag: "eg", continent: "Africa" },
        { name: "Auckland", lat: -36.8485, lon: 174.7633, offset: 12, flag: "nz", continent: "Oceania" },
        { name: "Los Angeles", lat: 34.0522, lon: -118.2437, offset: -7, flag: "us", continent: "N America" },
        { name: "Mumbai", lat: 19.0760, lon: 72.8777, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Madrid", lat: 40.4168, lon: -3.7038, offset: 1, flag: "es", continent: "Europe" },
        { name: "Buenos Aires", lat: -34.6037, lon: -58.3816, offset: -3, flag: "ar", continent: "S America" },
        { name: "Johannesburg", lat: -26.2041, lon: 28.0473, offset: 2, flag: "za", continent: "Africa" },
        { name: "Perth", lat: -31.9505, lon: 115.8605, offset: 8, flag: "au", continent: "Oceania" },
        { name: "Miami", lat: 25.7617, lon: -80.1918, offset: -4, flag: "us", continent: "N America" },
        { name: "Shanghai", lat: 31.2304, lon: 121.4737, offset: 8, flag: "cn", continent: "Asia" },
        { name: "Amsterdam", lat: 52.3676, lon: 4.9041, offset: 1, flag: "nl", continent: "Europe" },
        { name: "Bogota", lat: 4.7110, lon: -74.0721, offset: -5, flag: "co", continent: "S America" },
        { name: "Accra", lat: 5.6037, lon: -0.1870, offset: 0, flag: "gh", continent: "Africa" },
        { name: "Adelaide", lat: -34.9285, lon: 138.6007, offset: 9.5, flag: "au", continent: "Oceania" },
        { name: "San Francisco", lat: 37.7749, lon: -122.4194, offset: -7, flag: "us", continent: "N America" },
        { name: "Bangkok", lat: 13.7563, lon: 100.5018, offset: 7, flag: "th", continent: "Asia" },
        { name: "Paris", lat: 48.8566, lon: 2.3522, offset: 1, flag: "fr", continent: "Europe" },
        { name: "Quito", lat: -0.1807, lon: -78.4678, offset: -5, flag: "ec", continent: "S America" },
        { name: "Nairobi", lat: -1.2921, lon: 36.8219, offset: 3, flag: "ke", continent: "Africa" },
        { name: "Melbourne", lat: -37.8136, lon: 144.9631, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Chicago", lat: 41.8781, lon: -87.6298, offset: -5, flag: "us", continent: "N America" },
        { name: "Singapore", lat: 1.3521, lon: 103.8198, offset: 8, flag: "sg", continent: "Asia" },
        { name: "Berlin", lat: 52.5200, lon: 13.4050, offset: 1, flag: "de", continent: "Europe" },
        { name: "Lima", lat: -12.0464, lon: -77.0428, offset: -5, flag: "pe", continent: "S America" },
        { name: "Lagos", lat: 6.5244, lon: 3.3792, offset: 1, flag: "ng", continent: "Africa" },
        { name: "Brisbane", lat: -27.4698, lon: 153.0251, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Toronto", lat: 43.6532, lon: -79.3832, offset: -4, flag: "ca", continent: "N America" },
        { name: "Hong Kong", lat: 22.3193, lon: 114.1694, offset: 8, flag: "hk", continent: "Asia" },
        { name: "Rome", lat: 41.9028, lon: 12.4964, offset: 1, flag: "it", continent: "Europe" },
        { name: "Santiago", lat: -33.4489, lon: -70.6693, offset: -4, flag: "cl", continent: "S America" },
        { name: "Addis Ababa", lat: 9.1450, lon: 38.7244, offset: 3, flag: "et", continent: "Africa" },
        { name: "Hobart", lat: -42.8821, lon: 147.3272, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Vancouver", lat: 49.2827, lon: -123.1207, offset: -7, flag: "ca", continent: "N America" },
        { name: "Jakarta", lat: -6.2088, lon: 106.8456, offset: 7, flag: "id", continent: "Asia" },
        { name: "Vienna", lat: 48.2082, lon: 16.3738, offset: 1, flag: "at", continent: "Europe" },
        { name: "Caracas", lat: 10.4806, lon: -66.9036, offset: -4, flag: "ve", continent: "S America" },
        { name: "Kampala", lat: 0.3476, lon: 32.5825, offset: 3, flag: "ug", continent: "Africa" },
        { name: "Darwin", lat: -12.4634, lon: 130.8456, offset: 9.5, flag: "au", continent: "Oceania" },
        { name: "Montreal", lat: 45.5017, lon: -73.5673, offset: -4, flag: "ca", continent: "N America" },
        { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869, offset: 8, flag: "my", continent: "Asia" },
        { name: "Stockholm", lat: 59.3293, lon: 18.0686, offset: 1, flag: "se", continent: "Europe" },
        { name: "Montevideo", lat: -34.9011, lon: -56.1645, offset: -3, flag: "uy", continent: "S America" },
        { name: "Algiers", lat: 36.7372, lon: 3.0870, offset: 1, flag: "dz", continent: "Africa" },
        { name: "Wellington", lat: -41.2865, lon: 174.7762, offset: 12, flag: "nz", continent: "Oceania" },
        { name: "Houston", lat: 29.7604, lon: -95.3698, offset: -5, flag: "us", continent: "N America" },
        { name: "Hanoi", lat: 21.0278, lon: 105.8342, offset: 7, flag: "vn", continent: "Asia" },
        { name: "Zurich", lat: 47.3769, lon: 8.5417, offset: 1, flag: "ch", continent: "Europe" },
        { name: "Asuncion", lat: -25.2637, lon: -57.5759, offset: -4, flag: "py", continent: "S America" },
        { name: "Dar es Salaam", lat: -6.7924, lon: 39.2083, offset: 3, flag: "tz", continent: "Africa" },
        { name: "Canberra", lat: -35.2809, lon: 149.1300, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Dallas", lat: 32.7767, lon: -96.7970, offset: -5, flag: "us", continent: "N America" },
        { name: "Manila", lat: 14.5995, lon: 120.9842, offset: 8, flag: "ph", continent: "Asia" },
        { name: "Prague", lat: 50.0755, lon: 14.4378, offset: 1, flag: "cz", continent: "Europe" },
        { name: "La Paz", lat: -16.5000, lon: -68.1500, offset: -4, flag: "bo", continent: "S America" },
        { name: "Tunis", lat: 36.8065, lon: 10.1815, offset: 1, flag: "tn", continent: "Africa" },
        { name: "Christchurch", lat: -43.5321, lon: 172.6362, offset: 12, flag: "nz", continent: "Oceania" },
        { name: "Phoenix", lat: 33.4484, lon: -112.0740, offset: -7, flag: "us", continent: "N America" },
        { name: "Taipei", lat: 25.0330, lon: 121.5654, offset: 8, flag: "tw", continent: "Asia" },
        { name: "Warsaw", lat: 52.2297, lon: 21.0122, offset: 1, flag: "pl", continent: "Europe" },
        { name: "Medellin", lat: 6.2442, lon: -75.5812, offset: -5, flag: "co", continent: "S America" },
        { name: "Casablanca", lat: 33.5731, lon: -7.5898, offset: 1, flag: "ma", continent: "Africa" },
        { name: "Sydney", lat: -33.8688, lon: 151.2093, offset: 10, flag: "au", continent: "Oceania" },
        { name: "Seattle", lat: 47.6062, lon: -122.3321, offset: -7, flag: "us", continent: "N America" },
        { name: "Dhaka", lat: 23.8103, lon: 90.4125, offset: 6, flag: "bd", continent: "Asia" },
        { name: "Budapest", lat: 47.4979, lon: 19.0402, offset: 1, flag: "hu", continent: "Europe" },
        { name: "Brasilia", lat: -15.8267, lon: -47.9218, offset: -3, flag: "br", continent: "S America" },
        { name: "Luanda", lat: -8.8390, lon: 13.2894, offset: 1, flag: "ao", continent: "Africa" },
        { name: "Fiji", lat: -17.7134, lon: 178.0650, offset: 12, flag: "fj", continent: "Oceania" },
        { name: "Boston", lat: 42.3601, lon: -71.0589, offset: -4, flag: "us", continent: "N America" },
        { name: "Colombo", lat: 6.9271, lon: 79.8612, offset: 5.5, flag: "lk", continent: "Asia" },
        { name: "Copenhagen", lat: 55.6761, lon: 12.5683, offset: 1, flag: "dk", continent: "Europe" },
        { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, offset: -3, flag: "br", continent: "S America" },
        { name: "Khartoum", lat: 15.5007, lon: 32.5599, offset: 2, flag: "sd", continent: "Africa" },
        { name: "Port Moresby", lat: -9.4438, lon: 147.1803, offset: 10, flag: "pg", continent: "Oceania" },
        { name: "Denver", lat: 39.7392, lon: -104.9903, offset: -6, flag: "us", continent: "N America" },
        { name: "Kathmandu", lat: 27.7172, lon: 85.3240, offset: 5.75, flag: "np", continent: "Asia" },
        { name: "Lisbon", lat: 38.7223, lon: -9.1393, offset: 0, flag: "pt", continent: "Europe" },
        { name: "Guayaquil", lat: -2.1700, lon: -79.9224, offset: -5, flag: "ec", continent: "S America" },
        { name: "Pretoria", lat: -25.7479, lon: 28.2293, offset: 2, flag: "za", continent: "Africa" },
        { name: "Nauru", lat: -0.5228, lon: 166.9315, offset: 12, flag: "nr", continent: "Oceania" },
        { name: "Atlanta", lat: 33.7490, lon: -84.3880, offset: -4, flag: "us", continent: "N America" },
        { name: "Islamabad", lat: 33.6844, lon: 73.0479, offset: 5, flag: "pk", continent: "Asia" },
        { name: "Athens", lat: 37.9838, lon: 23.7275, offset: 2, flag: "gr", continent: "Europe" },
        { name: "Salvador", lat: -12.9714, lon: -38.5014, offset: -3, flag: "br", continent: "S America" },
        { name: "Abidjan", lat: 5.3599, lon: -4.0083, offset: 0, flag: "ci", continent: "Africa" },
        { name: "Tonga", lat: -21.1393, lon: -175.2049, offset: 13, flag: "to", continent: "Oceania" },
        { name: "Philadelphia", lat: 39.9526, lon: -75.1652, offset: -4, flag: "us", continent: "N America" },
        { name: "Karachi", lat: 24.8607, lon: 67.0011, offset: 5, flag: "pk", continent: "Asia" },
        { name: "Dublin", lat: 53.3498, lon: -6.2603, offset: 0, flag: "ie", continent: "Europe" },
        { name: "Recife", lat: -8.0578, lon: -34.8829, offset: -3, flag: "br", continent: "S America" },
        { name: "Kinshasa", lat: -4.4419, lon: 15.2663, offset: 1, flag: "cd", continent: "Africa" },
        { name: "Samoa", lat: -13.7590, lon: -172.1046, offset: 13, flag: "ws", continent: "Oceania" },
        { name: "Detroit", lat: 42.3314, lon: -83.0458, offset: -4, flag: "us", continent: "N America" },
        { name: "Lahore", lat: 31.5497, lon: 74.3436, offset: 5, flag: "pk", continent: "Asia" },
        { name: "Helsinki", lat: 60.1699, lon: 24.9384, offset: 2, flag: "fi", continent: "Europe" },
        { name: "Fortaleza", lat: -3.7172, lon: -38.5434, offset: -3, flag: "br", continent: "S America" },
        { name: "Bamako", lat: 12.6392, lon: -8.0029, offset: 0, flag: "ml", continent: "Africa" },
        { name: "Vanuatu", lat: -17.7333, lon: 168.3167, offset: 11, flag: "vu", continent: "Oceania" },
        { name: "San Diego", lat: 32.7157, lon: -117.1611, offset: -7, flag: "us", continent: "N America" },
        { name: "Chennai", lat: 13.0827, lon: 80.2707, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Brussels", lat: 50.8503, lon: 4.3517, offset: 1, flag: "be", continent: "Europe" },
        { name: "Manaus", lat: -3.1190, lon: -60.0217, offset: -4, flag: "br", continent: "S America" },
        { name: "Dakar", lat: 14.6928, lon: -17.4467, offset: 0, flag: "sn", continent: "Africa" },
        { name: "Solomon Islands", lat: -9.4280, lon: 159.9729, offset: 11, flag: "sb", continent: "Oceania" },
        { name: "Portland", lat: 45.5152, lon: -122.6784, offset: -7, flag: "us", continent: "N America" },
        { name: "Hyderabad", lat: 17.3850, lon: 78.4867, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Oslo", lat: 59.9139, lon: 10.7522, offset: 1, flag: "no", continent: "Europe" },
        { name: "Porto Alegre", lat: -30.0346, lon: -51.2177, offset: -3, flag: "br", continent: "S America" },
        { name: "Harare", lat: -17.8252, lon: 31.0335, offset: 2, flag: "zw", continent: "Africa" },
        { name: "Kiribati", lat: 1.8709, lon: -157.3626, offset: 14, flag: "ki", continent: "Oceania" },
        { name: "Austin", lat: 30.2672, lon: -97.7431, offset: -5, flag: "us", continent: "N America" },
        { name: "Delhi", lat: 28.7041, lon: 77.1025, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Bucharest", lat: 44.4268, lon: 26.1025, offset: 2, flag: "ro", continent: "Europe" },
        { name: "Belo Horizonte", lat: -19.9167, lon: -43.9345, offset: -3, flag: "br", continent: "S America" },
        { name: "Maputo", lat: -25.9655, lon: 32.5832, offset: 2, flag: "mz", continent: "Africa" },
        { name: "Tuvalu", lat: -8.5200, lon: 179.1981, offset: 12, flag: "tv", continent: "Oceania" },
        { name: "San Antonio", lat: 29.4241, lon: -98.4936, offset: -5, flag: "us", continent: "N America" },
        { name: "Kolkata", lat: 22.5726, lon: 88.3639, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Sofia", lat: 42.6977, lon: 23.3219, offset: 2, flag: "bg", continent: "Europe" },
        { name: "Curitiba", lat: -25.4290, lon: -49.2671, offset: -3, flag: "br", continent: "S America" },
        { name: "Lusaka", lat: -15.3875, lon: 28.3228, offset: 2, flag: "zm", continent: "Africa" },
        { name: "Palau", lat: 7.5000, lon: 134.5000, offset: 9, flag: "pw", continent: "Oceania" },
        { name: "Ottawa", lat: 45.4215, lon: -75.6972, offset: -4, flag: "ca", continent: "N America" },
        { name: "Bangalore", lat: 12.9716, lon: 77.5946, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Belgrade", lat: 44.7866, lon: 20.4489, offset: 1, flag: "rs", continent: "Europe" },
        { name: "Goiania", lat: -16.6869, lon: -49.2648, offset: -3, flag: "br", continent: "S America" },
        { name: "Antananarivo", lat: -18.8792, lon: 47.5079, offset: 3, flag: "mg", continent: "Africa" },
        { name: "Marshall Islands", lat: 7.1167, lon: 171.0667, offset: 12, flag: "mh", continent: "Oceania" },
        { name: "Calgary", lat: 51.0447, lon: -114.0719, offset: -6, flag: "ca", continent: "N America" },
        { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Zagreb", lat: 45.8150, lon: 15.9819, offset: 1, flag: "hr", continent: "Europe" },
        { name: "Campinas", lat: -22.9099, lon: -47.0626, offset: -3, flag: "br", continent: "S America" },
        { name: "Kigali", lat: -1.9441, lon: 30.0619, offset: 2, flag: "rw", continent: "Africa" },
        { name: "Micronesia", lat: 6.9167, lon: 158.1833, offset: 11, flag: "fm", continent: "Oceania" },
        { name: "Edmonton", lat: 53.5461, lon: -113.4938, offset: -6, flag: "ca", continent: "N America" },
        { name: "Pune", lat: 18.5204, lon: 73.8567, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Bratislava", lat: 48.1486, lon: 17.1077, offset: 1, flag: "sk", continent: "Europe" },
        { name: "Belem", lat: -1.4558, lon: -48.4902, offset: -3, flag: "br", continent: "S America" },
        { name: "Mogadishu", lat: 2.0469, lon: 45.3182, offset: 3, flag: "so", continent: "Africa" },
        { name: "New Caledonia", lat: -22.2558, lon: 166.4505, offset: 11, flag: "nc", continent: "Oceania" },
        { name: "Winnipeg", lat: 49.8951, lon: -97.1384, offset: -5, flag: "ca", continent: "N America" },
        { name: "Surat", lat: 21.1702, lon: 72.8311, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Ljubljana", lat: 46.0569, lon: 14.5058, offset: 1, flag: "si", continent: "Europe" },
        { name: "Natal", lat: -5.7793, lon: -35.2009, offset: -3, flag: "br", continent: "S America" },
        { name: "Juba", lat: 4.8594, lon: 31.5713, offset: 2, flag: "ss", continent: "Africa" },
        { name: "Tahiti", lat: -17.6509, lon: -149.4260, offset: -10, flag: "pf", continent: "Oceania" },
        { name: "Halifax", lat: 44.6488, lon: -63.5752, offset: -3, flag: "ca", continent: "N America" },
        { name: "Jaipur", lat: 26.9124, lon: 75.7873, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Riga", lat: 56.9496, lon: 24.1052, offset: 2, flag: "lv", continent: "Europe" },
        { name: "Joao Pessoa", lat: -7.1195, lon: -34.8450, offset: -3, flag: "br", continent: "S America" },
        { name: "Niamey", lat: 13.5116, lon: 2.1254, offset: 1, flag: "ne", continent: "Africa" },
        { name: "Guam", lat: 13.4443, lon: 144.7937, offset: 10, flag: "gu", continent: "Oceania" },
        { name: "St. John's", lat: 47.5615, lon: -52.7126, offset: -2.5, flag: "ca", continent: "N America" },
        { name: "Lucknow", lat: 26.8467, lon: 80.9462, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tallinn", lat: 59.4370, lon: 24.7536, offset: 2, flag: "ee", continent: "Europe" },
        { name: "Aracaju", lat: -10.9472, lon: -37.0731, offset: -3, flag: "br", continent: "S America" },
        { name: "Ouagadougou", lat: 12.3714, lon: -1.5197, offset: 0, flag: "bf", continent: "Africa" },
        { name: "Hawaii", lat: 21.3069, lon: -157.8583, offset: -10, flag: "us", continent: "Oceania" },
        { name: "Quebec City", lat: 46.8139, lon: -71.2080, offset: -4, flag: "ca", continent: "N America" },
        { name: "Kanpur", lat: 26.4499, lon: 80.3319, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Vilnius", lat: 54.6872, lon: 25.2797, offset: 2, flag: "lt", continent: "Europe" },
        { name: "Teresina", lat: -5.0892, lon: -42.8016, offset: -3, flag: "br", continent: "S America" },
        { name: "Brazzaville", lat: -4.2634, lon: 15.2429, offset: 1, flag: "cg", continent: "Africa" },
        { name: "Cook Islands", lat: -21.2367, lon: -159.7777, offset: -10, flag: "ck", continent: "Oceania" },
        { name: "Regina", lat: 50.4452, lon: -104.6189, offset: -6, flag: "ca", continent: "N America" },
        { name: "Nagpur", lat: 21.1458, lon: 79.0882, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Skopje", lat: 41.9973, lon: 21.4280, offset: 1, flag: "mk", continent: "Europe" },
        { name: "Maceio", lat: -9.6498, lon: -35.7089, offset: -3, flag: "br", continent: "S America" },
        { name: "Libreville", lat: 0.4162, lon: 9.4673, offset: 1, flag: "ga", continent: "Africa" },
        { name: "Niue", lat: -19.0554, lon: -169.9187, offset: -11, flag: "nu", continent: "Oceania" },
        { name: "Saskatoon", lat: 52.1332, lon: -106.6700, offset: -6, flag: "ca", continent: "N America" },
        { name: "Indore", lat: 22.7196, lon: 75.8577, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Sarajevo", lat: 43.8563, lon: 18.4131, offset: 1, flag: "ba", continent: "Europe" },
        { name: "Sao Luis", lat: -2.5391, lon: -44.2829, offset: -3, flag: "br", continent: "S America" },
        { name: "Yaounde", lat: 3.8480, lon: 11.5021, offset: 1, flag: "cm", continent: "Africa" },
        { name: "Pitcairn Islands", lat: -25.0667, lon: -130.1000, offset: -8, flag: "pn", continent: "Oceania" },
        { name: "Victoria", lat: 48.4284, lon: -123.3656, offset: -7, flag: "ca", continent: "N America" },
        { name: "Thane", lat: 19.2183, lon: 72.9781, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tirana", lat: 41.3275, lon: 19.8187, offset: 1, flag: "al", continent: "Europe" },
        { name: "Campo Grande", lat: -20.4697, lon: -54.6201, offset: -4, flag: "br", continent: "S America" },
        { name: "Ndjamena", lat: 12.1348, lon: 15.0557, offset: 1, flag: "td", continent: "Africa" },
        { name: "Norfolk Island", lat: -29.0408, lon: 167.9547, offset: 11, flag: "nf", continent: "Oceania" },
        { name: "Anchorage", lat: 61.2181, lon: -149.9003, offset: -8, flag: "us", continent: "N America" },
        { name: "Bhopal", lat: 23.2599, lon: 77.4126, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Chisinau", lat: 47.0105, lon: 28.8638, offset: 2, flag: "md", continent: "Europe" },
        { name: "Cuiaba", lat: -15.6014, lon: -56.0979, offset: -4, flag: "br", continent: "S America" },
        { name: "Lome", lat: 6.1256, lon: 1.2254, offset: 0, flag: "tg", continent: "Africa" },
        { name: "Tokelau", lat: -9.2000, lon: -171.8333, offset: 13, flag: "tk", continent: "Oceania" },
        { name: "Fairbanks", lat: 64.8378, lon: -147.7164, offset: -8, flag: "us", continent: "N America" },
        { name: "Patna", lat: 25.5941, lon: 85.1376, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Yerevan", lat: 40.1792, lon: 44.4991, offset: 4, flag: "am", continent: "Europe" },
        { name: "Porto Velho", lat: -8.7619, lon: -63.9004, offset: -4, flag: "br", continent: "S America" },
        { name: "Banjul", lat: 13.4549, lon: -16.5790, offset: 0, flag: "gm", continent: "Africa" },
        { name: "Wallis and Futuna", lat: -13.3000, lon: -176.2000, offset: 12, flag: "wf", continent: "Oceania" },
        { name: "Juneau", lat: 58.3019, lon: -134.4197, offset: -8, flag: "us", continent: "N America" },
        { name: "Guwahati", lat: 26.1445, lon: 91.7362, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tbilisi", lat: 41.7151, lon: 44.8271, offset: 4, flag: "ge", continent: "Europe" },
        { name: "Boa Vista", lat: 2.8195, lon: -60.6714, offset: -4, flag: "br", continent: "S America" },
        { name: "Conakry", lat: 9.6412, lon: -13.5784, offset: 0, flag: "gn", continent: "Africa" },
        { name: "American Samoa", lat: -14.2756, lon: -170.7020, offset: -11, flag: "as", continent: "Oceania" },
        { name: "Whitehorse", lat: 60.7212, lon: -135.0568, offset: -7, flag: "ca", continent: "N America" },
        { name: "Ranchi", lat: 23.3441, lon: 85.3096, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Baku", lat: 40.4093, lon: 49.8671, offset: 4, flag: "az", continent: "Europe" },
        { name: "Rio Branco", lat: -9.9740, lon: -67.8076, offset: -5, flag: "br", continent: "S America" },
        { name: "Bissau", lat: 11.8817, lon: -15.6177, offset: 0, flag: "gw", continent: "Africa" },
        { name: "Easter Island", lat: -27.1127, lon: -109.3497, offset: -6, flag: "cl", continent: "Oceania" },
        { name: "Yellowknife", lat: 62.4540, lon: -114.3718, offset: -6, flag: "ca", continent: "N America" },
        { name: "Beijing", lat: 39.9042, lon: 116.4074, offset: 8, flag: "cn", continent: "Asia" },
        { name: "Porto", lat: 41.1579, lon: -8.6291, offset: 0, flag: "pt", continent: "Europe" },
        { name: "Galapagos", lat: -0.9538, lon: -90.9656, offset: -6, flag: "ec", continent: "S America" },
        { name: "Freetown", lat: 8.4657, lon: -13.2317, offset: 0, flag: "sl", continent: "Africa" },
        { name: "Pago Pago", lat: -14.2756, lon: -170.7020, offset: -11, flag: "as", continent: "Oceania" },
        { name: "St. Louis", lat: 38.6270, lon: -90.1994, offset: -5, flag: "us", continent: "N America" },
        { name: "Amman", lat: 31.9539, lon: 35.9106, offset: 3, flag: "jo", continent: "Asia" },
        { name: "Milan", lat: 45.4642, lon: 9.1900, offset: 1, flag: "it", continent: "Europe" },
        { name: "Monrovia", lat: 6.3156, lon: -10.8074, offset: 0, flag: "lr", continent: "Africa" },
        { name: "Rarotonga", lat: -21.2367, lon: -159.7777, offset: -10, flag: "ck", continent: "Oceania" },
        { name: "Kansas City", lat: 39.0997, lon: -94.5786, offset: -5, flag: "us", continent: "N America" },
        { name: "Baghdad", lat: 33.3152, lon: 44.3661, offset: 3, flag: "iq", continent: "Asia" },
        { name: "Barcelona", lat: 41.3851, lon: 2.1734, offset: 1, flag: "es", continent: "Europe" },
        { name: "Nouakchott", lat: 18.0735, lon: -15.9582, offset: 0, flag: "mr", continent: "Africa" },
        { name: "Nuku'alofa", lat: -21.1393, lon: -175.2049, offset: 13, flag: "to", continent: "Oceania" },
        { name: "Minneapolis", lat: 44.9778, lon: -93.2650, offset: -5, flag: "us", continent: "N America" },
        { name: "Riyadh", lat: 24.7136, lon: 46.6753, offset: 3, flag: "sa", continent: "Asia" },
        { name: "Munich", lat: 48.1351, lon: 11.5820, offset: 1, flag: "de", continent: "Europe" },
        { name: "Cape Verde", lat: 15.1111, lon: -23.6167, offset: -1, flag: "cv", continent: "Africa" },
        { name: "Apia", lat: -13.7590, lon: -172.1046, offset: 13, flag: "ws", continent: "Oceania" },
        { name: "Cleveland", lat: 41.4993, lon: -81.6944, offset: -4, flag: "us", continent: "N America" },
        { name: "Dubai", lat: 25.2048, lon: 55.2708, offset: 4, flag: "ae", continent: "Asia" },
        { name: "Florence", lat: 43.7696, lon: 11.2558, offset: 1, flag: "it", continent: "Europe" },
        { name: "Sao Tome", lat: 0.3365, lon: 6.7273, offset: 0, flag: "st", continent: "Africa" },
        { name: "Honiara", lat: -9.4280, lon: 159.9729, offset: 11, flag: "sb", continent: "Oceania" },
        { name: "Tampa", lat: 27.9506, lon: -82.4572, offset: -4, flag: "us", continent: "N America" },
        { name: "Kuwait City", lat: 29.3759, lon: 47.9774, offset: 3, flag: "kw", continent: "Asia" },
        { name: "Venice", lat: 45.4408, lon: 12.3155, offset: 1, flag: "it", continent: "Europe" },
        { name: "Malabo", lat: 3.7504, lon: 8.7817, offset: 1, flag: "gq", continent: "Africa" },
        { name: "Charlotte", lat: 35.2271, lon: -80.8431, offset: -4, flag: "us", continent: "N America" },
        { name: "Doha", lat: 25.2854, lon: 51.5310, offset: 3, flag: "qa", continent: "Asia" },
        { name: "Geneva", lat: 46.2044, lon: 6.1432, offset: 1, flag: "ch", continent: "Europe" },
        { name: "Paramaribo", lat: 5.8520, lon: -55.2038, offset: -3, flag: "sr", continent: "S America" },
        { name: "Windhoek", lat: -22.5597, lon: 17.0832, offset: 2, flag: "na", continent: "Africa" },
        { name: "Las Vegas", lat: 36.1699, lon: -115.1398, offset: -7, flag: "us", continent: "N America" },
        { name: "Muscat", lat: 23.5859, lon: 58.4059, offset: 4, flag: "om", continent: "Asia" },
        { name: "Kyiv", lat: 50.4501, lon: 30.5234, offset: 2, flag: "ua", continent: "Europe" },
        { name: "Georgetown", lat: 6.8013, lon: -58.1551, offset: -4, flag: "gy", continent: "S America" },
        { name: "Porto-Novo", lat: 6.4969, lon: 2.6036, offset: 1, flag: "bj", continent: "Africa" },
        { name: "Nashville", lat: 36.1627, lon: -86.7816, offset: -5, flag: "us", continent: "N America" },
        { name: "Tashkent", lat: 41.2995, lon: 69.2401, offset: 5, flag: "uz", continent: "Asia" },
        { name: "Naples", lat: 40.8518, lon: 14.2681, offset: 1, flag: "it", continent: "Europe" },
        { name: "Cayenne", lat: 4.9224, lon: -52.3135, offset: -3, flag: "gf", continent: "S America" },
        { name: "Maseru", lat: -29.3100, lon: 27.4869, offset: 2, flag: "ls", continent: "Africa" },
        { name: "Orlando", lat: 28.5383, lon: -81.3792, offset: -4, flag: "us", continent: "N America" },
        { name: "Yangon", lat: 16.8409, lon: 96.1735, offset: 6.5, flag: "mm", continent: "Asia" },
        { name: "Hamburg", lat: 53.5511, lon: 9.9937, offset: 1, flag: "de", continent: "Europe" },
        { name: "Valparaiso", lat: -33.0472, lon: -71.6127, offset: -4, flag: "cl", continent: "S America" },
        { name: "Bujumbura", lat: -3.3614, lon: 29.3599, offset: 2, flag: "bi", continent: "Africa" },
        { name: "San Juan", lat: 18.4655, lon: -66.1057, offset: -4, flag: "pr", continent: "N America" },
        { name: "Almaty", lat: 43.2220, lon: 76.8512, offset: 6, flag: "kz", continent: "Asia" },
        { name: "Edinburgh", lat: 55.9533, lon: -3.1883, offset: 0, flag: "gb", continent: "Europe" },
        { name: "Iquitos", lat: -3.7491, lon: -73.2538, offset: -5, flag: "pe", continent: "S America" },
        { name: "Lilongwe", lat: -13.9626, lon: 33.7741, offset: 2, flag: "mw", continent: "Africa" },
        { name: "Saint John's", lat: 17.1274, lon: -61.8468, offset: -4, flag: "ag", continent: "N America" },
        { name: "Kabul", lat: 34.5553, lon: 69.2075, offset: 4.5, flag: "af", continent: "Asia" },
        { name: "Vaduz", lat: 47.1410, lon: 9.5209, offset: 1, flag: "li", continent: "Europe" },
        { name: "Oranjestad", lat: 12.5240, lon: -70.0270, offset: -4, flag: "aw", continent: "N America" },
        { name: "Nassau", lat: 25.0343, lon: -77.3963, offset: -4, flag: "bs", continent: "N America" },
        { name: "Manama", lat: 26.2235, lon: 50.5876, offset: 3, flag: "bh", continent: "Asia" },
        { name: "Minsk", lat: 53.9045, lon: 27.5615, offset: 3, flag: "by", continent: "Europe" },
        { name: "Belmopan", lat: 17.2500, lon: -88.7669, offset: -6, flag: "bz", continent: "N America" },
        { name: "Sucre", lat: -19.0333, lon: -65.2627, offset: -4, flag: "bo", continent: "S America" },
        { name: "Gaborone", lat: -24.6282, lon: 25.9231, offset: 2, flag: "bw", continent: "Africa" },
        { name: "Road Town", lat: 18.4314, lon: -64.6231, offset: -4, flag: "vg", continent: "N America" },
        { name: "Bandar Seri Begawan", lat: 4.9403, lon: 114.9481, offset: 8, flag: "bn", continent: "Asia" },
        { name: "Gitega", lat: -3.4264, lon: 29.9306, offset: 2, flag: "bi", continent: "Africa" },
        { name: "Praia", lat: 14.9331, lon: -23.5133, offset: -1, flag: "cv", continent: "Africa" },
        { name: "George Town", lat: 19.3133, lon: -81.2546, offset: -5, flag: "ky", continent: "N America" },
        { name: "Phnom Penh", lat: 11.5564, lon: 104.9282, offset: 7, flag: "kh", continent: "Asia" },
        { name: "Bangui", lat: 4.3947, lon: 18.5582, offset: 1, flag: "cf", continent: "Africa" },
        { name: "Moroni", lat: -11.7020, lon: 43.2551, offset: 3, flag: "km", continent: "Africa" },
        { name: "San Jose", lat: 9.9281, lon: -84.0907, offset: -6, flag: "cr", continent: "N America" },
        { name: "Yamoussoukro", lat: 6.8276, lon: -5.2893, offset: 0, flag: "ci", continent: "Africa" },
        { name: "Havana", lat: 23.1136, lon: -82.3666, offset: -4, flag: "cu", continent: "N America" },
        { name: "Nicosia", lat: 35.1856, lon: 33.3823, offset: 2, flag: "cy", continent: "Europe" },
        { name: "North Nicosia", lat: 35.1856, lon: 33.3823, offset: 2, flag: "cy", continent: "Europe" },
        { name: "Djibouti", lat: 11.8251, lon: 42.5903, offset: 3, flag: "dj", continent: "Africa" },
        { name: "Roseau", lat: 15.3092, lon: -61.3794, offset: -4, flag: "dm", continent: "N America" },
        { name: "Santo Domingo", lat: 18.4861, lon: -69.9312, offset: -4, flag: "do", continent: "N America" },
        { name: "San Salvador", lat: 13.6929, lon: -89.2182, offset: -6, flag: "sv", continent: "N America" },
        { name: "Asmara", lat: 15.3229, lon: 38.9251, offset: 3, flag: "er", continent: "Africa" },
        { name: "Mbabane", lat: -26.3054, lon: 31.1367, offset: 2, flag: "sz", continent: "Africa" },
        { name: "Stanley", lat: -51.7000, lon: -57.8500, offset: -3, flag: "fk", continent: "S America" },
        { name: "Nuuk", lat: 64.1835, lon: -51.7216, offset: -2, flag: "gl", continent: "N America" },
        { name: "Saint George's", lat: 12.0561, lon: -61.7488, offset: -4, flag: "gd", continent: "N America" },
        { name: "Guatemala City", lat: 14.6349, lon: -90.5069, offset: -6, flag: "gt", continent: "N America" },
        { name: "Reykjavik", lat: 64.1466, lon: -21.9426, offset: 0, flag: "is", continent: "Europe" },
        { name: "New Delhi", lat: 28.7041, lon: 77.1025, offset: 5.5, flag: "in", continent: "Asia" },
        { name: "Tehran", lat: 35.6892, lon: 51.3890, offset: 3.5, flag: "ir", continent: "Asia" },
        { name: "Douglas", lat: 54.1523, lon: -4.4861, offset: 0, flag: "im", continent: "Europe" },
        { name: "Jerusalem", lat: 31.7683, lon: 35.2137, offset: 2, flag: "il", continent: "Asia" },
        { name: "Kingston", lat: 17.9712, lon: -76.7920, offset: -5, flag: "jm", continent: "N America" },
        { name: "Tokyo", lat: 35.6762, lon: 139.6503, offset: 9, flag: "jp", continent: "Asia" },
        { name: "Astana", lat: 51.1694, lon: 71.4491, offset: 6, flag: "kz", continent: "Asia" },
        { name: "Tarawa", lat: 1.4518, lon: 173.0320, offset: 12, flag: "ki", continent: "Oceania" },
        { name: "Bishkek", lat: 42.8746, lon: 74.5698, offset: 6, flag: "kg", continent: "Asia" },
        { name: "Vientiane", lat: 17.9757, lon: 102.6331, offset: 7, flag: "la", continent: "Asia" },
        { name: "Beirut", lat: 33.8938, lon: 35.5018, offset: 2, flag: "lb", continent: "Asia" },
        { name: "Tripoli", lat: 32.8872, lon: 13.1913, offset: 2, flag: "ly", continent: "Africa" },
        { name: "Luxembourg", lat: 49.6116, lon: 6.1319, offset: 1, flag: "lu", continent: "Europe" },
        { name: "Male", lat: 4.1755, lon: 73.5093, offset: 5, flag: "mv", continent: "Asia" },
        { name: "Valletta", lat: 35.8997, lon: 14.5146, offset: 1, flag: "mt", continent: "Europe" },
        { name: "Majuro", lat: 7.0897, lon: 171.3803, offset: 12, flag: "mh", continent: "Oceania" },
        { name: "Port Louis", lat: -20.1640, lon: 57.5012, offset: 4, flag: "mu", continent: "Africa" },
        { name: "Mexico City", lat: 19.4326, lon: -99.1332, offset: -6, flag: "mx", continent: "N America" },
        { name: "Palikir", lat: 6.9248, lon: 158.1611, offset: 11, flag: "fm", continent: "Oceania" },
        { name: "Monaco", lat: 43.7384, lon: 7.4246, offset: 1, flag: "mc", continent: "Europe" },
        { name: "Ulaanbaatar", lat: 47.8864, lon: 106.9057, offset: 8, flag: "mn", continent: "Asia" },
        { name: "Podgorica", lat: 42.4304, lon: 19.2594, offset: 1, flag: "me", continent: "Europe" },
        { name: "Brades", lat: 16.7920, lon: -62.2106, offset: -4, flag: "ms", continent: "N America" },
        { name: "Rabat", lat: 34.0209, lon: -6.8416, offset: 1, flag: "ma", continent: "Africa" },
        { name: "Thimphu", lat: 27.4712, lon: 89.6386, offset: 6, flag: "bt", continent: "Asia" },
        { name: "Bridgetown", lat: 13.0969, lon: -59.6145, offset: -4, flag: "bb", continent: "N America" }
      ];
    
        const continentColors = {
            "N America": "#388E3C",
            "Europe": "#FBC02D",
            "Asia": "#F57C00",
            "S America": "#1976D2",
            "Africa": "#303F9F",
            "Oceania": "#7B1FA2"
        };
    
        let allClocks = [];
        let displayedClocks = 0;
        const clocksPerLoad = 25;
        let customClocks = [];

        // Fetch weather data via Cloudflare Worker
        // Function to toggle fullscreen
        function toggleFullScreen(elem) {
            if (!document.fullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                        alert(`Error attempting to enable full-screen mode: ${err.message}`);
                    });
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        // Function to update fullscreen button icon
        function updateFullscreenButtonIcon(clockElement) {
            const iconElement = clockElement.querySelector('.fullscreen-btn i');

            if (document.fullscreenElement === clockElement) {
                // This clock is now fullscreen
                if (iconElement) {
                    iconElement.classList.remove('fa-expand');
                    iconElement.classList.add('fa-compress');
                    iconElement.parentElement.title = "Exit Fullscreen";
                }
                clockElement.classList.add('clock-fullscreen-active'); // Add active class
            } else {
                // This clock is NOT fullscreen (or nothing is fullscreen)
                if (iconElement) {
                    iconElement.classList.remove('fa-compress');
                    iconElement.classList.add('fa-expand');
                    iconElement.parentElement.title = "Toggle Fullscreen";
                }
                clockElement.classList.remove('clock-fullscreen-active'); // Remove active class
            }
        }

        async function fetchWeather(lat, lon, city) {
            const workerUrl = `https://weather-proxy.jsk0109.workers.dev/?lat=${lat}&lon=${lon}`;
            try {
                const response = await fetch(workerUrl); // Removed redundant error handling already present below
                if (!response.ok) throw new Error(`Weather worker request failed: ${response.status} ${response.statusText}`);
                const data = await response.json();
                // The worker returns: temperature_2m, relative_humidity_2m, weather_code
                const weather = {
                    temp: data.temperature_2m,
                    humidity: data.relative_humidity_2m,
                    code: data.weather_code,
                };
                return weather;
            } catch (error) {
                console.error(`Failed to fetch weather via Worker for ${city}:`, error);
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
                container.appendChild(removeBtn); // Append remove button first

                // Add fullscreen button for custom clocks
                const fullscreenBtn = document.createElement("button");
                fullscreenBtn.className = "fullscreen-btn";
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; // Font Awesome icon
                fullscreenBtn.setAttribute("aria-label", `Toggle fullscreen for ${city.name}`);
                fullscreenBtn.title = "Toggle Fullscreen";

                fullscreenBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevent clock click event (for city info)
                    toggleFullScreen(container);
                });
                container.appendChild(removeBtn);
                container.appendChild(fullscreenBtn); // Append fullscreen button
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
                weatherInfo.innerHTML = `Weather: ${getWeatherIcon(weather.code)} <span class="temp">${weather.temp !== "N/A" ? weather.temp + "°C" : "N/A"}</span>, Humidity: <span class="humidity">${weather.humidity !== "N/A" ? weather.humidity + "%" : "N/A"}</span>`;
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
            setInterval(updateWeather, 3 * 60 * 60 * 1000); // 3시간 간격으로 날씨 업데이트 (Worker 캐시와 동기화)
    
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
            chunk = chunk.slice(0, 25);
    
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
    
        // Save custom clocks to localStorage (중복 정의 제거)
        function saveCustomClocks() {
            const clockNames = customClocks.map(city => city.name);
            localStorage.setItem('customClocks', JSON.stringify(clockNames));
            console.log('Saved to localStorage:', clockNames);
        }
    
        // Load custom clocks from localStorage (중복 정의 제거)
        function loadCustomClocks() {
            const saved = localStorage.getItem('customClocks');
            console.log('Raw localStorage data:', saved);
            if (saved) {
                try {
                    const cityNames = JSON.parse(saved);
                    console.log('Parsed city names:', cityNames);
                    const loadedClocks = cityNames
                        .map(name => {
                            const city = cities.find(c => c.name.toLowerCase() === name.toLowerCase());
                            if (!city) console.warn(`City not found in cities array: ${name}`);
                            return city;
                        })
                        .filter(city => city);
                    console.log('Loaded clocks:', loadedClocks);
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
                const defaultCities = ["London"];
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
                        removeBtn.addEventListener("click", (e) => {
                            e.stopPropagation();
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
                // const cityInfoDiv = document.getElementById('city-info'); // 더 이상 사용하지 않음

                if (!cityName) {
                    console.error('City name not found in dataset for clicked clock element.');
                    return;
                }

                // 새로운 city-info.html 페이지로 이동하면서 도시 이름을 파라미터로 전달
                const cityInfoUrl = `city-info.html?city=${encodeURIComponent(cityName)}`;
                console.log(`Redirecting to: ${cityInfoUrl}`);
                window.location.href = cityInfoUrl;
            };
    
            bindClockEvents();
            const observer = new MutationObserver(bindClockEvents);
            observer.observe(document.getElementById('custom-clocks-section'), { childList: true, subtree: true });
        }
    
        function addCustomClock(city) {
            console.log(`Adding custom clock: ${city.name}`);
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
                    removeBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
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
                                    suggestions.style.display = "none";
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
                            console.log('Fetching:', `/data/json/${file}`);
                            const response = await fetch(`/data/json/${file}`);
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

        // Listen for fullscreen changes to update button icons
        document.addEventListener('fullscreenchange', () => {
            const customClockContainers = document.querySelectorAll('#custom-clocks-container .clock-container');
            customClockContainers.forEach(clockElement => {
                // Call for all custom clocks to ensure class is correctly added/removed
                updateFullscreenButtonIcon(clockElement);
            });
            // If you later add this to main clocks:
            // const mainClockContainers = document.querySelectorAll('#clocks-container .clock-container');
            // mainClockContainers.forEach(clockElement => {
            //     if (clockElement.querySelector('.fullscreen-btn')) {
            //         updateFullscreenButtonIcon(clockElement);
            //     }
            // });
        });
        ['webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(eventType => 
            document.addEventListener(eventType, () => document.dispatchEvent(new Event('fullscreenchange')), false));
    });
