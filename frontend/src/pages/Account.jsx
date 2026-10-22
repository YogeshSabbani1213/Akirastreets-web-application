import Container from '../components/Container.jsx'
import PageMeta from '../components/PageMeta.jsx'

function Account() {
  // TODO: connect login and registration forms to the authentication backend.
  // WHY: Present both account actions now while leaving authentication for a later backend step.
  return (
    <>
      <PageMeta
        description="Sign in to your Akira account or create an account."
        title="Your Account"
      />
      <Container>
      <section className="py-12 sm:py-16">
        <header className="mb-10 text-center">
          <p className="text-xs tracking-[0.2em]">AKIRA / ACCOUNT</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-wide">Your account</h1>
        </header>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-16">
          <form
            className="space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="border-b border-neutral-300 pb-3 text-sm font-semibold uppercase tracking-widest">
              Login
            </h2>
            <label className="block text-xs uppercase tracking-wider">
              Email
              <input
                autoComplete="email"
                className="mt-2 block min-h-11 w-full border border-neutral-300 px-3 text-sm normal-case tracking-normal focus:border-black focus:outline-none"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="block text-xs uppercase tracking-wider">
              Password
              <input
                autoComplete="current-password"
                className="mt-2 block min-h-11 w-full border border-neutral-300 px-3 text-sm normal-case tracking-normal focus:border-black focus:outline-none"
                name="password"
                required
                type="password"
              />
            </label>
            <button
              className="min-h-11 w-full border border-black bg-black px-5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
              type="submit"
            >
              Login
            </button>
          </form>

          <form
            className="space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="border-b border-neutral-300 pb-3 text-sm font-semibold uppercase tracking-widest">
              Create account
            </h2>
            <label className="block text-xs uppercase tracking-wider">
              Name
              <input
                autoComplete="name"
                className="mt-2 block min-h-11 w-full border border-neutral-300 px-3 text-sm normal-case tracking-normal focus:border-black focus:outline-none"
                name="name"
                required
                type="text"
              />
            </label>
            <label className="block text-xs uppercase tracking-wider">
              Email
              <input
                autoComplete="email"
                className="mt-2 block min-h-11 w-full border border-neutral-300 px-3 text-sm normal-case tracking-normal focus:border-black focus:outline-none"
                name="register-email"
                required
                type="email"
              />
            </label>
            <label className="block text-xs uppercase tracking-wider">
              Password
              <input
                autoComplete="new-password"
                className="mt-2 block min-h-11 w-full border border-neutral-300 px-3 text-sm normal-case tracking-normal focus:border-black focus:outline-none"
                minLength="8"
                name="register-password"
                required
                type="password"
              />
            </label>
            <button
              className="min-h-11 w-full border border-black px-5 text-xs font-semibold uppercase tracking-widest transition hover:bg-black hover:text-white"
              type="submit"
            >
              Create account
            </button>
          </form>
        </div>
      </section>
      </Container>
    </>
  )
}

export default Account
