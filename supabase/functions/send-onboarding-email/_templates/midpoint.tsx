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

interface MidpointEmailProps {
  userName: string;
  userEmail?: string;
}

export const MidpointEmail = ({ userName }: MidpointEmailProps) => (
  <Html>
    <Head />
    <Preview>Halfway through the program - your progress matters! 💪</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>You're Halfway There! 💪</Heading>
        
        <Text style={text}>
          {userName}, take a moment to celebrate—you've reached the midpoint of the program! Six weeks of consistent effort is a real achievement.
        </Text>

        <Section style={highlightBox}>
          <Heading style={h2}>Reflect on Your Journey</Heading>
          <Text style={text}>
            By now, you've likely noticed some changes. Take a moment to consider:
          </Text>
          <Text style={listItem}>
            🤔 Have your headache patterns changed?
          </Text>
          <Text style={listItem}>
            💡 What exercises have been most helpful?
          </Text>
          <Text style={listItem}>
            📉 Is the frequency or intensity different than when you started?
          </Text>
        </Section>

        <Section style={feedbackBox}>
          <Heading style={h2}>We'd Love Your Feedback</Heading>
          <Text style={text}>
            As a beta tester, your insights are incredibly valuable. How has your experience been so far? What's working well? What could be improved?
          </Text>
          <Text style={text}>
            Use the feedback button in the app, or simply reply to this email—we read every response!
          </Text>
        </Section>

        <Section style={ctaSection}>
          <Link href="https://headache-harmony-hub.lovable.app/phase/2" style={button}>
            Continue Your Program
          </Link>
        </Section>

        <Hr style={hr} />

        <Section style={tipsBox}>
          <Heading style={h2}>Tips for the Second Half</Heading>
          <Text style={listItem}>
            🎯 <strong>Stay consistent:</strong> Even when motivation dips, stick to the routine
          </Text>
          <Text style={listItem}>
            📝 <strong>Keep tracking:</strong> Your data becomes more valuable over time
          </Text>
          <Text style={listItem}>
            🔄 <strong>Build habits:</strong> Try linking exercises to existing daily routines
          </Text>
        </Section>

        <Text style={footer}>
          You've come so far—keep pushing forward!
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
  margin: "0 0 12px",
};

const highlightBox = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #f59e0b",
};

const feedbackBox = {
  backgroundColor: "#ede9fe",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #8b5cf6",
};

const tipsBox = {
  backgroundColor: "#f0f9ff",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#8b5cf6",
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

export default MidpointEmail;
