import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Pagination } from 'semantic-ui-react';
import { MainLayout } from '../../layouts/MainLayout';
import { PostCard } from '../../components/cards/postcard/PostCard';
import { retrivePosts, selectAllPosts, selectPostsCount } from './postsSlice';
import { UncontrollableLoader } from '../../components/loaders/Loader';

import './Posts.css';

const PAGECOUNT = 12;
export const Posts = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(PAGECOUNT);
    const [sort, setSort] = useState(-1);

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postCount = useSelector(state => state.posts.total);
    const loadingStatus = useSelector(state => state.posts.status);

    useEffect(() => {
        if (loadingStatus === 'idle') {
            dispatch(retrivePosts({ page, limit, sort }));
        }
    }, [dispatch, posts])

    const handlePaginationChange = (e, { activePage }) => {
        setPage(+activePage);
        dispatch(retrivePosts({ page: +activePage, limit, sort }))
    }
    return <>
        <MainLayout>

            {postCount <= 0 && <div>
                There are no more posts at the moment.
            </div>}
            {loadingStatus === 'loading' && <UncontrollableLoader />}
            {postCount > 0 && <Grid centered className="mt-30">
                <Grid.Row columns="1">
                    {posts.map(post => <Grid.Column width="4" key={post.id}>
                        <PostCard
                            header={post.title}
                            id={post.id}
                            meta={`Created by: ${post.creator.firstname} ${post.creator.lastname}`}
                            content={post.introduction}
                        />
                    </Grid.Column>)}
                </Grid.Row>
                <Grid.Row centered columns={1}>
                    <Pagination
                        onPageChange={handlePaginationChange}
                        boundaryRange={3}
                        defaultActivePage={1}
                        // ellipsisItem={null}
                        // firstItem={null}
                        // lastItem={null}
                        siblingRange={4}
                        totalPages={Math.ceil(+postCount / PAGECOUNT)}
                        className="my-60"
                    />
                </Grid.Row>
            </Grid>}
        </MainLayout>
    </>
}