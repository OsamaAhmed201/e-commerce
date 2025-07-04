

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-200 py-5 mt-8">
        <div className="container mx-auto ">
          <div className=" p-7 rounded ">
            <h2 className="text-lg font-semibold mb-4 text-green-700"> FreshCart app</h2>
            <p className="text-gray-600 mb-4">We will send you a link, open it on your phone to download the app.</p>
            <div className="flex items-center mb-4">
              <input type="email" placeholder="Email..." className="border p-2  rounded md:w-10/12 w-full" />
              <button className="bg-green-500 text-white py-2 rounded mx-4  px-4 md:w-2/12 w-full">Share App Link</button>
            </div>
          
          </div>
        </div>
      </footer>

    </>

  )
}
