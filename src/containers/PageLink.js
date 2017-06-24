import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/components/connect';
import { Link } from 'react-router';
import { layoutCloseMenu } from '../actions';
import { record_event } from '../analytics';


/* Component that renders a ReactRounter.Link with some additional click handlers for analytics and menu closing etc */
class PageLink extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        // e.preventDefault(); //Uncomment this to test handler; route won't change

        // Determine Analytics properties
        const anchor = e.currentTarget;
        let ga_category = anchor.getAttribute('data-ga-category');
        let ga_action = anchor.getAttribute('data-ga-action');
        let ga_label = anchor.getAttribute('data-ga-label');

        if (!ga_category) {
            ga_category = 'link';
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
        if (!this.props.to || this.props.to == '') {
            anchor_props.to = '#'; // This is to prevent null links from preventing page loads...
        }
        return (<Link onClick={ this.clickHandler } {...anchor_props} />);
    }
}

PageLink.propTypes = {
  // Injected by React Redux
  layoutCloseMenu: PropTypes.func.isRequired,

  // Injected by React Router
  children: PropTypes.node.isRequired
}

export default connect(null, { layoutCloseMenu })(PageLink);