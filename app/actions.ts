'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Posicion } from '@/lib/jugadores'

export async function crearJugador(
  prevState: string | null,
  formData: FormData
): Promise<string | null> {

  const nombre = (formData.get('nombre') as string).trim()

  const posicion = formData.get('posicion') as Posicion

  const goles = Number(formData.get('goles') || 0)

  const asistencias = Number(
    formData.get('asistencias') || 0
  )

  const partidos = Number(
    formData.get('partidos') || 0
  )

  if (!nombre) {
    return 'El nombre es obligatorio'
  }

  const { error } = await supabase
    .from('jugadores')
    .insert([
      {
        nombre,
        posicion,
        goles,
        asistencias,
        partidos,
        mvps: 0,
      },
    ])

  if (error) {
    return `Error al guardar: ${error.message}`
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/partidos')

  return null
}

export async function eliminarJugador(id: string) {

  const { error } = await supabase
    .from('jugadores')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/partidos')
}

export async function actualizarJugador(
  id: string,
  prevState: string | null,
  formData: FormData
): Promise<string | null> {

  const nombre = (formData.get('nombre') as string).trim()

  const posicion = formData.get('posicion') as Posicion

  const goles = Number(formData.get('goles') || 0)

  const asistencias = Number(
    formData.get('asistencias') || 0
  )

  const partidos = Number(
    formData.get('partidos') || 0
  )

  const mvps = Number(
    formData.get('mvps') || 0
  )

  if (!nombre) {
    return 'El nombre es obligatorio'
  }

  const { error } = await supabase
    .from('jugadores')
    .update({
      nombre,
      posicion,
      goles,
      asistencias,
      partidos,
      mvps,
    })
    .eq('id', id)

  if (error) {
    return `Error al actualizar: ${error.message}`
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/partidos')

  return null
}

export async function sumarMVP(id: string) {

  const { data } = await supabase
    .from('jugadores')
    .select('mvps')
    .eq('id', id)
    .single()

  const actual = data?.mvps || 0

  await supabase
    .from('jugadores')
    .update({
      mvps: actual + 1,
    })
    .eq('id', id)

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/partidos')
}

export async function votarMVP(id: string) {

  const { data } = await supabase
    .from('jugadores')
    .select('mvps')
    .eq('id', id)
    .single()

  const actuales = data?.mvps || 0

  const { error } = await supabase
    .from('jugadores')
    .update({
      mvps: actuales + 1,
    })
    .eq('id', id)

  if (error) {
    console.error(error)
    return
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/partidos')
}