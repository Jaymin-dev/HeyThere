const validator = {
  name: {
    regEx: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
    error: 'Only alphabetic letters are allowed with spaces in between.',
  },
  email: {
    regEx:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Please Enter a valid email address or phone number.',
  },
  phone: {
    regEx: /^\d{10}$/,
    error: 'Enter a valid phone number without a + sign.',
  },
  password: {
    regEx: /(?=^.{8,16}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    error: 'Password must be minimum length 8',
  },
  weight: {
    error: 'Please Enter weight.',
  },
  height: {
    error: 'Please Enter height.',
  },
};

export default validator;
