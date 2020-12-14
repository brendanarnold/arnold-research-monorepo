import { DataField, FormSchema, StorageType } from "../src/forms/domain/models/schema";
import { EmailValidation, StringMaxLengthValidation, StringMinLengthValidation } from "../src/forms/domain/models/validations";
import { GdprDataType, GdprPolicy, GdprLifetime } from "../src/secure-store/domain/entities/secure-data";


const form = new FormSchema('P45', '0.0.1')
  .withSchema([
    new DataField('firstName', StorageType.String, new GdprPolicy(
      GdprDataType.Anonymous, GdprLifetime.Persistent
    ))
      .withValidations([
        new StringMaxLengthValidation('firstName', 6),
        new StringMinLengthValidation('firstName', 2)
      ]),
    new DataField('lastName', StorageType.String, new GdprPolicy(
      GdprDataType.Anonymous, GdprLifetime.Persistent
    ))
      .withValidations([
        new StringMaxLengthValidation('lastName', 6),
        new StringMinLengthValidation('lastName', 2)
      ]),
    new DataField('email', StorageType.String, new GdprPolicy(
      GdprDataType.Personal, GdprLifetime.Transient
    ))
      .withValidations([new EmailValidation('email')]),
  ])

console.log(form.toJson())


const data = {
  firstName: 'Brendan',
  lastName: 'Arnold',
  email: 'blahblah.com',
}

const validationResult = form.validate(data)

console.log(JSON.stringify(validationResult, null, 2))
