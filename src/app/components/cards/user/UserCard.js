import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Card, Icon, Image } from 'semantic-ui-react';
import { API_BASE_URL } from '../../../constants/api';

import './UserCard.css';

export const UserCard = ({ user, user: { _id, firstname, lastname, createdAt, profilepicture, email, phone }, fluid }) => {
    profilepicture = API_BASE_URL + profilepicture;
    const ct = formatDistanceToNow(parseISO(createdAt));
    const history = useHistory();

    const handleViewUser = (e, userId) => {
        e.preventDefault();
        history.push(`/users/${userId}`);
    }

    return (
        <Card fluid={fluid ? fluid : false} link onClick={e => handleViewUser(e, _id)}>
            <Image src={profilepicture} wrapped ui={false} className="user-img" />
            <Card.Content>
                <Card.Header>{firstname}&nbsp;{lastname}</Card.Header>
                <Card.Meta>Joined in {ct}</Card.Meta>
                <Card.Description>
                    This is a user, with access to create content
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to={`/users/${_id}`}>
                    <Icon name='mail' />&nbsp;{email}
                </Link><br />
                <Link to={`/users/${_id}`}>
                    <Icon name='phone' />&nbsp;{phone}
                </Link>
            </Card.Content>
        </Card>
    )
}