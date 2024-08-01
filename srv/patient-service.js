const cds = require('@sap/cds')

class PatientService extends cds.ApplicationService {
  init() {

    const { Patient, Visit, Symptoms } = this.entities


    this.before(['NEW', 'CREATE'], 'Patient', async req => {
      const { maxID } = await SELECT.one`max(ID) as maxID`.from(Patient)
      req.data.ID = maxID + 1
    })

    this.before('UPDATE', 'Patient', async function (req) {
      const { ID, Visit } = req.data;
      const { maxVisitID } = await SELECT.one`max(VisitID)as maxVisitID`.from(Visit).where({ Patient, ID });
      req.data.VisitID = maxVisitID;

    })

    this.before('CREATE', 'Visit', async req => {
      const { maxID } = await SELECT.one`max(VisitID) as maxID `.from(Visit)
      req.data.VisitID = maxID + 1
    })
    // Delegate requests to the underlying generic service
    return super.init()
  }
}

module.exports = PatientService
