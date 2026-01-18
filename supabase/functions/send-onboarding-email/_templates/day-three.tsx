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

interface DayThreeEmailProps {
  userName: string;
  userEmail?: string;
}

export const DayThreeEmail = ({ userName }: DayThreeEmailProps) => (
  <Html>
    <Head />
    <Preview>How's your first week going? Quick check-in and tips</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Hey {userName}, how's it going? 👋</Heading>
        
        <Text style={text}>
          You've been in the program for a few days now, and we wanted to check in. How are you finding the experience so far?
        </Text>

        <Section style={highlightBox}>
          <Heading style={h2}>Phase 1 Tips for Success</Heading>
          <Text style={listItem}>
            📊 <strong>Track consistently:</strong> Log your headaches each day, even if you didn't have one—that data is valuable too!
          </Text>
          <Text style={listItem}>
            🎯 <strong>Be specific:</strong> Note the intensity, triggers, and what helped. Patterns will emerge.
          </Text>
          <Text style={listItem}>
            ⏰ <strong>Set a reminder:</strong> Pick a consistent time each day to check in with the app.
          </Text>
        </Section>

        <Text style={text}>
          Remember, Phase 1 is all about understanding your unique headache patterns. The data you're gathering now will shape your personalized treatment plan in Phase 2.
        </Text>

        <Section style={ctaSection}>
          <Link href="https://headache-harmony-hub.lovable.app/phase/1" style={button}>
            Continue Phase 1
          </Link>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          <strong>Quick question:</strong> Is there anything that's been confusing or difficult so far? Hit reply and let us know—your feedback helps us improve!
        </Text>

        <Text style={footer}>
          Keep going, you're doing great!
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
  fontSize: "26px",
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

export default DayThreeEmail;
