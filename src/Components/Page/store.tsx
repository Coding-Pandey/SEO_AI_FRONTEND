export const location_options =[
    {"id": 2840, "country": "United States"},
    {"id": 2826, "country": "United Kingdom"},
    {"id": 2616, "country": "Poland"},
    {"id": 2276, "country": "Germany"},
    {"id": 2250, "country": "France"},
    {"id": 2380, "country": "Italy"},
    {"id": 2724, "country": "Spain"},
    {"id": 2124, "country": "Canada"},
    {"id": 2036, "country": "Australia"},
    {"id": 2356, "country": "India"},
    {"id": 2392, "country": "Japan"},
    {"id": 2484, "country": "China"},
    {"id": 2076, "country": "Brazil"},
    {"id": 2156, "country": "Mexico"},
    {"id": 2252, "country": "Russia"},
    {"id": 2190, "country": "South Africa"}
]

export const language_options = [
    {
        "ID": 1000,
        "Name": "English"
    },
    {
        "ID": 1001,
        "Name": "German"
    },
    {
        "ID": 1002,
        "Name": "French"
    },
    {
        "ID": 1003,
        "Name": "Spanish"
    },
    {
        "ID": 1004,
        "Name": "Italian"
    },
    {
        "ID": 1005,
        "Name": "Japanese"
    },
    {
        "ID": 1009,
        "Name": "Danish"
    },
    {
        "ID": 1010,
        "Name": "Dutch"
    },
    {
        "ID": 1011,
        "Name": "Finnish"
    },
    {
        "ID": 1012,
        "Name": "Korean"
    },
    {
        "ID": 1013,
        "Name": "Norwegian"
    },
    {
        "ID": 1014,
        "Name": "Portuguese"
    },
    {
        "ID": 1015,
        "Name": "Swedish"
    },
    {
        "ID": 1017,
        "Name": "Chinese (simplified)"
    },
    {
        "ID": 1018,
        "Name": "Chinese (traditional)"
    },
    {
        "ID": 1019,
        "Name": "Arabic"
    },
    {
        "ID": 1020,
        "Name": "Bulgarian"
    },
    {
        "ID": 1021,
        "Name": "Czech"
    },
    {
        "ID": 1022,
        "Name": "Greek"
    },
    {
        "ID": 1023,
        "Name": "Hindi"
    },
    {
        "ID": 1024,
        "Name": "Hungarian"
    },
    {
        "ID": 1025,
        "Name": "Indonesian"
    },
    {
        "ID": 1026,
        "Name": "Icelandic"
    },
    {
        "ID": 1027,
        "Name": "Hebrew"
    },
    {
        "ID": 1028,
        "Name": "Latvian"
    },
    {
        "ID": 1029,
        "Name": "Lithuanian"
    },
    {
        "ID": 1030,
        "Name": "Polish"
    },
    {
        "ID": 1031,
        "Name": "Russian"
    },
    {
        "ID": 1032,
        "Name": "Romanian"
    },
    {
        "ID": 1033,
        "Name": "Slovak"
    },
    {
        "ID": 1034,
        "Name": "Slovenian"
    },
    {
        "ID": 1035,
        "Name": "Serbian"
    },
    {
        "ID": 1036,
        "Name": "Ukrainian"
    },
    {
        "ID": 1037,
        "Name": "Turkish"
    },
    {
        "ID": 1038,
        "Name": "Catalan"
    },
    {
        "ID": 1039,
        "Name": "Croatian"
    },
    {
        "ID": 1040,
        "Name": "Vietnamese"
    },
    {
        "ID": 1041,
        "Name": "Urdu"
    },
    {
        "ID": 1042,
        "Name": "Filipino"
    },
    {
        "ID": 1043,
        "Name": "Estonian"
    },
    {
        "ID": 1044,
        "Name": "Thai"
    },
    {
        "ID": 1056,
        "Name": "Bengali"
    },
    {
        "ID": 1064,
        "Name": "Persian"
    },
    {
        "ID": 1072,
        "Name": "Gujarati"
    },
    {
        "ID": 1086,
        "Name": "Kannada"
    },
    {
        "ID": 1098,
        "Name": "Malayalam"
    },
    {
        "ID": 1101,
        "Name": "Marathi"
    },
    {
        "ID": 1102,
        "Name": "Malay"
    },
    {
        "ID": 1110,
        "Name": "Punjabi"
    },
    {
        "ID": 1130,
        "Name": "Tamil"
    },
    {
        "ID": 1131,
        "Name": "Telugu"
    }
]

export  const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
 