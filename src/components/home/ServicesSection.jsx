import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

function ServicesSection() {
  
  const services = [
    {
      icon: "arrow-through-heart", 
      title: "陶冶身心，提升專注力",
      describe: "細心感受香氣的層次變化，訓練專注力與內心的穩定"
    },{
      icon: "flower1", 
      title: "體驗傳統文化，提升審美品味",
      describe: "了解古人的生活智慧，提升自身對美的感知"
    },{
      icon: "tree", 
      title: "調節身心健康，改善環境氛圍",
      describe: "天然香材，放鬆神經、調節情緒，改善睡眠與舒緩疲勞" 
    }
  ]

  return (
    <section className="bg-gray-04 py-15">
      <div className='container my-15'>
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="d-flex flex-column justify-content-center align-items-center border border-gray-03 rounded-5 p-5">
            <h3 data-aos="fade-up" className='text-primary-01 fs-4 fw-bold hina-mincho-regular pb-5'>香學的好處</h3>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-5">
                { services.map((item) => {
                  return (          
                    <div key={item.title} className="d-flex flex-column" 
                      data-aos="flip-left"
                      data-aos-duration="800">
                      <span className="text-center fs-1 text-primary-02 mb-4"><i className={`bi bi-${item.icon} me-1`}></i></span>
                      <div className="text-center text-brand-01 mt-2">
                        <h4 className="fw-bold mb-4">{item.title}</h4>
                        <p className="">{item.describe}</p>
                      </div>
                    </div>)
                    })
                    }
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default ServicesSection;