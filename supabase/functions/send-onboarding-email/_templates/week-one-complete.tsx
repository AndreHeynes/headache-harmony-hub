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

interface WeekOneCompleteEmailProps {
  userName: string;
  userEmail?: string;
}

export const WeekOneCompleteEmail = ({ userName }: WeekOneCompleteEmailProps) => (
  <Html>
    <Head />
    <Preview>Week 1 complete! You've established your baseline 🌟</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Week 1 Complete! 🌟</Heading>
        
        <Text style={text}>
          Congratulations, {userName}! You've successfully completed Phase 1 of the program. This is a significant milestone—you now have a baseline understanding of your headache patterns.
        </Text>

        <Section style={highlightBox}>
          <Heading style={h2}>What You've Accomplished</Heading>
          <Text style={listItem}>
            ✅ Established your headache baseline
          </Text>
          <Text style={listItem}>
            ✅ Identified potential triggers and patterns
          </Text>
          <Text style={listItem}>
            ✅ Completed initial assessments
          </Text>
          <Text style={listItem}>
            ✅ Built the foundation for your personalized treatment
          </Text>
        </Section>

        <Section style={previewBox}>
          <Heading style={h2}>Coming Up in Phase 2</Heading>
          <Text style={text}>
            Get ready for the core of the program! Over the next 10 weeks, you'll:
          </Text>
          <Text style={listItem}>
            💪 Learn targeted exercises for headache relief
          </Text>
          <Text style={listItem}>
            📝 Complete activity sheets to reinforce learning
          </Text>
          <Text style={listItem}>
            📈 Track your progress with weekly reviews
          </Text>
        </Section>

        <Section style={ctaSection}>
          <Link href="https://headache-harmony-hub.lovable.app/phase/2" style={button}>
            Start Phase 2
          </Link>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          <strong>Pro tip:</strong> Consistency is key in Phase 2. Even on busy days, try to complete at least one exercise. Small, regular efforts lead to big results!
        </Text>

        <Text style={footer}>
          We're proud of your progress. Keep it up!
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
  backgroundColor: "#dcfce7",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #22c55e",
};

const previewBox = {
  backgroundColor: "#f0f7ff",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#22c55e",
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

export default WeekOneCompleteEmail;
