import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LandingPage() {
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({
    designs: 0,
    designers: 0,
    users: 0,
    categories: 0
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate counters when stats section is visible
  useEffect(() => {
    if (statsVisible) {
      const targets = { designs: 1000, designers: 150, users: 5000, categories: 50 };
      Object.keys(targets).forEach(key => {
        let current = 0;
        const target = targets[key];
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCounters(prev => ({ ...prev, [key]: target }));
            clearInterval(timer);
          } else {
            setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, 20);
      });
    }
  }, [statsVisible]);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }
    return () => observer.disconnect();
  }, []);

  const smoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: '🎨',
      title: 'Koleksi Eksklusif',
      description: 'Ribuan desain rumah berkualitas tinggi dari desainer profesional yang telah terverifikasi'
    },
    {
      icon: '⭐',
      title: 'Kualitas Terjamin',
      description: 'Setiap desain melalui proses moderasi ketat untuk memastikan standar kualitas tertinggi'
    },
    {
      icon: '🔍',
      title: 'Pencarian Mudah',
      description: 'Sistem pencarian dan filter canggih untuk menemukan desain rumah sesuai kebutuhan Anda'
    },
    {
      icon: '🤝',
      title: 'Komunitas Aktif',
      description: 'Bergabung dengan komunitas desainer dan pengguna yang saling berbagi inspirasi'
    },
    {
      icon: '📱',
      title: 'Akses Mudah',
      description: 'Platform berbasis web yang dapat diakses kapan saja, di mana saja dengan mudah'
    },
    {
      icon: '💡',
      title: 'Inspirasi Tanpa Batas',
      description: 'Temukan inspirasi desain rumah dari berbagai gaya dan konsep arsitektur'
    }
  ];

  const userRoles = [
    {
      icon: '👥',
      title: 'User Umum',
      description: 'Jelajahi katalog desain rumah yang telah disetujui dan dipublikasikan',
      features: [
        'Akses ribuan desain rumah berkualitas',
        'Filter pencarian berdasarkan kategori',
        'Download inspirasi desain favorit',
        'Simpan koleksi desain pilihan'
      ]
    },
    {
      icon: '✏',
      title: 'Designer',
      description: 'Upload dan bagikan karya desain rumah Anda kepada komunitas',
      features: [
        'Upload portfolio desain rumah',
        'Kelola koleksi karya desain',
        'Dapatkan feedback dari komunitas',
        'Tingkatkan eksposur karya Anda'
      ]
    },
    {
      icon: '👑',
      title: 'Admin',
      description: 'Moderasi dan verifikasi kualitas desain sebelum dipublikasikan',
      features: [
        'Review dan moderasi submission',
        'Verifikasi kualitas desain',
        'Kelola publikasi konten',
        'Maintain standar platform'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Dream House Design
          </h1>
          <p className="text-xl text-slate-800/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Platform komunitas terdepan untuk menjelajahi dan mengelola koleksi desain rumah impian dari para desainer terbaik Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/login')}
              className="bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Jelajahi Katalog
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
            Mengapa Memilih Dream House Design?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-2xl text-center group hover:-translate-y-2 hover:shadow-2xl hover:bg-white hover:border hover:border-slate-800/10 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-800/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="user-roles" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
            Untuk Semua Kalangan
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userRoles.map((role, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800"></div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  {role.icon} {role.title}
                </h3>
                <p className="text-slate-800/80 mb-6 leading-relaxed">
                  {role.description}
                </p>
                <ul className="space-y-3">
                  {role.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-slate-800/80">
                      <span className="text-slate-800 font-bold mr-3 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-16 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-gray-50 mb-2">
                {counters.designs}+
              </h3>
              <p className="text-xl text-gray-50/90">Desain Rumah</p>
            </div>
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-gray-50 mb-2">
                {counters.designers}+
              </h3>
              <p className="text-xl text-gray-50/90">Designer Aktif</p>
            </div>
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-gray-50 mb-2">
                {counters.users}+
              </h3>
              <p className="text-xl text-gray-50/90">Pengguna Terdaftar</p>
            </div>
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-gray-50 mb-2">
                {counters.categories}+
              </h3>
              <p className="text-xl text-gray-50/90">Kategori Desain</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;