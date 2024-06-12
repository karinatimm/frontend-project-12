import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Form as BootstrapForm, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAuthenticateSignUp } from '../../api/authApi.js';
import { setUserData } from '../../store/entities/authSlice.js';
import { useSignUpValidationSchema } from '../../utils/validationSchemas.js';
import SignUpComponent from '../../components/SignUp.jsx';
import signUpAvatar from '../../assets/imgSignUpPage/avatar_signUp.png';
import { ROUTES } from '../../utils/router.js';
import useAuthContext from '../../hooks/useAuthContext.js';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpRequest] = useAuthenticateSignUp();
  const { logIn } = useAuthContext();
  const signUpValidationSchema = useSignUpValidationSchema();

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await signUpRequest(values).unwrap();
      logIn(response.token, values.username);
      dispatch(
        setUserData({ token: response.token, username: values.username })
      );
      setSubmitting(false);
      navigate(ROUTES.homePage);
    } catch (error) {
      console.error('SignUp error:', error);

      const { status } = error;

      switch (status) {
        case 'FETCH_ERROR':
          toast.error(t('signUpPage.errors.networkError'), {
            position: 'top-center',
          });
          break;
        case 409:
          setErrors({
            username: ' ',
            password: ' ',
            confirmPassword: t('signUpPage.errors.thisUserHasAlreadyExists'),
          });
          break;
        default:
          toast.error(t('signUpPage.errors.unknownError'), {
            position: 'top-center',
          });
          break;
      }
      setSubmitting(false);
    }
  };

  return (
    <SignUpComponent signUpAvatar={signUpAvatar}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">
              {t('signUpPage.form.formTitle')}
            </h1>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label htmlFor="username">
                {t('signUpPage.form.username')}
              </BootstrapForm.Label>
              <Field
                name="username"
                as={BootstrapForm.Control}
                type="text"
                id="username"
                placeholder={t('logInPage.form.placeolderForUserField')}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label htmlFor="password">
                {t('signUpPage.form.password')}
              </BootstrapForm.Label>
              <Field
                name="password"
                as={BootstrapForm.Control}
                type="password"
                id="password"
                placeholder={t('logInPage.form.placeolderForPasswordField')}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group className=" mb-4">
              <BootstrapForm.Label htmlFor="confirmPassword">
                {t('signUpPage.form.confirmPassword')}
              </BootstrapForm.Label>
              <Field
                name="confirmPassword"
                as={BootstrapForm.Control}
                type="password"
                id="confirmPassword"
                placeholder={t('logInPage.form.placeolderForConfirmPassword')}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            {errors.general && (
              <div className="text-danger mb-3">{errors.general}</div>
            )}

            <Button
              type="submit"
              variant="outline-primary"
              className="w-100"
              disabled={isSubmitting}
            >
              {t('signUpPage.button.registrationButton')}
            </Button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </SignUpComponent>
  );
};

export default SignUp;