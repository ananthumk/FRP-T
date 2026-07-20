import React from 'react'

const StatsCard = ({ key, label, icon, color, content }) => {
  const IconComponent = icon

  return (
    <div key={key} className='w-full min-w-30 md:max-w-75 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
      <div className='flex items-center gap-2 md:flex-wrap'>
        <div className='rounded-lg py-1.5 px-2' style={{ backgroundColor: `${color}22`, color }}>
          {IconComponent ? <IconComponent className='text-xl md:text-2xl align-middle!' /> : null}
        </div>
        <span className='text-[17px] md:text-[20px] leading-none font-medium text-slate-800'>{label}</span>
      </div>
      <h2 className={`mt-3 text-[20px] md:text-[24px] font-bold text-[#${color}]`}>{content}</h2>
    </div>
  )
}

export default StatsCard
