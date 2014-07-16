
/**
 * Site navigation
 * 
 *
 */
module.exports = {
  index: {
    url: '/',
    text: 'Home'
  },
  about: {
    url: '/about',
    text: 'About'
  },
  sounds: {
    url: '/sounds',
    text: 'Sounds',
    items: [{
      url: '/sounds/solos-and-duos',
      text: 'Solos and Duos'
    },
    {
      url: '/sounds/trios-or-larger',
      text: 'Trios or Larger'
    },
    {
      url: '/sounds/wedding-and-acoustic',
      text: 'Wedding and Acoustic Music'
    }] 
  },
  pricing: {
    text: 'Pricing',
    url: '/pricing'
  },
  clients: { 
    text: 'Clients',
    url: '/clients'
  },
  testimonials: {
    text: 'Testimonials',
    url: '/testimonials'
  }
};
