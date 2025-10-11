export default function TextArea({
    value,
    onChange,
    placeholder="",
    rows=5,
    className="",
    ...rest
}){
    return(
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-400 
                text-gray-800 placeholder-gray-400 resize-none transition ${className}`}
            {...rest}
        />
    )
}