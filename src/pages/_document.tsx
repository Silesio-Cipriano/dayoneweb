import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Nunito:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="//db.onlinewebfonts.com/c/32c9f4f8f5079ce7718df5028bba4ee2?family=Tuffy"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="//db.onlinewebfonts.com/c/1c28f465d9f1379f07437d9df543d422?family=Tuffy"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
