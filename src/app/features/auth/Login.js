import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAuthData, signinUser } from '../auth/authSlice';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
import { loginUser } from '../../api/ApiUtils';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [authData, setAuthData] = useState(null)

    const history = useHistory();

    useEffect(() => {
        if (authData && authData.token) {
            history.push('/');
        }
    }, [authData]);
    // }, [authData.length]);

    const handleRegistration = () => {
        loginUser({ email, password })
            .then(({ data }) => {
                console.log({ data });
                setAuthData(data.data);
                localStorage.setItem('token', data.data.token)
            })
            .catch(error => {
                console.log(error);
                setError("Please check your credentials")
            })
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                {error.length > 10 && <Message warning>
                    <Message.Header>There are some errors from your request</Message.Header>
                    <div>
                        {error}
                    </div>
                </Message>}
                <Segment>
                    <Header color='teal' textAlign='center'>
                        <Icon name="lock" size="huge" className="font-icon-large mb-5" />
                    </Header>
                    <Form size='large'>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={(e, { value }) => setEmail(value)} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e, { value }) => setPassword(value)}
                        />

                        <Button color='teal' size='large' onClick={handleRegistration}>
                            Login
                        </Button>
                    </Form>
                    <div className="mt-10">
                        New to us? <Link to='/signup'>Sign Up</Link>
                    </div>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}