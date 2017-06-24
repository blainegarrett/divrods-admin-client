import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../../containers/PageLink';
import {Row, Col} from '../../../lib/grid';
import Footer from '../../../components/layout/Footer';
import { List, ListItem } from 'react-toolbox/lib/list';

import {InlineMap, build_google_map_url_for_venue} from '../../../modules/map';
import Separator from '../../../components/layout/Separator';
import LyftSlice from '../../../components/layout/LyftSlice';

import EventModule from '../../../modules/calendar/event';

const event1 = {"event_dates": [{"category": "reception", "end": "2016-11-11T01:00:00Z", "venue": {"website": "", "city": "Minneapolis", "name": "Regis Center For Art Quarter Gallery", "resource_id": "VmVudWUecmVnaXMtY2VudGVyLWZvci1hcnQtcXVhcnRlci1nYWxsZXJ5", "primary_image_resource_id": null, "country": "USA", "address2": "", "summary": "", "primary_image_resource": null, "email": "", "hours": null, "phone": "", "state": "MN", "address": "405 21st Ave S", "content": "", "resource_url": "https://www.mplsart.com/api/galleries/VmVudWUecmVnaXMtY2VudGVyLWZvci1hcnQtcXVhcnRlci1nYWxsZXJ5", "category": "gallery", "geo": [{"lat": 44.969387699999999, "lon": -93.242268700000011}], "slug": "regis-center-for-art-quarter-gallery", "resource_type": "Venue"}, "label": "Reception", "start": "2016-11-10T23:00:00Z", "type": "timed", "venue_slug": "regis-center-for-art-quarter-gallery"}, {"category": "ongoing", "end": "2016-11-19T06:00:00Z", "venue": {"website": "", "city": "Minneapolis", "name": "Regis Center For Art Quarter Gallery", "resource_id": "VmVudWUecmVnaXMtY2VudGVyLWZvci1hcnQtcXVhcnRlci1nYWxsZXJ5", "primary_image_resource_id": null, "country": "USA", "address2": "", "summary": "", "primary_image_resource": null, "email": "", "hours": null, "phone": "", "state": "MN", "address": "405 21st Ave S", "content": "", "resource_url": "https://www.mplsart.com/api/galleries/VmVudWUecmVnaXMtY2VudGVyLWZvci1hcnQtcXVhcnRlci1nYWxsZXJ5", "category": "gallery", "geo": [{"lat": 44.969387699999999, "lon": -93.242268700000011}], "slug": "regis-center-for-art-quarter-gallery", "resource_type": "Venue"}, "label": "Showing", "start": "2016-11-08T06:00:00Z", "type": "reoccurring", "venue_slug": "regis-center-for-art-quarter-gallery"}], "name": "Todd Clercx | Deeper Than Face Value", "resource_id": "RXZlbnQeHzU2NTE3ODQ2NDMxMTcwNTY", "url": "https://events.umn.edu/Online/default.asp?BOparam::WScontent::loadArticle::permalink=event_b&BOparam::WScontent::loadArticle::context_id=F9CD105E-75AF-4F33-A665-2E61DD24FF1D", "summary": "An exhibition of 12 large paintings by Minnesota artist Todd Clercx.", "content": "<p>The Quarter Gallery at Regis Center for Art presents <em>Deeper Than Face Value</em>, an exhibition of paintings by Minnesota artist Todd Clercx. Teaching art has helped Todd Clercx see individuals up close, and these relationships have deepened his understanding of the intersection of people and places. The 12 artworks in this exhibition are from a large body of work produced over the past decade. We often perceive people at face value; what face value knowledge of a person lacks is what inspires Clercx to ask questions. Knowing the history of his subjects has educated the artist to express their past and present emotions. Listening to and observing others who are not easily accepted or noticed drives how composition, color, light, and media are used in these paintings. Listening to each painting as it unfolds is vital to his process. Not over-directing, letting the image develop, and revisiting is essential to Clercx. The veneer is where some people live, unnoticed, under-respected and unequal. But this is not what they deserve -- their stories are rich in color and deeper than face value.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>About the Artist:&nbsp;</strong>Todd Clercx grew up in St. Paul, Minnesota and currently lives on a hobby farm in Wyoming, Minnesota with his significant other and three children. He raises cattle and chickens. His painting studio is a converted horse barn. A painting teacher for more than thirty years, he is also a prolific artist. Clercx has 500 paintings completed in storage, in addition to numerous commissions and a significant exhibition record. Flanders Gallery has represented the artist for over 10 years. When he&rsquo;s not painting, Todd Clercx restores old muscle cars and he is no stranger to the pool table.</p>\n", "primary_image_resource": {"modified_date": "2016-10-18T16:15:36Z", "versions": {"SIZED": "", "CARD_LARGE": "", "FULL": "", "CARD_SMALL": {"url": "https://storage.googleapis.com/cdn.mplsart.com/file_container/RmlsZUNvbnRhaW5lch4fMTcyMDAwMQ/card_small.png", "width": 700, "height": 367}, "THUMB": {"url": "https://storage.googleapis.com/cdn.mplsart.com/file_container/RmlsZUNvbnRhaW5lch4fMTcyMDAwMQ/thumb.png", "width": 160, "height": 160}}, "resource_id": "RmlsZUNvbnRhaW5lch4fMTcyMDAwMQ", "caption": null, "created_date": "2016-10-18T16:15:36Z", "resource_url": "https://www.mplsart.com/api/files/RmlsZUNvbnRhaW5lch4fMTcyMDAwMQ", "resource_type": "FileContainer"}, "featured": false, "primary_image_resource_id": "RmlsZUNvbnRhaW5lch4fMTcyMDAwMQ", "resource_url": "https://www.mplsart.com/api/events/RXZlbnQeHzU2NTE3ODQ2NDMxMTcwNTY", "slug": "todd-clercx-deeper-than-face-value", "resource_type": "Event"};
const event2 = {"event_dates": [{"category": "reception", "end": "2016-10-29T05:00:00Z", "venue": {"website": "http://www.citywideartists.com/", "city": "Minneapolis", "name": "City Wide Artists", "resource_id": "VmVudWUedmlzaW9uLW1vZGVsaW5nLWdyb3Vw", "primary_image_resource_id": null, "country": "USA", "address2": "", "summary": "", "primary_image_resource": null, "email": "", "hours": null, "phone": "612.359.0828", "state": "MN", "address": "1506 Nicollet Ave", "content": "", "resource_url": "https://www.mplsart.com/api/galleries/VmVudWUedmlzaW9uLW1vZGVsaW5nLWdyb3Vw", "category": "gallery", "geo": [{"lat": 44.968004100000002, "lon": -93.277813600000002}], "slug": "vision-modeling-group", "resource_type": "Venue"}, "label": "Reception", "start": "2016-10-29T00:00:00Z", "type": "timed", "venue_slug": "vision-modeling-group"}, {"category": "ongoing", "end": "2016-12-02T06:00:00Z", "venue": {"website": "http://www.citywideartists.com/", "city": "Minneapolis", "name": "City Wide Artists", "resource_id": "VmVudWUedmlzaW9uLW1vZGVsaW5nLWdyb3Vw", "primary_image_resource_id": null, "country": "USA", "address2": "", "summary": "", "primary_image_resource": null, "email": "", "hours": null, "phone": "612.359.0828", "state": "MN", "address": "1506 Nicollet Ave", "content": "", "resource_url": "https://www.mplsart.com/api/galleries/VmVudWUedmlzaW9uLW1vZGVsaW5nLWdyb3Vw", "category": "gallery", "geo": [{"lat": 44.968004100000002, "lon": -93.277813600000002}], "slug": "vision-modeling-group", "resource_type": "Venue"}, "label": "Showing", "start": "2016-10-28T05:00:00Z", "type": "reoccurring", "venue_slug": "vision-modeling-group"}], "name": "Itch | Christopher Sorenson, Llane Alexis, Jesse Nagamatsu", "resource_id": "RXZlbnQeHzU3MDUwOTc5Mzc5NDQ1NzY", "url": "http://www.citywideartists.com/datebook/2016/10/28/christopher-sorenson", "summary": "Group exhibition exploring the human condition with a percentage of proceeds going to support Kill Kancer and Minnesota AIDS Project", "content": "<p><strong>ITCH&nbsp;</strong>considers seeing versus looking, connection versus isolation.&nbsp; Presented together, each work ponders the powers of human trust and the journey towards a true heart.&nbsp; As a multi artist exhibition, ITCH explores the human condition at the soul level, pushing us to locate the common truths hidden so overtly within the lines of our faces.<br />\n&nbsp;</p>\n\n<p><strong>About the Artists</strong><br />\nMinnesota-based artist <strong>Christopher Sorenson&rsquo;s</strong> intuitive portraits of disease guide us through the terror of physical, and emotional pain.&nbsp; Moving beyond the chaos that can affect each one of us, we find triumph in the ever-healing body.&nbsp; An image of illness, putrid and horrifying, is made beautiful by transforming the dis-ease of energetic crisis.&nbsp; Inspired by first-hand testimonies of those willing to share, these Tarot-like paintings call out the specters of our own revival.</p>\n\n<p>Rebirth requires medicine, burnt sage, clean linens, the elements of comfort that soften the passageways of agony.&nbsp; For ITCH, the San Francisco-based Cuban artist<strong> Llane Alexis Dominguez</strong> has created&nbsp; healing dolls, loving totems&mdash;shields, the stuff we hold on to when we are afraid of the dark.&nbsp; Through the application of traditional textile methods to contemporary design, Llane offers uncanny objects stitched by hand.</p>\n\n<p>Socially, it seems that the way in which we perform the stories of our lives often betray true feelings and honest connection.&nbsp; MCAD alumni <strong>Jesse Nagamatsu</strong> captures intimacy through photorealistic portraits of friends and strangers pulled from the internet.&nbsp; Nagamatsu&rsquo;s modern approach to classical drawing communicates youth in all its power and fragility.&nbsp; His faces are placid, deep, suspicious as a lake&mdash;centering the entire exhibition in the human experience.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>For a Great Cause</strong><br />\nCity Wide Artists is proud to contribute a percentage of proceeds to the local charity&nbsp;<strong>Kill Kancer</strong>.&nbsp; We love Mary Beth Mueller and enjoy using art to help her continue the important work of education and prevention.&nbsp;&nbsp; Knowing the needs of his community, Christopher Sorenson also stepped up to the challenge, and will be donating a percentage of his earnings to the&nbsp;<strong>Minnesota AIDS Project</strong>.&nbsp; MAP is one of Minnesota&rsquo;s most cherished organizations&mdash;literally saving lives through education, prevention as well as economic and healthcare assistance for people living with HIV/AIDS.&nbsp; CWA is honored to partner with these artists to make a difference in our community.</p>\n\n<p><br />\nUse hashtag&nbsp;#cwaITCH</p>\n", "primary_image_resource": {"modified_date": "2016-10-26T18:09:04Z", "versions": {"SIZED": "", "CARD_LARGE": "", "FULL": "", "CARD_SMALL": {"url": "https://storage.googleapis.com/cdn.mplsart.com/file_container/RmlsZUNvbnRhaW5lch4fNDczMDAwMQ/card_small.png", "width": 700, "height": 367}, "THUMB": {"url": "https://storage.googleapis.com/cdn.mplsart.com/file_container/RmlsZUNvbnRhaW5lch4fNDczMDAwMQ/thumb.png", "width": 160, "height": 160}}, "resource_id": "RmlsZUNvbnRhaW5lch4fNDczMDAwMQ", "caption": null, "created_date": "2016-10-26T18:09:04Z", "resource_url": "https://www.mplsart.com/api/files/RmlsZUNvbnRhaW5lch4fNDczMDAwMQ", "resource_type": "FileContainer"}, "featured": false, "primary_image_resource_id": "RmlsZUNvbnRhaW5lch4fNDczMDAwMQ", "resource_url": "https://www.mplsart.com/api/events/RXZlbnQeHzU3MDUwOTc5Mzc5NDQ1NzY", "slug": "itch-christopher-sorenson-citywide-artists", "resource_type": "Event"};

// TODO: Open Graph place data..
export default class GalleryRenderer extends Component {
  render () {
    let resource = this.props.resource; // Assumed to be the verbose
    let summaryNode;

    // Summary
    if (resource.summary) {
      summaryNode = (<p className="lead">{resource.summary}</p>);
    }

    if (resource.is_premium_profile && !resource._meta.is_verbose) {
      console.error('This gallery has a premium profile, but we do not have the verbose resource.');
    }

    // TODO: Primary Image
   const image_url = "https://storage.googleapis.com/cdn.mplsart.com/file_container/RmlsZUNvbnRhaW5lch4fMTc1MDAwMQ/card_small.png";

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2>{ resource.name }</h2>
            { summaryNode }
            <p>&nbsp;</p>
          </Col>
        </Row>
        <Row><div className="full-width-image"><img src={image_url} className="img-responsive" /></div></Row>

        <Row>
          <Col xs={12} md={3}>

            <List selectable ripple>
            { resource.phone && <ListItem leftIcon="phone" caption={ resource.phone } /> }
            <ListItem leftIcon="near_me" caption="Downtown Minneapolis" />
            <ListItem leftIcon="place" caption={ resource.address + ' ' + resource.address2 } />
            {resource.website && <ListItem leftIcon="launch" caption={ resource.website.replace('www.', '').replace('http://', '').replace('/', '') } /> }
          </List>


        <div className="venue_social_icons social-icons">
          <div className="social-icons-container">
              <a href="https://www.facebook.com/mplsart" target="_new">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="https://twitter.com/mplsart" target="_new">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="http://instagram.com/mplsart" target="_new">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="http://instagram.com/mplsart" target="_new">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>

          </Col>

          <Col xs={12} md={5}>
            <InlineMap gallery={resource} />
            <p>&nbsp;</p>
            <div className="content" dangerouslySetInnerHTML={{__html: resource.content}} />
          </Col>


          <Col xs={12} md={4}>
            <div className="panel-events">
              <div className="panel-container">

                <div className="panel-header">Now Showing</div>
                <div className="panel-content">

                  <Col xs={12} key="event-resource-1">
                    <div className="card hoverable">
                      <EventModule.Goober resource={ event1 } ed_filter="timed" renderer={ EventModule.PodRenderer } />
                    </div>
                  </Col>

                </div>
              </div>
            </div>

            <div className="panel-events">
              <div className="panel-container">

                <div className="panel-header">Upcoming Events</div>
                <div className="panel-content">

                <List selectable ripple>
                        <ListItem
                          avatar='https://storage.googleapis.com/cdn.mplsart.com/written/temp/spac_1_Jon_Reischl.jpg'
                          caption='Todd Clercx | Deeper Than Face Value'
                          legend="Thu Nov 10th 5PM - 7PM"
                        />
                        <ListItem
                          avatar='https://storage.googleapis.com/cdn.mplsart.com/written/temp/spac_1_Jon_Reischl.jpg'
                          caption='Todd Clercx | Deeper Than Face Value'
                          legend="Thu Nov 10th 5PM - 7PM"
                        />
                </List>

                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Separator className="with-margin" />
        <LyftSlice />

      </div>
    );
  }
}
GalleryRenderer.propTypes = {
  //resource: PropTypes.object //TODO: Make this required .isRequired
}