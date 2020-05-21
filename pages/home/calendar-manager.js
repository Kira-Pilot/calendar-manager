import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function calendarManager() {
    return (
        <Layout>
            <Head>
                <title>Calendar Manager</title>
            </Head>
            <h1>Calendar Manager</h1>
            <h2>
                <Link href="/">
                    <a>Back to Home</a>
                </Link>
            </h2>
        </Layout>
    )
}

