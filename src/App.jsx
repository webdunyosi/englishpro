import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  GraduationCap, 
  BookMarked, 
  ClipboardEdit, 
  HelpCircle, 
  Send, 
  ShieldCheck, 
  AlertOctagon, 
  ArrowRight, 
  Check, 
  CheckCircle,
  MapPin,
  PhoneCall,
  Sparkles,
  Award,
  BookOpen,
  Smile,
  Users,
  X,
  Heart,
  Plus,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

export default function App() {
  // Telegram Configuration
  const botToken = '8626617217:AAGMah488EGUd7iSCqTgGbUnX-EUCzyCJw4';
  const chatId = '-1002652982576';

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'; // default to premium dark theme
  });

  // Navigation and active states
  const [activeSection, setActiveSection] = useState('home');
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // FAQ accordion active state
  const [faqActive, setFaqActive] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    courseSelect: 'Abituriyent Intensive',
    timePreference: 'Ertalab (8:00 - 10:00)',
    englishLevel: 'Beginner (Bilmayman)',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Custom Select Dropdown states & refs
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const courseDropdownRef = useRef(null);

  // Refs for Scroll Spy
  const sectionRefs = {
    home: useRef(null),
    teacher: useRef(null),
    courses: useRef(null),
    benefits: useRef(null),
    faq: useRef(null),
    qabul: useRef(null),
  };

  // Nav indicator ref
  const navIndicatorRef = useRef(null);
  const mobileNavItemsRef = useRef([]);

  // Apply theme class to HTML element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Header scroll background
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }

      // Scroll Spy to detect active section
      const scrollPos = window.scrollY + 200;
      let currentSection = 'home';

      for (const section in sectionRefs) {
        const ref = sectionRefs[section].current;
        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update mobile bottom nav active indicator pill position
  useEffect(() => {
    const activeItem = mobileNavItemsRef.current.find(
      (item) => item && item.getAttribute('href') === `#${activeSection}`
    );

    if (activeItem && navIndicatorRef.current) {
      const container = activeItem.parentElement;
      const rect = activeItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const leftOffset = rect.left - containerRect.left;

      navIndicatorRef.current.style.left = `${leftOffset + 4}px`;
      navIndicatorRef.current.style.width = `${rect.width - 8}px`;
    }
  }, [activeSection]);

  // Toggle Theme Utility
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Click outside custom select dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
        setIsCourseOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Custom Select dropdown option click handler
  const handleCourseSelect = (courseName) => {
    setFormData(prev => ({ ...prev, courseSelect: courseName }));
    setIsCourseOpen(false);
  };

  // Quick course selection utility
  const handleSelectCourse = (courseName) => {
    setFormData(prev => ({ ...prev, courseSelect: courseName }));
    sectionRefs.qabul.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format phone number to strictly accept only 9 digits
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 9) {
      val = val.substring(0, 9);
    }
    setFormData(prev => ({ ...prev, phoneNumber: val }));
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Radio selection handler
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // FAQ Accordion Toggle
  const toggleFaq = (index) => {
    if (faqActive === index) {
      setFaqActive(null);
    } else {
      setFaqActive(index);
    }
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert('Iltimos ismingizni to\'liq kiriting.');
      return;
    }

    if (formData.phoneNumber.length !== 9) {
      alert('Telefon raqamingizni 9 ta raqamda to\'g\'ri kiriting (Masalan: 931081797).');
      return;
    }

    setIsLoading(true);

    const timestamp = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
    const fullPhone = `+998 ${formData.phoneNumber.substring(0, 2)} ${formData.phoneNumber.substring(2, 5)} ${formData.phoneNumber.substring(5, 7)} ${formData.phoneNumber.substring(7, 9)}`;

    const textMessage = `
🔔 *YANGI QABUL ARIZASI!*

👤 *Talaba:* ${formData.fullName}
📞 *Telefon:* ${fullPhone} ([Telegram](https://t.me/+998${formData.phoneNumber}))
📚 *Guruh turi:* ${formData.courseSelect}
⏰ *Dars vaqti:* ${formData.timePreference}
📈 *Hozirgi Darajasi:* ${formData.englishLevel}
📝 *Qo'shimcha Fikr:* ${formData.notes || 'Kiritilmagan'}

📅 *Sana va Vaqt:* ${timestamp}
    `;

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: textMessage,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });

      const data = await response.json();

      if (data.ok) {
        setSuccessData({
          fullName: formData.fullName,
          phoneNumber: fullPhone,
          course: formData.courseSelect,
          level: formData.englishLevel,
          time: formData.timePreference
        });
        setShowSuccess(true);
        setFormData({
          fullName: '',
          phoneNumber: '',
          courseSelect: 'Abituriyent Intensive',
          timePreference: 'Ertalab (8:00 - 10:00)',
          englishLevel: 'Beginner (Bilmayman)',
          notes: ''
        });
      } else {
        throw new Error('Telegram API error');
      }
    } catch (err) {
      console.error(err);
      alert('Xatolik yuz berdi! Arizangiz yuborilmadi. Iltimos operatorga qo\'ng\'iroq qiling: +998 93 108 17 97');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#f8f7fc] text-gray-800 dark:bg-[#06050c] dark:text-gray-200 antialiased font-sans transition-colors duration-400">
      
      {/* ================= DYNAMIC LIQUID BLOBS (GPU Optimized) ================= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] bg-gradient-to-tr from-purple-400/15 to-violet-300/10 dark:from-purple-900/25 dark:to-violet-600/20 opacity-60 blur-[80px] animate-blob-spin-1 rounded-full optimize-gpu"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] bg-gradient-to-bl from-pink-400/10 to-fuchsia-300/10 dark:from-pink-900/20 dark:to-fuchsia-600/15 opacity-50 blur-[100px] animate-blob-spin-2 rounded-full optimize-gpu"></div>
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] min-w-[280px] min-h-[280px] bg-gradient-to-br from-emerald-400/5 to-violet-400/10 dark:from-emerald-600/10 dark:to-violet-800/15 opacity-40 blur-[80px] animate-blob-spin-3 rounded-full optimize-gpu"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.008)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] opacity-35"></div>
      </div>

      {/* ================= DESKTOP HEADER ================= */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full hidden md:block ${headerScrolled ? 'py-2 bg-white/70 dark:bg-darkBg/65 backdrop-blur-md border-b border-gray-200/50 dark:border-glassBorder' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between glass-card px-8 py-3.5 rounded-full border border-gray-200/40 dark:border-glassBorder/40">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="font-display font-bold text-white text-lg">🇬🇧</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                ENGLISH<span className="text-primary-500">.LANG</span>
              </span>
            </a>

            <ul className="flex items-center gap-8">
              {['home', 'teacher', 'courses', 'benefits', 'faq'].map((sec) => (
                <li key={sec}>
                  <a 
                    href={`#${sec}`} 
                    className={`text-sm font-medium tracking-wide transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 hover:text-gray-900 dark:hover:text-white ${
                      activeSection === sec 
                        ? 'text-primary-600 dark:text-white after:w-full' 
                        : 'text-gray-500 dark:text-gray-400 after:w-0 hover:after:w-full'
                    }`}
                  >
                    {sec === 'home' && 'Bosh sahifa'}
                    {sec === 'teacher' && 'Ustoz haqida'}
                    {sec === 'courses' && 'Dars shartlari'}
                    {sec === 'benefits' && 'Afzalliklar'}
                    {sec === 'faq' && 'FAQ'}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {/* Premium Theme Switcher */}
              <button 
                onClick={toggleTheme} 
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-glassBorder bg-white/50 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:scale-105 active:scale-95 transition-all duration-300"
                title={theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 hover:-rotate-12" />
                )}
              </button>

              <a href="#qabul" className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-medium text-sm tracking-wide shadow-md shadow-primary-950/10 dark:shadow-primary-900/30 hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <span>Qabulga Yozilish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ================= MOBILE HEADER BRANDING ================= */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-darkBg/65 backdrop-blur-md border-b border-gray-200/50 dark:border-glassBorder md:hidden px-6 py-4 flex justify-between items-center transition-colors duration-400">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
            <span className="font-display font-bold text-white text-sm">🇬🇧</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            ENGLISH<span className="text-primary-500">.LANG</span>
          </span>
        </a>
        
        <div className="flex items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-glassBorder bg-white/50 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a href="#qabul" className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-md">
            <ClipboardEdit className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-32 pb-24 md:pb-12">
        
        {/* ================= 1. HERO SECTION ================= */}
        <section id="home" ref={sectionRefs.home} className="min-h-[80vh] flex flex-col justify-center py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-gray-200/50 dark:border-glassBorder bg-white/40 dark:bg-glassBg/40 text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                <span>Yozgi Qabul 1-IYUNGACHA Ochiq!</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-gray-900 dark:text-white">
                Biz bilan yoz <br />
                <span className="text-gradient-primary">o'tadi — soz!</span> <br />
                Intensiv Ingliz Tili
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
                3 oylik yozgi ta'tilni behuda o'tkazmang! Har daqiqangiz g'animat, aziz <span className="text-gray-900 dark:text-white font-medium">ABITURIYENTLAR</span> va o'quvchilar. 8 yillik pedagogik tajribaga ega ustoz bilan oliy o'quv yurtlariga (OTM) tayyorlov va mukammal til darslari.
              </p>

              {/* Strict Warning Alert */}
              <div className="w-full max-w-xl glass-card rounded-2xl p-4 border-l-4 border-rose-500 bg-rose-500/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0 mt-0.5 animate-pulse">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 font-display">Qat'iy Intizom Tizimi</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    <span class="text-gray-900 dark:text-white font-medium">ESLATMA:</span> Ko'p dars qoldiradigan va vazifalarni o'z vaqtida bajarmaydigan o'quvchilar darslardan chetlashtiriladi! Natija faqat mehnat va mas'uliyat bilan keladi.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#qabul" className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold text-base shadow-xl shadow-primary-900/20 dark:shadow-primary-900/40 transition-all duration-300 scale-100 hover:scale-[1.02]">
                  <ClipboardEdit className="w-5 h-5" />
                  <span>Qabulga Yozilish (1-iyungacha)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </a>
                
                <a href="#courses" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-card text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-glassBg/80 transition-all">
                  <HelpCircle className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                  <span>Dars shartlari</span>
                </a>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50 dark:border-glassBorder/40 w-full max-w-md">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-accent-500 dark:text-accent-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Murojaat uchun</p>
                    <a href="tel:+998931081797" className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-colors">+998 93 108 17 97</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Container */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[3rem] p-1 bg-gradient-to-tr from-primary-500/20 via-secondary-500/10 to-accent-500/20 shadow-2xl animate-float">
                <div className="w-full h-full glass-card rounded-[2.8rem] bg-white/60 dark:bg-glassBg/90 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 dark:from-primary-600/10 dark:to-secondary-600/10 opacity-30"></div>
                  
                  <div className="flex justify-between items-center z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 text-xs font-bold tracking-wide">
                      Hikoyat Zaripova
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      Natijaga Kafolat
                    </span>
                  </div>

                  <div className="my-4 flex justify-center items-center z-10 relative">
                    <div className="relative w-44 h-44 rounded-full p-1 bg-gradient-to-tr from-primary-500 via-secondary-500 to-accent-500 shadow-xl">
                      <img src="teacher.png" alt="Ustoz Hikoyat Zaripova" className="w-full h-full rounded-full object-cover bg-[#f8f7fc] dark:bg-darkBg" />
                      <div className="absolute bottom-2 right-4 w-5 h-5 rounded-full bg-accent-500 border-4 border-[#f8f7fc] dark:border-darkBg shadow-lg animate-pulse"></div>
                    </div>
                  </div>

                  <div className="text-center z-10 space-y-1">
                    <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white">8 Yillik Tajriba</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 px-4 leading-relaxed">
                      100 dan ortiq abituriyentlarni OTM (Oliy ta'lim)ga kirishiga sababchi bo'lgan professional ustoz
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200/50 dark:border-glassBorder/50 z-10 text-center">
                    <div>
                      <h5 className="text-gray-900 dark:text-white font-bold font-display text-sm">100+</h5>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">OTMga Kirganlar</p>
                    </div>
                    <div>
                      <h5 className="text-gray-900 dark:text-white font-bold font-display text-sm">8 yoshdan</h5>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">Dars Boshlash</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 glass-card bg-white/95 dark:bg-glassBg/95 px-4 py-3 rounded-2xl flex items-center gap-3 border border-gray-200/50 dark:border-glassBorder shadow-lg shadow-gray-200/10 dark:shadow-black/40 z-20 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 dark:text-green-400">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Darslar Ertalab</p>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">08:00 - 10:00</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-2 glass-card bg-white/95 dark:bg-glassBg/95 px-4 py-3 rounded-2xl flex items-center gap-3 border border-gray-200/50 dark:border-glassBorder shadow-lg shadow-gray-200/10 dark:shadow-black/40 z-20 animate-float" style={{ animationDelay: '4.5s' }}>
                <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center text-secondary-500 dark:text-secondary-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Manzil</p>
                  <p className="text-xs font-bold text-gray-900 dark:text-white text-left">15-maktab ro'parasi</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="py-12 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Talabalar OTMga kirgan', val: '100+' },
              { label: 'Pedagogik tajriba', val: '8 yillik' },
              { label: '08:00 - 10:00 dars vaqti', val: 'Har kuni' },
              { label: 'Oylik test natijasiga ko\'ra', val: 'Chegirma' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 text-center">
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-gradient-primary inline-block">{stat.val}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 2. TEACHER SECTION ================= */}
        <section id="teacher" ref={sectionRefs.teacher} className="py-20 relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-gray-200/50 dark:border-glassBorder/60 bg-white/40 dark:bg-glassBg/40 text-xs font-semibold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Professional Ustoz</span>
            </div>
            <h2 class="font-display font-extrabold text-3xl md:text-5xl text-gray-900 dark:text-white">
              Ustoz <span className="text-gradient-primary">Hikoyat Zaripova Haqida</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
              Barcha darslar faqat bitta professional, 8 yillik katta pedagogik tajribaga ega ustoz tomonidan eng yuqori darajada olib boriladi.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-8 md:p-12 border border-gray-200/70 dark:border-glassBorder/70 bg-white/50 dark:bg-glassBg/60 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent-500/5 dark:bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-gradient-to-tr from-primary-100 to-primary-200 dark:from-primary-950 dark:to-primary-900 border border-gray-200/60 dark:border-glassBorder shadow-2xl">
                  <img src="teacher.png" alt="Ustoz Hikoyat Zaripova" className="w-full h-full object-cover bg-[#f8f7fc] dark:bg-darkBg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 dark:from-darkBg via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 glass-card bg-white/95 dark:bg-glassBg/95 border border-gray-200/50 dark:border-glassBorder px-2.5 py-0.5 rounded-full flex items-center gap-1 z-10">
                    <span className="w-2 h-2 rounded-full bg-accent-500 animate-ping"></span>
                    <span className="text-gray-900 dark:text-white text-[10px] font-bold">8+ Yil Tajriba</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mt-4 text-center">Hikoyat Zaripova</h3>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase mt-1">Professional Metodist</p>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-accent-500 dark:text-accent-400 font-display">Pedagogik Faoliyat va Muvaffaqiyatlar</h4>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mt-1">Natijaga Yo'naltirilgan Innovatsion Darslar</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
                  Ustozimiz <span className="text-gray-900 dark:text-white font-medium">Hikoyat Zaripova</span> Navbahor tumanida ko'plab abituriyentlarni noldan boshlab davlat universitetlarining (OTM) grant va shartnoma asosidagi talabaligiga olib kelgan tajribali ingliz tili mutaxassisidir. 8 yillik izlanishlar asosida yaratilgan **maxsus metodologiya** o'quvchining ingliz tili grammatikasini chuqur o'rganishini, testlar bilan ishlash tezligini 2 barobarga oshirishni kafolatlaydi.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>100+ OTMga kirgan abituriyentlar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Darajaga qarab individual guruhlar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Har oylik test natijasiga ko'ra chegirma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                    <span className="text-rose-600 dark:text-rose-300 font-medium">Qat'iy intizom va monitoring</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/3 border border-gray-200 dark:border-glassBorder text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-800 dark:text-white">Imtihon asosida guruhlash:</strong> Darsga qabul qilinishdan oldin har bir abituriyent va o'quvchi alohida maxsus imtihondan o'tadi va o'zlashtirish darajasiga qarab tegishli guruhlarga ajratiladi.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. COURSES SECTION ================= */}
        <section id="courses" ref={sectionRefs.courses} className="py-20 relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-gray-200/50 dark:border-glassBorder/60 bg-white/40 dark:bg-glassBg/40 text-xs font-semibold tracking-widest text-secondary-600 dark:text-secondary-400 uppercase">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Dars Shartlari va Guruhlar</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-gray-900 dark:text-white">
              Dars Vaqti va <span class="text-gradient-primary">To'lov Turlari</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
              O'quvchilarning bilim darajasi va o'zlashtirish tezligiga ko'ra guruhlar, narxlar va qulay shartlar taqdim etiladi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Abituriyent */}
            <div className="group glass-card rounded-3xl p-8 flex flex-col justify-between h-full border border-gray-200/50 dark:border-glassBorder/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-primary-500/10 dark:bg-primary-600/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary-600 dark:text-primary-400">Nishon: OTMga Kirish</span>
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mt-1 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">Abituriyent Intensive</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1.5 leading-relaxed font-light">
                    Oliy o'quv yurtlariga (OTM) tayyorlanayotganlar uchun chuqurlashtirilgan grammatika va tezkor testlar bilan ishlash kursi.
                  </p>
                </div>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Vaqt: Har kuni 8:00 - 10:00</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Guruh: Imtihon asosida ajratiladi</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>DTM va Darslik Testlar tahlili</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-gray-200/30 dark:border-glassBorder/30 flex flex-col space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-500">Oylik to'lov</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">250 000 UZS</span>
                </div>
                <button onClick={() => handleSelectCourse('Abituriyent Intensive')} className="w-full py-3 rounded-xl bg-primary-600/10 hover:bg-primary-600 dark:bg-primary-600/30 dark:hover:bg-primary-600 text-primary-600 dark:text-white hover:text-white font-semibold text-xs tracking-wider transition-all text-center flex items-center justify-center gap-1.5 border border-primary-500/20 group-hover:border-primary-500/50">
                  <span>Qabulga Yozilish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2: Bepul grant */}
            <div className="group glass-card rounded-3xl p-8 flex flex-col justify-between h-full border border-gray-200/50 dark:border-glassBorder/50 relative overflow-hidden ring-2 ring-primary-500/30 dark:ring-primary-500/40">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-500 to-primary-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                Maxsus
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 dark:from-primary-500/10 to-transparent opacity-35 transition-all duration-500"></div>
              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-accent-500/10 dark:bg-accent-500/20 flex items-center justify-center text-accent-500 dark:text-accent-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-accent-600 dark:text-accent-400">O'zlashtirishga qarab</span>
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mt-1 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors">Bepul Grant Ta'lim</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1.5 leading-relaxed font-light">
                    Bizda eng yuqori o'zlashtirish ko'rsatkichlariga ega bo'lgan o'quvchilar mutlaqo bepul (0 so'mga) tahsil olishlari mumkin!
                  </p>
                </div>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Kirish imtihonida a'lo natija</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Darslardagi 100% faollik</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Natija darajasiga qarab 0 so'm</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-gray-200/30 dark:border-glassBorder/30 flex flex-col space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-500">Oylik to'lov</span>
                  <span className="text-lg font-bold text-gradient-accent">MUTLAQO BEPUL</span>
                </div>
                <button onClick={() => handleSelectCourse('Bepul Grant Ta\'lim')} className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-500 hover:to-primary-500 text-white font-semibold text-xs tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-md">
                  <span>Imtihonga Yozilish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 3: General English */}
            <div className="group glass-card rounded-3xl p-8 flex flex-col justify-between h-full border border-gray-200/50 dark:border-glassBorder/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-secondary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-secondary-500/10 dark:bg-secondary-600/20 flex items-center justify-center text-secondary-600 dark:text-secondary-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary-600 dark:text-secondary-400">8 yoshdan boshlab</span>
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mt-1 group-hover:text-secondary-600 dark:group-hover:text-secondary-300 transition-colors">General & Basic English</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1.5 leading-relaxed font-light">
                    Barcha darajadagilar uchun grammatika va erkin so'zlashuv kursi. Imtihon orqali guruhga qabul qilinadi.
                  </p>
                </div>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Vaqt: Har kuni 8:00 - 10:00</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>Grammatika va real so'zlashuv</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4 text-accent-500 dark:text-accent-400 shrink-0" />
                    <span>O'quvchilar guruhlarga ajratiladi</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-gray-200/30 dark:border-glassBorder/30 flex flex-col space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-500">Oylik to'lov</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">150 000 UZS</span>
                </div>
                <button onClick={() => handleSelectCourse('General & Basic English')} className="w-full py-3 rounded-xl bg-secondary-600/10 hover:bg-secondary-600 dark:bg-secondary-600/20 dark:hover:bg-secondary-600 text-secondary-600 dark:text-white hover:text-white font-semibold text-xs tracking-wider transition-all text-center flex items-center justify-center gap-1.5 border border-secondary-500/20 group-hover:border-secondary-500/50">
                  <span>Qabulga Yozilish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 4. BENEFITS SECTION ================= */}
        <section id="benefits" ref={sectionRefs.benefits} className="py-20 relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-gray-200/50 dark:border-glassBorder/60 bg-white/40 dark:bg-glassBg/40 text-xs font-semibold tracking-widest text-accent-600 dark:text-accent-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Loyiha Afzalliklari</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-gray-900 dark:text-white">
              Nega Aynan Ushbu <span class="text-gradient-primary">Kursni Tanlashadi?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
              Bizning farqimiz — har bir soniyani qadrlash, faqat to'g'ri natijaga harakat qilish va yuqori mas'uliyat talab qilishdir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Intensiv Darslar',
                desc: 'Darslarimiz har kuni ertalab 8:00 dan 10:00 gacha intensiv tarzda olib boriladi, bu esa yozgi 3 oyni mutlaqo foydali o\'tkazishni ta\'minlaydi.',
                icon: BookOpen,
                color: 'bg-primary-600/10 text-primary-600 dark:bg-primary-600/20 dark:text-primary-400'
              },
              {
                title: 'Test Asosida Chegirmalar',
                desc: 'Har oylik olinadigan test natijangiz orqali chegirmalar asosida ta\'lim oling! Natijangiz qanchalik yuqori bo\'lsa, to\'lov shunchalik kamayadi.',
                icon: Smile,
                color: 'bg-secondary-600/10 text-secondary-600 dark:bg-secondary-600/20 dark:text-secondary-400'
              },
              {
                title: 'Qat\'iy Intizom',
                desc: 'Ko\'p dars qoldiradigan va vazifalarni o\'z vaqtida bajarmaydigan o\'quvchilar darslardan chetlashtiriladi. Faqat mas\'uliyatli muhit!',
                icon: AlertOctagon,
                color: 'bg-rose-500/10 text-rose-500 dark:bg-accent-600/20 dark:text-accent-400'
              },
              {
                title: 'Qulay Joylashuv',
                desc: 'Manzil: Navbahor tumanidagi 15-maktab ro\'parasi, Qahhor Ota marketi yonida. Kelish uchun juda qulay hudud.',
                icon: MapPin,
                color: 'bg-indigo-600/10 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400'
              }
            ].map((b, idx) => (
              <div key={idx} className="glass-card rounded-[2rem] p-8 flex flex-col space-y-4 border border-gray-200/50 dark:border-glassBorder/50">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.color}`}>
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">{b.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 5. REGISTRATION FORM SECTION ================= */}
        <section id="qabul" ref={sectionRefs.qabul} className="py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-gray-200/50 dark:border-glassBorder/60 bg-white/40 dark:bg-glassBg/40 text-xs font-semibold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                <ClipboardEdit className="w-3.5 h-3.5" />
                <span>Online Qabul</span>
              </div>
              
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight">
                Yozni behuda <br />
                o'tkazmang, <br />
                <span className="text-gradient-primary">Hozir yoziling!</span>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
                Yozgi qabul <span className="text-gray-900 dark:text-white font-semibold">1-IYUNGACHA</span> davom etadi. Operatorimiz qisqa vaqtda siz bilan bog'lanib, bepul kirish imtihoniga ro'yxatdan o'tkazadi!
              </p>

              <div className="space-y-4 pt-4">
                {[
                  'Barcha ma\'lumotlar maxfiy va xavfsiz saqlanadi.',
                  'Har kuni ertalab 8:00 dan 10:00 gacha darslar.',
                  'Telegram botga ariza darhol yetkaziladi.'
                ].map((txt, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-500 dark:text-accent-400">
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{txt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-gray-200/70 dark:border-glassBorder/70 bg-white/60 dark:bg-glassBg/65 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 dark:bg-primary-600/10 rounded-full blur-2xl pointer-events-none"></div>

                <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-6">Online Konsultatsiyaga Ariza</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">To'liq ismingiz *</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                        <Users className="w-4 h-4" />
                      </span>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        required 
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Masalan: Azizbek Karimov" 
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-input text-sm" 
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Telefon raqamingiz *</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 dark:text-gray-400 font-semibold text-xs tracking-wider border-r border-gray-200 dark:border-glassBorder/60 pr-3">
                        +998
                      </span>
                      <input 
                        type="tel" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        required 
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="93 108 17 97" 
                        className="w-full pl-20 pr-4 py-3.5 rounded-2xl glass-input text-sm tracking-wider" 
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">Faqat 9 ta raqamni kiriting (kod va raqam)</p>
                  </div>

                  {/* Group Select & Fixed Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="courseSelect" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Kurs yo'nalishi</label>
                      <div className="relative" ref={courseDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsCourseOpen(!isCourseOpen)}
                          className="w-full pl-11 pr-10 py-3.5 rounded-2xl glass-input text-sm text-left flex items-center justify-between bg-[#f8f7fc] dark:bg-[#06050c] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/30 transition-all cursor-pointer select-none"
                        >
                          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                            <GraduationCap className="w-4 h-4" />
                          </span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {formData.courseSelect}
                          </span>
                          <span className={`absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isCourseOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>

                        {/* Hidden native select for standard HTML form/accessibility compatibility */}
                        <select 
                          id="courseSelect" 
                          name="courseSelect" 
                          value={formData.courseSelect}
                          onChange={handleInputChange}
                          className="sr-only"
                        >
                          <option value="Abituriyent Intensive">Abituriyent Intensive</option>
                          <option value="Bepul Grant Ta'lim">Bepul Grant Ta'lim</option>
                          <option value="General & Basic English">General & Basic English</option>
                        </select>

                        {/* Beautiful custom dropdown list */}
                        {isCourseOpen && (
                          <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-gray-150 dark:border-glassBorder bg-white/95 dark:bg-[#0f0c1e]/98 backdrop-blur-xl shadow-xl shadow-gray-200/10 dark:shadow-black/60 overflow-hidden transform origin-top transition-all duration-200 ease-out animate-fade-in">
                            <div className="p-1.5 space-y-1">
                              {[
                                { name: "Abituriyent Intensive", desc: "OTMga tayyorlov chuqur kursi" },
                                { name: "Bepul Grant Ta'lim", desc: "0 so'mlik maxsus grant guruh" },
                                { name: "General & Basic English", desc: "Grammatika va so'zlashuv kursi" }
                              ].map((course) => {
                                const isSelected = formData.courseSelect === course.name;
                                return (
                                  <button
                                    key={course.name}
                                    type="button"
                                    onClick={() => handleCourseSelect(course.name)}
                                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                                      isSelected 
                                        ? 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 font-semibold' 
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                  >
                                    <div>
                                      <p className="text-xs font-semibold">{course.name}</p>
                                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-normal">{course.desc}</p>
                                    </div>
                                    {isSelected && (
                                      <span className="w-5 h-5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center text-primary-500 dark:text-primary-400 shrink-0 ml-2">
                                        <Check className="w-3 h-3" />
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Dars vaqti *</label>
                      <div className="grid grid-cols-1">
                        <div className="py-3.5 text-center text-xs font-semibold rounded-2xl border border-primary-500 bg-primary-600/10 dark:bg-primary-600/30 text-primary-600 dark:text-white">
                          Ertalab (8:00 - 10:00)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Level */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Hozirgi ingliz tili darajangiz</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Beginner (Bilmayman)', 'Elementary / Pre-Int', 'Intermediate / Upper', 'Advanced (Yuqori)'].map((lvl) => (
                        <label key={lvl} className="cursor-pointer">
                          <input 
                            type="radio" 
                            name="englishLevel" 
                            value={lvl}
                            checked={formData.englishLevel === lvl}
                            onChange={() => handleRadioChange('englishLevel', lvl)}
                            className="sr-only" 
                          />
                          <div className={`py-2.5 text-center text-xs font-semibold rounded-xl border transition-all ${
                            formData.englishLevel === lvl 
                              ? 'bg-primary-600/10 dark:bg-primary-600/25 border-primary-500 text-primary-600 dark:text-white' 
                              : 'border-gray-200 dark:border-glassBorder bg-white/30 dark:bg-white/3 text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                          }`}>
                            {lvl.split(' ')[0]}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Qo'shimcha fikr va savollar (Ixtiyoriy)</label>
                    <textarea 
                      id="notes" 
                      name="notes" 
                      rows="2" 
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Kurs haqida savolingiz bo'lsa yoki dars vaqtlarini belgilamoqchi bo'lsangiz yozing..." 
                      className="w-full px-4 py-3 rounded-2xl glass-input text-sm resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden py-4 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 hover:from-primary-500 hover:to-secondary-400 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-primary-950/15 dark:shadow-primary-950/40 flex items-center justify-center gap-2"
                  >
                    {!isLoading ? (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Ariza Yuborish</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Yuborilmoqda...</span>
                      </span>
                    )}
                  </button>

                </form>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 6. FAQ SECTION ================= */}
        <section id="faq" ref={sectionRefs.faq} className="py-20 relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-gray-200/50 dark:border-glassBorder/60 bg-white/40 dark:bg-glassBg/40 text-xs font-semibold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Savollaringiz Bormi?</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-gray-900 dark:text-white">
              Ko'p So'raladigan <span className="text-gradient-primary">Savollar (FAQ)</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
              Kursimiz faoliyati bilan bog'liq bo'lgan eng ommabop savollarga javoblarni keltirdik. Savolingizga javob topmasangiz, operatorimizga bog'laning.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Darslar qachon va qaysi vaqtda bo\'lib o\'tadi?', a: 'Dars vaqti har kuni ertalab soat 8:00 dan 10:00 gacha davom etadi. Darslar intensiv tarzda olib borilib, yozgi 3 oylik ta\'tilni to\'liq qoplashga yo\'naltirilgan.' },
              { q: 'Guruhlarga qanday tartibda ajratiladi?', a: 'Qabul qilinayotgan har bir o\'quvchi dastlab kirish imtihonidan o\'tadi. Test natijalariga (bilim va o\'zlashtirish darajasiga) qarab o\'quvchilar tegishli guruhlarga taqsimlanadi.' },
              { q: 'Oylik to\'lov va chegirmalar qanday tartibda amalga oshiriladi?', a: 'To\'lov o\'zlashtirish darajasiga qarab bepuldan (Grant guruhlar), 150 000 so\'mdan 250 000 so\'mgacha etib belgilangan. Bundan tashqari, har oylik olinadigan test natijangiz orqali chegirmalar asosida ta\'lim olishingiz mumkin.' },
              { q: 'Ko\'p dars qoldirilsa darsdan chetlashtiriladimi?', a: 'Ha, albatta. Biz faqat yuqori natijaga erishmoqchi bo\'lgan mas\'uliyatli o\'quvchilar bilan ishlaymiz. Shuning uchun ko\'p dars qoldiradigan yoki berilgan uy vazifalarini o\'z vaqtida bajarmaydigan o\'quvchilar darslardan chetlashtiriladi.' },
              { q: 'O\'quv kursi manzili qayerda joylashgan?', a: 'Bizning manzil: Navbahor tumanidagi 15-maktab ro\'parasi, Qahhor Ota marketi yonida joylashgan. Murojaat uchun telefon: +998 93 108 17 97.' }
            ].map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl border border-gray-200/50 dark:border-glassBorder/50 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-gray-800 dark:text-white focus:outline-none transition hover:bg-black/5 dark:hover:bg-white/2"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <span className={`text-primary-500 dark:text-primary-400 transition-transform duration-300 ${faqActive === idx ? 'rotate-45' : ''}`}>
                    <Plus className="w-5 h-5" />
                  </span>
                </button>
                <div 
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{ maxHeight: faqActive === idx ? '200px' : '0px' }}
                >
                  <div className="px-6 pb-5 text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light border-t border-gray-200/30 dark:border-glassBorder/30 pt-3">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 bg-white/80 dark:bg-darkBg/90 border-t border-gray-200/50 dark:border-glassBorder py-12 md:py-16 mt-16 px-6 transition-colors duration-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                <span className="font-display font-bold text-white text-base">🇬🇧</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                ENGLISH<span className="text-primary-500">.LANG</span>
              </span>
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm font-light">
              8 yillik katta pedagogik tajribaga ega ustoz bilan oliy o'quv yurtlariga (OTM) va til o'rganish bo'yicha eng yuqori darajada yozgi intensiv darslar.
            </p>
            <div className="space-y-1.5 pt-2 text-xs text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-primary-500 dark:text-primary-400" />
                <span>+998 93 108 17 97</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary-500 dark:text-primary-400" />
                <span className="text-left">Navbahor t., 15-maktab ro'parasi, Qahhor Ota marketi yonida</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-white font-display">Bo'limlar</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#home" className="hover:text-primary-600 dark:hover:text-white transition-colors">Bosh sahifa</a></li>
              <li><a href="#teacher" className="hover:text-primary-600 dark:hover:text-white transition-colors">Ustoz haqida</a></li>
              <li><a href="#courses" className="hover:text-primary-600 dark:hover:text-white transition-colors">Dars shartlari</a></li>
              <li><a href="#benefits" className="hover:text-primary-600 dark:hover:text-white transition-colors">Afzalliklarimiz</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-white font-display">Bog'lanish</h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-light">
              Batafsil ma'lumot olish yoki bepul sinov darsiga yozilish uchun hoziroq operatorimizga qo'ng'iroq qiling.
            </p>
            <a href="tel:+998931081797" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600/10 hover:bg-primary-600 dark:bg-primary-600/30 dark:hover:bg-primary-600/50 border border-primary-500/20 text-primary-600 dark:text-white font-medium text-xs tracking-wide transition-all shadow">
              <PhoneCall className="w-4 h-4" />
              <span>Hoziroq Qo'ng'iroq Qilish</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-gray-200 dark:border-glassBorder/40 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; 2026 English Languages Academy. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>and React + Tailwind CSS</span>
          </p>
        </div>
      </footer>

      {/* ================= MOBILE FLOATING BOTTOM NAV BAR ================= */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="glass-bottom-nav rounded-full px-5 py-3 relative flex items-center justify-between max-w-md mx-auto">
          
          <div ref={navIndicatorRef} className="active-nav-bg absolute top-2.5 bottom-2.5 left-5 w-[50px] rounded-full bg-gradient-to-r from-primary-600 to-primary-500 -z-10 shadow-lg shadow-primary-500/30 opacity-90"></div>

          <a 
            href="#home" 
            ref={(el) => (mobileNavItemsRef.current[0] = el)}
            className={`mobile-nav-item flex flex-col items-center justify-center w-12 h-12 relative z-10 transition-colors duration-300 ${activeSection === 'home' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-bold">Asosiy</span>
          </a>

          <a 
            href="#teacher" 
            ref={(el) => (mobileNavItemsRef.current[1] = el)}
            className={`mobile-nav-item flex flex-col items-center justify-center w-12 h-12 relative z-10 transition-colors duration-300 ${activeSection === 'teacher' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-bold">Ustoz</span>
          </a>

          <a 
            href="#courses" 
            ref={(el) => (mobileNavItemsRef.current[2] = el)}
            className={`mobile-nav-item flex flex-col items-center justify-center w-12 h-12 relative z-10 transition-colors duration-300 ${activeSection === 'courses' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <BookMarked className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-bold">Shartlar</span>
          </a>

          <a 
            href="#qabul" 
            ref={(el) => (mobileNavItemsRef.current[3] = el)}
            className={`mobile-nav-item flex flex-col items-center justify-center w-12 h-12 relative z-10 transition-colors duration-300 ${activeSection === 'qabul' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <ClipboardEdit className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-bold">Qabul</span>
          </a>

          <a 
            href="#faq" 
            ref={(el) => (mobileNavItemsRef.current[4] = el)}
            className={`mobile-nav-item flex flex-col items-center justify-center w-12 h-12 relative z-10 transition-colors duration-300 ${activeSection === 'faq' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[8px] mt-1 font-bold">FAQ</span>
          </a>

        </div>
      </div>

      {/* ================= SUCCESS GLASS MODAL ================= */}
      {showSuccess && successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#06050c]/80 backdrop-blur-md transition-all duration-300 animate-fade-in">
          <div className="rounded-[2.5rem] max-w-lg w-full p-8 md:p-10 border border-gray-100 dark:border-glassBorder bg-white dark:bg-glassBg/95 dark:backdrop-blur-xl relative shadow-2xl scale-100 opacity-100 transition-all duration-300 transform">
            <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-accent-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>

            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-gray-250/40 dark:border-glassBorder bg-gray-100/50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-accent-500/10 dark:bg-accent-500/20 border border-accent-400/30 dark:border-accent-400/40 flex items-center justify-center text-accent-500 dark:text-accent-400 animate-bounce shadow-lg shadow-accent-500/5 dark:shadow-accent-500/10">
                <Sparkles className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-gray-900 dark:text-white">Arizangiz Qabul Qilindi!</h3>
                <p className="text-xs uppercase font-bold tracking-widest text-accent-600 dark:text-accent-400 font-display">English Languages jamoasi sizni tabriklaydi</p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-normal">
                Hurmatli <span className="inline-block px-2 py-0.5 rounded-lg bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-semibold">{successData.fullName}</span>, sizning konsultatsiya va ro'yxatdan o'tish arizangiz muvaffaqiyatli ravishda Telegram botga yuborildi. 15 daqiqa ichida operatorimiz <span className="inline-block px-2 py-0.5 rounded-lg bg-accent-50 dark:bg-accent-950/40 text-accent-700 dark:text-accent-300 font-semibold font-mono tracking-wide">{successData.phoneNumber}</span> raqamingizga qo'ng'iroq qiladi!
              </p>

              <div className="rounded-2xl bg-slate-50/80 dark:bg-white/5 border border-gray-150 dark:border-glassBorder p-5 text-left text-xs space-y-3 shadow-inner">
                <p className="flex justify-between items-center border-b border-gray-200/40 dark:border-white/5 pb-2">
                  <span className="text-gray-550 dark:text-gray-400 font-medium">Tanlangan Kurs:</span>
                  <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-200/50 dark:border-white/5 shadow-sm">{successData.course}</span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-200/40 dark:border-white/5 pb-2">
                  <span className="text-gray-550 dark:text-gray-400 font-medium">Darajangiz:</span>
                  <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-200/50 dark:border-white/5 shadow-sm">{successData.level}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-gray-550 dark:text-gray-400 font-medium">Qulay vaqt:</span>
                  <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-200/50 dark:border-white/5 shadow-sm">{successData.time}</span>
                </p>
              </div>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-500 via-primary-500 to-secondary-500 hover:from-accent-600 hover:via-primary-600 hover:to-secondary-600 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-primary-500/15 dark:shadow-primary-950/40 hover:shadow-xl hover:shadow-primary-500/25 active:scale-[0.98] cursor-pointer"
              >
                Tushunarli, Rahmat!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
