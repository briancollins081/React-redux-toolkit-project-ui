import React from 'react';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

export const UncontrollableLoader = () => {
    return <Segment>
        <Dimmer active inverted>
            <Loader inverted>Loading users...</Loader>
        </Dimmer>

        <Image src={require('../../assets/images/short-paragraph.png')} />
    </Segment>
}