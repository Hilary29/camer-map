

export const regions = [
    "Adamaoua",
    "Centre",
    "Est",
    "Extrême-Nord",
    "Littoral",
    "Nord",
    "Nord-Ouest",
    "Ouest",
    "Sud",
    "Sud-Ouest",
  ];
  
  export  const departments: Record<string, string[]> = {
    Adamaoua: ["Djérem", "Faro-et-Déo", "Mbéré", "Mayo-Banyo", "Vina"],
    Centre: [
      "Mfoundi",
      "Haute-Sanaga",
      "Lekié",
      "Mbam-et-Inoubou",
      "Mbam-et-Kim",
      "Nyong-et-Kellé",
      "Nyong-et-Mfoumou",
      "Nyong-et-So’o",
    ],
    Est: ["Boumba-et-Ngoko", "Haut-Nyong", "Kadey", "Lom-et-Djérem"],
    "Extrême-Nord": [
      "Diamaré",
      "Logone-et-Chari",
      "Mayo-Danay",
      "Mayo-Kani",
      "Mayo-Sava",
      "Mayo-Tsanaga",
    ],
    Littoral: ["Moungo", "Nkam", "Sanaga-Maritime", "Wouri"],
    Nord: ["Bénoué", "Faro", "Mayo-Louti", "Mayo-Rey"],
    "Nord-Ouest": [
      "Boyo",
      "Bui",
      "Donga-Mantung",
      "Menchum",
      "Mezam",
      "Momo",
      "Ngo-Ketunjia",
    ],
    Ouest: [
      "Bamboutos",
      "Hauts-Plateaux",
      "Koung-Khi",
      "Menoua",
      "Mifi",
      "Nde",
      "Noun",
    ],
    Sud: ["Dja-et-Lobo", "Mvila", "Océan", "Vallée-du-Ntem"],
    "Sud-Ouest": [
      "Fako",
      "Koupé-Manengouba",
      "Lebialem",
      "Manyu",
      "Meme",
      "Ndian",
    ],
  };
  
  export  const communes: Record<string, Record<string, string[]>> = {
    Adamaoua: {
        Djérem: ["Ngaoundal", "Tibati"],
        "Faro-et-Déo": ["Galim-Tignère", "Kontcha", "Mayo-Baléo", "Tignère"],
        "Mayo-Banyo": ["Bankim", "Banyo", "Mayo-Darlé"],
        Mbéré: ["Dir", "Djohong", "Meiganga", "Ngaoui"],
        Vina: [
          "Belel",
          "Ngaoundéré I",
          "Ngaoundéré II",
          "Ngaoundéré III",
          "Nyambaka",
          "Martap",
          "Mbe",
          "Ngan-Ha",
        ],
      },
    Centre: {
        "Haute-Sanaga": [
          "Bibey",
          "Lembe-Yezoum",
          "Mbandjock",
          "Minta",
          "Nanga-Eboko",
          "Nkoteng",
          "Nsem",
        ],
        Lekié: [
          "Batchenga",
          "Ebebda",
          "Elig-Mfomo",
          "Evodoula",
          "Lobo",
          "Monatélé",
          "Obala",
          "Okola",
          "Sa'a",
        ],
        "Mbam-et-Inoubou": [
          "Bafia",
          "Bokito",
          "Deuk",
          "Kiiki",
          "Kon-Yambetta",
          "Makénéné",
          "Ndikiniméki",
          "Nitoukou",
          "Ombessa",
        ],
        "Mbam-et-Kim": [
          "Mbangassina",
          "Ngambè-Tikar",
          "Ngoro",
          "Ntui",
          "Yoko",
        ],
        "Méfou-et-Afamba": [
          "Afanloum",
          "Awaé",
          "Edzendouan",
          "Esse",
          "Mfou",
          "Nkolafamba",
          "Olanguina",
          "Soa",
        ],
        "Méfou-et-Akono": ["Akono", "Bikok", "Mbankomo", "Ngoumou"],
        Mfoundi: [
          "Yaoundé I",
          "Yaoundé II",
          "Yaoundé III",
          "Yaoundé VI",
          "Yaoundé V",
          "Yaoundé VI",
          "Yaoundé VII",
        ],
        "Nyong-et-Kéllé": [
          "Biyouha",
          "Bondjock",
          "Bot-Makak",
          "Dibang",
          "Éséka",
          "Makak",
          "Matomb",
          "Messondo",
          "Ngog-Mapubi",
          "Nguibassal",
        ],
        "Nyong-et-Mfoumou": [
          "Akonolinga",
          "Ayos",
          "Endom",
          "Kobdombo",
          "Mengang",
        ],
        "Nyong-et-So’o": [
          "Akoeman",
          "Dzeng",
          "Mbalmayo",
          "Mengueme",
          "Ngomedzap",
          "Nkolmetet",
        ],
    },
    Est: {
        "Boumba-et-Ngoko": ["Gari-Gombo", "Moloundou", "Salapoumbé", "Yokadouma"],
        "Haut-Nyong": [
          "Abong-Mbang",
          "Angossas",
          "Atok",
          "Dimako",
          "Doumaintang",
          "Doumé",
          "Lomié",
          "Mboma",
          "Messamena",
          "Messok",
          "Mindourou",
          "Ngoyla",
          "Nguelemendouka",
          "Somalomo",
        ],
        Kadey: [
          "Batouri",
          "Kentzou",
          "Kette",
          "Mbang",
          "Ndelele",
          "Nguelebok",
          "Ouli",
        ],
        "Lom-et-Djérem": [
          "Bélabo",
          "Bertoua Ier",
          "Bertoua IIe",
          "Bétaré-Oya",
          "Diang",
          "Garoua-Boulaï",
          "Mandjou",
          "Ngoura",
        ],
    },
    "Extrême-Nord": {
        Diamaré: ["Bogo", "Dargala", "Gazawa", "Maroua Ier", "Maroua IIe", "Maroua IIIe", "Meri", "Ndoukoula", "Petté"],
        "Logone-et-Chari": ["Blangoua", "Darak", "Fotokol", "Goulfey", "Hile-Alifa", "Kousseri", "Logone-Birni", "Makary", "Waza", "Zina"],
        "Mayo-Danay": ["Datcheka", "Gobo", "Guémé", "Guéré", "Kai-Kai", "Kalfou", "Kar-Hay", "Maga", "Tchati-Bali", "Wina", "Yagoua"],
        "Mayo-Kani": ["Dziguilao", "Guidiguis", "Kaélé", "Mindif", "Moulvoudaye", "Moutourwa", "Touloum"],
        "Mayo-Sava": ["Kolofata", "Mora", "Tokombéré"],
        "Mayo-Tsanaga": ["Bourha", "Hina", "Koza", "Mogodé", "Mokolo", "Mozogo", "Soulédé-Roua"],
    },
    Littoral: {
        Moungo: [
          "Bonaléa",
          "Baré-Bakem",
          "Dibombari",
          "Loum",
          "Manjo",
          "Mbanga",
          "Melong",
          "Mombo",
          "Njombé-Penja",
          "Nkongsamba Ier",
          "Nkongsamba IIe",
          "Nkongsamba IIIe",
          "Eboné",
        ],
        Nkam: [
          "Nkondjock",
          "Nord-Makombé",
          "Yabassi",
          "Yingui",
        ],
        "Sanaga-Maritime": [
          "Dibamba",
          "Dizangué",
          "Édéa Ier",
          "Édéa IIe",
          "Massock-Songloulou",
          "Mouanko",
          "Ndom",
          "Ngambe",
          "Ngwei",
          "Nyanon",
          "Pouma",
        ],
        Wouri: [
          "Douala I",
          "Douala II",
          "Douala III",
          "Douala IV",
          "Douala V",
          "Douala VI",
        ],
      },
    Nord: {
        Bénoué: ["Barndaké", "Baschéo", "Bibemi", "Dembo", "Garoua Ier", "Garoua IIe", "Garoua IIIe", "Gashiga", "Lagdo", "Ngong", "Pitoa", "Touroua"],
        Faro: ["Beka", "Poli"],
        "Mayo-Louti": ["Figuil", "Guider", "Mayo-Oulo"],
        "Mayo-Rey": ["Madingring", "Rey-Bouba", "Tcholliré", "Touboro"],
    },
    "Nord-Ouest": {
        Boyo: ["Belo", "Fonfuka", "Fundong", "Njinikom"],
        Bui: ["Elak-Oku", "Jakiri", "Kumbo", "Mbiame", "Nkum", "Nkor"],
        "Donga-Mantung": ["Ako", "Misaje", "Ndu", "Nkambé", "Nwa"],
        Menchum: ["Benakuma", "Furu-Awa", "Wum", "Zhoa"],
        Mezam: ["Bafut", "Bali", "Bamenda Ier", "Bamenda IIe", "Bamenda IIIe", "Santa", "Tubah"],
        Momo: ["Andek", "Batibo", "Mbengwi", "Njikwa", "Widikum-Boffe"],
        "Ngo-Ketunjia": ["Babessi", "Balikumbat", "Ndop"]
    },
    Ouest: {
        Bamboutos: ["Babadjou", "Batcham", "Galim", "Mbouda"],
        "Haut-Nkam": ["Bafang", "Bakou", "Bana", "Bandja", "Banka", "Banwa", "Kekem"],
        "Hauts-Plateaux": ["Baham", "Bamendjou", "Bangou", "Batié"],
        "Koung-Khi": ["Bayangam", "Demdeng", "Pète-Bandjoun"],
        Menoua: ["Dschang", "Fokoué", "Fongo-Tongo", "Nkong-Zem", "Penka-Michel", "Santchou"],
        Mifi: ["Bafoussam Ier", "Bafoussam IIe", "Bafoussam IIIe"],
        Ndé: ["Bangangté", "Bassamba", "Bazou", "Tonga"],
        Noun: ["Bangourain", "Foumban", "Foumbot", "Kouoptamo", "Koutaba", "Magba", "Malentouen", "Massangam", "Njimom"]
      
    },
    Sud: {
        "Dja-et-Lobo": ["Bengbis", "Djoum", "Meyomessala", "Meyomessi", "Mintom", "Oveng", "Sangmélima", "Zoétélé"],
        Mvila: ["Biwong-Bane", "Biwong-Bulu", "Ebolowa Ier", "Ebolowa IIe", "Efoulan", "Mengong", "Mvangan", "Ngoulemakong"],
        Océan: ["Akom II", "Bipindi", "Campo", "Kribi Ier", "Kribi IIe", "Lokoundjé", "Lolodorf", "Mvengue", "Niété"],
        "Vallée-du-Ntem": ["Ambam", "Kyé-Ossi", "Ma'an", "Olamze"]
    },
    "Sud-Ouest": {
        Fako: ["Buéa", "Limbé Ier", "Limbé IIe", "Limbé IIIe", "Muyuka", "Tiko", "West Coast"],
        "Koupé-Manengouba": ["Bangem", "Nguti", "Tombel"],
        Lebialem: ["Alou", "Menji", "Wabane"],
        Manyu: ["Akwaya", "Eyumodjock", "Mamfé", "Tinto"],
        Meme: ["Konye", "Kumba Ier", "Kumba IIe", "Kumba IIIe", "Mbonge"],
        Ndian: ["Bamusso", "Dikome-Balue", "Ekondo-Titi", "Idabato", "Isanguele", "Kombo-Abedimo", "Kombo-Itindi", "Mundemba", "Toko"]      
    },
  };
  