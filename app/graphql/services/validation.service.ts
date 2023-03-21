import * as yup from 'yup';

const authValidation = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(5),
});

export default {
  authValidation,
};
