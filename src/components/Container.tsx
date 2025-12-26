import React from 'react';
function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default Container
