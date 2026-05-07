'use client'

import { useActionState, useRef, useEffect } from 'react'
import { crearJugador } from '@/app/actions'
import { POSICIONES } from '@/lib/jugadores'

const inputClass =
  'w-full bg-green-900/30 border border-green-800/60 rounded-lg px-3 py-2 text-white text-sm placeholder:text-green-700 focus:outline-none focus:border-green-500 transition-colors'

const labelClass = 'block text-green-400 text-xs font-semibold uppercase tracking-wider mb-1.5'

export function JugadorForm() {
  const [error, action, pending] = useActionState(crearJugador, null)
  const formRef = useRef<HTMLFormElement>(null)
  const wasPending = useRef(false)

  useEffect(() => {
    if (wasPending.current && !pending && !error) {
      formRef.current?.reset()
    }
    wasPending.current = pending
  }, [pending, error])

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div>
        <label htmlFor="nombre" className={labelClass}>Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder="Ej: Carlos Gómez"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="posicion" className={labelClass}>Posición</label>
        <select id="posicion" name="posicion" required className={inputClass}>
          {POSICIONES.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'goles',       label: 'Goles' },
          { name: 'asistencias', label: 'Asist.' },
          { name: 'partidos',    label: 'PJ' },
        ].map(({ name, label }) => (
          <div key={name}>
            <label htmlFor={name} className={labelClass}>{label}</label>
            <input
              id={name}
              name={name}
              type="number"
              min={0}
              defaultValue={0}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-950/40 border border-red-800/40 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:text-green-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm"
      >
        {pending ? 'Guardando...' : '+ Agregar jugador'}
      </button>
    </form>
  )
}
