sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.ari.pms.ui.pms',
            componentId: 'PatientObjectPage',
            contextPath: '/Patient'
        },
        CustomPageDefinitions
    );
});