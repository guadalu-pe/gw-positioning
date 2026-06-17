import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PURPLE = '#5c0098';
const PURPLE_DARK = '#420070';
const YELLOW = '#ffee32';
const LAVENDER = '#f9efff';
const BLACK = '#02061d';
const GRAY = '#6e6585';
const LIGHT_GRAY = '#f0eef5';

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', padding: 0 },
  header: { backgroundColor: PURPLE, padding: '32 40 28', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerLeft: { flex: 1 },
  headerName: { color: '#ffffff', fontSize: 22, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  headerSub: { color: YELLOW, fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  headerTagline: { color: '#e0b1ff', fontSize: 11, lineHeight: 1.5 },
  headerDate: { color: 'rgba(255,255,255,0.5)', fontSize: 9, marginTop: 4 },
  body: { padding: '28 40' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: PURPLE, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10, borderBottomWidth: 1.5, borderBottomColor: LAVENDER, paddingBottom: 5 },
  row: { flexDirection: 'row', marginBottom: 6 },
  label: { width: 100, fontSize: 9, color: GRAY, fontFamily: 'Helvetica-Bold', paddingRight: 8, paddingTop: 1 },
  value: { flex: 1, fontSize: 10, color: BLACK, lineHeight: 1.55 },
  oneLinerBox: { backgroundColor: LAVENDER, borderRadius: 6, padding: '12 16', marginBottom: 6 },
  oneLinerText: { fontSize: 13, color: PURPLE_DARK, fontFamily: 'Helvetica-Bold', lineHeight: 1.4, textAlign: 'center' },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  pill: { backgroundColor: '#d1fae5', borderRadius: 99, paddingHorizontal: 8, paddingVertical: 3 },
  pillText: { fontSize: 9, color: '#065f46', fontFamily: 'Helvetica-Bold' },
  archetypePill: { backgroundColor: LAVENDER, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  archetypeText: { fontSize: 10, color: PURPLE, fontFamily: 'Helvetica-Bold' },
  starlCard: { backgroundColor: LIGHT_GRAY, borderRadius: 6, padding: '10 14', marginBottom: 8 },
  starlTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: BLACK, marginBottom: 6 },
  starlRow: { flexDirection: 'row', marginBottom: 3 },
  starlLabel: { width: 70, fontSize: 8, color: GRAY, fontFamily: 'Helvetica-Bold' },
  starlValue: { flex: 1, fontSize: 9, color: BLACK, lineHeight: 1.5 },
  yellowBar: { backgroundColor: YELLOW, height: 4 },
  empty: { fontSize: 10, color: '#9d94b3', fontStyle: 'italic' },
});

function SectionTitle({ children }) {
  return <Text style={s.sectionTitle}>{children}</Text>;
}

function FrameworkRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={s.row}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.value}>{value}</Text>
    </View>
  );
}

export default function PositioningPDF({ allData, user }) {
  const s1 = allData.stage1 || {};
  const s2 = allData.stage2 || {};
  const s3 = allData.stage3 || {};
  const s4 = allData.stage4 || {};
  const s6 = allData.stage6 || {};

  const archetype = s2.archetypeResult;
  const framework = s3.framework || {};
  const portfolio = s4.portfolio || {};
  const starlStories = (s6.starlStories || []).filter(st => st.title || st.situation);

  const energisers = Object.entries(s1.skills || {})
    .filter(([, v]) => v.wantToDo === 'More' && (typeof v.skillLevel === 'number' ? v.skillLevel >= 3 : ['High', 'Medium'].includes(v.skillLevel)))
    .map(([name]) => name);

  const hasFramework = Object.values(framework).some(Boolean);
  const hasPortfolio = Object.values(portfolio).some(Boolean);

  return (
    <Document title="GW Positioning Snapshot" author={user?.displayName || ''}>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerName}>{user?.displayName || 'My Positioning'}</Text>
            {archetype && <Text style={s.headerSub}>{archetype.name} · {archetype.tagline}</Text>}
            {s3.oneLiner && <Text style={s.headerTagline}>"{s3.oneLiner}"</Text>}
            <Text style={s.headerDate}>Generated {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
        </View>
        <View style={s.yellowBar} />

        <View style={s.body}>
          {/* Archetype */}
          {archetype && (
            <View style={s.section}>
              <SectionTitle>Your Generalist Archetype</SectionTitle>
              <View style={s.archetypePill}>
                <Text style={s.archetypeText}>{archetype.name}</Text>
              </View>
              {archetype.strengths?.length > 0 && (
                <Text style={[s.value, { marginTop: 6, fontSize: 9, color: GRAY }]}>
                  Strengths: {archetype.strengths.join(' · ')}
                </Text>
              )}
            </View>
          )}

          {/* Energisers */}
          {energisers.length > 0 && (
            <View style={s.section}>
              <SectionTitle>Top Energiser Skills</SectionTitle>
              <View style={s.pillRow}>
                {energisers.map(name => (
                  <View key={name} style={s.pill}>
                    <Text style={s.pillText}>{name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Framework */}
          {hasFramework && (
            <View style={s.section}>
              <SectionTitle>Your Narrative Framework</SectionTitle>
              <FrameworkRow label="Name" value={framework.name} />
              <FrameworkRow label="Same" value={framework.same} />
              <FrameworkRow label="Fame" value={framework.fame} />
              <FrameworkRow label="Aim" value={framework.aim} />
              <FrameworkRow label="Game" value={framework.game} />
            </View>
          )}

          {/* One-liner */}
          {s3.oneLiner && (
            <View style={s.section}>
              <SectionTitle>Your One-Liner</SectionTitle>
              <View style={s.oneLinerBox}>
                <Text style={s.oneLinerText}>"{s3.oneLiner}"</Text>
              </View>
            </View>
          )}

          {/* AI Tagline */}
          {s3.aiResult && (
            <View style={s.section}>
              <SectionTitle>AI-Generated Tagline &amp; Bio</SectionTitle>
              <Text style={[s.value, { lineHeight: 1.7 }]}>{s3.aiResult}</Text>
            </View>
          )}

          {/* Portfolio */}
          {hasPortfolio && (
            <View style={s.section}>
              <SectionTitle>Portfolio</SectionTitle>
              <FrameworkRow label="Roles / Headline" value={portfolio.roles} />
              <FrameworkRow label="Mission" value={portfolio.mission} />
              <FrameworkRow label="Core belief" value={portfolio.belief} />
              <FrameworkRow label="Values" value={portfolio.values} />
              <FrameworkRow label="Contact / CTA" value={portfolio.contact} />
            </View>
          )}

          {/* STARL Stories */}
          {starlStories.length > 0 && (
            <View style={s.section}>
              <SectionTitle>STARL Story Bank ({starlStories.length})</SectionTitle>
              {starlStories.map((story, i) => (
                <View key={i} style={s.starlCard}>
                  {story.title && <Text style={s.starlTitle}>{story.title}</Text>}
                  {story.situation && <View style={s.starlRow}><Text style={s.starlLabel}>Situation</Text><Text style={s.starlValue}>{story.situation}</Text></View>}
                  {story.task && <View style={s.starlRow}><Text style={s.starlLabel}>Task</Text><Text style={s.starlValue}>{story.task}</Text></View>}
                  {story.action && <View style={s.starlRow}><Text style={s.starlLabel}>Action</Text><Text style={s.starlValue}>{story.action}</Text></View>}
                  {story.result && <View style={s.starlRow}><Text style={s.starlLabel}>Result</Text><Text style={s.starlValue}>{story.result}</Text></View>}
                  {story.learning && <View style={s.starlRow}><Text style={s.starlLabel}>Learning</Text><Text style={s.starlValue}>{story.learning}</Text></View>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
