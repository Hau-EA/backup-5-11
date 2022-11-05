import AccountBlockedInform from '../../components/FormLogIn/components/AccountBlockedInform';
import AccountIncorrectInform from '../../components/FormLogIn/components/AccountIncorrectInform';
import AccountLimitedInform from '../../components/FormLogIn/components/AccountLimitedInform';
import {
  addressValid,
  dobValid,
  emailValid,
  mobilePhoneValid,
  passwordValid,
  textValid,
} from '../../helpers/validation';
import AgeRequiredIcon from '../../assets/icons/18-required-icon.svg';
import EmailRequiredIcon from '../../assets/icons/email-required-icon.svg';
import LocationRequiredIcon from '../../assets/icons/location-required-icon.svg';
import CardRequiredIcon from '../../assets/icons/card-required-icon.svg';

export const LOGIN_UNAUTHORIZED_INFORM = {
  'bad credentials': <AccountIncorrectInform />,
  'user account is locked': <AccountBlockedInform />,
  blocked: <AccountLimitedInform />,
};

export const LOGIN_EMAIL_NAME_FIELD = 'login-email-field';
export const LOGIN_PASSWORD_NAME_FIELD = 'login-password-field';
export const LOGIN_FIELDS = [
  {
    label: 'Email',
    name: LOGIN_EMAIL_NAME_FIELD,
    type: 'email',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Invalid email address',
    msgRequired: 'This field is required',
    checkValidFn: emailValid,
  },
  {
    label: 'Password',
    name: LOGIN_PASSWORD_NAME_FIELD,
    type: 'password',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: '',
    msgRequired: 'This field is required',
    checkValidFn: passwordValid,
  },
];
export const RESET_LOGIN_INFORMATION = {
  [LOGIN_EMAIL_NAME_FIELD]: '',
  [LOGIN_PASSWORD_NAME_FIELD]: '',
};

export const FORGOT_PASSWORD_EMAIL_NAME_FIELD = 'forgot-password-email-field';
export const FORGOT_PASSWORD_FIELD = {
  label: 'Email',
  name: FORGOT_PASSWORD_EMAIL_NAME_FIELD,
  type: 'email',
  placeholder: 'Enter your email',
  isRequired: true,
  isReadOnly: false,
  msgInvalid: 'Invalid email address',
  msgRequired: 'This field is required',
  checkValidFn: emailValid,
};
export const RESET_FORGOT_PASSWORD_INFORMATION = {
  [FORGOT_PASSWORD_EMAIL_NAME_FIELD]: '',
};

export const REGISTER_STEP_REFERENCE = {
  0: 'logInDetails',
  1: 'personalDetails',
  2: 'documentUpload',
};

export const START_REGISTER_REQUIREDS = [
  {
    imgUrl: AgeRequiredIcon,
    label: 'You must be 18 years of age.',
  },
  {
    imgUrl: EmailRequiredIcon,
    label: 'Have a valid email address',
  },
  {
    imgUrl: LocationRequiredIcon,
    label: 'Have a valid Australian mobile number.',
  },
  {
    imgUrl: CardRequiredIcon,
    label:
      'Have a valid Australia Driver Licence or Passport (Australia/International).',
  },
];

export const REGISTER_EMAIL_NAME_FIELD = 'register-email-field';
export const REGISTER_REEMAIL_NAME_FIELD = 'register-reenter-email-field';
export const REGISTER_MOBILE_NAME_FIELD = 'register-mobile-field';
export const REGISTER_LOGIN_DETAILS_FIELDS = [
  {
    label: 'Email',
    name: REGISTER_EMAIL_NAME_FIELD,
    type: 'email',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Invalid email address',
    msgExisted: 'The email address is already exists',
    msgRequired: 'This field is required',
    checkValidFn: emailValid,
  },
  {
    label: 'Re-enter Email',
    name: REGISTER_REEMAIL_NAME_FIELD,
    type: 'email',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Invalid email address',
    msgNotMatch: 'Re-enter email does not match, please try again',
    msgRequired: 'This field is required',
    checkValidFn: emailValid,
  },
  {
    label: 'Mobile number',
    name: REGISTER_MOBILE_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Please enter a valid number which has 10 digits',
    msgStartWith: 'Australian mobile must start with 04',
    msgRequired: 'This field is required',
    checkValidFn: mobilePhoneValid,
  },
];

export const REGISTER_FISTNAME_NAME_FIELD = 'register-first-name-field';
export const REGISTER_MIDDLENAME_NAME_FIELD = 'register-middle-name-field';
export const REGISTER_LASTNAME_NAME_FIELD = 'register-last-name-field';
export const REGISTER_PERSONAL_DETAILS_FIELDS = [
  {
    label: 'First name',
    name: REGISTER_FISTNAME_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Invalid characters in the name field.',
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
  {
    label: 'Middle name',
    name: REGISTER_MIDDLENAME_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Invalid characters in the name field.',
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
  {
    label: 'Last name',
    name: REGISTER_LASTNAME_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Invalid characters in the name field.',
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
];

export const REGISTER_GENDER_NAME_FIELD = 'register-gender-field';

export const REGISTER_DOB_NAME_FIELD = 'register-dob-field';
export const REGISTER_PERSONAL_DETAILS_DOB_FIELD = {
  label: 'Date of Birth',
  name: REGISTER_DOB_NAME_FIELD,
  type: 'date',
  placeholder: 'mm/dd/yyyy',
  isRequired: true,
  isReadOnly: false,
  msgInvalid: 'The minimum age is 18 to use our service.',
  msgRequired: 'This field is required',
  checkValidFn: dobValid,
};

export const REGISTER_OCCUPATION_NAME_FIELD = 'register-occupation-field';
export const REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD =
  'register-previous-employed-field';
export const REGISTER_PERSONAL_DETAILS_OCCUPATION_FIELDS = [
  {
    label: 'Occupation',
    name: REGISTER_OCCUPATION_NAME_FIELD,
    type: 'text',
    placeholder: '',
    isRequired: true,
    isReadOnly: false,
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
  {
    label: 'Previous employed?',
    name: REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD,
    type: 'text',
    placeholder: '',
    isRequired: true,
    isReadOnly: false,
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
];
export const REGISTER_OCCUPATIONS = [
  { text: 'ACCOUNTANT', value: 'ACCOUNTANT' },
  { text: 'ACUPUNCTURIST', value: 'ACUPUNCTURIST' },
  { text: 'ADMINISTRATOR', value: 'ADMINISTRATOR' },
  { text: 'AGED CARE WORKER', value: 'AGED CARE WORKER' },
  { text: 'ASSISTANT', value: 'ASSISTANT' },
  { text: 'BAKER', value: 'BAKER' },
  { text: 'BARRISTER', value: 'BARRISTER' },
  { text: 'BEAUTY THERAPIST', value: 'BEAUTY THERAPIST' },
  { text: 'BOOK KEEPER', value: 'BOOK KEEPER' },
  { text: 'BRICKLAYER', value: 'BRICKLAYER' },
  { text: 'BROKER', value: 'BROKER' },
  { text: 'BUILDER', value: 'BUILDER' },
  { text: 'BUS DRIVER', value: 'BUS DRIVER' },
  { text: 'BUTCHER', value: 'BUTCHER' },
  { text: 'CARPENTER', value: 'CARPENTER' },
  { text: 'CASHIER', value: 'CASHIER' },
  { text: 'CHEMIST', value: 'CHEMIST' },
  { text: 'CHILDCARE WORKER', value: 'CHILDCARE WORKER' },
  { text: 'CLEANER', value: 'CLEANER' },
  { text: 'CONSULTANT', value: 'CONSULTANT' },
  { text: 'CONTRACTOR', value: 'CONTRACTOR' },
  { text: 'COOK', value: 'COOK' },
  { text: 'DENTIST', value: 'DENTIST' },
  { text: 'DESIGNER', value: 'DESIGNER' },
  { text: 'DIRECTOR', value: 'DIRECTOR' },
  { text: 'DOCTOR', value: 'DOCTOR' },
  { text: 'DRY CLEANER', value: 'DRY CLEANER' },
  { text: 'ELECTRICIAN', value: 'ELECTRICIAN' },
  { text: 'ENGINEER', value: 'ENGINEER' },
  { text: 'FAMILY SUPPORT WORKER', value: 'FAMILY SUPPORT WORKER' },
  { text: 'FARMER', value: 'FARMER' },
  { text: 'FINANCE OFFICER', value: 'FINANCE OFFICER' },
  { text: 'FLIGHT ATTENDANT', value: 'FLIGHT ATTENDANT' },
  { text: 'FLORIST', value: 'FLORIST' },
  { text: 'FORKLIFT DRIVER', value: 'FORKLIFT DRIVER' },
  { text: 'GAMING ATTENDANT', value: 'GAMING ATTENDANT' },
  { text: 'GARDENER', value: 'GARDENER' },
  { text: 'HAIRDRESSER', value: 'HAIRDRESSER' },
  { text: 'HANDY MAN', value: 'HANDY MAN' },
  { text: 'I.T. OFFICER', value: 'I.T. OFFICER' },
  { text: 'JANITOR', value: 'JANITOR' },
  { text: 'JEWELLERY MAKER', value: 'JEWELLERY MAKER' },
  { text: 'JOURNALIST', value: 'JOURNALIST' },
  { text: 'KITCHEN HAND', value: 'KITCHEN HAND' },
  { text: 'LAB TECHNICIAN', value: 'LAB TECHNICIAN' },
  { text: 'LECTURER', value: 'LECTURER' },
  { text: 'LIBRARIAN', value: 'LIBRARIAN' },
  { text: 'LOCKSMITH', value: 'LOCKSMITH' },
  { text: 'MACHINE OPERATOR', value: 'MACHINE OPERATOR' },
  { text: 'MANAGER', value: 'MANAGER' },
  { text: 'MASSAGE THERAPIST', value: 'MASSAGE THERAPIST' },
  { text: 'MIDWIFE', value: 'MIDWIFE' },
  { text: 'NURSE', value: 'NURSE' },
  { text: 'OPTOMETRIST', value: 'OPTOMETRIST' },
  { text: 'PHARMACIST', value: 'PHARMACIST' },
  { text: 'PLUMBER', value: 'PLUMBER' },
  { text: 'PROCESS WORKER', value: 'PROCESS WORKER' },
  { text: 'RADIOTHERAPY', value: 'RADIOTHERAPY' },
  { text: 'RESEARCHER', value: 'RESEARCHER' },
  { text: 'RETIRED', value: 'RETIRED' },
  { text: 'SALES REPRESENTATIVE', value: 'SALES REPRESENTATIVE' },
  { text: 'SCHOOL PRINCIPAL', value: 'SCHOOL PRINCIPAL' },
  { text: 'SCIENTIST', value: 'SCIENTIST' },
  { text: 'SECRETARY', value: 'SECRETARY' },
  { text: 'SINGER', value: 'SINGER' },
  { text: 'SOLE TRADER', value: 'SOLE TRADER' },
  { text: 'SOLICITOR', value: 'SOLICITOR' },
  { text: 'TAILOR', value: 'TAILOR' },
  { text: 'TAXI DRIVER', value: 'TAXI DRIVER' },
  { text: 'TEACHER', value: 'TEACHER' },
  { text: 'TILER', value: 'TILER' },
  { text: 'TRANSLATOR', value: 'TRANSLATOR' },
  { text: 'TRUCK DRIVER', value: 'TRUCK DRIVER' },
  { text: 'WAITER/WAITRESS', value: 'WAITER/WAITRESS' },
  { text: 'WELDER', value: 'WELDER' },
  { text: 'WELFARE WORKER', value: 'WELFARE WORKER' },
];
export const REGISTER_OCCUPATION_EXTRAS = [
  { text: 'UNEMPLOYED', value: 'UNEMPLOYED' },
  { text: 'RETIRED', value: 'RETIRED' },
];

export const REGISTER_ADDRESS_SWITCH_FIELD = 'register-address-switch-field';

export const REGISTER_ADDRESS_FINDER_NAME_FIELD = 'register-address-field';
export const REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD = {
  label: 'Address finder',
  name: REGISTER_ADDRESS_FINDER_NAME_FIELD,
  type: 'text',
  placeholder: 'Start typing your address',
  isRequired: true,
  isReadOnly: false,
  msgRequired: 'This field is required',
  checkValidFn: textValid,
};

export const REGISTER_ADDRESS_UNIT_NAME_FIELD = 'register-address-unit-field';
export const REGISTER_ADDRESS_STREET_NO_NAME_FIELD =
  'register-address-street-no-field';
export const REGISTER_ADDRESS_STREET_NAME_NAME_FIELD =
  'register-address-street-name-field';
export const REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD =
  'register-address-street-type-field';
export const REGISTER_ADDRESS_POST_CODE_NAME_FIELD =
  'register-address-post-code-field';
export const REGISTER_ADDRESS_SUBURB_NAME_FIELD =
  'register-address-suburb-field';
export const REGISTER_ADDRESS_STATE_NAME_FIELD = 'register-address-state-field';
export const REGISTER_PERSONAL_DETAILS_ADDRESS_MANUALLY_FIELDS = [
  {
    label: 'Unit/Apt No.',
    name: REGISTER_ADDRESS_UNIT_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: false,
    isReadOnly: false,
    msgInvalid: 'Ex: 123, 123-456,B1',
    msgRequired: 'This field is required',
    checkValidFn: addressValid,
  },
  {
    label: 'Street No.',
    name: REGISTER_ADDRESS_STREET_NO_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Ex: 123, 123-456,B1',
    msgRequired: 'This field is required',
    checkValidFn: addressValid,
  },
  {
    label: 'Street name',
    name: REGISTER_ADDRESS_STREET_NAME_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: false,
    msgInvalid: 'Ex: 123, 123-456,B1',
    msgRequired: 'This field is required',
    checkValidFn: addressValid,
  },
  {
    label: 'Street type',
    name: REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD,
    type: 'text',
    placeholder: '',
    isRequired: true,
    isReadOnly: false,
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
  {
    label: 'Post code',
    name: REGISTER_ADDRESS_POST_CODE_NAME_FIELD,
    type: 'number',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: true,
    msgInvalid: 'Invalid characters in the name field.',
    msgRequired: 'This field is required',
    checkValidFn: addressValid,
  },
  {
    label: 'Suburb',
    name: REGISTER_ADDRESS_SUBURB_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: true,
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
  {
    label: 'State',
    name: REGISTER_ADDRESS_STATE_NAME_FIELD,
    type: 'text',
    placeholder: 'Text here',
    isRequired: true,
    isReadOnly: true,
    msgRequired: 'This field is required',
    checkValidFn: textValid,
  },
];

export const REGISTER_DRIVER_LICENCE_SWITCH_FIELD =
  'register-driver-licence-switch-field';

export const REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD =
  'register-driver-licence-front-field';
export const REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD =
  'register-driver-licence-back-field';
export const REGISTER_DOCUMENT_UPLOAD_DRIVER_LICENCE_FIELDS = [
  {
    label: 'Add front-card',
    name: REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD,
    type: 'file',
    isRequired: true,
    isReadOnly: false,
    msgRequired: 'Please upload the required document',
    ref: 'refDriverLicenceFront',
  },
  {
    label: 'Add back-card',
    name: REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD,
    type: 'file',
    msgRequired: 'Please upload the required document',
    ref: 'refDriverLicenceBack',
  },
];

export const REGISTER_PASSPORT_NAME_FIELD = 'register-passport-field';
export const REGISTER_DOCUMENT_UPLOAD_PASSPORT_FIELD = {
  label: 'Add photo',
  name: REGISTER_PASSPORT_NAME_FIELD,
  type: 'file',
  isRequired: true,
  isReadOnly: false,
  msgRequired: 'Please upload the required document',
  ref: 'refPassport',
};

export const RESET_REGISTER_INFORMATION_STORE = {
  logInDetails: {
    [REGISTER_EMAIL_NAME_FIELD]: '',
    [REGISTER_REEMAIL_NAME_FIELD]: '',
    [REGISTER_MOBILE_NAME_FIELD]: '',
  },
  personalDetails: {
    [REGISTER_FISTNAME_NAME_FIELD]: '',
    [REGISTER_MIDDLENAME_NAME_FIELD]: '',
    [REGISTER_LASTNAME_NAME_FIELD]: '',
    [REGISTER_GENDER_NAME_FIELD]: 'male',
    [REGISTER_DOB_NAME_FIELD]: '',
    [REGISTER_OCCUPATION_NAME_FIELD]: '',
    [REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD]: '',
    [REGISTER_ADDRESS_FINDER_NAME_FIELD]: '',
    [REGISTER_ADDRESS_UNIT_NAME_FIELD]: '',
    [REGISTER_ADDRESS_STREET_NO_NAME_FIELD]: '',
    [REGISTER_ADDRESS_STREET_NAME_NAME_FIELD]: '',
    [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: '',
    [REGISTER_ADDRESS_POST_CODE_NAME_FIELD]: '',
    [REGISTER_ADDRESS_SUBURB_NAME_FIELD]: '',
    [REGISTER_ADDRESS_STATE_NAME_FIELD]: '',
  },
  documentUpload: {
    [REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD]: '',
    [REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD]: '',
    [REGISTER_PASSPORT_NAME_FIELD]: '',
  },
};
