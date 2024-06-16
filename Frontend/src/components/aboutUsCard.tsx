import React from "react"

interface aboutUsCardProps {
    icon : JSX.Element
    title : string
    desc : string
}

export const AboutUsCard : React.FC<aboutUsCardProps> = ({icon,title,desc}) => {
    return (
<div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {icon}
              
            </div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
          <p className="text-center text-gray-700">
            {desc}
          </p>
        </div>
    )
}
