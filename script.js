// CANCEL ORDER FUNCTION WITH EMAIL ALERT
async function cancelOrder(orderId) {
  if (!confirm(`Are you sure you want to cancel order ${orderId}?`)) return;

  let orders = JSON.parse(localStorage.getItem('sheren_orders') || '[]');
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex].status = 'Cancelled';
    localStorage.setItem('sheren_orders', JSON.stringify(orders));
    
    // UI রিফ্রেশ করা
    renderHistory();

    // ক্যানসেল হওয়ার নোটিফিকেশন ইমেইল পাঠানো
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
            message: `Order Cancelled!\n\nOrder ID: ${orderId}\nCustomer Name: ${orders[orderIndex].customer?.name || 'N/A'}\nCustomer Email: ${orders[orderIndex].customer?.email || 'N/A'}\nPhone: ${orders[orderIndex].customer?.phone || 'N/A'}`
          })
        });
      } catch (err) {
        console.log('Cancel email error:', err);
      }
    }

    alert(`Order ${orderId} has been successfully cancelled.`);
  }
}
