export class StagiaireDto {
    public lastName: string = '';
    public firstName: string = '';
    public email: string = '';
    public phoneNumber: string = '';
    public birthDate!: Date;

    public constructor(formValues: any) {
        Object.assign(this, formValues);
       /**
         * formValues : {
         *  lastName: 'Aubert',
         *  firstName: 'Jean-Luc',
         *  email: 'jla.webprojet@gmail.com',
         *  phoneNumber: '06 55 22 33 66',
         *  birthDate: null
         * }
         */
    }
}
