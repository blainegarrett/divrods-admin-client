// Render a view of the artwork loaded into state.miacollections.miaArtworkItem
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';

class ArtworkItemSidebarComponent extends Component {
  render() {
    if (this.props.item && this.props.item.id ) { // Handler returns null for unknown artwork but doesn't fail
      const item = this.props.item;
      return (
        <div style={{padding: '2rem'}}>
          <Card raised={ false } style={{width: '100%'}}>
            <CardTitle
              avatar={'https://1.api.artsmia.org/' + item.id + '.jpg'}
              title={ item.title }
              subtitle={'Id: ' + item.id + ' | ' + item.artist + ' | Location: ' + item.room }
            />

            <CardMedia aspectRatio="square" image={'https://1.api.artsmia.org/' + item.id + '.jpg'} />

            <CardActions>
              <Button onClick={() => (window.open('https://collections.artsmia.org/art/' + item.id + '/','_blank')) } label="View in Mia Collections" />
            </CardActions>
          </Card>
        </div>
      );
    }

    // Else return default state...
    return (<div style={{padding: '2rem', 'textAlign': 'center'}}>This does not appear to be a valid artwork in the collection. Id: { this.props.artwork_id }</div>);
  }
}


function mapStateToProps(state) {
  return {item: state.miacollections.miaArtworkItem};
}

export default connect(
  mapStateToProps,
)(ArtworkItemSidebarComponent);

ArtworkItemSidebarComponent.propTypes = {
  artwork_id: PropTypes.string,
  item: PropTypes.object,
  artworkState: PropTypes.object,
};