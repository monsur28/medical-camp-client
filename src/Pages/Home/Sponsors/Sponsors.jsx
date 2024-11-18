const Sponsors = () => {
  return (
    <div className="bg-gray-50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Our Proud Sponsors
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Sponsor Logo 1 */}
          <div className="flex justify-center items-center sponsor-logo">
            <img
              src="https://fabrikbrands.com/wp-content/uploads/Healthcare-company-logos-2.png"
              alt="Sponsor 1"
              title="Sponsor 1"
              className="max-h-16 object-contain"
              loading="lazy"
            />
          </div>

          {/* Sponsor Logo 2 */}
          <div className="flex justify-center items-center sponsor-logo">
            <img
              src="https://fabrikbrands.com/wp-content/uploads/Healthcare-company-logos-3-1536x960.png"
              alt="Sponsor 2"
              title="Sponsor 2"
              className="max-h-16 object-contain"
              loading="lazy"
            />
          </div>

          {/* Sponsor Logo 3 */}
          <div className="flex justify-center items-center sponsor-logo">
            <img
              src="https://fabrikbrands.com/wp-content/uploads/Healthcare-company-logos-4-1536x960.png"
              alt="Sponsor 3"
              title="Sponsor 3"
              className="max-h-16 object-contain"
              loading="lazy"
            />
          </div>

          {/* Sponsor Logo 4 */}
          <div className="flex justify-center items-center sponsor-logo hover: scale-90">
            <img
              src="https://fabrikbrands.com/wp-content/uploads/Healthcare-company-logos-5-1536x960.png"
              alt="Sponsor 4"
              title="Sponsor 4"
              className="max-h-16 object-contain hover: scale-90"
              loading="lazy"
            />
          </div>

          {/* Sponsor Logo 5 */}
          <div className="flex justify-center items-center sponsor-logo">
            <img
              src="https://fabrikbrands.com/wp-content/uploads/Healthcare-company-logos-7-1536x960.png"
              alt="Sponsor 5"
              title="Sponsor 5"
              className="max-h-16 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* CSS animation for logos */}
      <style>{`
          .sponsor-logo {
            animation: fadeInScale 1.5s ease-in-out forwards;
          }
  
          /* Combined Fade-In and Scale-Up animation */
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
  
          /* Animation delay for each logo */
          .sponsor-logo:nth-child(1) {
            animation-delay: 0s;
          }
          .sponsor-logo:nth-child(2) {
            animation-delay: 0.2s;
          }
          .sponsor-logo:nth-child(3) {
            animation-delay: 0.4s;
          }
          .sponsor-logo:nth-child(4) {
            animation-delay: 0.6s;
          }
          .sponsor-logo:nth-child(5) {
            animation-delay: 0.8s;
          }
        `}</style>
    </div>
  );
};

export default Sponsors;
