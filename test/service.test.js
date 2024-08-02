const cds = require('@sap/cds')

describe('com/ari - PMS', () => {
    const { GET, POST, axios, expect} = cds.test(__dirname+'/..')

    it('serves $metadata documents in v4', async () => {
        const { headers, status, data } = await GET `/odata/v4/patient/$metadata`
        expect(status).to.equal(200)
        expect(headers).to.contain({
            // 'content-type': 'application/xml', //> fails with 'application/xml;charset=utf-8', which is set by express
            'odata-version': '4.0',
        })
        expect(headers['content-type']).to.match(/application\/xml/)
        expect(data).to.contain('<EntitySet Name="Patient" EntityType="PatientService.Patient">')
    })

    describe('query options...', () => {

        it('supports $search in multiple fields', async () => {
            const { data } = await GET`/odata/v4/patient/Patient ${{
                params: { $search: 'Jo', $select: `ID,Name` },
            }}`
            expect(data.value).to.containSubset([
                { ID: 1, Name: 'John' }
            ])
        })

        it('supports $select', async () => {
            const { data } = await GET(`/odata/v4/patient/Patient`, {
                params: { $select: `ID,Name` },
            })
            expect(data.value).to.containSubset([
                { ID: 1, Name: 'John' },
                { ID: 2, Name: 'Alice' }
            ])
        })

        it('supports $expand', async () => {
            const { data } = await GET(`/odata/v4/patient/Patient`, {
                params: {
                    $select: `Name`,
                    $expand: `Visit($select=VisitID,VisitDate)`,
                },
            })
            expect(data.value).to.containSubset([
                { Name: 'John', Visit: [{ VisitID : 1 }] },
                { Name: 'Alice', Visit: [{  VisitID : 1 }] }
            ])
        })

        it('supports $top/$skip paging', async () => {
            const { data: p1 } = await GET`/odata/v4/patient/Patient?$select=Name&$top=2`
            expect(p1.value).to.containSubset([
                { ID: 1, Name: 'John' },
                { ID: 2, Name: 'Alice' }
            ])
            const { data: p2 } = await GET`/odata/v4/patient/Patient?$select=Name&$skip=2`
            expect(p2.value).to.containSubset([
                { ID: 3, Name: 'Alex' }
            ])
        })
    })

})