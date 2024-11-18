const Contact = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phone Card */}
        <div className="border border-[#E8E8E8] pb-5 hover:scale-105 transition-transform duration-300">
          <div className="bg-[#D1A054] px-48 py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className="bg-[#F3F3F3] w-[364px] h-[240px] flex justify-center items-center ml-6 hover:bg-gray-200 transition-colors duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-medium">PHONE</h2>
              <p>+38 (012) 34 56 789</p>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="border border-[#E8E8E8] hover:scale-105 transition-transform duration-300">
          <div className="bg-[#D1A054] px-48 py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className="bg-[#F3F3F3] w-[364px] h-[240px] flex justify-center items-center ml-6 hover:bg-gray-200 transition-colors duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-medium">ADDRESS</h2>
              <p>
                21794 Krystle Fort, Kennyborough, <br />
                AL 41224-3134
              </p>
            </div>
          </div>
        </div>

        {/* Working Hours Card */}
        <div className="border border-[#E8E8E8] hover:scale-105 transition-transform duration-300">
          <div className="bg-[#D1A054] px-48 py-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className="bg-[#F3F3F3] w-[364px] h-[240px] flex justify-center items-center ml-6 hover:bg-gray-200 transition-colors duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-medium">WORKING HOURS</h2>
              <p>
                Mon - Fri: 08:00 - 22:00 <br />
                Sat - Sun: 10:00 - 23:00
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-md shadow-sm">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              {/* Name Field */}
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  Name*
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md p-5 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              {/* Email Field */}
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-md p-5 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              {/* Phone Field */}
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Phone*
                </label>
                <input
                  id="address"
                  type="number"
                  placeholder="Your Phone Number"
                  className="w-full rounded-md p-5 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              {/* Message Field */}
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Message*
                </label>
                <textarea
                  name=""
                  placeholder="Your Message"
                  rows="10"
                  cols="30"
                  className="w-full rounded-md p-5 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                ></textarea>
              </div>
            </div>
          </fieldset>

          {/* Submit Button */}
          <div className="flex justify-center items-center w-full">
            <button
              className="btn text-white flex items-center gap-2 transform hover:scale-110 transition-transform duration-300"
              style={{
                background: `linear-gradient(90deg, #835D23 0%, #B58130 100%)`,
              }}
            >
              Send Message
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.7358 3.29705C22.8078 2.82305 22.6058 2.34805 22.2148 2.06905C21.8238 1.79105 21.3088 1.75605 20.8838 1.97905C17.4828 3.76505 5.58577 10.011 1.93177 11.929C1.48077 12.165 1.21477 12.647 1.25377 13.154C1.29277 13.661 1.62877 14.097 2.11077 14.262C3.53377 14.749 5.27277 15.346 7.99977 16.281L18.9998 6.00005L10.0978 17C13.0058 17.997 17.5528 19.556 18.6938 19.9471C19.0508 20.0701 19.4448 20.0271 19.7678 19.8321C20.0908 19.6361 20.3098 19.3071 20.3668 18.9331L22.7358 3.29705Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.83154 17.623V20.893C8.83154 21.395 9.12654 21.85 9.58354 22.055C10.0415 22.261 10.5765 22.179 10.9515 21.845L13.7895 19.323L8.83154 17.623Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;
