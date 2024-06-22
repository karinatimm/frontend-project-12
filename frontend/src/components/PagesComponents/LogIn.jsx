import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../utils/router';

const LoginComponent = ({ children, loginAvatar }) => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginAvatar}
                  alt={t('logInPage.img.loginAlt')}
                  className="rounded-circle img-fluid"
                />
              </div>
              {children}
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('logInPage.form.formFooter')}</span>
                {' '}
                <Link to={ROUTES.signup}>{t('logInPage.form.signupLink')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
