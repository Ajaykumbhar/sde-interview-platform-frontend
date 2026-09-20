import FeatureCard from "../../components/FeatureCard";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import type { Feature } from "../../types/feature";

const features: Feature[] = [
  {
    title: "DSA Practice",
    description: "500+ Coding Problems",
  },
  {
    title: "Mock Interviews",
    description: "Practice Real Interviews",
  },
  {
    title: "System Design",
    description: "Learn HLD and LLD",
  },
];
function HomePage() {
  return (
    <>
      <Hero
        title="Interview Prep Platform"
        subtitle="Master DSA, System Design and Mock Interviews"
      ></Hero>
      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          title={feature.title}
          description={feature.description}
        />
      ))}

      <Footer />
    </>
  );
}

export default HomePage;
