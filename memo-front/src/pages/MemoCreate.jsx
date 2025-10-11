import MemoForm from "./MemoForm";
import { useAxios } from "../context/AxiosContext";
import { createMemo } from "../api/memo";
import { useNavigate } from "react-router-dom";

export default function MemoCreate() {
  const axios = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createMemo(axios, data);
    navigate("/memos");
  };

  return <MemoForm onSubmit={handleSubmit} buttonText="CREATE" />;
}