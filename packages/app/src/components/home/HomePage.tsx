import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';

import {
  Page,
  Content,
  InfoCard,
} from '@backstage/core-components';

import {
  HomePageCompanyLogo,
  HomePageStarredEntities,
  HomePageToolkit,
  WelcomeTitle,
  HomePageTopVisited,
} from '@backstage/plugin-home';

import { SearchContextProvider } from '@backstage/plugin-search-react';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(5, 0),
  },
}));

export const HomePage = () => {
  const classes = useStyles();

  return (
    <SearchContextProvider>
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center" spacing={6}>
            <HomePageCompanyLogo className={classes.container} />

            <Grid item xs={12} justifyContent="center">
              <WelcomeTitle />
            </Grid>

            <Grid item xs={12} md={6}>
              <HomePageStarredEntities />
            </Grid>

            <Grid item xs={12} md={6}>
              <HomePageTopVisited />
            </Grid>

            <Grid item xs={12} md={6}>
              <HomePageToolkit
                tools={Array(6).fill({
                  url: '#',
                  label: 'link',
                  icon: <BuildIcon />,
                })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InfoCard title="Composable Section">
                <div style={{ height: 300 }} />
              </InfoCard>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>
  );
};

export default HomePage;
