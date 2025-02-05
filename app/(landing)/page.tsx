
import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import LandingSteps from "@/components/landing-steps";



const LandingPage = () => {
  return ( <div >
    <LandingNavbar />
    <LandingHero/>
    <LandingSteps />
    <LandingContent />
  </div>
  
   );
}
 
export default LandingPage;