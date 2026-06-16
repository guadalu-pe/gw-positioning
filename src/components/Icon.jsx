export default function Icon({ name, className = '', size, style = {} }) {
  return (
    <span
      className={`material-icons${className ? ` ${className}` : ''}`}
      style={{ fontSize: size, lineHeight: 1, userSelect: 'none', ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
