sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.ari.pms.ui.pms',
            componentId: 'PatientList',
            contextPath: '/Patient'
        },
        CustomPageDefinitions
    );
});