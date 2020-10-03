import { API_BASE_URL } from '../constants/api';
import axios from 'axios';

const request = (options) => {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (localStorage.getItem('token')) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    options = Object.assign({}, { headers }, options);

    const returnObject = {
        url: options.url,
        data: options.body,
        headers: options.headers
    };

    if (options.method === "POST") {
        return axios({
            method: 'POST',
            ...returnObject
        });

    }

    if (options.method === "PUT") {
        return axios({
            method: 'PUT',
            ...returnObject
        });

    }

    if (options.method === "PATCH") {
        return axios({
            method: 'PATCH',
            ...returnObject
        });

    }

    if (options.method === "DELETE") {
        return axios({
            method: 'DELETE',
            ...returnObject
        });

    }

    if (options.method === "GET") {
        return axios({
            method: 'GET',
            ...returnObject
        });
    }
};

export const signupUser = (signupBody) => {
    return request({
        url: API_BASE_URL + "auth/signup",
        method: 'POST',
        body: signupBody
    });
}

export const loginUser = (loginBody) => {
    return request({
        url: API_BASE_URL + "auth/signin",
        method: 'POST',
        body: loginBody
    });
}


export const fetchAllUsers = ({ page, limit, sort }) => {
    return request({
        url: `${API_BASE_URL}auth/users/${page}/${limit}/${sort}`,
        method: 'GET',
        body: null
    });
}

export const fetchSingleUser = (userId) => {
    return request({
        url: `${API_BASE_URL}auth/users/${userId}`,
        method: 'GET',
        body: null
    });
}


export const createPost = (postData) => {
    return request({
        url: API_BASE_URL + "content/posts",
        method: 'POST',
        body: postData
    });
}

export const updatePost = (postData) => {
    return request({
        url: API_BASE_URL + "content/posts/" + postData.postId,
        method: 'PATCH',
        body: postData
    });
}

export const deletePost = (postId) => {
    return request({
        url: API_BASE_URL + "content/posts/" + postId,
        method: 'DELETE',
        body: null
    });
}


export const fetchAllPosts = ({ page, limit, sort }) => {
    return request({
        url: `${API_BASE_URL}content/posts/latest/${page}/${limit}/${sort}`,
        method: 'GET',
        body: null
    });
}
export const fetchUserPosts = ({ page, limit, sort, userId }) => {
    return request({
        url: `${API_BASE_URL}content/posts/${userId}/latest/${page}/${limit}/${sort}`,
        method: 'GET',
        body: null
    });
}

export const fetchSinglePost = (postId) => {
    return request({
        url: `${API_BASE_URL}content/posts/${postId}`,
        method: 'GET',
        body: null
    });
}


