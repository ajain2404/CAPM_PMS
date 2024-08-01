sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/ari/pms/ui/pms/test/integration/FirstJourney',
		'com/ari/pms/ui/pms/test/integration/pages/PatientList',
		'com/ari/pms/ui/pms/test/integration/pages/PatientObjectPage',
		'com/ari/pms/ui/pms/test/integration/pages/VisitObjectPage'
    ],
    function(JourneyRunner, opaJourney, PatientList, PatientObjectPage, VisitObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/ari/pms/ui/pms') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePatientList: PatientList,
					onThePatientObjectPage: PatientObjectPage,
					onTheVisitObjectPage: VisitObjectPage
                }
            },
            opaJourney.run
        );
    }
);