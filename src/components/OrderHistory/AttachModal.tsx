import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Modal, TextField } from '@mui/material';
import Header from 'components/Header';
import { images } from 'config/images';
import { Close } from '@mui/icons-material';
import { API_URL } from 'config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { WebApp } from '@grammyjs/web-app';
import classes from './OrderHistory.module.sass';
import CircularProgress from 'components/UI/CircularProgress';
import { setActiveOrder } from 'reducers/ordersReducer';
import { OrdersApi } from 'api/OrdersApi';
import ButtonInputFile from './ButtonInputFile';
import ButtonConfirm from './ButtonConfirm';

export default function AttachModal({ open, handleModalClose }: { open: boolean; handleModalClose: () => void }) {
  const { order_key } = useParams();
  const dispatch = useDispatch();

  const [file, setFile] = useState<any>();
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const order = await OrdersApi.byId(order_key as string);
    dispatch(setActiveOrder(order));
    WebApp.ready();
  }, [dispatch, order_key]);

  const handleConfirm = () => {
    const url = `${API_URL}/orders`;

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
      .then((res) => {
        fetchData();
        setFile(null);
        setMessage('');
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error uploading files: ', error);
      });
  };

  const handleChangeInputFile = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleChangeTextField = (e: any) => {
    setMessage(e.target.value);
  };

  const formStatus = !file && !message;
  const isLoadingFile = file && ![0, 100].includes(progress);
  const confirmBtnStatus = formStatus || isLoadingFile;

  return (
    <Modal open={open} className={classes.MessageModal}>
      <div className={classes.content}>
        <Header />
        <div className={classes.messages_null}>
          <img src={images.null} alt="null" />
        </div>
        <div className={classes.messages_form}>
          {!file ? (
            <TextField onChange={handleChangeTextField} label="Message" multiline rows={3} sx={{ width: '100%' }} />
          ) : (
            <div className={classes.form_file}>
              <div className={classes.logo}>
                <img src={images.excel_misc} alt="file logo" />
              </div>
              <div className={`${classes.name}`}>
                <div className="nowrap">{file.name}</div>
              </div>
              <div className={classes.actions}>
                {file && !isLoadingFile ? (
                  <IconButton aria-label="launch" color="primary" size="small" onClick={() => setFile(null)}>
                    <Close />
                  </IconButton>
                ) : (
                  <CircularProgress value={progress} />
                )}
              </div>
            </div>
          )}

          <div className={classes.actions}>
            <div className={classes.file}>
              <ButtonInputFile handleChangeInputFile={handleChangeInputFile} />
            </div>
            <div className={classes.confirm}>
              <ButtonConfirm
                type={file ? 'photo' : 'message'}
                disabled={confirmBtnStatus}
                handleConfirm={handleConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
