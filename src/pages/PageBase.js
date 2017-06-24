import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { DEFAULT_META, PAGE_TYPES } from '../constants';

export default class PageBase extends Component {
  /* Base Page class to handle some standard things and abstract out the React Lifecycle Methods
   Note: Page View analytics are bound only in client.js
   */
  constructor(props) {
    super(props);
    // Default Meta Values
    this.meta = {
      title: 'MPLSART.COM',
      description: 'The best visual art events in Minneapolis and St. Paul',
      image: DEFAULT_META.CARD_IMAGE,
      imageHeight: DEFAULT_META.CARD_HEIGHT,
      imageWidth: DEFAULT_META.CARD_WIDTH,
      type: PAGE_TYPES.WEBSITE
    }
  }
  componentDidMountOrUpdate() {
    // Called when PageComponent initially loads or transitions to new url params
    this.pageDidLoad()
  }
  // React Component Lifecycle Methods
  componentDidMount () {
    // Called only on initial component load - not on page transitions
    this.componentDidMountOrUpdate()
    this.pageDidMount()
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate on Page');
    this.componentDidMountOrUpdate()
    this.pageDidUpdate()
  }
  // Page Lifecycle Methods to be Implemented by Child page class
  pageDidLoad () {
    // indirectly called by componentDidMount or componentDidUpdate
  }
  pageDidUpdate () { }
  pageDidMount () { }

  populate_meta () {
    // To override meta in a child page, implement populate_meta() on the child class
    return;
  }
  render() {
    // Render for component lifecycle, this calls child's renderPage() method
    this.populate_meta();

    // Setup Meta Tags ....
    let tags = {title: 'MPLSART.COM', meta: []};

    // Title
    tags['title'] = this.meta.title;
    tags['meta'].push({'property': 'og:title', 'content': this.meta.title});
    tags['meta'].push({'itemProp': 'name', 'content': this.meta.title});

    // Description
    tags['meta'].push({'name': 'description', 'content': this.meta.description});
    tags['meta'].push({'property': 'og:description', 'content': this.meta.description});
    tags['meta'].push({'itemProp': 'description', 'content': this.meta.description});

    // Images
    tags['meta'].push({'name': 'image', 'content': this.meta.image});
    tags['meta'].push({'property': 'og:image', 'content': this.meta.image});
    tags['meta'].push({'property': 'og:image:height', 'content': this.meta.imageHeight});
    tags['meta'].push({'property': 'og:image:width', 'content': this.meta.imageWidth});

    //Keywords - TODO: Not currently dynamic
    tags['meta'].push({'name': 'keywords', 'content': 'minneapolis, st. paul, art, galleries, art openings, painting, jive'});

    // Twitter Specific - Note: Twitter summary card with large image must be at least 280x150px
    tags['meta'].push({'name': 'twitter:card', 'content': 'summary_large_image'});
    tags['meta'].push({'name': 'twitter:site', 'content': '@mplsart'});
    tags['meta'].push({'name': 'twitter:title', 'content': this.meta.title});
    tags['meta'].push({'name': 'twitter:description', 'content': this.meta.description});
    tags['meta'].push({'name': 'twitter:creator', 'content': '@mplsart'});
    tags['meta'].push({'name': 'twitter:image:src', 'content': this.meta.image});

    // Facebook/OpenGraph specific
    tags['meta'].push({'property': 'fb:app_id', 'content': '160730564113215'});
    tags['meta'].push({'property': 'og:type', 'content': this.meta.type});
    tags['meta'].push({'property': 'og:site_name', 'content': 'MPLSART.COM'});
    tags['meta'].push({'property': 'og:locale', 'content': 'en_US'});

    if (this.meta.author) {
      tags['meta'].push({'name': 'author', 'content': this.meta.author});
      tags['meta'].push({'property': 'author', 'content': this.meta.author});
    }


    /*
     <!-- Open Graph data -->
     <meta property="og:title" content="Title Here" />
           <meta property="og:type" content="article" />
        <meta property="og:url" content="http://www.example.com/" />
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:description" content="Description Here" />
        <meta property="og:site_name" content="Site Name, i.e. Moz" />
        <meta property="article:published_time" content="2013-09-17T05:59:00+01:00"  />
        <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00"  />
        <meta property="article:section" content="Article Section"  />
        <meta property="article:tag" content="Article Tag"  />
        <meta property="fb:admins" content="Facebook numberic ID"  />
        */

    return (
      <div className="jivewrapper">
        <Helmet { ...tags } />
        { this.renderPage() }
      </div>
    );
  }
}