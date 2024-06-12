import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundAvatar from '../../assets/imgNotFoundPage/404_error.png';
import { ROUTES } from '../../utils/router';

const NotFoundComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleHomePageClick = (event) => {
    event.preventDefault();
    navigate(ROUTES.homePage);
  };

  return (
    <div className="text-center mt-5">
      <img src={notFoundAvatar} alt="Page wasn't found" className="img-fluid" />
      <h1 className="h4 text-muted">{t('notFoundPage.notFoundPageTitle')}</h1>
      <p className="text-muted">
        {t('notFoundPage.notFoundPageText')}{' '}
        <a href={ROUTES.homePage} onClick={handleHomePageClick}>
          {t('notFoundPage.notFoundPageLink')}
        </a>
      </p>
    </div>
  );
};

export default NotFoundComponent;