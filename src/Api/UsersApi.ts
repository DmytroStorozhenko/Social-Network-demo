import {GetItemsType, instance, APIResponseType} from "./Api"

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    }
};