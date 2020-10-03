import React from 'react'
import { Grid } from 'semantic-ui-react'
// import { Footer, FooterTop } from '../components/footer/Footer';

import { MainNavbar } from '../components/mainnavbar/MainNavbar';

export const MainLayout = ({ children }) => {

  return (
    <div>
      <Grid columns='one'> 
        <Grid.Row>
          <Grid.Column>
            <div className="main-container">
              <MainNavbar />
              {children}
              {/* <Divider className="my-40" /> */}
              {/* <Footer /> */}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}