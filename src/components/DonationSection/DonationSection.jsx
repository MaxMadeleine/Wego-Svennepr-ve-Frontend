  import donationStatsImage from '../../assets/images/donations/Skærmbillede 2025-09-01 kl. 16.42.12.png';
  import donationYearImage from '../../assets/images/donations/Skærmbillede 2025-09-01 kl. 16.43.15.png';

export const DonationSection = () => {

    return (
        <section className="container mx-auto pt-8 mb-3">
        <div className="border-t-4 mb-12 border-secondary"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:max-w-7xl mx-auto">
              <img
                src={donationStatsImage}
                alt="Donationer til dato"
                className="w-full h-full container object-contain duration-500 transform md:hover:scale-105"
              />
          
              <img
                src={donationYearImage}
                alt="Donationer i år"
                className="w-full h-full container object-contain duration-500 transform md:hover:scale-105"
              />
          </div>
        </section>
    )
}