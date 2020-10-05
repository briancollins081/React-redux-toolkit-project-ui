import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { API_BASE_URL } from '../../../constants/api';
import { retrivePosts, selectPostById } from '../../../features/posts/postsSlice';
import { UncontrollableLoader } from '../../loaders/Loader';

import './PostView.css';

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
            {loadingStatus === 'success' && <Card fluid className="no-card-shadow">
                <Image src={API_BASE_URL + post?.image} fluid />
                <Card.Content className="px-40" id="post-sections-container">
                    <Card.Header className="my-20">{post?.title}</Card.Header>
                    <Card.Description className="mb-40 post-section">
                        {post?.body}
                    </Card.Description>
                </Card.Content>
            </Card>}
        </>
    )
}