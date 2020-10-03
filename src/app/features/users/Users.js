import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Grid, Image, Loader, Pagination, Segment } from 'semantic-ui-react';
import { UserCard } from '../../components/cards/user/UserCard';
import { MainLayout } from '../../layouts/MainLayout';
import { retriveUsers, selectAllUsers } from './usersSlice';

const PAGECOUNT = 12;

export const Users = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(PAGECOUNT);
    const [sort, setSort] = useState(-1);

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);
    const usersCount = useSelector(state => state.users.total);
    const loadingStatus = useSelector(state => state.users.status);

    useEffect(() => {
        if (loadingStatus === 'idle') {
            dispatch(retriveUsers({ page, limit, sort }));
        }
    }, [dispatch, users])

    const handlePaginationChange = (e, { activePage }) => {
        setPage(+activePage);
        dispatch(retriveUsers({ page: +activePage, limit, sort }))
    }

    const renderUser = user => <Grid.Column className="my-10">
        <UserCard user={user} />
    </Grid.Column>


    const renderLoader = () => <Segment>
        <Dimmer active inverted>
            <Loader inverted>Loading users...</Loader>
        </Dimmer>

        <Image src={require('../../assets/images/short-paragraph.png')} />
    </Segment>
    const renderLoadFailed = () => <> <Segment>
        <h1 className="m-20 faded">
            Uuops! There are no users at the moment
        </h1>
    </Segment>
    </>
    return (
        <MainLayout>
            <Grid centered className="mt-30">
                <Grid.Row columns="4">
                    {loadingStatus === 'success' && users.map(u => renderUser(u))}
                    {loadingStatus === 'loading' && renderLoader()}
                    {loadingStatus === 'failed' && renderLoadFailed()}
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
                        totalPages={Math.ceil(+usersCount / PAGECOUNT)}
                        className="my-60"
                    />
                </Grid.Row>
            </Grid>
        </MainLayout>
    )
}
