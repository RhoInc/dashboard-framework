const visits = [
    "Screening",
    "Visit 1",
    "Visit 2",
    "Visit 3",
    "Visit 4",
    "Visit 5",
    "Visit 6",
    "End of Study"
];
const medicalSignsSettings = {
    "x": {
        "column": "VISIT",
        "type": "ordinal",
        "behavior": "raw",
        "label": "",
        "order": visits,
        "domain": visits
    },
    "y": {
        "column": "STRESN",
        "type": "linear",
        "label": "Result",
        "behavior": "flex",
        "format": "0.2f",
    },
    "marks": [
        {
            "per": [
                "USUBJID",
                "TEST"
            ],
            "type": "line",
            "attributes": {
                "stroke": "black",
                "stroke-width": 0.5,
                "stroke-opacity": 0.75
            },
            "tooltip": "[USUBJID]",
            "values": {
                'VISIT': visits
            }
        },
        {
            "per": [
                "USUBJID",
                "TEST",
                "VISIT",
                "STRESN"
            ],
            "type": "circle",
            "attributes": {
                "stroke": "#1f78b4",
                "stroke-width": 0.5,
                "stroke-opacity": 1,
                "radius": 3,
                "fill": "#1f78b4",
                "fill-opacity": 0.2
            },
            "tooltip": "ID = [USUBJID]\n[TEST] = [STRESN] [STRESU]\nVISIT = [VISIT]\nDate = [DT]",
            "radius": 3,
            "values": {
                'VISIT': visits
            }
        }
    ]
};
