import PhoneNumber from 'libphonenumber-js';

export default function formatInternationalPhoneNumber(phoneNumber: string) {
    const parsedNumber = PhoneNumber(phoneNumber, 'US');
    if (parsedNumber?.isValid()) {
      return parsedNumber.formatInternational();
    } else {
      return phoneNumber;
    }
}
