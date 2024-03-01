// components/Navbar.js
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Import CSS styles

const Navbar = () => {
  return (
    <nav className={styles.navbar}> {/* Apply CSS class */}
      <ul>
        <li><Link href="/quiz">Quiz</Link></li>
        <li><Link href="/highscore">HighScore</Link></li>
        <li><Link href="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;