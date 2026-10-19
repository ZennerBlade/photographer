import type { Photographer } from '../types';

// All contact details are fake: +91 99999 000xx numbers and example.com emails. Starting price is derived from packages (see api.ts).
type P = Omit<Photographer, 'startingPrice' | 'contact'> & { n: number };
const raw: P[] = [
  {
    id: 'aarav-mehta', n: 1, name: 'Aarav Mehta Studio', tagline: 'Candid, cinematic wedding stories', heroImage: '39625024', leadName: 'Aarav Mehta', leadImage: 'lead-aarav-mehta',
    city: 'Mumbai', area: 'Bandra West', categories: ['weddings'], rating: 4.9, reviewCount: 212, yearsExperience: 11, featured: true,
    about: 'Eleven years of Indian weddings, from Udaipur palaces to Mumbai courtyards. I shoot quietly from the edges, so the day stays yours and the photographs feel like memory rather than performance. Most of my couples tell me they forgot I was there.',
    signatureStyle: { title: 'Candid & cinematic', bullets: ['Golden-hour storytelling over posed line-ups', 'Rich, true-to-skin colour grading', 'A single album sequenced like a short film'], tags: ['Candid', 'Cinematic', 'Warm tones'] },
  },
  {
    id: 'rivera-films', n: 2, name: 'Rivera & Co. Films', tagline: 'Royal Rajasthani weddings, shot like cinema', heroImage: '32379184', leadName: 'Mateo Rivera', leadImage: 'lead-rivera-films',
    city: 'Jaipur', area: 'C-Scheme', categories: ['weddings'], rating: 4.9, reviewCount: 167, yearsExperience: 9, featured: true,
    about: 'A two-brother team from São Paulo, now based in Jaipur and shooting palace and haveli weddings across Rajasthan. We scout every venue before the big day so light, angles and the baraat route are planned, never improvised.',
    signatureStyle: { title: 'Regal, jewel-toned frames', bullets: ['Wide palace architecture with the couple small in frame', 'Deep reds and marigold kept saturated, never washed out', 'Drone and gimbal film delivered with the stills'], tags: ['Royal', 'Editorial', 'Drone'] },
  },
  {
    id: 'lukas-brandt', n: 3, name: 'Lukas Brandt Studio', tagline: 'Documentary photographs of every ritual', heroImage: '29984888', leadName: 'Lukas Brandt', leadImage: 'lead-lukas-brandt',
    city: 'Delhi', area: 'Greater Kailash', categories: ['weddings'], rating: 4.8, reviewCount: 143, yearsExperience: 8,
    about: 'Born in Hamburg, based in Delhi for nine years. I follow the rituals, haldi, mehendi, pheras, in the order they happen, with a soft spot for aunties, grandparents and the chaos between ceremonies.',
    signatureStyle: { title: 'Ritual-first documentary', bullets: ['Hands, bangles and haldi close-ups woven into the story', 'Colour-rich, slightly grainy film look', 'Family portraits shot in two quick minutes, not two hours'], tags: ['Documentary', 'Rituals', 'Colourful'] },
  },
  {
    id: 'camille-laurent', n: 4, name: 'Camille Laurent Photography', tagline: 'Bridal portraits and intimate ceremonies', heroImage: '29226150', leadName: 'Camille Laurent', leadImage: 'lead-camille-laurent',
    city: 'Bengaluru', area: 'Indiranagar', categories: ['weddings'], rating: 4.8, reviewCount: 98, yearsExperience: 7, featured: true,
    about: 'Lyon-born, Bengaluru-based. I photograph weddings of every tradition, Kannada, Tamil, Bengali and Marwari, and I love the small hours before the ceremony. Expect soft window light, jasmine, silk and a bride who is allowed to breathe.',
    signatureStyle: { title: 'Soft light, quiet brides', bullets: ['Getting-ready portraits shot by window light', 'Traditional jewellery and textiles in detail', 'Limited weddings per season to keep it personal'], tags: ['Soft', 'Bridal', 'Intimate'] },
  },
  {
    id: 'joaquim-fernandes', n: 5, name: 'Joaquim Fernandes', tagline: 'Sun, sea and saptapadi', heroImage: '32107242', leadName: 'Joaquim Fernandes', leadImage: 'lead-joaquim-fernandes',
    city: 'Goa', area: 'Assagao', categories: ['weddings'], rating: 4.7, reviewCount: 121, yearsExperience: 10,
    about: 'Destination weddings on Goa beaches, villas and old Portuguese churches. I travel light, shoot with natural light and keep couples relaxed with a very bad sense of humour.',
    signatureStyle: { title: 'Sunlit and unhurried', bullets: ['Golden-hour beach portraits with minimal posing', 'Relaxed, laughing candids over staged stills', 'Same-week sneak peek of ten photographs'], tags: ['Destination', 'Natural light', 'Beach'] },
  },
  {
    id: 'eleanor-whitfield', n: 6, name: 'Eleanor Whitfield', tagline: 'Rajasthani portraits and bridal editorials', heroImage: '38281667', leadName: 'Eleanor Whitfield', leadImage: 'lead-eleanor-whitfield',
    city: 'Jaipur', area: 'Vaishali Nagar', categories: ['portraits', 'weddings'], rating: 4.8, reviewCount: 76, yearsExperience: 6,
    about: 'English-born, based in Jaipur for eight years. I make portraits that honour the textiles, jewellery and faces of Rajasthan. Bridal editorials and pre-wedding shoots share a studio with personal portrait sessions in old Jaipur havelis.',
    signatureStyle: { title: 'Heritage portraiture', bullets: ['Natural window light in havelis and courtyards', 'Jewellery, odhni and mehendi given room in the frame', 'Colour palettes planned with your outfit'], tags: ['Heritage', 'Editorial', 'Bridal'] },
  },
  {
    id: 'zoya-khan', n: 7, name: 'Zoya Khan', tagline: 'Faces with stories, light with patience', heroImage: '40124295', leadName: 'Zoya Khan', leadImage: 'lead-zoya-khan',
    city: 'Mumbai', area: 'Colaba', categories: ['portraits', 'weddings'], rating: 4.9, reviewCount: 131, yearsExperience: 8,
    about: 'Street-trained portrait photographer. I spend an hour talking before I pick up the camera, which is why people look like themselves in my photographs. I also shoot a small number of intimate weddings each year.',
    signatureStyle: { title: 'Honest, close portraits', bullets: ['Tight framing, shallow depth, eyes in focus', 'Black-and-white options on every shoot', 'Unretouched skin, gentle colour'], tags: ['Character', 'Monochrome', 'Intimate'] },
  },
  {
    id: 'sofia-marin', n: 8, name: 'Sofia Marin Frames', tagline: 'Editorial fashion with an Indian palette', heroImage: '13156801', leadName: 'Sofia Marin', leadImage: 'lead-sofia-marin',
    city: 'Delhi', area: 'Gurugram', categories: ['portraits'], rating: 4.8, reviewCount: 189, yearsExperience: 9, featured: true,
    about: 'Madrid-born fashion and lookbook photographer working with designers, models and creators across Delhi NCR. I style, light and direct each shoot like a short editorial, from saree drapes to streetwear.',
    signatureStyle: { title: 'Moody editorial colour', bullets: ['Deep teal and rust palettes against traditional textiles', 'Directional light, cinematic crops', 'Shot list and mood board shared two days before'], tags: ['Editorial', 'Moody', 'Fashion'] },
  },
  {
    id: 'callum-reid', n: 9, name: 'Callum Reid', tagline: 'Portfolios and portraits for people who dislike being photographed', heroImage: '5163867', leadName: 'Callum Reid', leadImage: 'lead-callum-reid',
    city: 'Goa', area: 'Panjim', categories: ['portraits'], rating: 4.7, reviewCount: 64, yearsExperience: 5,
    about: 'Edinburgh-born, based in Panjim. Actors, musicians and founders come to me for portfolio and profile shoots. We walk around Panjim or shoot on the beach at dusk, so nobody has to hold an awkward pose in a studio.',
    signatureStyle: { title: 'Easy, outdoor portraits', bullets: ['Walk-and-talk sessions, no stiff posing', 'Warm film-style colour', 'Twenty edited images within three days'], tags: ['Portfolio', 'Outdoor', 'Warm'] },
  },
  {
    id: 'amara-okafor', n: 10, name: 'Amara Okafor Moments', tagline: 'Birthdays for kids who will not sit still', heroImage: '32760987', leadName: 'Amara Okafor', leadImage: 'lead-amara-okafor',
    city: 'Bengaluru', area: 'HSR Layout', categories: ['birthdays'], rating: 4.9, reviewCount: 203, yearsExperience: 7, featured: true,
    about: 'Lagos-born, based in Bengaluru. I photograph first birthdays and kids parties in homes and clubhouses. Twenty minutes of play is better than an hour of posing, so I bring bubbles, music and a lot of patience.',
    signatureStyle: { title: 'Playful pastel candids', bullets: ['Eye-level shots of kids mid-laugh', 'Soft pastel grading to match the decor', 'Cake-smash and balloon portraits included'], tags: ['Kids', 'Playful', 'Pastel'] },
  },
  {
    id: 'jonas-keller', n: 11, name: 'Jonas Keller', tagline: 'Parties and offsites, caught on the dance floor', heroImage: '29295011', leadName: 'Jonas Keller', leadImage: 'lead-jonas-keller',
    city: 'Delhi', area: 'Hauz Khas', categories: ['birthdays', 'corporate'], rating: 4.6, reviewCount: 87, yearsExperience: 8,
    about: 'Berlin-born, based in Delhi. Milestone birthdays, farmhouse parties and company offsites. I use bounce flash and fast lenses so the dance floor looks the way it felt, not like a CCTV frame.',
    signatureStyle: { title: 'Energetic night-life candids', bullets: ['Flash-kissed motion and confetti', 'Group shots in under five minutes', 'Gallery link live the next morning'], tags: ['Party', 'Flash', 'Energy'] },
  },
  {
    id: 'freya-mitchell', n: 12, name: 'Freya Mitchell Little Stories', tagline: 'Gentle birthday and cake-smash portraits', heroImage: '8104171', leadName: 'Freya Mitchell', leadImage: 'lead-freya-mitchell',
    city: 'Jaipur', area: 'Malviya Nagar', categories: ['birthdays'], rating: 4.7, reviewCount: 112, yearsExperience: 6,
    about: 'London-born, based in Jaipur. A home studio in Malviya Nagar with themed backdrops, plus on-location party coverage. Soft, airy photographs that look good in a frame on the wall as well as on a phone.',
    signatureStyle: { title: 'Airy, themed storytelling', bullets: ['Custom backdrops built around your theme', 'Bright, clean light that flatters little faces', 'Printed mini-album with every full package'], tags: ['Airy', 'Themed', 'Studio'] },
  },
  {
    id: 'hannah-lindqvist', n: 13, name: 'Hannah Lindqvist', tagline: 'Beach-house and villa parties in Goa', heroImage: '38473407', leadName: 'Hannah Lindqvist', leadImage: 'lead-hannah-lindqvist',
    city: 'Goa', area: 'Candolim', categories: ['birthdays'], rating: 4.6, reviewCount: 58, yearsExperience: 5,
    about: 'Swedish-born, living in North Goa. Villa birthdays, bachelorette weekends and sundowner parties. I blend in with the guests, keep the energy high and deliver a gallery before you fly home.',
    signatureStyle: { title: 'Sundowner party stories', bullets: ['Golden-hour group portraits', 'Candids of the guests, not just the host', 'Quick-turnaround highlights for the group chat'], tags: ['Villa', 'Sundowner', 'Groups'] },
  },
  {
    id: 'elias-novak', n: 14, name: 'Elias Novak Events', tagline: 'Conferences and launches, covered end to end', heroImage: '7591091', leadName: 'Elias Novak', leadImage: 'lead-elias-novak',
    city: 'Mumbai', area: 'Powai', categories: ['corporate'], rating: 4.8, reviewCount: 156, yearsExperience: 12, featured: true,
    about: 'Prague-born, Mumbai-based. Twelve years covering summits, product launches and award nights for Mumbai companies. A two-person crew handles stage, audience and networking, with a same-day edit for social teams.',
    signatureStyle: { title: 'Clean, journalistic coverage', bullets: ['Speaker, audience and sponsor shots on one shot list', 'Neutral grading true to brand colours', 'Same-day highlights for LinkedIn and Instagram'], tags: ['Conference', 'Launch', 'Same-day'] },
  },
  {
    id: 'marcus-adebayo', n: 15, name: 'Marcus Adebayo Imagery', tagline: 'Team headshots and offsite photography', heroImage: '7580766', leadName: 'Marcus Adebayo', leadImage: 'lead-marcus-adebayo',
    city: 'Bengaluru', area: 'Koramangala', categories: ['corporate'], rating: 4.7, reviewCount: 92, yearsExperience: 8,
    about: 'Lagos-born, based in Bengaluru. Headshots for start-up teams, leadership portraits and offsite coverage. I set up a pop-up studio in your office and shoot fifty people in a day without anyone feeling awkward.',
    signatureStyle: { title: 'Natural, confident headshots', bullets: ['Pop-up studio in your office', 'Consistent light so a team looks like a team', 'Retouched files in 48 hours'], tags: ['Headshots', 'Teams', 'On-site'] },
  },
  {
    id: 'greta-holm', n: 16, name: 'Greta Holm Visuals', tagline: 'Corporate galas and office celebrations', heroImage: '29708270', leadName: 'Greta Holm', leadImage: 'lead-greta-holm',
    city: 'Delhi', area: 'Connaught Place', categories: ['corporate', 'birthdays'], rating: 4.9, reviewCount: 174, yearsExperience: 10, featured: true,
    about: 'Danish-born, based in Delhi. From keynote stages to team-birthday cakes in the pantry. I cover galas, summits and the human moments that make company culture look real, with a crew that fits any hotel ballroom.',
    signatureStyle: { title: 'Stage-lit, human moments', bullets: ['Stage and crowd coverage with dramatic light', 'Candid team culture photos for careers pages', 'Gallery with usage-ready crops'], tags: ['Gala', 'Culture', 'Dramatic'] },
  },
];

export const PHOTOGRAPHERS_RAW = raw;
