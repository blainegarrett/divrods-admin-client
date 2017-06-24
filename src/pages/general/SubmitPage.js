import React from 'react';
import TempExtras from '../../components/TempExtras';
import PageBase from '../PageBase';
import Footer from '../../components/layout/Footer';
import Separator from '../../components/layout/Separator';
import {Row, Col} from '../../lib/grid';

// TODO: FOR SOME REASON THIS IS ONLY RENDERED CLIENT SIDE; WE GET EMPTY SHELL - SUPER WIERD
export default class SubmitPage extends PageBase {

  populate_meta() {
    this.meta.title = 'Submit an Event';
    this.meta.description = 'Guide for how to submit an event to MPLSART.COM';
  }

  renderPage() {
    return (
      <div id="AboutPageWrapper">
        <Row>
          <Col xs={12} md={6}>
            <div className="padded-content">
              <div className="content">
                <h2><b>How to List Your Event</b></h2>

                <p className="lead">Listing your event with MPLSART.COM is a great way to attract more art lovers to your reception, gallery, business, or pop-up.</p>
                <p>To list your event on our site, please submit a press release or an email with the items in the "What We Need" section to <a href="mailto:calendar@mplsart.com">calendar@mplsart.com</a>. We'll review your submission and list your event within 2 weeks.</p>

                <h2>Submission Rules</h2>
                <p></p>
                <ul>
                  <li>We only list visual art events and events with a strong visual art component (e.g. a concert with an adjoining art show)</li>
                  <li>Events must take place within Minneapolis or St. Paul proper</li>
                  <li>Submissions must have some sort of public reception</li>
                  <li>Events must be open to the public and inclusive (e.g. Can't require membership, etc)</li>
                  <li>We sometimes list events that require an admission fee. However, we encourage you to <a href="mailto:calendar@mplsart.com">reach out to us</a> to purchase an advertisement or become an in-kind sponsor.</li>
                </ul>

                <h2>Tips</h2>
                <p></p>
                <ul>
                  <li>Include the important dates in the subject line of your email and we'll give it priority.</li>
                  <li>Adhere to the "What We Need" list for expedited review and ensure a high quality listing.</li>
                </ul>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="padded-content">
              <h2>What We Need</h2>
              <ul>
                <li>
                  <b>Title</b> - The name of the exhibition or an extremely short description.
                  <br/><small>Example: "Future Developments" or "Condolence - Ethan Arnold & Linnea M Doyle"</small>
                </li>

                <li>
                  <b>Summary</b> - A single sentence or blurb about the exhibition typically answering "what is the event." This is used as the description text for social media posts. Please keep it brief.
                  <br/><small>Example: "A group exhibition of abstract paintings curated by Jane Doe"</small>
                </li>

                <li>
                  <b>More Info Link</b> - A link to a place where visitors can find out more about the exhibition - typically on your own site or a Facebook event. We highly encourage you to have a permenant link on your own website that contains information about the exhibition.
                </li>


                <li>
                  <b>Description</b> - The primary text to describe the exhibition, the artwork, etc. Please keep this as concise and skimmable as possible. Give visitors a taste of what to expect, and if they want to read more about the event, they'll vist the "More Info Link" described above.
                </li>

                <li>
                  <b>Event Dates</b> - A list of important dates associated with the exhibition. Please include start and end dates and times as well as dates the exhibition can be seen. Feel free to mention gallery hours in the description above.
                  <br/><small>Example: "Opening Reception July 9th 6PM-9PM", "Artist Talk - July 10th 11AM-2PM", "On view July 9th - July 30th"</small>
                </li>

                <li>
                  <b>Cover Image</b> - Please include a web resolution JPEG or PNG at least 700px wide. This image will be cropped down to 700x367 pixels (the standard aspect ratio for social posts). Ideally this is an image of artwork from the exhibition void of text that isn't otherwise part of the artwork (i.e. no flyers).
                  <br/><small>
                  Use this template to to crop your images to (<a href="https://placeholdit.imgix.net/~text?txtsize=48&txt=700%C3%97367%0AEvent%20Image&w=700&h=367">download</a>)</small>
                </li>

                <li>
                  <b>Gallery/Venue Details</b> - Please include the name of the venue the event will take place at as well as an address. Also, please state if the venue is a gallery, popup, business, or (normally) private location.
                  <br/><small>Example: "Gamut Gallery -  717 S 10th St, Minneapolis", "Showroom - 615 W Lake St, Minneapolis (business)"</small>
                </li>

              </ul>

            </div>
          </Col>
        </Row>

        <br />
        <Separator className="with-margin"/>
        <TempExtras />
        <Footer />
      </div>
    );
  }
}