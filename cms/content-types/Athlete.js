export const Athlete = {
  name: 'Athlete',
  attributes: {
    name: { type: 'string', required: true },
    profileImage: { type: 'media' },
    position: { type: 'string' },
    number: { type: 'integer' },
    team: { type: 'relation', target: 'Team' },
    bio: { type: 'text' },
    stats: { type: 'json' }, // Points, assists, etc.
  },
};

export default Athlete;
