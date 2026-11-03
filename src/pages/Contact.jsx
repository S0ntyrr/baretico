import { useState } from 'react'
import { AnimatePresence, m, useAnimationControls } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import { dur, ease } from '../motion/tokens'

export default function Contact() {
  const [v, setV] = useState({ nombre: '', correo: '', motivo: 'pedido', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const shake = useAnimationControls()

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const validate = () => {
    const e = {}
    if (v.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(v.correo)) e.correo = 'Revisa el correo.'
    if (v.mensaje.trim().length < 10) e.mensaje = 'Cuéntanos un poco más (mín. 10 caracteres).'
    return e
  }
  const submit = (ev) => {
    ev.preventDefault()
    const e = validate(); setErrors(e)
    if (Object.keys(e).length) {
      shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } })
      document.getElementById(Object.keys(e)[0])?.focus()
      return
    }
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1100) // envío simulado
  }

  const Field = ({ id, label, as = 'input', ...rest }) => {
    const C = as
    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        <C id={id} value={v[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-e` : undefined} {...rest} />
        <AnimatePresence>
          {errors[id] && <m.span id={`${id}-e`} className="error" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{errors[id]}</m.span>}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Page title="Contacto">
      <section className="section section--top">
        <div className="wrap contact">
          <div>
            <Reveal as="h1" className="h1">Hablemos<br />de obra</Reveal>
            <Reveal i={1}><p className="lead muted">Pedidos, colaboraciones, prensa o reparaciones. Respondemos en 48 h hábiles.</p></Reveal>
            <Reveal i={2} className="contact__data mono">
              <p>Taller — Barrio Restrepo, Bogotá (dirección ficticia)</p>
              <p>hola@obranegra.example</p>
              <p>Lun–Sáb · 10:00–18:00</p>
            </Reveal>
          </div>
          <Reveal i={1}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <m.div key="ok" className="sent" role="status" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: ease.carga, duration: dur.base }}>
                  <p className="h2">Mensaje recibido</p>
                  <p className="muted">Gracias, {v.nombre.split(' ')[0]}. (Envío simulado: no se guardó ningún dato.)</p>
                  <button className="btn btn--ghost" onClick={() => { setV({ nombre: '', correo: '', motivo: 'pedido', mensaje: '' }); setStatus('idle') }}>Enviar otro</button>
                </m.div>
              ) : (
                <m.form key="form" onSubmit={submit} noValidate animate={shake} exit={{ opacity: 0, y: -20 }}>
                  {Field({ id: 'nombre', label: 'Nombre', autoComplete: 'name' })}
                  {Field({ id: 'correo', label: 'Correo', type: 'email', autoComplete: 'email' })}
                  <div className="field">
                    <label htmlFor="motivo">Motivo</label>
                    <select id="motivo" value={v.motivo} onChange={set('motivo')}>
                      <option value="pedido">Pedido</option><option value="colab">Colaboración</option>
                      <option value="prensa">Prensa</option><option value="reparacion">Reparación</option>
                    </select>
                  </div>
                  {Field({ id: 'mensaje', label: 'Mensaje', as: 'textarea' })}
                  <m.button className="btn btn--senal" type="submit" disabled={status === 'sending'} whileTap={{ scale: 0.95 }}>
                    {status === 'sending' ? <><span className="spinner" aria-hidden="true" /> Enviando…</> : 'Enviar mensaje'}
                  </m.button>
                </m.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
