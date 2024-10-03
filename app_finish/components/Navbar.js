import style from './Navbar.module.css';
import Link from 'next/link';

function Navbar() {
  return (
    <header className={style.navbar}>
      <h1><Link href="/">WebTech PUC Minas</Link></h1>
      <nav>
        <ul>
          <li>
            <Link href="/">React.js</Link>
          </li>
          <li>
            <Link href="/next">Next.js</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;