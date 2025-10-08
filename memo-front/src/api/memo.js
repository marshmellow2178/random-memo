export const getMemos = (axiosInstance, {
    page=0, 
    size=10, 
    keyword='', 
    status='', 
    sort='createdAt,desc'})=>{
    return axiosInstance.get(`/memos`, {
        params:{
            keyword,
            status,
            page,
            size,
            sort
        }
    });
};

export const getMemo=(axiosInstance, id)=>{
    return axiosInstance.get(`/memos/${id}`);
};

export const deleteMemo=(axiosInstance, id)=>{
    return axiosInstance.delete(`/memos/${id}`);
};

export const createMemo=(axiosInstance, title, content)=>{
    return axiosInstance.post(`/memos`, 
        {
            "title": title,
            "content": content,
        }
    );
}

export const updateMemo=(axiosInstance, id, title, content, status)=>{
    return axiosInstance.patch(`/memos/${id}`, {
        "title": title,
        "content": content,
        "status": status
    });
}
