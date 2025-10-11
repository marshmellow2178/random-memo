export default function Card({ children, variant = "default",className = "" }) {
  const base = "rounded-xl border p-6 transition";
  const variants = {
    default: "bg-white shadow-sm border-gray-200",
    flat: "bg-gray-50 border-gray-100",
    elevated: "bg-white shadow-md border-transparent",
  };

  return <div className={`${base} ${variants[variant]} ${className}`}>{children}</div>;
}