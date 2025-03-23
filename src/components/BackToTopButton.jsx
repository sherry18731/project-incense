import { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽滾動事件
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 滾動到頁面頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`btn btn-brand-02 text-white rounded-circle ${isVisible ? 'visible' : 'invisible'}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '10px 15px',
        transition: 'opacity 0.3s',
        opacity: isVisible ? 1 : 0,
        width:'48px',
        height:'48px',
      }}
      onClick={scrollToTop}
    >
      <i className="bi bi-chevron-up fw-bold"></i>
    </button>
  );
};

export default BackToTopButton;