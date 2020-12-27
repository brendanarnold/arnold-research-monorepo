// import { DataField, FormSchema, StorageType } from '@tngbl/forms/models'
// import { EmailValidation, StringMaxLengthValidation, StringMinLengthValidation } from '@tngbl/forms/validations'
// import { GdprDataType, GdprPolicy, GdprLifetime } from '@tngbl/secure-data';


// const form = new FormSchema('P45', '0.0.1')
//   .withSchema([
//     new DataField('firstName', StorageType.String, new GdprPolicy(
//       GdprDataType.Anonymous, GdprLifetime.Persistent
//     ))
//       .withValidations([
//         new StringMaxLengthValidation('firstName', 6),
//         new StringMinLengthValidation('firstName', 2)
//       ]),
//     new DataField('lastName', StorageType.String, new GdprPolicy(
//       GdprDataType.Anonymous, GdprLifetime.Persistent
//     ))
//       .withValidations([
//         new StringMaxLengthValidation('lastName', 6),
//         new StringMinLengthValidation('lastName', 2)
//       ]),
//     new DataField('email', StorageType.String, new GdprPolicy(
//       GdprDataType.Personal, GdprLifetime.Transient
//     ))
//       .withValidations([new EmailValidation('email')]),
//   ])

// const formJson = form.toJson()

// console.log(formJson)

// console.log('========')

// const recodedJson = FormSchema.fromJson(formJson).toJson()

// console.log(recodedJson)

// console.log('========')

// const data = {
//   firstName: 'Brendan',
//   lastName: 'Arnold',
//   email: 'blahblah.com',
// }

// const validationResult = form.validate(data)

// console.log(JSON.stringify(validationResult, null, 2))
