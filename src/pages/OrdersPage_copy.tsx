import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  IconButton,
  Modal,
  Snackbar,
  SnackbarOrigin,
  TextField,
  Typography,
} from '@mui/material';
import { API_URL } from '../config';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WebApp } from '@grammyjs/web-app';
import axios from 'axios';
import '../assets/styles/tgweb.sass';
import { images } from '../config/images';
import DownloadIcon from '@mui/icons-material/Download';
import { Close, ContentCopy } from '@mui/icons-material';
import LaunchIcon from '@mui/icons-material/Launch';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import queryString from 'query-string';

export type OrderStatus = 'unread' | 'read' | 'fabric' | 'sewing' | 'not started' | 'production' | 'delivery' | 'done';
export interface IOrder {
  id: string;
  key: string;
  index: number;
  doc_link: string;
  doc_title: string;
  doc_date: string;
  status: OrderStatus;
  photo_fabric?: string;
  photo_sewing?: string;
  photo_invoice?: string;
  fk_user_id: string;
  fk_article_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface IHistory {
  id: string;
  status: OrderStatus;
  desc: string | null;
  fk_order_id: string;
  created_at: string;
}

interface SnackbarStateType extends SnackbarOrigin {
  open: boolean;
}

const statusDescEnum: Record<OrderStatus, string> = {
  unread: 'The order was successfully created.',
  read: 'Supplier read message.',
  fabric: 'Fabric is ready.',
  sewing: 'Sewing is in progress.',
  'not started': 'Production has not started yet.',
  production: 'Production is in progress.',
  delivery: 'Order is being delivered.',
  done: 'Order is completed.',
};

const statusTrainEnum: Record<OrderStatus, OrderStatus> = {
  unread: 'fabric',
  read: 'fabric',
  fabric: 'sewing',
  sewing: 'delivery',
  'not started': 'delivery',
  production: 'delivery',
  delivery: 'done',
  done: 'done',
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ConfirmButton = styled(Button)({
  padding: '4px 16px',
  fontSize: 14,
  fontWeight: 'normal',
  color: '#000',
  outline: 'none',
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#FFE561',
  border: 'none',
  borderRadius: '80px',
  '&:hover': {
    backgroundColor: '#FFE561',
  },
  '&:active': {
    backgroundColor: '#FFE561',
  },
});

export default function TgWebOrders() {
  const { order_key } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [history, setHistory] = useState<Array<IHistory[]> | null>(null);

  const [nextStatus, setNextStatus] = useState<OrderStatus>('unread');

  const [file, setFile] = useState<any>();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const [snackbarState, setSnackbarState] = useState<SnackbarStateType>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [progress, setProgress] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_URL}/orders/${order_key}`);
    const { data } = await response.json();

    if (!data) return;

    setOrder(data.order);
    setHistory(data.history);
    setNextStatus(statusTrainEnum[data.order.status as OrderStatus]);

    WebApp.ready();
  }, [order_key]);

  useEffect(() => {
    fetchData();
  }, [fetchData, order_key]);

  const handleChangeTextField = (e: any) => {
    setMessage(e.target.value);
  };

  const handleModalClose = () => {
    WebApp.BackButton.hide();
    setOpen(false);
  };

  const handleModalOpen = () => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(handleModalClose);
    setOpen(true);
  };

  const handleConfirm = () => {
    const url = `${API_URL}/orders/${order_key}`;

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
    formData.append('status', nextStatus);

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

  const handleSnackbarOpen = () => {
    setSnackbarState({ ...snackbarState, open: true });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const HeaderOrder = () => {
    return (
      <div className="header">
        <div className="white-space"></div>
        <div className="title">
          <div className="number">Order {order?.key}</div>
          <div className="status">{order?.status}</div>
        </div>
        <div className="action">
          <IconButton
            aria-label="copy"
            color="primary"
            size="medium"
            onClick={() => {
              handleSnackbarOpen();
              navigator.clipboard.writeText(order?.key || '');
            }}
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  };

  const HistoryDescData = ({ value }: { value: string }) => {
    if (!value.startsWith('/images')) {
      return <div className="action-type message">{value}</div>;
    }
    return (
      <div className="action-type file">
        <div className="logo">
          <img src={API_URL + value} alt="file preview" />
        </div>
        <div className="name">
          <div className="nowrap">{value.split('/').slice(-1)[0]}</div>
        </div>
        <div className="goto">
          <IconButton href={API_URL + value} target="_blank" aria-label="launch" color="primary" size="small">
            <DownloadIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  const OrderActions = () => {
    return (
      <div className="actions">
        <ConfirmButton size="small" onClick={handleModalOpen}>
          Confirm status
        </ConfirmButton>
      </div>
    );
  };

  const OrderHistoryItems = ({ items, confirm }: { items: IHistory[]; confirm?: boolean }) => {
    let linkExist = false;
    const status = items[0].status;
    return (
      <div className="action">
        <div className="title">{status}</div>
        <div className="desc">{statusDescEnum[status]}</div>
        <div className="items">
          {items.map((item) => {
            if (!item.desc) return '';
            if (item.desc.startsWith('/images')) linkExist = true;
            return <HistoryDescData value={item.desc} />;
          })}
        </div>
        {(confirm || !linkExist) && <OrderActions />}
      </div>
    );
  };

  function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  if (!order || !history) return <CircularProgress />;

  const formStatus = !file && !message;
  const isLoadingFile = file && ![0, 100].includes(progress);
  const confirmBtnStatus = formStatus || isLoadingFile;

  const newStatusAction =
    !history.length ||
    (['fabric', 'sewing', 'delivery'].includes(nextStatus) && history.slice(-1)[0][0].status !== nextStatus);

  return (
    <div className="tgweb">
      <div className="content" style={{ margin: '15px', width: '100%' }}>
        <HeaderOrder />
        <div className="file-card">
          <div className="content">
            <div className="file-type">
              <img src={images.excel_misc} alt="excel misc" />
            </div>
            <div className="file-name">
              <div className="title">{order.fk_article_id}</div>
              <div className="file">{order.doc_title + '.xlsx'}</div>
              <div className="date">{order.doc_date}</div>
            </div>
            <div className="actions">
              <IconButton
                href={API_URL + order.doc_link}
                target="_blank"
                aria-label="launch"
                color="primary"
                size="small"
              >
                <LaunchIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="order-history">
          {history?.map((items: IHistory[], i) => (
            <OrderHistoryItems
              key={i}
              items={items}
              confirm={items[0].status === nextStatus && order.status !== 'done'}
            />
          ))}
          {Boolean(newStatusAction) && (
            <OrderHistoryItems
              items={[
                {
                  id: 'next',
                  desc: null,
                  fk_order_id: order.id || '',
                  created_at: '',
                  status: nextStatus,
                },
              ]}
              confirm={true}
            />
          )}
        </div>
      </div>

      <Modal open={open} className="modal-message">
        <div className="content">
          <HeaderOrder />
          <div className="messages-null">
            <img src={images.null} alt="null" />
          </div>
          <div className="messages-form">
            {!file ? (
              <TextField onChange={handleChangeTextField} label="Message" multiline rows={3} sx={{ width: '100%' }} />
            ) : (
              <div className="form-file">
                <div className="logo">
                  <img src={images.excel_misc} alt="file logo" />
                </div>
                <div className="name">
                  <div className="nowrap">{file.name}</div>
                </div>
                <div className="actions">
                  {file && !progress ? (
                    <IconButton aria-label="launch" color="primary" size="small" onClick={() => setFile(null)}>
                      <Close />
                    </IconButton>
                  ) : (
                    <CircularProgressWithLabel value={progress} />
                  )}
                </div>
              </div>
            )}

            <div className="actions">
              <div className="file">
                <Button
                  onChange={handleChangeInputFile}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<AttachFileIcon />}
                  size="large"
                  sx={{
                    padding: '8px',
                    borderRadius: '50%',
                    bgcolor: 'transparent',
                    color: '#000',
                    boxShadow: 'none',
                    ':hover': {
                      bgcolor: 'transparent !important',
                      boxShadow: 'none',
                    },
                    minWidth: 0,
                    span: {
                      margin: 0,
                    },
                  }}
                >
                  <VisuallyHiddenInput type="file" />
                  {/* <VisuallyHiddenInput type="file" accept="image/png, image/gif, image/jpeg" /> */}
                </Button>
              </div>
              <div className="confirm">
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    padding: '15px',
                    margin: '0 auto',
                    borderRadius: '15px',
                    bgcolor: '#FFE561',
                    color: '#000',
                    boxShadow: '4px 8px 16px rgba(12, 12, 12, 0.1)',
                    // ':hover': {},
                    ':not(.Mui-disabled):hover': {
                      bgcolor: '#FFE561 !important',
                      boxShadow: '4px 8px 16px rgba(12, 12, 12, 0.15) !important',
                    },
                  }}
                  onClick={handleConfirm}
                  disabled={confirmBtnStatus}
                >
                  {isLoadingFile ? 'Loading...' : `Send ${file ? 'photo' : 'message'}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        key={order.id || 'snackbar-order-id'}
        autoHideDuration={800}
      >
        <div className="snackbar-content">Order number copied</div>
      </Snackbar>
    </div>
  );
}
