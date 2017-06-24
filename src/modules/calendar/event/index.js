import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from '../../../containers/PageLink';
import moment from 'moment-timezone/builds/moment-timezone.min';
import {get_runtime_constants, CENTRAL_TIMEZONE} from '../../../constants';
import NiceDate from '../../../components/utils/NiceDate';

function sort_helper(ed1, ed2) {
    return moment(ed1.start) - moment(ed2.start)
}

class PodRenderer extends Component {

    generate_image (img_resource, link_url, alt_text) {
        /* Generate "fixed" size image container to prevent resizing after images load */
        let w = img_resource.width;
        let h = img_resource.height;

        // Calculate % height to 2 decimal places
        let scale_h = Math.floor(100 * h/w * 100.00) /100.00;

        const styles = {'padding': scale_h + '% 0 0 0' };

        let image_url = img_resource.url;

        return (
            <div className="card-image fixed-size">
                <PageLink to={ link_url } data-ga-category="event-pod-click" data-ga-label="image" title={ alt_text } style={ styles }>
                    <img src={image_url} className="img-responsive" title={alt_text} />
                </PageLink>
            </div>
        );
    }

    render() {
        let resource = this.props.resource;
        let image;
        let post_url = '/events/' + resource.slug; //e.url;

        let target_event_date = this.props.goober.get_goodest_eventdate(resource, this.props.ed_filter);


        if (resource.primary_image_resource) {
            let img_resource = resource.primary_image_resource.versions.CARD_SMALL;
            image = this.generate_image(img_resource, post_url, resource.name);
        }

        let addressNodes;

        if (target_event_date.venue.multiple_locations_label) {
            addressNodes = (
                <div>
                    <div className="card-detail event-venue-name">Various Locations</div>
                    <div className="card-detail event-address">{target_event_date.venue.multiple_locations_label }</div>
                </div>
            );
        } else {
            addressNodes = (
                <div>
                    <div className="card-detail event-venue-name">{target_event_date.venue.name}</div>
                    <div className="card-detail event-address">{target_event_date.venue.address + ', ' + target_event_date.venue.city }</div>
                </div>
            );
        }


        return (
            <div className="card-container">
                <div className="card-header">
                    { image }
                </div>
                <div className="card-content">
                    <div className="card-title"><PageLink to={ post_url } data-ga-category="event-pod-click">{resource.name }</PageLink></div>

                    <div className="card-detail event-time">
                        <NiceDate start={ target_event_date.start } end={ target_event_date.end } eventdate_type={ target_event_date.type } />
                    </div>
                    { addressNodes }

                </div>
            </div>
        );
    }
}


class FeaturedHeroRenderer extends Component {
    render () {
        const resource = this.props.resource;
        const target_event_date = this.props.goober.get_goodest_eventdate(resource, this.props.ed_filter);

        let image_url = '';

        if (resource.primary_image_resource) {
            image_url = resource.primary_image_resource.versions.CARD_SMALL.url;
        }

        let styles = { 'backgroundImage' : 'url(' + image_url + ')'};

        let event_url = '/events/' + resource.slug;

        let start = moment(Date.parse(target_event_date.start));
        let rendered_date = start.tz(CENTRAL_TIMEZONE).format('ddd, MMM Do'); // always render in CST

        return (
            <div className="jive-card">
                <div className="jive-card-image">
                    <PageLink to={ event_url } data-ga-category="featured-pod-click" data-ga-label={ resource.name } style={ styles }>
                        <div className="jive-card-title">
                            <br />
                            <div className="date">{ rendered_date }</div>
                            <div className="title">{ resource.name }</div>
                        </div>
                    </PageLink>
                </div>
            </div>);
    }
}

class Goober extends Component {
    /* Goober for Events - handles listners, etc */

    get_goodest_eventdate(e, ed_filter) {
        // TODO: This should really use this.state.resource
        // TODO: If there are multiple dates with the same ed_filter, only the 1st will be displayed

        var target_event_date = null;

        // Figure out the best event Date to display
        var sorted_event_dates = e.event_dates.sort(sort_helper);

        if (ed_filter) {
            for (var i in sorted_event_dates) {
                if (sorted_event_dates[i].type == ed_filter) {
                    target_event_date = sorted_event_dates[i];
                    break;
                }
            };

            // This is mostly for debugging...
            if (!target_event_date) {
                target_event_date = e.event_dates[0];
                console.error('Warning: Failed to find an ed for the below event with a ed.type matching "' + ed_filter  + '". Defaulting to first found one. ');
                console.error(this.state);
            };
        }
        else {
            // No targeted date so lets find the soonest one that hasn't happened yet

            var reoccurring;
            var now = get_runtime_constants().today_end_date_utc;
            var ed;

            for (var i in sorted_event_dates) {
                ed = sorted_event_dates[i];
                if (ed.type == 'timed' && moment(ed.start) > now) {
                    target_event_date = ed;
                    break;
                }
                if (ed.type == 'reoccurring') {
                    reoccurring = ed;
                }
            }

            if (!target_event_date) {
                if (reoccurring) {
                    target_event_date = reoccurring;
                }
                else {
                    // Event is in the past and there are no reoccurring dates??
                    target_event_date = sorted_event_dates[0]
                }
            }
        }
        return target_event_date;

    }

    render() {

        var props = {
            resource: this.props.resource,
            ed_filter: this.props.ed_filter,
            render_admin_contols: this.props.render_admin_contols,
            goober: this
        };

        return React.createElement(this.props.renderer, props)
    }

}


export default {
    Goober,
    FeaturedHeroRenderer,
    PodRenderer
}