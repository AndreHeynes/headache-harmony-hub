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

interface WelcomeEmailProps {
  userName: string;
  userEmail?: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to the Headache Management Beta Program!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to the Program, {userName}! 🎉</Heading>
        
        <Text style={text}>
          Congratulations on being selected for our beta program! We're thrilled to have you join us on this journey toward better headache management.
        </Text>

        <Section style={highlightBox}>
          <Heading style={h2}>What to Expect</Heading>
          <Text style={text}>
            Over the next 12 weeks, you'll work through our comprehensive 4-phase program:
          </Text>
          <Text style={listItem}>
            <strong>Phase 1 (Week 1):</strong> Establish your baseline and understand your headache patterns
          </Text>
          <Text style={listItem}>
            <strong>Phase 2 (Weeks 2-11):</strong> Daily exercises and activity sheets tailored to your needs
          </Text>
          <Text style={listItem}>
            <strong>Phase 3 (Week 12):</strong> Reassess your progress and see how far you've come
          </Text>
          <Text style={listItem}>
            <strong>Phase 4:</strong> Build your personalized maintenance plan
          </Text>
        </Section>

        <Section style={ctaSection}>
          <Link href="https://headache-harmony-hub.lovable.app" style={button}>
            Access Your Program
          </Link>
        </Section>

        <Text style={text}>
          <strong>Quick Tips for Success:</strong>
        </Text>
        <Text style={listItem}>
          ✓ Log your headaches daily for accurate tracking
        </Text>
        <Text style={listItem}>
          ✓ Complete exercises consistently—even 5 minutes helps
        </Text>
        <Text style={listItem}>
          ✓ Use the feedback button in the app to share your thoughts
        </Text>

        <Hr style={hr} />

        <Text style={text}>
          <strong>Need Help?</strong> As a beta tester, your feedback is invaluable. Use the feedback button in the app anytime, or reply to this email.
        </Text>

        <Text style={footer}>
          We're here to support you every step of the way.
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
  fontSize: "20px",
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
  paddingLeft: "8px",
};

const highlightBox = {
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
  backgroundColor: "#2563eb",
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

export default WelcomeEmail;
