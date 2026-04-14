'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  const handleGoogleSignUp = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  if (success) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 lg:px-8 bg-[#0D0B0F]/[0.85] backdrop-blur-xl border-b border-[rgba(54,46,40,0.3)]">
          <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-[#D97757] rounded-[10px] overflow-hidden">
                  <div className="absolute top-[5px] right-[5px] w-3.5 h-3.5 bg-[#F5F0EB] rounded-full" />
                  <div className="absolute bottom-[5px] left-[6px] w-2.5 h-2.5 bg-[#F5F0EB] rounded-[3px] rotate-12" />
                </div>
              </div>
              <span className="font-display text-xl font-bold text-[#F5F0EB] tracking-tight">
                Claude Chief
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="text-sm text-[#A99E92] hover:text-[#F5F0EB] transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </nav>

        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#0D0B0F]">
          <div className="w-full max-w-md text-center">
            <div className="relative p-10 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl mb-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.08),transparent_70%)]" />
              <div className="w-16 h-16 bg-[rgba(74,222,128,0.12)] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Check className="w-8 h-8 text-[#4ADE80]" />
              </div>
              <h1 className="font-display text-2xl font-bold text-[#F5F0EB] mb-3">
                Check your email
              </h1>
              <p className="text-[#A99E92] leading-relaxed">
                We sent a confirmation link to <strong className="text-[#F5F0EB]">{email}</strong>. Click the link to activate your account.
              </p>
            </div>
            <Link href="/sign-in" className="btn btn-primary">
              Back to Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 lg:px-8 bg-[#0D0B0F]/[0.85] backdrop-blur-xl border-b border-[rgba(54,46,40,0.3)]">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#D97757] rounded-[10px] overflow-hidden">
                <div className="absolute top-[5px] right-[5px] w-3.5 h-3.5 bg-[#F5F0EB] rounded-full" />
                <div className="absolute bottom-[5px] left-[6px] w-2.5 h-2.5 bg-[#F5F0EB] rounded-[3px] rotate-12" />
              </div>
            </div>
            <span className="font-display text-xl font-bold text-[#F5F0EB] tracking-tight">
              Claude Chief
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-[#A99E92] hover:text-[#F5F0EB] transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── SIGN UP FORM ─── */}
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#0D0B0F]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
              Create your account
            </h1>
            <p className="text-[#A99E92] text-base">
              Join Claude Chief to save and download resources
            </p>
          </div>

          {/* Form Card */}
          <div className="relative p-8 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.08),transparent_70%)]" />

            <form onSubmit={handleSignUp} className="space-y-6 relative">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-xl text-sm text-[#EF4444]">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#A99E92] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] focus:outline-none focus:border-[#D97757] transition-all min-h-12"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#A99E92] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] focus:outline-none focus:border-[#D97757] transition-all min-h-12"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#A99E92] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••• (min 8 characters)"
                    className="w-full pl-12 pr-12 py-4 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] focus:outline-none focus:border-[#D97757] transition-all min-h-12"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6158] hover:text-[#A99E92] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full justify-center h-12 text-base"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[rgba(54,46,40,0.5)]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[rgba(19,17,24,0.88)] text-xs text-[#6B6158]">
                    or
                  </span>
                </div>
              </div>

              {/* Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="btn btn-outline w-full justify-center h-12"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Terms */}
            <p className="mt-6 text-xs text-center text-[#6B6158]">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-[#6A9BCC] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#6A9BCC] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-[#6B6158]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#D97757] hover:text-[#E5886A] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}