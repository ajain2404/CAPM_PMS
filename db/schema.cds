using {
  managed,
  sap.common.CodeList
} from '@sap/cds/common';

namespace com.ari.pms;

entity Patient : managed {
      @readonly
  key ID              : Integer;
      @mandatory Name : String(111);
      Contact         : String(10) @assert.format: '[0-9]';
      Gender          : Association to Gender;
      Visit           : Composition of many Visit
                          on Visit.patient = $self;

}

entity Visit : managed {
      @readonly
  key patient   : Association to Patient;

      @readonly
  key VisitID   : Integer;
      VisitDate : Date;
      Symptoms  : Composition of many Symptoms
                    on Symptoms.Visit = $self;
}

entity Symptoms : managed {
      @readonly
  key Visit     : Association to Visit;
  key SymptomID : Integer;

      @mandatory
      Symptom   : String(20);
      Details   : String(200);

}

entity Gender : CodeList {
  key code : String enum {
        M = 'Male';
        F = 'Female';
      };
}
