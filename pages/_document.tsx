import { extractCritical } from 'emotion-server';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  public static getInitialProps({ renderPage }: any) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  public render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <link
            href="https://fonts.googleapis.com/css?family=Gothic+A1:200,400|Nanum+Gothic:400,700"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
