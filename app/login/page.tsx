'use client'

import { useActionState } from 'react'
import { signIn } from '@/app/auth/actions'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const [error, action, pending] = useActionState(signIn, null)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-lg mx-auto mb-4">
            BFC
          </div>
          <h1 className="text-white text-2xl font-black">Barcelo FC</h1>
          <p className="text-green-600 text-sm mt-1">Iniciá sesión para continuar</p>
        </div>

        <form action={action} className="space-y-4">
          <input type="hidden" name="redirect" value={redirect} />

          <div>
            <label htmlFor="email" className="block text-green-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full bg-green-950 border border-green-800/60 rounded-xl px-4 py-3 text-white placeholder-green-800 focus:outline-none focus:border-green-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-green-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-green-950 border border-green-800/60 rounded-xl px-4 py-3 text-white placeholder-green-800 focus:outline-none focus:border-green-500 transition-colors text-sm"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-800/40 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            {pending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-green-700 text-sm mt-6">
          ¿No tenés cuenta?{' '}
          <Link href="/register" className="text-green-400 hover:text-white transition-colors font-medium">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
