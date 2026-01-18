import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

interface FinalWeekEmailProps {
  userName: string;
  userEmail?: string;
}

export const FinalWeekEmail = ({ userName }: FinalWeekEmailProps) => (
  <Html>
    <Head />
    <Preview>Final week! Time to see how far you've come 🏁</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Final Week - Almost There! 🏁</Heading>
        
        <Text style={text}>
          {userName}, you've made it to the final week! 11 weeks of dedicated effort—that's incredible commitment. Now it's time to see just how much you've improved.
        </Text>

        <Section style={highlightBox}>
          <Heading style={h2}>Phase 3: Reassessment</Heading>
          <Text style={text}>
            This week is all about measuring your progress. You'll retake the same assessments from Phase 1, allowing us to directly compare where you started to where you are now.
          </Text>
          <Text style={listItem}>
            📊 <strong>HIT-6:</strong> Measure headache impact on daily life
          </Text>
          <Text style={listItem}>
            📋 <strong>MIDAS:</strong> Assess disability from headaches
          </Text>
          <Text style={listItem}>
            🎯 <strong>Other assessments:</strong> Track various aspects of your progress
          </Text>
        </Section>

        <Section style={ctaSection}>
          <Link href="https://headache-harmony-hub.lovable.app/phase/3" style={button}>
            Start Reassessment
          </Link>
        </Section>

        <Section style={tipBox}>
          <Heading style={h2}>Before You Begin</Heading>
          <Text style={text}>
            Answer the reassessment questions thinking about the <strong>past month</strong>, not the entire 12 weeks. This gives us the most accurate picture of your current state.
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          <strong>Coming up next:</strong> After completing Phase 3, you'll move into Phase 4 where you'll create your personalized maintenance plan—a strategy to keep the improvements you've made!
        </Text>

        <Text style={footer}>
          The finish line is in sight. Let's see your results!
          <br />
          — The Headache Program Team
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 24px",
  padding: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 16px",
  padding: "0",
};

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const listItem = {
  color: "#4a4a4a",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const highlightBox = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #f59e0b",
};

const tipBox = {
  backgroundColor: "#f0f9ff",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #3b82f6",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#f59e0b",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "14px 28px",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "32px 0",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "24px",
  textAlign: "center" as const,
};

export default FinalWeekEmail;
