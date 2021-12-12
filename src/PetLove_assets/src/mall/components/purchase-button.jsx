import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import GreenButton from '../../components/green-button';
import FavoriteIcon from '@mui/icons-material/Favorite';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

class PurchaseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenConfirm: false,
      isOpenEnterPartner: false,
      isOpenPurchaseResult: false,
      isPurchaseSuccessful: false,
      txtPartnerAddress: ""
    }
  }

  handleOpenConfirm = () => this.setState({
    isOpenConfirm: true, 
    isOpenEnterPartner: false,
    isOpenPurchaseResult: false,
    isPurchaseSuccessful: false,
    txtPartnerAddress: ""
  });

  handleCloseConfirm = () => this.setState({isOpenConfirm: false});

  handleOpenEnterPartner = () => {
    this.setState({
      isOpenConfirm: false,
      isOpenEnterPartner: true
    })
  };

  handleCloseEnterPartner = () => this.setState({isOpenEnterPartner: false});

  handleTextFieldChange = (event) => {
    this.setState({txtPartnerAddress: event.target.value});
  };

  handleSubmitPartnerAddress = () => {
    this.setState({
      isPurchaseSuccessful: this.validatePurchase(),
      isOpenPurchaseResult: true,
      isOpenEnterPartner: false
    })
    this.setState({txtPartnerAddress: ""});
  };

  // TODO: validate user balance and partner address
  validatePurchase = () => {
    if(this.state.txtPartnerAddress == "xxx") {
      return true;
    }
    return false;
  };

  handleClosePurchaseResult = () => this.setState({
    isOpenConfirm: false, 
    isOpenEnterPartner: false,
    isOpenPurchaseResult: false,
    isPurchaseSuccessful: false,
    txtPartnerAddress: ""
  });
  
  render() {
    return (
      <div>
        <GreenButton startIcon={<FavoriteIcon />} onClick={this.handleOpenConfirm}>{this.props.label}</GreenButton>
        <Modal
          open={this.state.isOpenConfirm}
          onClose={this.handleCloseConfirm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} direciton="row" alignItems="center">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                If your confirm the purchase, we will initiate a transfer, and you will immediately own the pet.
              </Typography>
              <Stack direction="row" mt={3} spacing={2} alignItems="center">
                <GreenButton onClick={this.handleOpenEnterPartner}>Yes, buy it!</GreenButton>
                <GreenButton onClick={this.handleCloseConfirm}>Wait</GreenButton>
              </Stack>
          </Stack>
        </Modal>
        <Modal
          open={this.state.isOpenEnterPartner}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} spacing={2} direciton="row" alignItems="center">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Enter your partner's wallet address, you will have your only love pet.
            </Typography>
            &nbsp;
            <TextField
                size="small"
                required
                fullWidth
                id="outlined-required"
                onChange={this.handleTextFieldChange}
              />
            <Stack direction="row" spacing={2} alignItems="center">
              <GreenButton onClick={this.handleSubmitPartnerAddress}>Yes, buy it!</GreenButton>
              <GreenButton onClick={this.handleCloseEnterPartner}>Cancel</GreenButton>
            </Stack>
          </Stack>
        </Modal>
        <Modal
          open={this.state.isOpenPurchaseResult}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} direciton="row" alignItems="center">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {this.state.isPurchaseSuccessful ? 
                "You have successfully adopted the pet! Go to the personal center to check it out." 
                : "Adoption failed, probably you already have a pet with your partner or your balance is not enough."}
              </Typography>
              &nbsp;
              <Stack direction="row" spacing={2} alignItems="center">
                <GreenButton onClick={this.handleClosePurchaseResult}>OK</GreenButton>
              </Stack>
          </Stack>
        </Modal>
      </div>
    );
  }
};

export default PurchaseButton;