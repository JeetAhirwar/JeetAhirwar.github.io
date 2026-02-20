import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResumeHero from "@/components/resume/ResumeHero";
import ResumeSummary from "@/components/resume/ResumeSummary";
import ResumeSkills from "@/components/resume/ResumeSkills";
import ResumeFeaturedProjects from "@/components/resume/ResumeFeaturedProjects";
import ResumeExperience from "@/components/resume/ResumeExperience";
import ResumeEducation from "@/components/resume/ResumeEducation";
import ResumeCertifications from "@/components/resume/ResumeCertifications";
import ResumeDownloadCTA from "@/components/resume/ResumeDownloadCTA";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <ResumeHero />
        <ResumeSummary />
        <ResumeSkills />
        <ResumeFeaturedProjects />
        <ResumeExperience />
        <ResumeEducation />
        <ResumeCertifications />
        <ResumeDownloadCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Resume;
