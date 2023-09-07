import { useRouter } from 'next/router';
import Link from 'next/link';


// The Logout Button component
const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
