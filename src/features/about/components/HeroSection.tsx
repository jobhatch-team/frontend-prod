const HeroSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-orange-500">Hatch</span>{' '}
            <span className="text-blue-500">your</span>{' '}
            <span className="text-orange-500">career</span><br />
            <span className="text-blue-500">Together</span>
          </h1>
          <p className="text-lg text-gray-700">
            Level up your career quest! 🐣 Team up, unlock daily wins, and hatch your dream job—no more solo grinding.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a
              href="/webapp"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl text-lg font-medium shadow hover:bg-orange-600 transition"
            >
              Get Started!
            </a>
            <a
              href="#about"
              className="border border-orange-500 text-orange-500 px-6 py-3 rounded-xl text-lg font-medium hover:bg-orange-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex flex-col items-center justify-center space-y-6">
          <img
            src="/images/homepage-chick-offer.png"
            alt="Career Chick"
            className="w-64 h-auto object-contain"
          />
          <img
            src="/images/chick-hatch.gif"
            alt="Hatch Animation"
            className="w-36 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

