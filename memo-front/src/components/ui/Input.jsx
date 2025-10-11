export default function Input({
    type="text",
    value,
    onChange,
    placeholder="",
    className="",
    ...rest
}){
    const background = type=="submit" ? "indigo-500" : "white"; 
    const text = type=="submit" ? "white" : "black"; 
    const border = type=="submit"?"indigo-500":"gray-300";

    return(
        <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-${border} rounded-md bg-${background} text-${text}
            focus:outline-none focus:ring-2 focus:ring-blue-400
            text-gray-800 placeholder-gray-400 transition ${className}`}
        {...rest}
        />
    );
}