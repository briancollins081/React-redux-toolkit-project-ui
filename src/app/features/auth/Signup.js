import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactHTMLParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Grid, Icon, Message } from 'semantic-ui-react';
import { signupUser } from '../../api/ApiUtils';
import './auth.css';

export const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [profilepic, setProfilePic] = useState(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const history = useHistory();

    const handleFileChange = ({ target: { files } }) => {
        setProfilePic(files[0]);
    }
    const isFormValid = () => {
        return firstname.length > 3 && lastname.length > 3 && email.length > 3 && phone.length > 3 && password.length > 3 && agreeToTerms === true;
    }

    const handleRegistration = e => {
        if (!agreeToTerms) {
            setErrors('You must agree to terms and conditions!');
            return;
        }
        const data = new FormData();
        data.set('firstname', firstname);
        data.set('lastname', lastname);
        data.set('email', email);
        data.set('phone', phone);
        data.set('password', password);
        if (profilepic) {
            data.append('profilepic', profilepic, profilepic.value);
        }
        signupUser(data)
            .then(res => {
                if (res.data.success) {
                    history.push('/login');
                }
                if (res.data.vlderror) {
                    let er = '';
                    res.data.data.map(err => {
                        er += `${err.msg}<br/>`
                    });
                    setErrors(er);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 650 }}>
                    <div>
                        {errors.length > 10 && <Message warning>
                            <Message.Header>There are some errors from your request</Message.Header>
                            <div>
                                {ReactHTMLParser(errors)}
                            </div>
                        </Message>}
                        <Message
                            color='teal'
                            attached
                            header='Welcome new guest'
                            content='Fill out the form below to sign-up for a an account'
                        />
                        <Form className='attached fluid segment'>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Full Name'
                                    placeholder='First Name'
                                    type='text'
                                    labelPosition="left"
                                    required
                                    onChange={(e, { value }) => setFirstname(value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Last Name'
                                    placeholder='Last Name'
                                    type='text'
                                    required
                                    onChange={(e, { value }) => setLastname(value)}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Email'
                                    placeholder='Email Address'
                                    type='email'
                                    required
                                    onChange={(e, { value }) => setEmail(value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Phone'
                                    placeholder='Phone Number'
                                    type='text'
                                    required
                                    onChange={(e, { value }) => setPhone(value)}
                                />
                            </Form.Group>

                            <Form.Input
                                label='Password'
                                type='password'
                                required
                                onChange={(e, { value }) => setPassword(value)}
                            />

                            <Form.Input label='Profile Picture' type='file' required={false} onChange={(e, data) => handleFileChange(e)} />

                            <Form.Field>
                                <Checkbox onClick={(e, { checked }) => setAgreeToTerms(checked)} label='I agree to the Terms and Conditions' />
                            </Form.Field>

                            <Button color='teal' disabled={!isFormValid()} onClick={handleRegistration}>Submit</Button>
                        </Form>
                        <Message attached='bottom' color='teal' success>
                            <Icon name='help' />
                            Already signed up?&nbsp;<Link to='/login'>Login here</Link>&nbsp;instead.
                        </Message>
                    </div>


                </Grid.Column>
            </Grid>
        </>
    )
}