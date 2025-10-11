export default function Select({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border border-gray-300 rounded-md bg-white 
        focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition ${className}`}
    >
      {children}
    </select>
  );
}