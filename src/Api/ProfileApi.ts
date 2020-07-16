import {PhotosType, ProfileType} from "../Types/types";
import {instance, APIResponseType} from "./Api";

type SavePhotoDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status}).then(response => response.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<APIResponseType<SavePhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile).then(response => response.data)
    }
};