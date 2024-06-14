import React, { useContext } from 'react';
import WebAppContext from 'store/webAppContext';
import classes from './UserProfile.module.sass';
import SelectLang from './SelectLang';

export default function UserProfile() {
  const webApp = useContext(WebAppContext);

  const user = webApp.user as WebAppUser;

  const { first_name, last_name, username } = user;

  return (
    <div className={classes.UserProfile}>
      <div className={classes.photo}>
        {first_name.slice(0, 1)}
        {last_name && last_name.slice(0, 1)}
      </div>
      <div className={classes.name}>
        {first_name} {last_name || ''}
      </div>
      {username && <div className={classes.username}>@{username}</div>}
      <SelectLang />
    </div>
  );
}
