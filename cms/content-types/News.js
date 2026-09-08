export const News = {
  name: 'News',
  attributes: {
    title: { type: 'string', required: true },
    slug: { type: 'uid', targetField: 'title' },
    date: { type: 'datetime' },
    image: { type: 'media' },
    content: { type: 'richtext' },
    tags: { type: 'json' },
    featured: { type: 'boolean', default: false },
  },
};

export default News;
