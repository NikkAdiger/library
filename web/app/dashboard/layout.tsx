import Footer from "../ui/dashboard/Footer";
import Header from "../ui/dashboard/Header";
import Nav from "../ui/dashboard/Nav";

export default function RootLayout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {
	  return (
		  <html lang='en'>
			  <body>
				  <div className='container d-flex flex-column h-100%'>
					  <Nav />
					  <Header />
						  <main>
							  {children}
						  </main>
					  <Footer />
				  </div>
			  </body>
		  </html>
		);
  }