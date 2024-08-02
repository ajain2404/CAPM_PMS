const cds = require('@sap/cds')

class PatientService extends cds.ApplicationService {
  init() {

    const { Patient, Visit, Symptoms } = this.entities


    this.before('NEW', 'Patient.drafts', async req => {
      const { maxID } = await SELECT.one`max(ID) as maxID`.from(Patient)
      req.data.ID = maxID + 1
    })

    this.before('NEW', 'Visit.drafts', async (req) => {
      const { patient_ID } = req.data
      const { maxID } = await SELECT.one`max(VisitID) as maxID`.from(Visit.drafts).where({ patient_ID })
      req.data.VisitID = maxID + 1
    })

    this.before('NEW', 'Symptoms.drafts', async (req) => {
      const { Visit_patient_ID } = req.data
      const { maxID } = await SELECT.one`max(SymptomID) as maxID`.from(Symptoms.drafts).where({ Visit_patient_ID })
      req.data.SymptomID = maxID + 1
    })

    

    // Delegate requests to the underlying generic service
    return super.init()
  }
}

module.exports = { PatientService }
