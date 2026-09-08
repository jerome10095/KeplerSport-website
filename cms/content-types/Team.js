export const Team = {
  name: 'Team',
  attributes: {
    name: { type: 'string', required: true },
    slug: { type: 'uid', targetField: 'name' },
    sport: { type: 'string', enum: ['basketball', 'volleyball', 'football', 'track'] },
    logo: { type: 'media' },
    description: { type: 'richtext' },
    achievements: { type: 'json' }, // e.g., titles, records
    roster: { type: 'relation', target: 'Athlete' },
    schedule: { type: 'relation', target: 'Schedule' },
  },
};

export default Team;
