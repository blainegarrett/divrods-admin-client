import React from 'react';
import PageBase from '../PageBase';
import Footer from '../../components/layout/Footer';
import Separator from '../../components/layout/Separator';

import {Row, Col} from '../../lib/grid';
import { Button } from 'react-toolbox/lib/button';
import theme from '../../theme/GiantButton.scss';

export default class DonationMainPage extends PageBase {

  populate_meta() {
    this.meta.title = 'Love What We Do? Leave a Tip.';
    this.meta.description = 'MPLSART.COM is important to us and to a whole bunch of people like you looking for art in the Twin Cities. Help us keep the lights on and keep building someting even better.';
  }

  renderPage() {
    return (
      <div id="AboutPageWrapper">
        <Row>
          <Col xs={12} md={12}>
            <div className="padded-content">
              <div className="content">
                <h2>Love What We Do?</h2>
                <p className="lead">
                  This site is important to us and to a whole bunch of people like you looking for art in the Twin Cities. Help us keep the lights on and keep building someting even better.
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <div className="padded-content">
              <div className="content">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>

                <div style={{textAlign:"center"}}>
                  <Button theme={theme} raised primary href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6BDWG933SYP6W' target='_blank'>Donate Now</Button>
                </div>

                <p>&nbsp;</p>
                <p style={{textAlign:"center"}}><small>Secure payment processing provided by PayPal</small></p>

                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>

              </div>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="padded-content">
              <div className="content">

                <p style={{marginBottom:'15px'}}><b>Your contributions directly fund this website</b></p>

                <p style={{marginBottom:'15px'}}>We're committed to paying writers and contributors for their work.</p>
                <p style={{marginBottom:'15px'}}>We are creating a sustainable business model for arts promotion and support within the local community.</p>
                <p style={{marginBottom:'15px'}}>Help us cover costs and web hosting fees for the site.</p>
                <p style={{marginBottom:'15px'}}>All current and future projects serve to get more people to view and buy art locally.</p>
              </div>

              <p>&nbsp;</p>

              <p>&nbsp;</p>
            </div>
          </Col>

        </Row>

        <Separator className="with-margin" />
        <Footer />
      </div>
    );
  }
}