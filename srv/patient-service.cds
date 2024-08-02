using {com.ari.pms as my} from '../db/schema';

service PatientService {

  annotate PatientService.Patient with @odata.draft.enabled;

  entity Patient as projection on my.Patient
}
