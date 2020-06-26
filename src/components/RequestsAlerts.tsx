import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { clearError } from '../actions';
import { StoreInterface } from '../reducer';

interface MapStateToPropsType {
  requestError: Error;
}

interface MapDispatchToPropsType {
  clearError: typeof clearError;
}

type RequestsAlertsProps = MapStateToPropsType & MapDispatchToPropsType;

const _RequestsAlerts: React.FC<RequestsAlertsProps> = (
  props: RequestsAlertsProps
): JSX.Element => {
  const { requestError, clearError } = props;
  const handleClose = () => {
    clearError();
  };

  return (
    <Dialog
      open={!!requestError.message}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {requestError.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({
  requestsReducer,
}: StoreInterface): MapStateToPropsType => {
  return {
    requestError: requestsReducer.requestError,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType =>
  bindActionCreators({ clearError }, dispatch);

export const RequestsAlerts = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RequestsAlerts);
