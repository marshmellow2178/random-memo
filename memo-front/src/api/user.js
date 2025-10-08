export const createUser = (axiosInstance, id, pw1, pw2) =>{
    return axiosInstance.post(`/user/create`, {
        "username":id,
        "password1":pw1,
        "password2":pw2
    });
}

export const login = (axiosInstance, id, pw) =>{
    return axiosInstance.post(`/user/login`, {
        "username": id,
        "password": pw
    });
}

export const getUser = (axiosInstance) =>{
    return axiosInstance.get(`/user/me`);
}