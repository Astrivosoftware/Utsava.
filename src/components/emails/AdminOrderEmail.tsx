import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";
import type { OrderEmailData } from "@/lib/email";

const row = { margin: "4px 0", fontSize: "14px", color: "#2E2E2E" } as const;

export function AdminOrderEmail(d: OrderEmailData) {
  return (
    <Html>
      <Head />
      <Preview>{`New order: ${d.templateTitle} from ${d.customerName}`}</Preview>
      <Body style={{ background: "#FFF9F1", fontFamily: "Arial, sans-serif", padding: "24px" }}>
        <Container style={{ background: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "560px" }}>
          <Heading style={{ fontFamily: "Georgia, serif", fontSize: "24px", margin: "0 0 12px" }}>
            New order 🎁
          </Heading>
          <Text style={row}><b>Template:</b> {d.templateTitle} ({d.musicLabel})</Text>
          <Text style={row}><b>Amount:</b> ₹{d.amount.toLocaleString("en-IN")}</Text>
          <Hr />
          <Text style={row}><b>Customer:</b> {d.customerName}</Text>
          <Text style={row}><b>Email:</b> {d.email}</Text>
          <Text style={row}><b>WhatsApp:</b> {d.whatsapp}</Text>
          <Hr />
          <Text style={row}><b>Recipient:</b> {d.recipientName}</Text>
          <Text style={row}><b>Occasion date:</b> {d.occasionDate}</Text>
          <Text style={row}><b>Message:</b></Text>
          <Text style={{ ...row, whiteSpace: "pre-wrap" }}>{d.message}</Text>
          {d.photoLinks.length > 0 && (
            <>
              <Text style={row}><b>Photo links:</b></Text>
              {d.photoLinks.map((l) => (
                <Text key={l} style={row}>{l}</Text>
              ))}
            </>
          )}
          <Hr />
          <Text style={{ ...row, color: "#999" }}>Order ID: {d.orderId}</Text>
        </Container>
      </Body>
    </Html>
  );
}
