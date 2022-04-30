// const host = "http://localhost:5000"                            // Dev
// const host = "https://elpis-little-gathering.herokuapp.com"    // Pro

const host = process.env.NEXT_PUBLIC_BACK_END

export const createUser = () => `${host}/api/users`

export const loginUser = () => `${host}/api/users/login`

export const editUser = () => `${host}/api/users/user`

export const getUser = () => `${host}/api/users/user`

export const getUserbyID = (userID) => `${host}/api/users/id/${userID}`

export const getUserbyEmail = (email) => `${host}/api/users/email/${email}`

export const getUserPicture = (userID, size = 'small') => `${host}/api/users/pic-id/${userID}/avatar?size=${size}`

export const userExistence = (email) => `${host}/api/users/user/exists?email=${email}`

export const logoutUser = () => `${host}/api/users/logout`

export const createPost = () => `${host}/api/posts`

export const editPost = (postID) => `${host}/api/posts/${postID}`

export const getPost = (postID) => `${host}/api/posts/${postID}`

export const deletePost = (postID) => `${host}/api/posts/${postID}`

export const postList = (start, count) => `${host}/api/posts?sortBy=createdAt:desc&limit=${count}&skip=${start}`

export const postComments = (start, count, postID) => `${host}/api/comments?post=${postID}&sortBy=createdAt:desc&limit=${count}&skip=0${start}`

export const likePost = (postID) => `${host}/api/posts/like/${postID}`

export const dislikePost = (postID) => `${host}/api/posts/dislike/${postID}`

export const createComment = () => `${host}/api/comments`

export const editComment = (commentID) => `${host}/api/comments/${commentID}`

export const deleteComment = (commentID) => `${host}/api/comments/${commentID}`

export const uploadAvatar = () => `${host}/api/users/user/avatar`

export const deleteAvatar = () => `${host}/api/users/user/avatar`
