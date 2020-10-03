import React from 'react';
import {useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { PostView } from '../../components/cards/postview/PostView';
import { MainLayout } from '../../layouts/MainLayout';

export const SinglePost = () => {
    const params = useParams();
    return (
        <MainLayout>
            <Grid centered className="mt-30">
                <Grid.Row columns="1">
                    <Grid.Column>
                        <PostView postId={params.postId} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </MainLayout>
    )
}