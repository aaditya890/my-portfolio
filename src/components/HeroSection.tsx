const HeroSection = () => {
   function test(){
    console.log("Test button clicked")
   }
    
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome My Portfolio</h1>
        <p className="mt-4 text-lg">This is a simple portfolio built with Vite and React.</p>
      </div>

      <button onClick={() => test()} className="">
        Test
      </button>
    </>
  )
}

export default HeroSection
