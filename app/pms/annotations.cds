using PatientService as service from '../../srv/patient-service';

annotate service.Patient with @odata.draft.enabled;

annotate service.Patient {
    Gender @Common: {ValueListWithFixedValues};
}

annotate service.Patient with @(
    Common.SemanticKey: [ID],
    UI                : {
        Identification         : [{Value: Name}],
        HeaderInfo             : {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : 'Patient',
            TypeNamePlural: 'Patients',
            Title         : {
                $Type: 'UI.DataField',
                Value: Name,
            },
            Description   : {
                $Type: 'UI.DataField',
                Value: Contact,
            }
        },
        PresentationVariant    : {
            Text          : 'Default',
            Visualizations: ['@UI.LineItem'],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : ID,
                Descending: false
            }]
        },
        SelectionFields        : [
            ID,
            Name,
            Gender_code
        ],
        LineItem               : [
            {
                Value            : ID,
                ![@UI.Importance]: #High
            },
            {Value: Name},
            {Value: Contact},
            {Value: Gender_code}
        ],
        Facets                 : [
            {
                $Type : 'UI.CollectionFacet',
                ID    : 'Patient',
                Facets: [{
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'PatientData',
                    Target: '@UI.FieldGroup#PatientData'
                }]
            },
            {
                $Type : 'UI.ReferenceFacet',
                Target: 'Visit/@UI.PresentationVariant',
                Label : '{i18n>Visits}'
            }
        ],
        FieldGroup #PatientData: {
            $Type: 'UI.FieldGroupType',
            Data : [
                {
                    Value: ID,
                    Label: 'Patient Id'
                },
                {
                    Value: Name,
                    Label: 'Name'
                },
                {
                    Value: Contact,
                    Label: 'Contact'
                },
                {
                    Value: Gender_code,
                    Label: 'Gender'
                }
            ],

        },
    }
);

annotate service.Visit with @(
    UI.Identification       : [{Value: VisitDate}],
    UI.HeaderInfo           : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Visit',
        TypeNamePlural: 'Visits',
        Title         : {
            $Type: 'UI.DataField',
            Value: VisitDate,
        }
    },
    UI.PresentationVariant  : {
        Visualizations: ['@UI.LineItem'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : VisitID,
            Descending: false
        }]
    },
    UI.SelectionFields      : [],
    UI.LineItem             : [
        {
            Value: VisitID,
            Label: 'Id'
        },
        {
            Value: VisitDate,
            Label: 'Visitation Date'
        }
    ],
    UI.Facets               : [{
        $Type : 'UI.CollectionFacet',
        ID    : 'Visits',
        Facets: [
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'VisitData',
                Target: '@UI.FieldGroup#VisitData'
            },
            {
                $Type : 'UI.ReferenceFacet',
                Target: 'Symptoms/@UI.PresentationVariant',
                Label : '{i18n>Symptoms}'
            }
        ]
    }],
    UI.FieldGroup #VisitData: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                Value: VisitID,
                Label: 'Visit Id'
            },
            {
                Value: VisitDate,
                Label: 'Visitation Date'
            }
        ],

    },
);

annotate service.Symptoms with @(

    UI.PresentationVariant: {
        Visualizations: ['@UI.LineItem'],
        SortOrder     : [{
            $Type     : 'Common.SortOrderType',
            Property  : Symptom,
            Descending: false
        }]
    },
    UI.LineItem           : [
        {
            Value: Symptom,
            Label: 'Symptom'
        },
        {
            Value: Details,
            Label: 'Details'
        }
    ]
);
