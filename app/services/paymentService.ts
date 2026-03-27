// Configuration Keys (Zambia Focused)
const FW_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-SANDBOX-X";
const BUNI_MERCHANT_ID = process.env.NEXT_PUBLIC_BUNIPAY_MERCHANT_ID || "SANDBOX_123";

// Flutterwave Integration for Zambia (Primary)
export const FlutterwaveService = {
  /**
   * Generates a Hosted Checkout link for Secure Payments
   * Supports: Mobile Money (Zambia), Visa, Mastercard, Bank
   */
  initiatePayment: async (data: { amount: number, email: string, name: string, phone: string, txRef: string }) => {
    console.log("🛠️ Initializing Flutterwave Checkout with Key:", FW_PUBLIC_KEY.substring(0, 10) + "...");
    
    // In a real production app (w/ server-side), this would be a POST to /v3/payments
    // For this prototype, we build the Hosted Link logic
    const payload = {
      publicKey: FW_PUBLIC_KEY,
      tx_ref: data.txRef,
      amount: data.amount,
      currency: "ZMW",
      payment_options: "mobilemoneyzambia, card, banktransfer",
      customer: {
        email: data.email,
        phone_number: data.phone,
        name: data.name,
      },
      customizations: {
        title: "Tumaworks Wallet",
        description: `Deposit ZMW ${data.amount} to your wallet`,
        logo: "https://tumaworks.app/logo.png",
      },
    };

    // Simulate API round-trip
    await new Promise(r => setTimeout(r, 1200));

    // Return the Hosted Payment Link (Mocking the redirect to Flutterwave's secure server)
    return {
      status: 'success',
      checkout_url: `https://checkout.flutterwave.com/v3/hosted/pay/${data.txRef}?amount=${data.amount}&currency=ZMW&pub_key=${FW_PUBLIC_KEY}`
    };
  },

  verifyPayment: async (transactionId: string) => {
    console.log("🔍 Verifying Transaction via Flutterwave API:", transactionId);
    // Real App: GET https://api.flutterwave.com/v3/transactions/:id/verify
    return { status: 'successful', amount: 0 };
  }
};

// BuniPay Integration (Fallback)
export const BuniPayService = {
  initiatePayment: async (data: { amount: number, phone: string, txRef: string }) => {
    console.log("🛠️ Initializing BuniPay MM Push with Merchant ID:", BUNI_MERCHANT_ID);
    
    // Simulate real BuniPay USSD push trigger
    await new Promise(r => setTimeout(r, 1000));
    
    return { 
      status: 'success', 
      status_id: 'pending',
      tx_ref: data.txRef,
      instructions: "Check your phone for a ZMW push prompt or dial *777# to approve."
    };
  }
};

// Stripe Integration (Subscriptions Only)
export const StripeService = {
  createSubscription: async (email: string, planId: string) => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_sandbox";
    console.log("🛠️ Initializing Stripe Checkout with Key:", key.substring(0, 7) + "...");
    
    await new Promise(r => setTimeout(r, 1500));
    return { sessionId: 'cs_test_12345' };
  }
};

// Unified Payment Controller
export class PaymentService {
  /**
   * High-Level method to fund the user's wallet
   */
  static async depositToWallet(provider: 'flutterwave' | 'bunipay', amount: number, user: any) {
    const txRef = `tumaworks_tx_${Date.now()}`;
    
    if (provider === 'flutterwave') {
      return await FlutterwaveService.initiatePayment({
        amount,
        email: user.email || 'user@example.com',
        name: user.name || 'Tumaworks User',
        phone: user.phone || '097',
        txRef
      });
    } else {
      return await BuniPayService.initiatePayment({
        amount,
        phone: user.phone || '097',
        txRef
      });
    }
  }
}
