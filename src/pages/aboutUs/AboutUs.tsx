import React from "react";

import OurStory from "./OurStory";
import MeetTheTeam from "./OurTeam";
import OurVision from "./OurMission";

const AboutUsPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <OurVision />
      <MeetTheTeam />
      <OurStory />
    </div>
  );
};

export default AboutUsPage;
