import { useState } from 'react';
import { profiles } from '../data/profiles';
import Icon from './Icon';

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function getAvatarColor(name) {
  const colors = [
    '#7c3aed', '#059669', '#d97706', '#dc2626', '#2563eb',
    '#db2777', '#0891b2', '#65a30d', '#7c3aed', '#9333ea',
  ];
  let hash = 0;
  for (let c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
  return colors[hash % colors.length];
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export default function ProfileGallery() {
  const [search, setSearch] = useState('');

  const filtered = profiles.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-badge">
          <Icon name="star" size="13px" />
          Bonus
        </div>
        <h1 className="stage-title">Profile Gallery</h1>
        <div className="stage-meta">
          <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{profiles.length} generalist portfolios for inspiration</span>
        </div>
      </div>

      <div className="stage-intro">
        Need inspiration? Browse this collection of real generalist portfolios from the Generalist World community. See how others have positioned themselves, showcased their skills, and told their stories.
      </div>

      <div className="gallery-search">
        <Icon name="search" className="gallery-search-icon" />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '40px', fontSize: '15px' }}>
          No profiles found for "{search}"
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--gray-400)' }}>
            {filtered.length} {filtered.length === 1 ? 'profile' : 'profiles'}{search ? ` matching "${search}"` : ''}
          </div>
          <div className="gallery-grid">
            {filtered.map(p => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-card"
              >
                <div
                  className="profile-avatar"
                  style={{ background: getAvatarColor(p.name) }}
                >
                  {getInitials(p.name)}
                </div>
                <span className="profile-name">{p.name}</span>
                <span className="profile-url">{getDomain(p.url)}</span>
              </a>
            ))}
          </div>
        </>
      )}

      <div style={{ textAlign: 'center', marginTop: '48px', padding: '24px', background: 'var(--purple-50)', borderRadius: '12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <Icon name="star" size="28px" style={{ color: 'var(--gw-purple)' }} />
        </div>
        <div style={{ fontWeight: '700', color: 'var(--gray-900)', marginBottom: '6px' }}>Share Your Portfolio!</div>
        <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.6' }}>
          Once you've completed your portfolio in Stage 4, share it with the Generalist World community to get feedback and inspire others.
        </p>
        <a
          href="https://www.generalist.world/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ display: 'inline-flex', marginTop: '14px', textDecoration: 'none' }}
        >
          Join the Community <Icon name="open_in_new" size="15px" />
        </a>
      </div>
    </div>
  );
}
