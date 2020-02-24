import React, { useState, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import navLogo from './nav-logo.svg';
import './Navbar.less';

const Navbar = () => {
  const [loginText, setLoginText] = useState<string | undefined>();

  useEffect(() => {
    const URL = process.env.REACT_APP_WEB_SERVER_URL
      ? process.env.REACT_APP_WEB_SERVER_URL + 'user'
      : 'https://syfosmmanuell.nais.preprod.local/user';
    fetch(URL)
      .then(res => {
        return res.text();
      })
      .then(text => {
        if (!text) {
          throw new Error('Kunne ikke hente brukernavn fra server');
        }
        setLoginText(`Logget inn som: ${text}`);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="navbar">
      <span className="navbar__left">
        <img className="navlogo" src={navLogo} alt="NAV-logo" />
        <Element>Manuell vurdering av sykmelding</Element>
      </span>
      {loginText && <Element>{loginText}</Element>}
    </div>
  );
};

export default Navbar;
