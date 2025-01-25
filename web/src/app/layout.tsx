import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import LibraryFooter from "../components/LibraryFooter";
import LibraryHeader from "../components/LibraryHeader";
import LibraryNav from '../components/LibraryNav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<div className='container d-flex flex-column h-100%'>
					<LibraryNav />
					<LibraryHeader />
						<main>
							{children}
						</main>
					<LibraryFooter />
				</div>
			</body>
		</html>
  	);
}
