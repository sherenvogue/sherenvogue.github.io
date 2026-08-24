const WEB3FORMS_ACCESS_KEY = "140b2d00-51ed-40d4-bc25-72bbcf4d92a9";

// CANCEL ORDER FUNCTION WITH EMAIL ALERT & REASON
async function cancelOrder(orderId) {
  let cancelReason = prompt(`Are you sure you want to cancel order ${orderId}?\n\nPlease enter a reason (optional):`);
  if (cancelReason === null) return;

  let orders = JSON.parse(localStorage.getItem('sheren_orders') || '[]');
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex].status = 'Cancelled';
    orders[orderIndex].cancelReason = cancelReason ? cancelReason : 'No reason provided';
    localStorage.setItem('sheren_orders', JSON.stringify(orders));
    
    // UI রিফ্রেশ করা
    if (typeof renderHistory === 'function') {
      renderHistory();
    }

    // ক্যানসেল হওয়ার নোটিফিকেশন ইমেইল পাঠানো
    if (typeof WEB3FORMS_ACCESS_KEY !== 'undefined' && WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `ALERT: Order Cancelled - ${orderId}`,
            from_name: "SherenVogue Storefront",
            to_email: "hello@sherenvogue.com",
            message: `Order Cancelled!\n\nOrder ID: ${orderId}\nCustomer Name: ${orders[orderIndex].customer?.name || 'N/A'}\nCustomer Email: ${orders[orderIndex].customer?.email || 'N/A'}\nPhone: ${orders[orderIndex].customer?.phone || 'N/A'}\nReason: ${orders[orderIndex].cancelReason}`
          })
        });
      } catch (err) {
        console.log('Cancel email error:', err);
      }
    }

    alert(`Order ${orderId} has been successfully cancelled.`);
  }
}
