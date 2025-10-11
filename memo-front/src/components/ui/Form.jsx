export default function Form({children, 
    className="",
    onSubmit}){
    const base = "max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-4";
    return(
        <form 
        onSubmit={onSubmit}
        className={`${base} ${className}`}>
            {children}
        </form>
    );
}