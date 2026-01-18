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

interface CompleteEmailProps {
  userName: string;
  userEmail?: string;
}

export const CompleteEmail = ({ userName }: CompleteEmailProps) => (
  <Html>
    <Head />
    <Preview>Congratulations! You've completed the 12-week program 🏆</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Congratulations, {userName}! 🏆</Heading>
        
        <Text style={text}>
          You did it! You've successfully completed the entire 12-week Headache Management Program. This is a tremendous achievement that demonstrates your commitment to improving your health.
        </Text>

        <Section style={highlightBox}>
          <Heading style={h2}>Your Journey</Heading>
          <Text style={listItem}>
            ✅ <strong>Phase 1:</strong> Established your baseline and identified patterns
          </Text>
          <Text style={listItem}>
            ✅ <strong>Phase 2:</strong> Completed 10 weeks of exercises and activity sheets
          </Text>
          <Text style={listItem}>
            ✅ <strong>Phase 3:</strong> Reassessed and measured your progress
          </Text>
          <Text style={listItem}>
            ✅ <strong>Phase 4:</strong> Created your personalized maintenance plan
          </Text>
        </Section>

        <Section style={feedbackBox}>
          <Heading style={h2}>Share Your Experience</Heading>
          <Text style={text}>
            As one of our first beta testers, your feedback has been invaluable. Would you be willing to share your experience? Your story could help others who are struggling with headaches.
          </Text>
          <Text style={text}>
            Reply to this email with a brief testimonial, or let us know if you'd be open to a short interview about your experience.
          </Text>
        </Section>

        <Section style={ctaSection}>
          <Link href="https://headache-harmony-hub.lovable.app/phase/4" style={button}>
            View Your Maintenance Plan
          </Link>
        </Section>

        <Hr style={hr} />

        <Section style={nextStepsBox}>
          <Heading style={h2}>What's Next?</Heading>
          <Text style={listItem}>
            🔄 <strong>Keep practicing:</strong> Your maintenance plan is designed for long-term success
          </Text>
          <Text style={listItem}>
            📊 <strong>Track occasionally:</strong> Continue logging headaches to spot any changes
          </Text>
          <Text style={listItem}>
            📣 <strong>Spread the word:</strong> Know someone who might benefit? We'd love referrals!
          </Text>
          <Text style={listItem}>
            🚀 <strong>Stay tuned:</strong> We'll notify you when the full program launches
          </Text>
        </Section>

        <Text style={text}>
          Thank you for being part of our beta program. Your participation and feedback have helped shape something that will help many people manage their headaches better.
        </Text>

        <Text style={footer}>
          With gratitude,
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
  backgroundColor: "#dcfce7",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #22c55e",
};

const feedbackBox = {
  backgroundColor: "#ede9fe",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  borderLeft: "4px solid #8b5cf6",
};

const nextStepsBox = {
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

export default CompleteEmail;
