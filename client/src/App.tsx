import { Route, Switch } from "wouter"

import Home from "./pages/Home"
import Explore from "./pages/Explore"
import ProjectDetail from "./pages/ProjectDetail"
import Ecosystems from "./pages/Ecosystems"
import SubmitProject from "./pages/SubmitProject"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-300">
      <Switch>
        {/* Main */}
        <Route path="/" component={Home} />

        {/* Discovery */}
        <Route path="/explore" component={Explore} />
        <Route path="/project/:slug" component={ProjectDetail} />
        <Route path="/ecosystems" component={Ecosystems} />

        {/* Platform */}
        <Route path="/about" component={About} />
        <Route path="/submit" component={SubmitProject} />

        {/* Authentication */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Backwards-compatible signup route */}
        <Route path="/signup" component={Register} />

        {/* 404 */}
        <Route>
          <main className="flex min-h-screen items-center justify-center px-6">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)]">
                404
              </p>

              <h1 className="mt-3 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                Page not found
              </h1>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                The page you&apos;re looking for doesn&apos;t exist.
              </p>

              <a
                href="/"
                className="
                  mt-6 inline-flex items-center
                  rounded-xl
                  bg-[var(--accent)]
                  px-4 py-2.5
                  text-xs font-medium
                  text-[var(--text-inverse)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-[var(--accent-hover)]
                  hover:shadow-[0_8px_28px_var(--accent-soft)]
                "
              >
                Back to Sorvis
              </a>
            </div>
          </main>
        </Route>
      </Switch>
    </div>
  )
}

export default App