export const calendarOptions = [
  { label: 'Every 3 months', months: 3, rule: 'RRULE:FREQ=MONTHLY;INTERVAL=3' },
  { label: 'Every 6 months', months: 6, rule: 'RRULE:FREQ=MONTHLY;INTERVAL=6' },
  { label: 'Every year',     months: 12, rule: 'RRULE:FREQ=YEARLY;INTERVAL=1' },
];

export function addToCalendar(rule) {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);
  const fmt = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const description = [
    'Time to revisit your generalist positioning!', '',
    'The Generalist World Positioning Guidebook helps you identify your strengths, discover your archetype, craft your narrative, and build a personal portfolio that shows the world who you really are.', '',
    'This recurring reminder keeps your story sharp — because the best generalists never stop owning their narrative.', '',
    'Open your guidebook: https://guadalu-pe.github.io/gw-positioning/', '',
    'Estimated time: 2–4 hours for a full refresh, or 30 min for a quick tune-up.',
  ].join('\n');
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', 'Time to Get Your Positioning Positioned!');
  url.searchParams.set('dates', `${fmt(start)}/${fmt(end)}`);
  url.searchParams.set('recur', rule);
  url.searchParams.set('details', description);
  url.searchParams.set('sf', 'true');
  url.searchParams.set('output', 'xml');
  window.open(url.toString(), '_blank');
}
