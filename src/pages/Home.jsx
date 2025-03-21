import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

export default function Home() {

  return (<>
    <section className="banner position-relative overflow-hidden">
      <div className="banner-wrap position-absolute h-100 z-0">
        <span></span>
      </div>
      <div className='container-fluid'>
        <div className="position-absolute top-50 start-50 translate-middle z-3" data-aos="fade-right">
          <h2 
          data-aos="fade-down" 
          className="text-center text-brand-03 text-opacity-75 fs-1 hina-mincho-regular mb-4">一期一會的<br />香遇</h2>
          <div className="d-flex justify-content-center">
            <Link 
            data-aos="fade-up" 
            to="/activities" 
            className="btn btn-primary-03 text-brand-01 fs-6 z-3">
              馬上預約
            </Link>
          </div>
        </div>
      </div>
    </section>
    
    <section 
      style={{
      background: `url("https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/project-incenseWeb%2Fbg-01-opa.png?alt=media&token=a4577b6b-7846-4009-9a81-9e33031482ee")`,
      backgroundAttachment: 'fixed',
      }}  
      className="bg-brand-03">
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="col-10 col-lg-6 d-flex flex-column align-items-center gap-3 bg-brand-03 bg-opacity-50 rounded-4 text-center my-30 py-12">
            <h3 data-aos="fade-down" className='text-primary-01 fs-4 fw-bold hina-mincho-regular border-bottom border-primary-02 pb-5'>體驗不同的香聚</h3>
            <p data-aos="fade-up" className='text-primary-02 fs-7'>串串香。製作香串體驗</p>
            <p data-aos="fade-up" className='text-primary-02 fs-7'>柱柱香。製作線香體驗</p>
            <p data-aos="fade-up" className='text-primary-02 fs-7'>朵朵香。香席品鑑沉香</p>
            <p data-aos="fade-up" className='text-primary-02 fs-7'>粉粉香。香篆靜心聞香</p>
          </div>
        </div>
      </div>
    </section>
    </>);
}