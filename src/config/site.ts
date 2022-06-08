import { allSites } from 'contentlayer/generated'

const siteConfig = {
  details: {
    title: 'Patrick Xin',
    tagLine: 'Frontend Developer',
    author: 'Patrick Xin',
    description:
      'Articles, thoughts about Web Development from a frontend developer.',
    url: 'https://www.patrickxin.com',
  },
  assets: {
    image: '/assets/images/seo-image.png',
    avatar: '/assets/images/avatar.jpg',
    favicon: '/favicon.ico',
  },
  socialLinks: {
    twitter: '@alpesdream',
    github: 'https://github.com/patrick-xin',
  },
}

export default siteConfig

export const getSiteAboutInfo = () => {
  return allSites.find((site) => site.slug === 'about')
}
