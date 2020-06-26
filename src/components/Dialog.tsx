import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Dialog as MaterialDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { StoreInterface, DialogInterface } from '../reducer';
import { closeDialog } from '../actions';

interface MapDispatchToPropsType {
  closeDialog: typeof closeDialog;
}

type _DialogInterface = DialogInterface & MapDispatchToPropsType;

const _Dialog = (props: _DialogInterface): JSX.Element => {
  const { open, message, callback, args, closeDialog } = props;
  const onOk = () => {
    callback(args);
  };
  const handleClose = () => {
    closeDialog();
  };

  return (
    <MaterialDialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={onOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
};

const mapStateToProps = ({
  dialogReducer,
}: StoreInterface): DialogInterface => {
  return {
    open: dialogReducer.open,
    message: dialogReducer.message,
    callback: dialogReducer.callback,
    args: dialogReducer.args,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ closeDialog }, dispatch);

export const Dialog = connect(mapStateToProps, mapDispatchToProps)(_Dialog);
