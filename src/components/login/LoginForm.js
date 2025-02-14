import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Grid, Segment, List, Form, Button } from 'semantic-ui-react'

import AddBlueImage from '../../images/icon-add-blue.svg'
import ArrowDownImage from '../../images/icon-arrow-down.svg'
import ArrowUpImage from '../../images/icon-arrow-up.svg'
import AccountGreyImage from '../../images/icon-account-grey.svg'

import styled from 'styled-components'

const CustomGrid = styled(Grid)`
   && button {
      width: 190px;
      height: 60px;
      border-radius: 30px;
      border: 4px solid #0072ce;

      background: #0072ce;
      margin: 0 0 0 0;

      font-size: 18px;
      color: #fff;
      letter-spacing: 2px;

      :hover {
         background: #fff;
         color: #0072ce;
      }
      :disabled {
         border: 4px solid #e6e6e6;
         background: #e6e6e6;
      }
      :active,
      :focus {
         background: #fff;
         color: #0072ce;
      }
   }

   && .deny {
      width: 190px;
      height: 60px;
      border-radius: 30px;
      border: 4px solid #e6e6e6;

      background: transparent;

      font-size: 18px;
      color: #999;
      letter-spacing: 2px;

      margin: 0 0 0 0;

      :hover {
         border: 4px solid #0072ce;
         color: #0072ce;
      }
      :active,
      :focus {
         border: 4px solid #0072ce;
         color: #0072ce;
      }
   }

   .segment {
      width: 100%;
      padding: 0px;
      margin: 0px;
   }

   .dropdown-list {
      width: 100%;
      position: relative;
      cursor: pointer;

      .element {
         width: 100%;
         min-height: 64px;
         border: solid 4px #24272a;
         margin: 0px;
         padding: 0px;

         background: #fff;

         :hover {
            background: #f8f8f8;
         }
         .img {
            float: left;
            width: 56px;
            height: 56px;
            background-color: #d8d8d8;
            background-image: url(${AccountGreyImage});
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 36px 36px;
         }
         .name {
            margin-top: 12px;
            margin-left: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
         }
         .arrow {
            float: right;
            width: 56px;
            height: 56px;
            background-image: url(${ArrowDownImage});
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 24px auto;

            &.up {
               background-image: url(${ArrowUpImage});
            }
         }
      }
      .trigger {
         display: flex;
      }
      .dropdown {
         .element {
            margin-top: -4px;
            display: flex;
         }
      }
      .create-account {
         width: 100%;
         min-height: 64px;
         border: solid 4px #24272a;
         margin: 0px;
         padding: 0px;
         cursor: pointer;

         background: #24272a;

         :hover {
         }
         .img {
            float: left;
            width: 56px;
            height: 56px;
            background-image: url(${AddBlueImage});
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 24px 24px;
         }
         .name {
            float: left;
            margin-top: 12px;
            margin-left: 18px;
         }
         .arrow {
         }
      }
   }

   @media screen and (max-width: 767px) {
      && {
         button,
         .deny {
            width: 140px;
            border-radius: 35px;
         }

         .buttons,
         .dropdown {
            .column {
               padding: 0px;
            }
         }
      }
   }
`

const LoginForm = ({
   dropdown,
   account,
   handleOnClick,
   handleDeny,
   handleAllow,
   handleSelectAccount,
   redirectCreateAccount
}) => (
   <CustomGrid>
      <Grid.Row className='dropdown'>
         <Grid.Column largeScreen={5} computer={4} tablet={3} mobile={16} />
         <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
            <Segment className='dropdown-list' onClick={handleOnClick} basic>
               <List verticalAlign='middle' className={`element trigger`}>
                  <List.Item className='img' />
                  <List.Item as='h3' className='name'>
                     @{account.accountId}
                  </List.Item>
                  <List.Item className={`arrow ${dropdown ? 'up' : ''}`} />
               </List>

               <Segment basic className={`dropdown ${dropdown ? '' : 'hide'}`}>
                  {Object.keys(account.accounts)
                     .filter(a => a !== account.accountId)
                     .map((account, i) => (
                        <List
                           key={`lf-${i}`}
                           onClick={() => handleSelectAccount(account)}
                           className='element'
                        >
                           <List.Item className='img' />
                           <List.Item as='h3' className='name'>
                              @{account}
                           </List.Item>
                        </List>
                     ))}
                  <List
                     onClick={redirectCreateAccount}
                     className='create-account'
                  >
                     <List.Item className='img' />
                     <List.Item className='h3 name color-seafoam-blue'>
                        Create New Account
                     </List.Item>
                  </List>
               </Segment>
            </Segment>
         </Grid.Column>
         <Grid.Column largeScreen={5} computer={4} tablet={3} mobile={16} />
      </Grid.Row>
      <Grid.Row className={`buttons ${dropdown ? 'hide' : ''}`}>
         <Grid.Column largeScreen={5} computer={4} tablet={3} mobile={16} />
         <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
            <Form action={account.url.success_url}>
               <input
                  type='hidden'
                  name='authToken'
                  value={account.authToken}
               />
               <input
                  type='hidden'
                  name='accountId'
                  value={account.accountId}
               />
               <Button className='deny' onClick={handleDeny}>
                  DENY
               </Button>
               <Button floated='right' onClick={handleAllow}>
                  ALLOW
               </Button>
            </Form>
         </Grid.Column>
         <Grid.Column largeScreen={5} computer={4} tablet={3} mobile={16} />
      </Grid.Row>
   </CustomGrid>
)

LoginForm.propTypes = {
   dropdown: PropTypes.bool.isRequired,
   handleOnClick: PropTypes.func.isRequired,
   handleDeny: PropTypes.func.isRequired,
   handleSelectAccount: PropTypes.func.isRequired,
   redirectCreateAccount: PropTypes.func.isRequired
}

const mapStateToProps = ({ account }) => ({
   account
})

export default connect(mapStateToProps)(LoginForm)
