import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Image } from 'semantic-ui-react';

export const LandingMainSection = () => {
    const history = useHistory();

    const handleButtonClick = (e, type) => {
        if (type === 'posts') {
            history.push('/posts');
        }
        if (type === 'users') {
            history.push('/users');
        }
    }

    return (
        <div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Welcome, Friends</Header.Content>
            </Header>
            <Grid textAlign="center" centered columns={2}>
                <Grid.Column textAlign="center">
                    This is a react redux application
                </Grid.Column>

                <Grid.Row divided columns={2} className="mt-60">
                    <Grid.Column textAlign="center">
                        <Card.Group centered>
                            <Card>
                                <Card.Content>
                                    <Image
                                        floated='right'
                                        size='mini'
                                        src='https://image.freepik.com/free-photo/cute-rescue-dog-shelter-waiting-fostered_23-2148682933.jpg'
                                    />
                                    <Card.Header>Posts Lists</Card.Header>
                                    <Card.Meta>Managed by Redux</Card.Meta>
                                    <Card.Description>
                                        All the posts are fetched by Redux Thunk and stored in Redux state.
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui one buttons'>
                                        <Button onClick={e => handleButtonClick(e, 'posts')} basic={true} color='green'>
                                            Go Check
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                        <Card.Group centered>
                            <Card>
                                <Card.Content>
                                    <Image
                                        floated='right'
                                        size='mini'
                                        src='https://image.freepik.com/free-photo/cute-rescue-dog-shelter-waiting-fostered_23-2148682933.jpg'
                                    />
                                    <Card.Header>Users List</Card.Header>
                                    <Card.Meta>Managed by Redux</Card.Meta>
                                    <Card.Description>
                                        All the users are fetched by Redux Thunk and stored in Redux state.
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui one buttons'>
                                        <Button onClick={e => handleButtonClick(e, 'users')} basic={true} color='green'>
                                            Go Check
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}