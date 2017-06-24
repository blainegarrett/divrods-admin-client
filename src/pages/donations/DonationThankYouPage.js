import React from 'react';
import TempExtras from '../../components/TempExtras';
import PageBase from '../PageBase';
import Footer from '../../components/layout/Footer';
import Separator from '../../components/layout/Separator';
import PageLink from '../../containers/PageLink';

import {Row, Col} from '../../lib/grid';
import { Button } from 'react-toolbox/lib/button';

// TODO: FOR SOME REASON THIS IS ONLY RENDERED CLIENT SIDE; WE GET EMPTY SHELL - SUPER WIERD
export default class DonationThankYouPage extends PageBase {

  populate_meta() {
    this.meta.title = 'Thank You!';
    this.meta.description = 'Thank you for being a champion of the Twin Cities art scene.';
  }

  renderPage() {
    return (
      <div id="AboutPageWrapper">
        <Row>
          <Col xs={12} md={12}>
            <div className="padded-content">
              <h2><b>Thank you for being a champion of the Twin Cities art scene</b></h2>
              <p className="lead">We’ll put your kind gift to good use.</p>

            <p>&nbsp;</p>
            <p><b>Do your friends love art, too?</b><br />  Share <a href="/donations/">Our Donation Page</a></p>

            </div>

            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </Col>
        </Row>

        <Separator className="with-margin" />
        <TempExtras />
        <Footer />
      </div>
    );
  }
}