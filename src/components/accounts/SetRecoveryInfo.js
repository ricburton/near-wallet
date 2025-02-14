import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isValidPhoneNumber } from 'react-phone-number-input'

import { Wallet } from '../../utils/wallet'

import AccountFormSection from './AccountFormSection'
import SetRecoveryInfoForm from './SetRecoveryInfoForm'
import SetRecoveryInfoContainer from './SetRecoveryInfoContainer'
import { requestCode, setupAccountRecovery, redirectToApp } from '../../actions/account';

class SetRecoveryInfo extends Component {
   state = {
      loader: false,
      phoneNumber: '',
      isLegit: false,
   }

   componentDidMount = () => {
      this.wallet = new Wallet()
   }

   handleChange = (e, { name, value }) => {
      this.setState(() => ({
         [name]: value,
         isLegit: this.isLegitField(name, value)
      }))
   }

   isLegitField(name, value) {
      // TODO: Use some validation framework?
      let validators = {
         phoneNumber: isValidPhoneNumber,
         securityCode: value => !!value.trim().match(/^\d{6}$/)
      }
      return validators[name](value);
   }

   handleSubmit = e => {
      e.preventDefault()

      if (!this.state.isLegit) {
         return false
      }

      const { dispatch } = this.props;
      if (!this.props.sentSms) {
         dispatch(requestCode(this.state.phoneNumber, this.props.accountId))
      } else {
         dispatch(setupAccountRecovery(this.state.phoneNumber, this.props.accountId, this.state.securityCode))
            .then(({error}) => {
               if (error) return

               dispatch(redirectToApp())
            })
      }
   }

   skipRecoverySetup = e => {
      const { dispatch } = this.props;
      dispatch(redirectToApp())
   }

   render() {
      const { loader } = this.state
      const combinedState = {
         ...this.props,
         ...this.state,
         isLegit: this.state.isLegit && !this.props.formLoader
      }
      return (
         <SetRecoveryInfoContainer loader={loader} location={this.props.location}>
            <AccountFormSection {...combinedState}>
               <SetRecoveryInfoForm
                  {...combinedState}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  skipRecoverySetup={this.skipRecoverySetup}
               />
            </AccountFormSection>
         </SetRecoveryInfoContainer>
      )
   }
}

const mapStateToProps = ({ account }, { match }) => {
   return {
      ...account,
      accountId: match.params.accountId
   }
}

export const SetRecoveryInfoWithRouter = connect(mapStateToProps)(SetRecoveryInfo)
