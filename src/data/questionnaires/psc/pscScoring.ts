
export const pscScoring = {
  type: 'custom',
  groups: [
    {
      id: 'precontemplation',
      name: 'Precontemplation',
      items: ['psc-q11', 'psc-q12', 'psc-q22', 'psc-q24', 'psc-q25', 'psc-q29'],
      interpretation: {
        ranges: [
          { min: 0, max: 8, text: "Precontemplation Stage - Not ready to change" }
        ]
      }
    },
    {
      id: 'contemplation',
      name: 'Contemplation',
      items: ['psc-q1', 'psc-q7', 'psc-q8', 'psc-q9', 'psc-q14', 'psc-q15', 'psc-q21'],
      interpretation: {
        ranges: [
          { min: 9, max: 11, text: "Contemplation Stage - Thinking about change" }
        ]
      }
    },
    {
      id: 'action',
      name: 'Action',
      items: ['psc-q2', 'psc-q6', 'psc-q20', 'psc-q26', 'psc-q27', 'psc-q30'],
      interpretation: {
        ranges: [
          { min: 12, max: 14, text: "Preparation/Action Stage - Taking steps to change" }
        ]
      }
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      items: ['psc-q3', 'psc-q4', 'psc-q5', 'psc-q10', 'psc-q13', 'psc-q17', 'psc-q18'],
      interpretation: {
        ranges: [
          { min: 15, max: 30, text: "Maintenance Stage - Working to maintain changes" }
        ]
      }
    }
  ]
};
