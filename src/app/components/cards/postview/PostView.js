import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { API_BASE_URL } from '../../../constants/api';
import { retrivePostById, retrivePosts, selectPostById, selectPostsCount } from '../../../features/posts/postsSlice';
import { UncontrollableLoader } from '../../loaders/Loader';

export const PostView = ({ postId }) => {
    const dispatch = useDispatch();

    const post = useSelector(state => selectPostById(state, postId));
    
    const loadingStatus = useSelector(state => state.posts.status);
    useEffect(() => {
        if (loadingStatus === 'idle') {
            console.log(postId);
            dispatch(retrivePosts({ page: 1, limit: 0, sort: -1 }))
        }
    }, [dispatch, postId])


    return (
        <>
            {loadingStatus === 'loading' && <UncontrollableLoader />}
            {loadingStatus === 'success' && <Card fluid>
                <Image src={API_BASE_URL + post?.image} fluid />
                <Card.Content className="px-40">
                    <Card.Header className="my-20">{post?.title}</Card.Header>
                    <Card.Description className="mb-40">
                        {post?.body}
                    </Card.Description>
                </Card.Content>
            </Card>}
        </>
    )
}