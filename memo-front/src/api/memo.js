export const getMemos = (axiosInstance, {
    page=0, 
    size=10, 
    keyword='', 
    status='', 
    sort='createdAt,desc'})=>{
    return axiosInstance.get(`/memos`, {
        params:{
            page,
            size,
            keyword,
            status,
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

export const createMemo=(axiosInstance, memoData)=>{
    return axiosInstance.post(`/memos`, memoData);
}

export const updateMemo=(axiosInstance, memoData, id)=>{
    return axiosInstance.patch(`/memos/${id}`, {
        "title": memoData.title,
        "content": memoData.content,
        "status": memoData.status
    });
}
