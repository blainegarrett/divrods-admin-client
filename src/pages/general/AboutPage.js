import React from 'react';
import TempExtras from '../../components/TempExtras';
import PageBase from '../PageBase';
import Footer from '../../components/layout/Footer';
import Separator from '../../components/layout/Separator';
import PageLink from '../../containers/PageLink';

import {Row, Col} from '../../lib/grid';

// TODO: FOR SOME REASON THIS IS ONLY RENDERED CLIENT SIDE; WE GET EMPTY SHELL - SUPER WIERD
export default class AboutPage extends PageBase {

  populate_meta() {
    this.meta.title = 'About Us';
    this.meta.description = 'MPLSART.COM\'s mission is to promote visual art events in the Twin Cities.';
  }

  renderPage() {
    return (
      <div id="AboutPageWrapper">
        <Row>
          <Col xs={12} md={6}>
            <div className="padded-content">
              <h2><b>About</b></h2>
              <p className="lead">MPLSART.COM’s mission is to promote visual art events in the Twin Cities.</p>
              <p>The site is maintained purely in support of local art. It makes events accessible to a broad audience by providing a single source for a variety of listings and related information.</p>
              <p>Success is more people in attendance at art events, stronger sales of local art, and an open creative community that welcomes all art enthusiasts.</p>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="padded-content">
              <h2>History</h2>
              <p>MPLSART.COM was founded in 2005 by the incomparable designer/curator, Emma Berg. She saw a need for a consolidated, curated listing of important art events in the Twin Cities. In 2006, Emma was joined by fellow arts advocate, Kristoffer Knutson. Together, they ran the site and curated a host of exhibits and creativity-infused events. It was a work of passion, blood, sweat and so on.</p>

              <h2><b>Evolution</b></h2>
              <p>Ten years after the original launch, MPLSART.COM lives on under <PageLink to="/written/2015/01/new_beginnings_for_mplsart/">Blaine and Katie Garrett</PageLink>. The new owners are driven by sincere devotion to promoting the local scene. The re-build has just begun and the site will continue to evolve as a platform for event listings, discussions, artist promotion, and celebrating local success.</p>

              <br />

            </div>
          </Col>
        </Row>

        <Separator className="with-margin" />
        <TempExtras />
        <Footer />
      </div>
    );
  }
}