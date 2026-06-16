export const softSkills = [
  { name: 'Identifying patterns', category: 'Creativity & Reasoning' },
  { name: 'Trust building', category: 'Collaboration' },
  { name: 'Teamwork', category: 'Collaboration' },
  { name: 'Design thinking', category: 'Creativity & Reasoning' },
  { name: 'Systems thinking', category: 'Reasoning' },
  { name: 'Leadership', category: 'Collaboration' },
  { name: 'Research', category: 'Reasoning' },
  { name: 'Storytelling', category: 'Communication' },
  { name: 'Public speaking', category: 'Communication' },
  { name: 'Prioritisation', category: 'Decision making' },
  { name: 'Analytical skills', category: 'Reasoning' },
  { name: 'Change management', category: 'Managing change' },
  { name: 'Stakeholder management', category: 'Collaboration' },
  { name: 'Written communication', category: 'Communication' },
  { name: 'Cultural awareness', category: 'Communication' },
  { name: 'Entrepreneurial mindset', category: 'Creativity' },
  { name: 'Critical thinking', category: 'Decision making' },
  { name: 'Embracing diverse perspectives', category: 'Collaboration' },
  { name: 'Finding innovative solutions', category: 'Creativity' },
  { name: 'Unconventional thinking', category: 'Creativity' },
  { name: 'Managing conflict', category: 'Communication' },
  { name: 'Brainstorming', category: 'Creativity' },
  { name: 'Negotiation', category: 'Collaboration' },
  { name: 'Empathy', category: 'Communication' },
  { name: 'Influence', category: 'Collaboration' },
  { name: 'Persuasion', category: 'Communication' },
  { name: 'Interpersonal communication', category: 'Communication' },
  { name: 'Active listening', category: 'Communication' },
  { name: 'Effective communication', category: 'Communication' },
  { name: 'Creative thinking', category: 'Creativity' },
  { name: 'Curiosity', category: 'Creativity' },
  { name: 'Self-reflection', category: 'Growth mindset' },
  { name: 'Data-based decision making', category: 'Decision making' },
  { name: 'Problem solving', category: 'Decision making' },
];

export const wantToDoOptions = ['More', 'Same', 'Less'];
export const skillLevelOptions = ['High', 'Medium', 'Low'];

export function computeSkillType(wantToDo, skillLevel) {
  if (!wantToDo || !skillLevel) return '';
  const wantMore = wantToDo === 'More';
  const wantLess = wantToDo === 'Less';
  const isHigh = skillLevel === 'High';
  const isMedHigh = skillLevel === 'High' || skillLevel === 'Medium';

  if (wantMore && isMedHigh) return 'Energiser 🚀';
  if (!wantMore && isMedHigh) return 'Asset ⚖️';
  if (wantMore && !isMedHigh) return 'Potential ⚡';
  if (wantLess && !isMedHigh) return 'Drainer ❌';
  return 'Potential ⚡';
}
