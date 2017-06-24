// Advertisement Redux Reducer
import * as ActionTypes from './actions';

// Temp pre-loaded data
const temp_advert_resources = {
    /*'mpls70s-1': {
        resource_type: 'Advert',
        advert_label: 'mpls70s-1',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/dt_amazon_ad1.jpg',
        goto_url: 'http://www.amazon.com/gp/product/0873519922/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0873519922&linkCode=as2&tag=mc09e-20&linkId=2SUJXMBJ2ZBY52QG',
        advert_description: 'Minneapolis in the 70s by Mike Evangelist - Full book cover',
        image_width: 588,
        image_height: 666

    },

    'mpls70s-2': {
        resource_type: 'Advert',
        advert_label: 'mpls70s-2',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/dt_amazon_ad2.jpg',
        goto_url: 'http://www.amazon.com/gp/product/0873519922/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0873519922&linkCode=as2&tag=mc09e-20&linkId=2SUJXMBJ2ZBY52QG',
        advert_description: 'Minneapolis in the 70s by Mike Evangelist',
        image_width: 588,
        image_height: 666
    },
    'lyft-v01-a': {
        resource_type: 'Advert',
        advert_type_label: 'exclusive offer',
        advert_label: 'lyft-v01-a',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/lyft_homepage_ad_v01_A.jpg',
        goto_url: 'https://www.lyft.com/invite/MPLSART',
        advert_description: 'Get your first ride free with lyft - Grey',
        image_width: 700,
        image_height: 968
    },
    */
    'lyft-v01-b': {
        resource_type: 'Advert',
        advert_type_label: 'exclusive offer',
        advert_label: 'lyft-v01-b',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/lyft_homepage_ad_v01_B.png',
        goto_url: 'https://www.lyft.com/invite/MPLSART',
        advert_description: 'Get your first ride free with lyft - Blue',
        image_width: 700,
        image_height: 968
    },
    'artist_as_culture_producer1': {
        resource_type: 'Advert',
        advert_type_label: 'advertisement',
        advert_label: 'artist_as_culture_producer1',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/artist_as_culture_producer1.jpg',
        goto_url: 'https://www.amazon.com/gp/product/1783207264/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=mc09e-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=1783207264&linkId=0c98feb5d1814089d59243d3c483c15b',
        advert_description: 'The Artist as Culture Producer - edited by Sharon Louden',
        image_width: 588,
        image_height: 666
    },
    /*
    'artist_as_culture_producer2.jpg': {
        resource_type: 'Advert',
        advert_type_label: 'advertisement',
        advert_label: 'artist_as_culture_producer2.jpg',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/artist_as_culture_producer2.jpg',
        goto_url: 'https://www.amazon.com/gp/product/1783207264/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=mc09e-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=1783207264&linkId=0c98feb5d1814089d59243d3c483c15b',
        advert_description: 'The Artist as Culture Producer - edited by Sharon Louden',
        image_width: 588,
        image_height: 666
    },
    */
    '2017_spring_promo__showroom_ad_v01a' : {
        resource_type: 'Advert',
        advert_type_label: 'sponsor',
        advert_label: '2017_spring_promo__showroom_ad_v01',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/2017_spring_promo__showroom_ad_v01.jpg',
        goto_url: 'http://showroommpls.com/?from=mplsart',
        advert_description: 'Showroom 2017 spring adspot',
        image_width: 700,
        image_height: 968
    },
    '2017_spring_promo__showroom_ad_v01b' : {
        resource_type: 'Advert',
        advert_type_label: 'sponsor',
        advert_label: '2017_spring_promo__showroom_ad_v01',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/2017_spring_promo__showroom_ad_v01.jpg',
        goto_url: 'http://showroommpls.com/?from=mplsart',
        advert_description: 'Showroom 2017 spring adspot',
        image_width: 700,
        image_height: 968
    },
    '2017_spring_promo__showroom_ad_v01c' : {
        resource_type: 'Advert',
        advert_type_label: 'sponsor',
        advert_label: '2017_spring_promo__showroom_ad_v01',
        image_url: 'https://storage.googleapis.com/cdn.mplsart.com/adverts/temp/2017_spring_promo__showroom_ad_v01.jpg',
        goto_url: 'http://showroommpls.com/?from=mplsart',
        advert_description: 'Showroom 2017 spring adspot',
        image_width: 700,
        image_height: 968
    }
};

const initialState = {
    resources: temp_advert_resources,
    adspots: {}
}

export default function advertStore(state=initialState, action) {

  switch(action.type) {
    case '@@router/LOCATION_CHANGE': {
      // case ActionTypes.ADSPOT_REFRESH
      // On route change, we want to clear out ads - indirectly a "rotate"


      return Object.assign({}, state, {adspots: {}})
    }
    case ActionTypes.ADSPOT_LOAD: {
      if (state.adspots && state.adspots[action.adspot_id]) {
        // This is in place because of "refreshes" to the react lifecycle on the same "page"
        return state;
      }

      // TODO: This is bad practice in redux... figure out a better version plus weighting/targeting
      let keys = Object.keys(state.resources);
      let random_key;

      if (keys.length > 0) {
        random_key = keys[Math.floor(Math.random()*keys.length)];
      }

      let obj = {};
      obj[action.adspot_id] = random_key;
      let newadstate = {adspots: Object.assign({}, state.adspots, obj)};

      return Object.assign({}, state, newadstate)
    }
    default: {
      return state
    }
  }
}