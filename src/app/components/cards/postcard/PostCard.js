import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export const PostCard = ({ header, id, meta, content }) => {
    const history = useHistory();

    const handleViewPost = (e, postId) => {
        console.log({postId});
        e.preventDefault();
        history.push(`/posts/${postId}`);
    }

    return <Card
        onClick={e => handleViewPost(e, id)}
        link
        header={header}
        meta={meta}
        description={content}
        fluid
        className="my-10"
    />
}