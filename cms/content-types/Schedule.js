export const Schedule = {
  name: 'Schedule',
  attributes: {
    team: { type: 'relation', target: 'Team' },
    date: { type: 'datetime' },
    opponent: { type: 'string' },
    venue: { type: 'string' },
    isHome: { type: 'boolean' },
    result: { type: 'string' }, // Win/Loss/Draw
  },
};

export default Schedule;
