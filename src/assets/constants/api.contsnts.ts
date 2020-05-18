
export enum UsersEndPoints {
    login = "/users/login",
    me = "/users",
    register = "/users",
    logout = "/users/logout",
    all = "/users/all",
    uploadAvatar = "/users/upload-avatar",
    remove = "/users",
    search = "/users/search",
    status = "/users/user-status",
    newUserData = "/users/new-user-data",
    userInfo = "/users/user-info"

}

export enum DialogEndPoints {
    create = "/dialog",
    getDialogs = "/dialog",
    remove = "/dialog",
    search = "/dialog/search",
    uploadFile = "/dialog/file",
}

export enum TypesFileEnum {
    audio= "audio",
    imageMessage = "image message",
    avatar = "avatar"
}