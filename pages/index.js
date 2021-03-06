import Head from 'next/head';

import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
	const [page, setPage] = useState(1);

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>React Query Pagination with SSG</h1>

				<Link href={`/characters/${page}`}>Pagination SSG</Link>
			</main>
		</div>
	);
}
