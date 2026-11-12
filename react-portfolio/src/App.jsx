import { products } from './data/portfolio';
import { useEffect, useRef, useState } from 'react';
import './styles/main.css';

const writing = []; // { title, url, date }

export default function App() {
  const [portraitSrc, setPortraitSrc] = useState("/me.jpg");
  const evalPost = writing.find(({ title }) => /agent eval/i.test(title));

  const portraitRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let frame;
    const timeout = setTimeout(reveal, 1400);
    function reveal() {
      if (cancelled) return;
      clearTimeout(timeout);
      frame = requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    }
    const photo = portraitRef.current;
    Promise.allSettled([
      photo?.decode() ?? Promise.resolve(),
      document.fonts.load('400 34px Spectral'),
      document.fonts.load('400 16px Manrope'),
    ]).then(reveal);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [portraitSrc]);

  return <main className={ready ? 'page-ready' : 'page-pending'}>
    <header>
      <div className="portrait-frame">
        {portraitSrc && <img ref={portraitRef} className="portrait" src={portraitSrc} alt="Shan Irshad" width="180" height="180" onError={() => setPortraitSrc(portraitSrc === "/me.jpg" ? "/images/profile-pic.jpg" : null)} />}
      </div>
      <div className="header-copy">
        <h1>Shan Irshad</h1>
        <div className="intro-copy">
          <p>i build agent tooling and work on payment recovery at <a href="https://www.capitalone.com/">capital one</a>. before that i built incident triage and infra automation at <a href="https://www.mastercard.com/">mastercard</a>,{/* TODO: add one concrete outcome, e.g. "cut triage time X%" */} and applied language and vision models to nutrition tracking at <a href="https://www.nutrifyai.app/">nutrify&#160;ai</a>. i'm also a venture analyst at <a href="https://www.lvlup.vc/">lvlup ventures</a>, working with early stage ai infra startups.</p>
          <p>i'm currently exploring {evalPost ? <a href={evalPost.url}>agent evals</a> : 'agent evals'}: how to assess an agent's decisions, task completion, and reliability.</p>
          <p>i studied computer science at <a href="https://www.utdallas.edu/">ut dallas</a>.</p>
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

    {writing.length > 0 && <section aria-labelledby="writing-title">
      <h2 id="writing-title">writing</h2>
      <ul className="writing-list">
        {writing.map(({ title, url, date }) => <li key={url}>
          <a href={url}>{title}</a>
          <span className="writing-date">{date}</span>
        </li>)}
      </ul>
    </section>}

    <section aria-labelledby="connect-title">
      <h2 id="connect-title">Connect</h2>
      <ul className="connect-links">
        <li><a href="https://github.com/shanirsh">github</a></li>
        <li><a href="https://www.linkedin.com/in/shan-irshad/">linkedin</a></li>
        <li><a href="https://x.com/shanirshad_">x</a></li>
        <li><a href="mailto:shanirshad8@gmail.com">email</a></li>
        <li><a href="https://calendly.com/shanirshad8/30min">schedule a chat</a></li>
      </ul>
    </section>
  </main>;
}
