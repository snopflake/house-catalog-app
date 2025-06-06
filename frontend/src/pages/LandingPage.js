import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Selamat Datang di House Catalog App</h1>
      <p>Silakan login untuk melanjutkan.</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default LandingPage;
