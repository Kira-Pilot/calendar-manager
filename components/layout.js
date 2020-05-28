import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';
import utilStyles from '../styles/utils.module.scss';

export const appName = 'Calendar Manager';
export const siteTitle = 'Calendar Manager';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/images/favicon.ico" />
        <meta
          name="description"
          content="Awesome calendar app for scheduling one-on-ones"
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/analog-clock.svg"
              className={`${styles.headerHomeImage}`}
              alt={appName}
            />
            <h1 className={utilStyles.heading2Xl}>{appName}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <button type="button" className="navButton">
                <img
                  src="/images/analog-clock.svg"
                  className={`${styles.headerImage}`}
                  alt={appName}
                />
              </button>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <button
                  type="button"
                  className={`navButton ${utilStyles.colorInherit}`}
                >
                  {appName}
                </button>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <button type="button" className="navButton">
              ← Back to home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  home: PropTypes.bool,
};

Layout.defaultProps = {
  children: null,
  home: false,
};
