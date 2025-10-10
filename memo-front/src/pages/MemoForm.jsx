import { useEffect, useState } from "react";
import Input from "../components/ui/Input"; 
import TextArea from "../components/ui/TextArea";
import Select from "../components/ui/Select";

function MemoForm({initData = {}, onSubmit, buttonText="SUBMIT"}){

    const [title, setTitle] = useState(initData.title || "");
    const [content, setContent] = useState(initData.content || "");
    const [status, setStatus] = useState(initData.status || "NORMAL");

    useEffect(()=>{
        setTitle(initData.title || "");
        setContent(initData.content || "");
        setStatus(initData.status || "NORMAL");
    },[initData.id]);

    function handleSubmit(event){
        event.preventDefault();
        onSubmit({title,content,status});
    }

    return(
        <form onSubmit={handleSubmit} 
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-4">
            <div className="flex">
                <Select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}>
                    <option value={"NORMAL"}>NORMAL</option>
                    <option value={"PINNED"}>PIN</option>
                    <option value={"DONE"}>DONE</option>
                </Select>
                <Input
                value={title}
                required
                onChange={(e)=>setTitle(e.target.value)} 
                placeholder="TITLE"/>
            </div>
            
            <TextArea
            value={content}
            required
            rows={10}
            placeholder="CONTENT"
            onChange={(e)=>setContent(e.target.value)} />
            <Input type="submit" value={buttonText} />
        </form>
    );
}
export default MemoForm;