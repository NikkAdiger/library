"use client"; // Only for App Router in Next.js 13+

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router Navigation
import Link from "next/link";
import { toast } from "react-toastify";
import { registration } from "../services/authService";

export default function RegisterPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const user = await registration(formData);

			if (!user) {
				throw new Error("Failed creating user");
			}

			toast.success(`User created successfully`);
			router.push("/login");
		} catch (err: any) {
			setError(`Error creating user: ${formData.email}`);
			toast.error('Failed creating book with error: ' + error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
		<div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
			<h2 className="text-center mb-4">Register</h2>

			{error && <div className="alert alert-danger">{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">First name</label>
					<input
					type="text"
					className="form-control"
					name="name"
					value={formData.firstName}
					onChange={handleChange}
				/>
				</div>

				<div className="mb-3">
					<label className="form-label">Last name</label>
					<input
					type="text"
					className="form-control"
					name="name"
					value={formData.lastName}
					onChange={handleChange}
				/></div>

				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
					type="email"
					className="form-control"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/></div>

				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
					type="password"
					className="form-control"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/></div>

			<button type="submit" className="btn btn-primary w-100" disabled={loading}>
				{loading ? "Registering..." : "Register"}
			</button>
			</form>

			<p className="text-center mt-3">
			Already have an account? <Link href="/login">Login</Link>
			</p>
		</div>
		</div>
	);
}