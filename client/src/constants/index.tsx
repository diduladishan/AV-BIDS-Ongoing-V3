export const usStates = [
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'Illinois', value: 'Illinois' },
  { label: 'Indiana', value: 'Indiana' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Montana', value: 'Montana' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'New York', value: 'New York' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Washington', value: 'Washington' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'Wyoming', value: 'Wyoming' },
] as const;

export const eventBudgetOptions = [
  { label: '<$70,000', value: '<$70,000' },
  { label: '$70,000 - $150,000', value: '$70,000 - $150,000' },
  { label: '$150,000 - $500,000', value: '$150,000 - $500,000' },
  { label: '$500,000 - $1,000,000', value: '$500,000 - $1,000,000' },
  { label: '$1,000,000+', value: '$1,000,000+' },
] as const;

export const eventTypes = [
  { label: 'In-Person', value: 'In-Person' },
  { label: 'Virtual', value: 'Virtual' },
  { label: 'Hybrid', value: 'Hybrid' },
] as const;

export const eventCategories = [
  { label: 'Corporate', value: 'Corporate' },
  { label: 'Non-Corporate', value: 'Non-Corporate' },
] as const;

export const eventSubCategories = [
  { label: 'Awards', value: 'Awards' },
  { label: 'Banquet', value: 'Banquet' },
  { label: 'Board Meeting', value: 'Board Meeting' },
  { label: 'Breakout Session', value: 'Breakout Session' },
  { label: 'Conference', value: 'Conference' },
  { label: 'Congress', value: 'Congress' },

  { label: 'Consumer Trade', value: 'Consumer Trade' },
  { label: 'Holiday Party', value: 'Holiday Party' },
  {
    label: 'Industry and Consumer Trade Show',
    value: 'Industry and Consumer Trade Show',
  },

  {
    label: 'Industry Trade Show',
    value: 'Industry Trade Show',
  },
  { label: 'International Meeting', value: 'International Meeting' },
  { label: 'Networking', value: 'Networking' },
  { label: 'Plenary General', value: 'Plenary General' },
  { label: 'Product Launch', value: 'Product Launch' },
  { label: 'Reception', value: 'Reception' },
  { label: 'Retreat', value: 'Retreat' },
  { label: 'Seminar', value: 'Seminar' },
  { label: 'Workshop', value: 'Workshop' },
  { label: 'Press', value: 'Press' },
] as const;

export interface CheckboxItem {
  value: string;
  label: string;
}

export const checkboxes: CheckboxItem[] = [
  { value: 'In-Person', label: 'In-Person' },
  { value: 'Virtual', label: 'Virtual' },
  { value: 'Hybrid', label: 'Hybrid' },
];

export const priceRangeCheckboxes: CheckboxItem[] = [
  { label: '<$70,000', value: '<$70,000' },
  { label: '$70,000 - $150,000', value: '$70,000 - $150,000' },
  { label: '$150,000 - $500,000', value: '$150,000 - $500,000' },
  { label: '$500,000 - $1,000,000', value: '$500,000 - $1,000,000' },
  { label: '$1,000,000+', value: '$1,000,000+' },
];

export const audienceSizeCheckboxes: CheckboxItem[] = [
  // { value: 'Any', label: 'Any' },
  { value: '10-100', label: '10 - 100' },
  { value: '100-250', label: '100 - 250' },
  { value: '250-750', label: '250 - 750' },
  { value: '750-1500', label: '750 - 1,500' },
  { value: '1500-5000', label: '1,500 - 5,000' },
  { value: '5000-10000', label: '5,000 - 10,000' },
  { value: '10000+', label: 'over 10,000' },
];
