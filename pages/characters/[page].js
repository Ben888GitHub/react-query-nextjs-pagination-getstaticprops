import { useRouter } from 'next/router';
import { useFetchCharacters, fetchCharacters } from '../../hooks/useApi';
import { dehydrate, QueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function PaginationSSG(props) {
	const router = useRouter();
	// const [page, setPage] = useState(props.page);
	const { data, isPreviousData } = useFetchCharacters(props.page);

	// props.page && console.log(page);

	// data && console.log(data);

	// useEffect(() => {
	// 	// console.log(router);
	// 	if (router.isReady) {
	// 		// console.log(router.query.page);
	// 		if (router.query.page) {
	// 			console.log(router.query);
	// 			router.push({
	// 				pathname: '/characters/[page]',
	// 				query: { page: Number(router.query.page) }
	// 			}) && setPage(Number(router.query.page));
	// 		}
	// 	}
	// }, [router.isReady]);

	return (
		<div>
			<h1>Pagination SSG</h1>
			{/* <h3>{router.query.page}</h3> */}
			<br />
			<button
				onClick={() => {
					router.push({
						pathname: '/characters/[page]',
						query: { page: Number(router.query.page) + 1 }
					});
				}}
			>
				Next Page
			</button>
			<div className="grid-container">
				{props.page &&
					data?.results?.map((character) => (
						<article key={character.id}>
							<Image
								src={character.image}
								alt={character.name}
								height={250}
								loading="eager"
								width={300}
								priority
							/>

							<div className="text">
								<p>Name: {character.name}</p>
								<p>Lives in: {character.location.name}</p>
								<p>Species: {character.species}</p>
								<i>Id: {character.id} </i>
								<p>Status: {character.status}</p>
							</div>
						</article>
					))}
			</div>
		</div>
	);
}

export default PaginationSSG;

export const getStaticProps = async ({ params }) => {
	console.log(params.page);

	let page = Number(params.page);

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['characters', page], fetchCharacters);

	console.log(queryClient);

	return {
		props: {
			page: page,
			dehydratedState: dehydrate(queryClient)
		}
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true
	};
};
