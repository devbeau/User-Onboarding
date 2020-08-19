import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
      .string().trim()
      .required('Must include a name.')
      .min(4, 'names must be at least 4 characters long.'),
    email: yup
      .string().trim()
      .required('Must include email address.')
      .email('Must be a valid email address.'),
    password: yup
      .string().trim()
      .required('Password is Required')
      .min(6, 'Passwords must be at least 6 characters long.'),
    tos: yup
      .boolean()
      .oneOf([true], 'You must accept Terms and Conditions.'),
    username: yup
      .string().trim()
      .required('Must include a username.')
      .min(4, 'Usernames must be at least 4 characters long.'),
    role: yup
      .string().trim()
      .required('Must select a role.')
      .oneOf(['Student', 'Team Lead', 'Instructor'], "Must select a valid role."),
    birth: yup
      .date()
      .isType('Must enter in a valid date')
      .required('Must input your birthday'),
  });

  export default formSchema;