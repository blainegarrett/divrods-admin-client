import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RELAUNCH_DATE, CENTRAL_TIMEZONE} from '../../../constants';
import moment from 'moment-timezone/builds/moment-timezone.min';
import ContentHeaderImage from '../../../components/layout/ContentHeaderImage';

export default class Article extends Component {
  render () {
    const r = this.props.resource; // TODO: Handle case where it doesn't exist...?

    // Determine published date
    const published_date_obj = moment(Date.parse(r.published_date)).tz(CENTRAL_TIMEZONE);
    const published_date = published_date_obj.format('MMMM Do, YYYY');

    // Summary
    let summary;
    if (r.summary) {
      summary = (<p className="lead"> { r.summary } </p>);
    }

    // Archive notice
    let archive_notice;
    if (published_date_obj.diff(RELAUNCH_DATE) < 0 ) {
      archive_notice = (
        <div className="alert alert-warning">
          This article has been archived from the original MPLSART.COM site.
          It may contain dead links, broken images, and formatting issues.
          We are working to fix these as much as possible. Thank you for your patience.
        </div>
      );
    }

    let edit_link;
    if (this.props.render_admin_contols) {
      edit_link = <a href={'/admin/blog/' + r.resource_id + '/edit'} target="_blank">edit</a>
    }

    return (
      <div>
        <ContentHeaderImage resource={r.primary_image_resource} caption={ r.title } />

        { edit_link }
        <div className="padded-content">
          <h2>{ r.title }</h2>
          <p className="blog-post-meta">
            Posted { published_date } by <a href={r.author_resource.website} target="_new">{ r.author_resource.firstname } { r.author_resource.lastname }</a>
            <br />
            {/* <PageLink to={"/written/author/" + r.author_resource.resource_id}>{ r.author_resource.firstname } { r.author_resource.lastname }</PageLink> */}
          </p>
          { summary }

          <div className="article-content-container" dangerouslySetInnerHTML={{__html: r.content }}></div>
          { archive_notice }
          <br />
        </div>
      </div>
      );
    }
}


Article.propTypes = {
  // Injected by React Redux
  render_admin_contols: PropTypes.bool,
  resource: PropTypes.object.isRequired
}