using { com.ari.pms as my } from '../db/schema';
service PatientService {

@(restict : [
  { grant : ['*'], to: 'admin'}
])
  entity Patient as projection on my.Patient 
}
