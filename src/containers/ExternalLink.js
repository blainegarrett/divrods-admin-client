import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import { layoutCloseMenu } from '../actions';
import { record_event } from '../analytics';

/* Component that renders a link with some additional click handlers for analytics and menu closing etc */
// TODO: This is nearly identicle with ../PageLink - perhaps they can share a common base handler
// TODO: If navigating a way from the page in a new tab, open up an ad or something for when they return
class ExternalLink extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        //e.preventDefault(); //Uncomment this to test handler; route won't change


        // Determine Analytics properties
        const anchor = e.currentTarget;
        let ga_category = anchor.getAttribute('data-ga-category');
        let ga_action = anchor.getAttribute('data-ga-action');
        let ga_label = anchor.getAttribute('data-ga-label');

        if (!ga_category) {
            ga_category = 'external-link';
        }
        if (!ga_action) {
            ga_action = anchor.href;
        }

        if (!ga_label) {
            ga_label = anchor.text;
        }

        // Record Analytic Event for the Click
        record_event(ga_category, ga_action, ga_label, 1)

        // Close the menu
        this.props.layoutCloseMenu();
      }

    render() {
        const { layoutCloseMenu, ...anchor_props } = this.props;
        return (<a onClick={ this.clickHandler } {...anchor_props} />);
    }
}

ExternalLink.propTypes = {
    // Injected by React Redux
    layoutCloseMenu: PropTypes.func.isRequired,

    // Injected by React Router
    children: PropTypes.node.isRequired
}

export default connect(null, { layoutCloseMenu })(ExternalLink);