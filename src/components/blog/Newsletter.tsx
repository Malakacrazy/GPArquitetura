import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';
import { images } from '../../config/assets';

type Status = 'idle' | 'sending' | 'done' | 'error';

// Must match MIN_FORM_AGE_MS in api/subscribe.js (plus a small margin for clock/latency differences)
const MIN_WAIT_MS = 3500;

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: 'Confira o e-mail e tente novamente.',
  rate_limited: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
};
const DEFAULT_ERROR = 'Não foi possível concluir agora. Tente novamente em instantes.';

/** Newsletter signup. Talks to /api/subscribe (see api/subscribe.js for the anti-spam rules) */
export function Newsletter() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  // Signed form token from the server, plus when this browser received it
  const token = useRef<{ t: number; sig: string; receivedAt: number } | null>(null);

  const loadToken = async () => {
    try {
      const response = await fetch('/api/subscribe');
      if (!response.ok) throw new Error('token');
      token.current = { ...(await response.json()), receivedAt: Date.now() };
    } catch {
      token.current = null;
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    setMessage('');
    try {
      if (!token.current) await loadToken();
      if (!token.current) throw new Error('token');
      // Autofill can submit instantly; the server rejects forms younger than a few seconds
      const wait = MIN_WAIT_MS - (Date.now() - token.current.receivedAt);
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          website: form.get('website'),
          t: token.current.t,
          sig: token.current.sig,
        }),
      });
      if (response.ok) {
        setStatus('done');
        return;
      }
      const { error } = await response.json().catch(() => ({ error: '' }));
      setMessage(ERROR_MESSAGES[error] || DEFAULT_ERROR);
      // Start over with a fresh token after any failure
      token.current = null;
      loadToken();
      setStatus('error');
    } catch {
      setMessage(DEFAULT_ERROR);
      setStatus('error');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-text-dark)] text-white">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        <div className="px-6 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24">
          <Reveal>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">Newsletter</span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Arquitetura emocional, direto na sua caixa de entrada.
            </h2>
            <p className="mt-8 max-w-md text-base md:text-lg font-light leading-relaxed text-white/80">
              Novos artigos, processos e bastidores da Studio Araci. Sem ruído: você sai quando quiser.
            </p>

            {status === 'done' ? (
              <p role="status" className="mt-10 max-w-lg rounded-[16px] border border-white/30 px-6 py-5 text-base md:text-lg">
                Pronto! Obrigado por assinar. Você receberá nossos próximos artigos.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 max-w-lg" noValidate>
                {/* Honeypot: hidden from people, filled by bots */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="flex items-center rounded-full border border-white/40 p-1.5 focus-within:border-white">
                  <label htmlFor="newsletter-email" className="sr-only">E-mail</label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                    className="min-w-0 flex-1 bg-transparent px-4 py-2 text-base text-white placeholder:text-white/50 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="rounded-full bg-[var(--color-primary)] px-5 md:px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Enviando…' : 'Assinar'}
                  </button>
                </div>
                {status === 'error' && (
                  <p role="alert" className="mt-4 text-sm text-white">
                    {message}
                  </p>
                )}
                <p className="mt-4 text-xs text-white/60">
                  Ao assinar, você concorda com a nossa{' '}
                  <Link to="/privacy" className="underline underline-offset-4">Política de Privacidade</Link>.
                </p>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:py-12 lg:pl-0">
          <img
            src={images.home.projects.architecture}
            alt=""
            loading="lazy"
            className="aspect-[4/3] lg:aspect-auto lg:h-[26rem] xl:h-[30rem] w-full object-cover rounded-[16px] rounded-tl-[120px] lg:rounded-tl-[200px] lg:rounded-r-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
