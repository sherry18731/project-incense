export default function AboutSection() {
  return (<>
    <section className="bg-white py-md-15">
      <div className="container my-10">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row flex-column flex-md-row justify-content-center">
              <div className="col-md-4 me-md-8 d-none d-md-flex">
                <img src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/project-incenseWeb%2Fabout.jpg?alt=media&token=c8fc6c5a-b632-402b-ba52-92805f4876ec" alt="關於香道" />
              </div>
              <div className="col-md-6">
                <h3 className='text-primary-02 fs-5 hina-mincho-regular pb-5'>關於香道</h3>
                <p className="text-primary-01 mb-5">
                  「香」自古被入們廣泛的應用於生活中,形成一種精緻文化。「香道」的學習可以透過認識香與香的應用，使人們可以主動的去辨識香的氣味,藉由香來品味生活。
                </p>
                <h3 className='text-primary-02 fs-5 hina-mincho-regular pb-5'>品香悟道，靜心之藝</h3>
                <p className="text-primary-01">
                  香道，是一門通過焚香來修身養性、感悟人生的藝術。它不僅是一種嗅覺的享受，更是一種心靈的修行。透過香氣的變化，人們得以在寧靜中感受自然的氣息，調和身心，回歸內在的平和與純粹。
                  在香道中，每一縷煙霧都是時間的流轉，每一次焚香都是與古人對話的機會。它不僅是文化的傳承，更是現代人追求心靈寧靜的重要方式。
                </p>
              </div>
              <div className="col-md-6 d-flex flex-column mt-5">
                <h3 className='text-primary-02 fs-5 hina-mincho-regular pb-5'>香道的歷史與文化傳承</h3>
                <p className="text-primary-01 mb-5">
                香文化最早可追溯至中國的先秦時期，當時人們已經使用草木薰香來祈福與祭祀。隋唐時期，香道隨著佛教的興盛而發展，文人墨客也開始將焚香納入日常生活，如禪修、詩詞創作、茶道、書法等，形成了「焚香靜思」的雅趣。
                </p>
                <p className="text-primary-01 mb-5">
                宋代，香道更進一步發展為一門精緻的藝術，人們開始研究不同香材的配伍，創造出各種香方，並將焚香儀式化，逐漸形成完整的香道文化。
                如今，香道不僅是古老文化的傳承，更成為現代人追求寧靜、提升品味與修養的重要方式。在快節奏的生活中，一縷幽香，讓人回歸內心的安定與純粹。
                </p>
              </div>
              <div className="col-md-4 ms-md-8">
                <img className="rounded-4" src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/project-incenseWeb%2Fhistory.jpg?alt=media&token=90eb4c58-a9ef-4189-aea9-7bc43e86a079" alt="香道的歷史與文化傳承" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}