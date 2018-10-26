import '@ui/assets/globalStyles';
import theme from '@ui/assets/theme';
import Navbar from '@ui/components/navbar/Navbar';
import { ThemeProvider } from 'emotion-theming';
import App, { Container } from 'next/app';
import React from 'react';

export default class MyApp extends App {
  public static async getInitialProps({ Component, router, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Navbar />
            <Component {...pageProps} />
          </React.Fragment>
        </ThemeProvider>
      </Container>
    );
  }
}
