"use client"; // Only for Next.js App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function LoginPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { accessToken } = await login(formData);

			Cookies.set('auth_token', accessToken, {
				expires: 7, // Expires in 7 days
				secure: process.env.NODE_ENV === 'production', // HTTPS only in production
				sameSite: 'Strict', // Protect against CSRF
				path: '/', // Available everywhere in the app
			});

			toast.success(`User logged in successfully`);
			alert("User logged in successfully! Redirecting...");
			router.push("/dashboard");
		} catch (err: any) {
			setError(`Error logging in user: ${formData.email}`);
			toast.error('Failed logging in with error: ' + error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
		<div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
			<h2 className="text-center mb-4">Login</h2>

			{error && <div className="alert alert-danger">{error}</div>}

			<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label className="form-label">Email</label>
				<input
				type="email"
				className="form-control"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Password</label>
				<input
				type="password"
				className="form-control"
				name="password"
				value={formData.password}
				onChange={handleChange}
				required
				/>
			</div>

			<button type="submit" className="btn btn-primary w-100" disabled={loading}>
				{loading ? "Logging in..." : "Login"}
			</button>
			</form>

			<p className="text-center mt-3">
			Don't have an account? <Link href="/register">Register here</Link>
			</p>
		</div>
		</div>
	);
}