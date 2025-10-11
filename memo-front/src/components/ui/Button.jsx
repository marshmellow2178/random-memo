import { Link } from "react-router-dom";

export default function Button({
    to, 
    type="button",
    children, 
    onClick, 
    variant="primary",
    size="md",
    className="",
    disabled=false,
}){
    const base = "inline-block rounded-md font-medium transition";
    const variants = {
        primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
        danger: "bg-rose-500 hover:bg-rose-600 text-white",
        outline: "border border-indigo-400 text-indigo-400 hover:bg-indigo-50",
        ghost: "text-gray-700 hover:bg-gray-100",
    }
    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    }
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if(to){
        return <Link to={to} className={classes}>{children}</Link>;
    }
    return(
        <button onClick={onClick} 
        className={classes} 
        disabled={disabled}
        type={type}>
            {children}
        </button>
    );
}