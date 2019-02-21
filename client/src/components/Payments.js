import React , { Component } from 'react';
import StripCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {

    render(){
        return (
            <StripCheckout
                name="Pay Emaily"
                description="5$ for 5 emails credits"
                amount={500}
                token={ token => this.props.handleToken(token) }
                stripeKey={ process.env.REACT_APP_STRIPE_KEY}
              >
              <button className="btn">Add credits</button>
              </StripCheckout>
        );
    }
}

export default connect(null, actions )(Payments);
