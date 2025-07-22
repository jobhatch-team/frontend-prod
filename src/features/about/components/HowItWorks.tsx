const HowItWorks = () => {
    return (
      <section id="how" className="bg-orange-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Create Your Hatch Avatar",
                emoji: "🐣",
                desc: "Start your journey by setting up your career chick. It represents your growth!"
              },
              {
                title: "Log Daily Wins",
                emoji: "📅",
                desc: "Log tasks like applying to jobs, networking, or preparing for interviews."
              },
              {
                title: "Hatch Together",
                emoji: "💬",
                desc: "Join squads, keep each other accountable, and grow faster—together."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white shadow rounded-2xl p-6">
                <div className="text-5xl mb-4">{step.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default HowItWorks
  