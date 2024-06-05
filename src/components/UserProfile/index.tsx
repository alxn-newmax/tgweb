import React, { useContext } from 'react';
import WebAppContext from 'store/webAppContext';
import classes from './UserProfile.module.sass';

export default function UserProfile() {
  const webApp = useContext(WebAppContext);
  const { first_name, last_name, username } = webApp.user;

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
    </div>
  );
}
