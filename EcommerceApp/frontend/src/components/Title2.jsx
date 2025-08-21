import React from 'react'

const Title = ({text1, text2}) => {
    return (
        <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-700">
                {text1} <span className="text-gray-400 font-semibold">{text2}</span>
            </p>
            <p className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></p>
        </div>
    )
}

export default Title