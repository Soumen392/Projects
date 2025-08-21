import React from 'react'

const Title = ({text1,text2}) => {
return (
    <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-green-600">
            {text1} <span className="text-lime-400 font-semibold">{text2}</span>
        </p>
        <p className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-lime-300 to-green-400 rounded-full"></p>
    </div>
)
}

export default Title