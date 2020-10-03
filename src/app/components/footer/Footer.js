import React from 'react';
import { Embed, Grid, Segment } from 'semantic-ui-react';

import './Footer.css';
export const Footer = () => {

    return (
        <Grid verticalAlign='middle' columns={1}>
            <Grid.Column verticalAlign="middle">
                <Segment color='pink'>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column>
                            <div className="video-container">
                                <Embed
                                    id='125292332'
                                    placeholder='https://image.freepik.com/free-vector/three-horses-run-gallop-from-splash-watercolor-hand-drawn-sketch-illustration-paints_291138-121.jpg'
                                    source='vimeo'
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="video-container">
                                <Embed
                                    id='125292332'
                                    placeholder='https://image.freepik.com/free-vector/three-horses-run-gallop-from-splash-watercolor-hand-drawn-sketch-illustration-paints_291138-121.jpg'
                                    source='vimeo'
                                />
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
        </Grid>

    )
}
