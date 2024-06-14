import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { WebApp } from '@grammyjs/web-app';
import { Close } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { API_URL } from 'config';
import { images } from 'config/images';
import ButtonConfirm from '../OrderHistory/ButtonConfirm';
import ButtonInputFile from '../OrderHistory/ButtonInputFile';
import CircularProgress from 'components/UI/CircularProgress';
import { OrdersApi } from 'api/OrdersApi';
import { setActiveOrder } from 'reducers/ordersReducer';
import classes from './MessagesFooter.module.sass';

export default function MessagesFooter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order_key } = useParams();

  const [file, setFile] = useState<any>();
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (file) {
      document.body.style.setProperty('--footer-height', '160px');
    } else {
      document.body.style.setProperty('--footer-height', '200px');
    }
  }, [file]);

  const handleConfirm = () => {
    const url = `${API_URL}/orders`;

    setFile(null);
    setMessage('');

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: function (e: any) {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        setProgress(percentCompleted);
      },
    };

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      formData.append('fileName', file.name);
    }
    formData.append('order_key', order_key || '');
    formData.append('message', message);

    axios
      .post(url, formData, config)
      .then(async (res) => {
        const { order, error } = await OrdersApi.byId(order_key as string);

        if (error || !order) {
          WebApp.BackButton.hide();
          return navigate('/orders');
        }

        dispatch(setActiveOrder(order));

        if (formData.get('file')) {
          WebApp.BackButton.hide();
          navigate(`/orders/${order_key}`);
        }
      })
      .catch((error) => {
        console.error('Error uploading files: ', error);
      });
  };

  const handleChangeInputFile = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleRemoveInputFile = (e: any) => {
    e.preventDefault();
    setFile(null);
  };

  const handleChangeTextField = (e: any) => {
    setMessage(e.target.value);
  };

  const formStatus = !file && !message;
  const isLoadingFile = file && ![0, 100].includes(progress);
  const confirmBtnStatus = formStatus || isLoadingFile;

  return (
    <div className={classes.footer}>
      {!file ? (
        <TextField
          value={message}
          onChange={handleChangeTextField}
          label={t('orderChatPage.textFieldLabel')}
          multiline
          rows={3}
          sx={{ width: '100%' }}
        />
      ) : (
        <div className={classes.form_file}>
          <div className={classes.content}>
            <div className={classes.logo}>
              <img src={images.jpeg_misc} alt="file logo" />
            </div>
            <div className={`${classes.name}`}>
              <div className="nowrap">{file.name}</div>
            </div>
            <div className={classes.actions}>
              {file && !isLoadingFile ? (
                <IconButton
                  aria-label="launch"
                  size="small"
                  sx={{ color: 'var(--link-color)' }}
                  onClick={handleRemoveInputFile}
                >
                  <Close />
                </IconButton>
              ) : (
                <CircularProgress value={progress} />
              )}
            </div>
          </div>
        </div>
      )}

      <div className={classes.actions}>
        <div className={classes.file}>
          <ButtonInputFile handleChangeInputFile={handleChangeInputFile} />
        </div>
        <div className={classes.confirm}>
          <ButtonConfirm type={file ? 'photo' : 'message'} disabled={confirmBtnStatus} handleConfirm={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
