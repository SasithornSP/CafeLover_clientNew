function handlePaymentSuccess(order) {
    // อัพเดตคิวอัตโนมัติ
    const queueNumber = generateQueueNumber(); // ฟังก์ชันสร้างเลขคิวใหม่
    const receipt = generateReceipt(order, queueNumber);
  
    // แสดงใบเสร็จหรือลงชื่อในระบบ
    printReceipt(receipt);
  
    console.log("ใบเสร็จถูกสร้างพร้อมคิว:", queueNumber);
  }
  
  // ฟังก์ชันตัวอย่างสร้างหมายเลขคิว
  function generateQueueNumber() {
    return Math.floor(Math.random() * 1000); // ใช้ตัวเลขแบบสุ่มสำหรับคิว
  }
  
  // ฟังก์ชันตัวอย่างสร้างใบเสร็จ
  function generateReceipt(order, queueNumber) {
    return `
      ใบเสร็จรับเงิน
      ===================
      ชื่อออเดอร์: ${order}
      หมายเลขคิว: ${queueNumber}
      ===================
      ขอบคุณที่ใช้บริการ!
    `;
  }
  
  // ฟังก์ชันพิมพ์ใบเสร็จ
  function printReceipt(receipt) {
    alert(receipt); // หรือใช้วิธีพิมพ์อื่น เช่น ส่งไปยังเครื่องพิมพ์
  }