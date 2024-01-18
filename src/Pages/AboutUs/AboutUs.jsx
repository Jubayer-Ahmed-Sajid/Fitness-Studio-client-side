import { Helmet } from 'react-helmet-async'
import Container from "../../Components/Container/Container"
import FAQ from "../../Components/FAQ/FAQ"
import OurTeam from "../../Components/OurTeam/OurTeam"
import StoryBenhind from "../../Components/StoryBehind/StoryBenhind"
import MissionVission from "../../Components/MissionVission/MissionVission"
import AboutIntro from "../../Components/AboutIntro/AboutIntro"

const AboutUs = () => {
  return (
    <Container>
    <div className="mt-[50px]" >
      <Helmet>
        <title>About us - FitnessStudio</title>
      </Helmet>
      <AboutIntro/>
      <MissionVission/>
      <StoryBenhind/>
      <OurTeam/>
      <FAQ/>
    </div>
    </Container>
  )
}

export default AboutUs
