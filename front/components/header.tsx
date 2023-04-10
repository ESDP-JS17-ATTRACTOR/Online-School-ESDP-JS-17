import { SiBurgerking } from 'react-icons/si';
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <SiBurgerking />
      </div>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/about'>О нас</Link>
        <Link href='/reviews'>Отзывы</Link>
        <Link href='/burgers'>Бургеры</Link>
      </nav>
    </header>
  );
};

export default Header;