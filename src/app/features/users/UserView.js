import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatDistanceToNow, formatISO, parseISO } from 'date-fns'
import { Grid, Header, Icon, Segment, Step } from 'semantic-ui-react';
import { PostCard } from '../../components/cards/postcard/PostCard';
import { UserCard } from '../../components/cards/user/UserCard';
import { MainLayout } from '../../layouts/MainLayout';
import { retriveUsers, selectById } from './usersSlice';
import { retriveUserPosts, selectAllPosts, selectUserPosts } from '../posts/postsSlice';
import { useEffect } from 'react';

export const UserView = ({ match: { params } }) => {
    const userId = params.userId;
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => selectById(state, userId));
    const posts = useSelector(state => selectUserPosts(state, userId));

    console.log(posts);

    // useEffect(() => {
    //     if (posts.length === 0 || !posts || !user?._id) {
    //         dispatch(retriveUserPosts({ page: 1, limit: 1000, sort: -1, userId }));       
    //         dispatch(retriveUsers({ page: 1, limit: 0, sort: -1 }));
    //     }
    // }, [params, user, posts.length]);

    const handleOnPostClick = postId => {
        if (postId) {
            history.push(`/posts/${postId}`);
        }
    }
    return (
        <MainLayout>
            <Grid centered className="mt-30">
                <Grid.Row>
                    <Grid columns={1}>
                        <Grid.Row stretched>
                            <Grid.Column columns={1}>
                                <Segment>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <UserCard user={user} fluid />
                                            </Grid.Column>
                                            <Grid.Column width={12}>
                                                <Step.Group vertical fluid>
                                                    <Step>
                                                        <Step.Content>
                                                            <Step.Title>
                                                                <Header as='h3'>{user?.firstname + ' ' + user?.lastname + '\'s posts'}</Header>
                                                            </Step.Title>
                                                        </Step.Content>
                                                    </Step>
                                                    {posts.map(post =>
                                                        <Step completed={false} onClick={() => handleOnPostClick(post._id)}>
                                                            <Icon name='file alternate outline' />
                                                            <Step.Content>
                                                                <Step.Title>{post?.title}</Step.Title>
                                                                <Step.Description>Created: {formatDistanceToNow(parseISO(post.createdAt))} Updated:  {formatDistanceToNow(parseISO(post?.updatedAt))} </Step.Description>
                                                            </Step.Content>
                                                        </Step>)
                                                    }
                                                </Step.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Row>
            </Grid>
        </MainLayout>
    );
}
