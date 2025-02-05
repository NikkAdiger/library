"use client";

import Link from "next/link";

export default function LibraryHeader() {
  return (
	<>
		<header className="py-3 mb-4 border-bottom">
        	<div className="container d-flex align-items-center justify-content-between">
				<div className="d-flex align-items-center">
					<Link className="d-flex align-items-center text-decoration-none" href="/">
						<span className="fs-4 fw-bold text-primary">Library</span>
					</Link>
				</div>
			</div>
		</header>
	</>
  );
}
