interface FeatureBubbleProps {
    title: string
    icon: string
    description: string
  }
  
  const FeatureBubble = ({ title, icon, description }: FeatureBubbleProps) => {
    return (
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    )
  }
  
  export default FeatureBubble
  