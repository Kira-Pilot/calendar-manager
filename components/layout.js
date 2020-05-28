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
              <a>
                <img
                  src="/images/analog-clock.svg"
                  className={`${styles.headerImage}`}
                  alt={appName}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{appName}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
