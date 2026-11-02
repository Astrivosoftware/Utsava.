import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";
import type { OrderEmailData } from "@/lib/email";

const p = { fontSize: "15px", lineHeight: "24px", color: "#2E2E2E", margin: "8px 0" } as const;

export function CustomerEmail(d: OrderEmailData) {
  return (
    <Html>
      <Head />
      <Preview>We have received your order for {d.templateTitle}</Preview>
      <Body style={{ background: "#FFF9F1", fontFamily: "Arial, sans-serif", padding: "24px" }}>
        <Container style={{ background: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "560px" }}>
          <Text style={{ fontFamily: "Georgia, serif", fontSize: "28px", margin: 0 }}>
            utsava<span style={{ color: "#B8862B" }}>.</span>
          </Text>
          <Heading style={{ fontFamily: "Georgia, serif", fontSize: "22px", margin: "20px 0 8px" }}>
            Thank you, {d.customerName.split(" ")[0]}!
          </Heading>
          <Text style={p}>
            We have received your order for <b>{d.templateTitle}</b> ({d.musicLabel}) for{" "}
            <b>{d.recipientName}</b>, planned for <b>{d.occasionDate}</b>.
          </Text>
          <Text style={p}>
            Total: <b>₹{d.amount.toLocaleString("en-IN")}</b>. We will message you on WhatsApp ({d.whatsapp})
            or reply here with payment details and the next steps.
          </Text>
          <Hr />
          <Text style={{ ...p, color: "#777", fontSize: "13px" }}>
            Order ID: {d.orderId}. Reply to this email if you want to change anything.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
