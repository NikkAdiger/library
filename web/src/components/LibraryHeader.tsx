"use client";

import Link from "next/link";

export default function LibraryHeader() {
  return (
	<>
		<header className="py-3 mb-4 border-bottom">
        	<div className="container d-flex align-items-center justify-content-between">
				<div className="d-flex align-items-center">
					<Link href="/">
					<a className="d-flex align-items-center text-decoration-none">
						<span className="fs-4 fw-bold text-primary">Library</span>
					</a>
					</Link>
				</div>
			</div>
		</header>
	</>
  );
}
