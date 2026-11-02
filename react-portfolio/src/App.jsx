import { products, resumeUrl } from './data/portfolio';
import './styles/main.css';

export default function App() {
  return <main>
    <header>
      <div className="portrait-frame"><img className="portrait" src="/images/profile-pic.jpg" alt="Shan Irshad" width="180" height="180" decoding="async" /></div>
      <div className="header-copy">
      <h1>Shan Irshad</h1>
      <div className="intro-copy">
        <p>I’m a Product Manager at <a href="https://www.capitalone.com/">Capital One</a>, working on financial recovery and payment workflows. My background is in platform engineering at <a href="https://www.mastercard.com/">Mastercard</a> and applied AI at Nutrify AI, where I shipped LLM and computer vision features.</p>
        <p>I like making the tools I use easier to understand. That led me to build <a href="https://getprismo.dev">Prismo</a> for measuring context and token usage in AI coding agents, and <a href="https://ghostedai.net">Ghosted</a> for deploying cloud infrastructure. I’m now working on <a href="https://tr8de.vercel.app/">TR8DE</a>, an experimental stock forecasting system.</p>
        <p>I studied Computer Science at <a href="https://www.utdallas.edu/">UT Dallas</a>. You can reach me on <a href="https://x.com/shanirshad_">X</a>, <a href="https://www.linkedin.com/in/shan-irshad/">LinkedIn</a>, or by <a href="mailto:shanirshad8@gmail.com">email</a>.</p>
      </div>
      </div>
    </header>

    <section aria-labelledby="projects-title">
      <h2 id="projects-title">Selected work</h2>
      <ul className="projects">
        {products.map(project => <li key={project.id}>
          <span>{project.link ? <a href={project.link}>{project.title}</a> : project.title}</span>
          <div className="project-copy"><p>{project.shortDescription}</p></div>
        </li>)}
      </ul>
    </section>

    <section aria-labelledby="connect-title">
      <h2 id="connect-title">Connect</h2>
      <ul className="connect-links">
        <li><a href="https://github.com/shanirsh">github</a></li>
        <li><a href="https://www.linkedin.com/in/shan-irshad/">linkedin</a></li>
        <li><a href="https://x.com/shanirshad_">twitter / X</a></li>
        <li><a href="mailto:shanirshad8@gmail.com">email</a></li>
        {resumeUrl && <li><a href={resumeUrl}>resume</a></li>}
      </ul>
    </section>
  </main>;
}
