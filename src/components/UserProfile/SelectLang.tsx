import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import classes from './UserProfile.module.sass';
import WebAppContext from 'store/webAppContext';
import { UsersApi } from 'api/UsersApi';

export default function SelectLang() {
  const { i18n } = useTranslation();
  const webApp = useContext(WebAppContext);

  const user = webApp.user as WebAppUser;

  const [lang, setLang] = useState(user.language_code);

  useEffect(() => {
    setLang(user.language_code);
  }, [user.language_code]);

  const handleChange = async (event: SelectChangeEvent) => {
    const value = event.target.value;
    await UsersApi.setLang(String(user.id), value);
    setLang(value);
    i18n.changeLanguage(value);
  };

  return (
    <FormControl className={classes.lang} sx={{ minWidth: '80px' }} size="small">
      <InputLabel id="demo-select-small-label">Lang</InputLabel>
      <Select labelId="demo-select-small-label" id="demo-select-small" value={lang} label="Age" onChange={handleChange}>
        <MenuItem value="ru">ru</MenuItem>
        <MenuItem value="en">en</MenuItem>
        <MenuItem value="cn">cn</MenuItem>
      </Select>
    </FormControl>
  );
}
