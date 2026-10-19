import type { CategoryId, Package } from '../types';

type Row = [name: string, price: number, duration: string, deliverables: string[], popular?: boolean];
const SPEC: Record<string, { category: CategoryId; rows: Row[] }[]> = {
  'aarav-mehta': [{ category: 'weddings', rows: [
    ['Essential', 45000, '6 hours, 1 photographer', ['350 edited photos', 'Online gallery in 3 weeks', 'Single-ceremony coverage']],
    ['Signature', 85000, '10 hours, 2 photographers', ['700 edited photos', '30-page album', 'Highlights reel (2 min)', 'Delivery in 4 weeks'], true],
    ['Grand Celebration', 165000, '3 days, team of 4', ['1,800 edited photos', 'Two premium albums', 'Cinematic film (6 min)', 'Pre-wedding half day']],
  ] }],
  'kabir-films': [{ category: 'weddings', rows: [
    ['Baraat', 120000, '1 day, 2 shooters', ['600 edited photos', 'Drone coverage', 'Highlight film (3 min)']],
    ['Shahi Utsav', 210000, '2 days, team of 5', ['1,400 edited photos', 'Cinematic film (8 min)', 'Two luxury albums', 'Pre-wedding shoot in Jaipur'], true],
    ['Maharaja', 360000, '3 days, team of 8', ['2,500 edited photos', 'Feature film (15 min)', 'Three albums + frames', 'Destination travel included']],
  ] }],
  'meher-vikram': [{ category: 'weddings', rows: [
    ['Rituals', 60000, '6 hours, 2 photographers', ['400 edited photos', 'Online gallery in 3 weeks']],
    ['Full Wedding', 110000, '12 hours, 2 photographers', ['900 edited photos', '40-page album', 'Haldi or mehendi included'], true],
    ['Shaadi Week', 190000, '4 days, team of 4', ['2,000 edited photos', 'Two albums', 'Teaser film (2 min)']],
  ] }],
  'ananya-rao': [{ category: 'weddings', rows: [
    ['Bridal Morning', 38000, '4 hours, 1 photographer', ['150 edited photos', 'Getting-ready and portraits']],
    ['Ceremony', 72000, '8 hours, 1 photographer', ['500 edited photos', '24-page album', 'Delivery in 3 weeks'], true],
    ['Full Weekend', 135000, '2 days, 2 photographers', ['1,200 edited photos', 'Two albums', 'Reel (60 sec)']],
  ] }],
  'joaquim-fernandes': [{ category: 'weddings', rows: [
    ['Elopement', 55000, '4 hours, 1 photographer', ['250 edited photos', 'Sunset portrait session']],
    ['Beach Wedding', 98000, '8 hours, 2 photographers', ['650 edited photos', '30-page album', 'Same-week sneak peek'], true],
    ['Destination Weekend', 175000, '3 days, 2 photographers', ['1,500 edited photos', 'Album + framed prints', 'Pre-wedding shoot']],
  ] }],
  'riya-shekhawat': [
    { category: 'portraits', rows: [
      ['Mini Portrait', 9000, '1 hour, 1 location', ['15 edited photos', 'Online gallery in 5 days']],
      ['Heritage Editorial', 22000, '3 hours, haveli location', ['40 edited photos', 'Styling consultation', 'Print-ready files'], true],
    ] },
    { category: 'weddings', rows: [
      ['Bridal Editorial', 48000, 'Half day, 1 photographer', ['120 edited photos', 'Jewellery detail set']],
      ['Pre-wedding Jaipur', 65000, '1 day, 2 locations', ['200 edited photos', 'Outfit change styling']],
    ] },
  ],
  'zoya-khan': [
    { category: 'portraits', rows: [
      ['Conversation', 12000, '1.5 hours, studio or street', ['20 edited photos', 'Colour or black-and-white']],
      ['Portfolio Session', 24000, '3 hours, 2 looks', ['45 edited photos', 'Online gallery in 4 days'], true],
    ] },
    { category: 'weddings', rows: [
      ['Intimate Wedding', 58000, '6 hours, 1 photographer', ['350 edited photos', 'Family portraits']],
    ] },
  ],
  'ira-kapoor': [{ category: 'portraits', rows: [
    ['Look Test', 18000, '2 hours, 1 look', ['20 edited photos', 'Mood board']],
    ['Editorial Day', 42000, '5 hours, 3 looks', ['50 edited photos', 'Styling direction', 'Studio and outdoor'], true],
    ['Lookbook', 85000, '1 day, up to 15 outfits', ['120 edited photos', 'Model direction', 'Commercial usage licence']],
  ] }],
  'dev-malhotra': [{ category: 'portraits', rows: [
    ['Profile Walk', 8000, '1 hour, 1 location', ['15 edited photos', 'Delivered in 3 days']],
    ['Portfolio Shoot', 16000, '2.5 hours, 2 locations', ['30 edited photos', 'Outfit change'], true],
    ['Creator Pack', 28000, 'Half day, 3 locations', ['60 edited photos', 'Short vertical reel']],
  ] }],
  'pooja-iyer': [{ category: 'birthdays', rows: [
    ['Cake Moment', 12000, '1.5 hours', ['60 edited photos', 'Online gallery in 5 days']],
    ['First Birthday', 22000, '3 hours', ['150 edited photos', 'Cake-smash portraits', 'Printed mini-album'], true],
    ['Party Story', 38000, '5 hours, 2 photographers', ['300 edited photos', 'Guest group portraits', '15-page album']],
  ] }],
  'farhan-qureshi': [
    { category: 'birthdays', rows: [
      ['Party Night', 15000, '3 hours', ['120 edited photos', 'Gallery next morning']],
      ['Milestone Bash', 30000, '5 hours, 2 photographers', ['300 edited photos', 'Highlights reel (60 sec)'], true],
    ] },
    { category: 'corporate', rows: [
      ['Offsite Day', 35000, '8 hours', ['250 edited photos', 'Group portraits', 'Delivery in 5 days']],
    ] },
  ],
  'neha-kapoor': [{ category: 'birthdays', rows: [
    ['Mini Studio', 8500, '45 minutes, home studio', ['15 edited photos', 'Two backdrops']],
    ['Smash & Style', 16000, '1.5 hours, themed set', ['30 edited photos', 'Outfit changes', 'Printed cards'], true],
    ['Party Coverage', 24000, '4 hours on location', ['200 edited photos', 'Mini-album']],
  ] }],
  'aditi-verma': [{ category: 'birthdays', rows: [
    ['Sundowner', 18000, '2 hours', ['100 edited photos', 'Gallery within 3 days']],
    ['Villa Weekend', 42000, '2 days, 1 photographer', ['400 edited photos', 'Highlights reel (60 sec)'], true],
  ] }],
  'rohan-kulkarni': [{ category: 'corporate', rows: [
    ['Half-day Event', 28000, '4 hours, 1 photographer', ['150 edited photos', 'Next-day delivery']],
    ['Conference', 65000, '10 hours, 2 photographers', ['500 edited photos', 'Same-day highlights (20 photos)', 'Speaker portraits'], true],
    ['Multi-day Summit', 140000, '3 days, crew of 3', ['1,500 edited photos', 'Daily highlights', 'Event recap film']],
  ] }],
  'siddharth-nair': [{ category: 'corporate', rows: [
    ['Leadership Portraits', 15000, '2 hours, up to 6 people', ['6 retouched headshots']],
    ['Team Day', 35000, '1 day, up to 40 people', ['40 retouched headshots', 'Group photo', 'Pop-up studio'], true],
    ['Offsite Coverage', 52000, '1 day on location', ['300 edited photos', 'Team portraits', 'Delivery in 4 days']],
  ] }],
  'tanvi-sharma': [
    { category: 'corporate', rows: [
      ['Evening Event', 32000, '4 hours', ['200 edited photos', 'Next-day delivery']],
      ['Gala Night', 75000, '8 hours, 2 photographers', ['600 edited photos', 'Stage + audience coverage', 'Usage-ready crops'], true],
      ['Annual Summit', 150000, '2 days, crew of 3', ['1,400 edited photos', 'Daily highlights']],
    ] },
    { category: 'birthdays', rows: [
      ['Office Celebration', 12000, '2 hours', ['80 edited photos', 'Team group portraits']],
    ] },
  ],
};

export const PACKAGES: Package[] = Object.entries(SPEC).flatMap(([photographerId, groups]) =>
  groups.flatMap((g) =>
    g.rows.map(([name, price, duration, deliverables, popular], i) => ({
      id: `${photographerId}-${g.category}-${i + 1}`,
      photographerId,
      name,
      category: g.category,
      price,
      duration,
      deliverables,
      popular: popular || undefined,
    })),
  ),
);
