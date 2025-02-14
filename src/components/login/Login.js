import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { Wallet } from '../../utils/wallet'

import LoginContainer from './LoginContainer'
import LoginForm from './LoginForm'
import { handleRefreshAccount, handleRefreshUrl } from '../../actions/account'

class Login extends Component {
   state = {
      dropdown: false
   }

   componentDidMount = () => {
      this.wallet = new Wallet()
      this.props.handleRefreshUrl(this.props.location)
      this.props.handleRefreshAccount(this.wallet, this.props.history)
   }

   handleOnClick = () => {
      this.setState({
         dropdown: !this.state.dropdown
      })
   }

   handleDeny = e => {
      e.preventDefault();
      if (this.props.account.url.failure_url) {
         window.location.href = this.props.account.url.failure_url
      }
   }

   handleAllow = e => {
      e.preventDefault()
      this.wallet.addAccessKey(this.props.account.accountId, this.props.account.url.contract_id, this.props.account.url.public_key, this.props.account.url.success_url);
   }

   handleSelectAccount = accountId => {
      this.wallet.selectAccount(accountId)
      this.props.handleRefreshAccount(this.wallet, this.props.history)
   }

   redirectCreateAccount = () => {
      this.wallet.redirectToCreateAccount({}, this.props.history)
   }

   render() {
      const { account } = this.props

      return (
         <LoginContainer
            loader={account.loader}
            appTitle={account.url && account.url.app_title}
         >
            {account.accountId && (
               <LoginForm
                  {...this.state}
                  handleOnClick={this.handleOnClick}
                  handleDeny={this.handleDeny}
                  handleAllow={this.handleAllow}
                  handleSelectAccount={this.handleSelectAccount}
                  redirectCreateAccount={this.redirectCreateAccount}
               />
            )}
         </LoginContainer>
      )
   }
}

const mapDispatchToProps = {
   handleRefreshAccount,
   handleRefreshUrl
}

const mapStateToProps = ({ account }) => ({
   account
})

export const LoginWithRouter = connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(Login))
