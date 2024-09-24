import style from './Navbar.module.css';

function Navbar() {
  return (
    <header className={style.navbar}>
      <h1><a href='/'>WebTech PUC Minas</a></h1>
      <nav>
        <ul>
          <li><a href='/'>React.js</a></li>
          <li><a href='/pages/next/page.js'>Next.js</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;