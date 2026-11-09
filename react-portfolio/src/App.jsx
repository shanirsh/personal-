import { products, resumeUrl } from './data/portfolio';
import './styles/main.css';

export default function App() {
  return <main>
    <header>
      <div className="portrait-frame"><img className="portrait" src="/images/profile-pic.jpg" alt="Shan Irshad" width="180" height="180" decoding="async" /></div>
      <div className="header-copy">
      <h1>Shan Irshad</h1>
      <div className="intro-copy">
        <p>I work on financial recovery and payment workflows as a product manager at <a href="https://www.capitalone.com/">Capital One</a>. Previously, I built tooling for incident triage and infra automation at <a href="https://www.mastercard.com/">Mastercard</a>, and applied language and vision models to nutrition tracking at <a href="https://www.nutrifyai.app/">Nutrify AI</a>. Alongside my product work, I’m a venture analyst at <a href="https://www.lvlup.vc/">LvlUp Ventures</a>, partnering with early stage startups in AI infra.</p>
        <p>I’m currently exploring agent evals: how to assess an agent’s decisions, task completion, and reliability.</p>
        <p>I studied Computer Science at <a href="https://www.utdallas.edu/">UT Dallas</a>. You can reach me on <a href="https://x.com/shanirshad_">X</a>, <a href="https://www.linkedin.com/in/shan-irshad/">LinkedIn</a>, or by <a href="mailto:shanirshad8@gmail.com">email</a>. If you’d like to chat, <a href="https://calendly.com/shanirshad8/30min">schedule a time</a>.</p>
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
        <li><a href="https://x.com/shanirshad_">x</a></li>
        <li><a href="mailto:shanirshad8@gmail.com">email</a></li>
        <li><a href="https://calendly.com/shanirshad8/30min">calendly</a></li>
        {resumeUrl && <li><a href={resumeUrl}>resume</a></li>}
      </ul>
    </section>
  </main>;
}
