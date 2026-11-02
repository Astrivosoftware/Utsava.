import { login } from "@/app/actions/admin";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Admin login", robots: { index: false } };

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form action={login} className="card w-full max-w-sm space-y-4 p-8">
        <Logo className="text-4xl" />
        <p className="text-sm text-charcoal/60">Admin sign in</p>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoFocus className="input" />
        </div>
        {searchParams.error && <p role="alert" className="text-sm text-maroon">Wrong password. Try again.</p>}
        <button className="btn-dark w-full">Sign in</button>
      </form>
    </div>
  );
}
