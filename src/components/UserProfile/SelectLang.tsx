import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import classes from './UserProfile.module.sass';
import WebAppContext from 'store/webAppContext';
import { UsersApi } from 'api/UsersApi';

export default function SelectLang() {
  const { i18n } = useTranslation();
  const webApp = useContext(WebAppContext);
  const { id } = webApp.user;

  const [lang, setLang] = useState(webApp.user.language_code);

  useEffect(() => {
    setLang(webApp.user.language_code);
  }, [webApp.user.language_code]);

  const handleChange = async (event: SelectChangeEvent) => {
    const value = event.target.value;
    await UsersApi.setLang(String(id), value);
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
