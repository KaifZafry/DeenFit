import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "./logo.png"; // apna logo import kar le

const InvoiceGenerator = ({ order }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Logo (x, y, width, height)
    doc.addImage(logo, "PNG", 150, 10, 40, 20);

    // Title
    doc.setFontSize(20);
    doc.text("Invoice", 14, 20);

    // Order Info
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.orderId}`, 14, 35);
    doc.text(`Date: ${order.date}`, 14, 42);

    // Customer Info
    doc.text(`Customer: ${order.customer.name}`, 14, 55);
    doc.text(`Email: ${order.customer.email}`, 14, 62);
    doc.text(`Address: ${order.customer.address}`, 14, 69);

    // Table (Items)
    const tableColumn = ["Item", "Qty", "Price", "Total"];
    const tableRows = [];

    order.items.forEach((item) => {
      const row = [
        item.name,
        item.qty,
        `₹${item.price}`,
        `₹${item.qty * item.price}`,
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 80,
    });

    // Total
    doc.setFontSize(14);
    doc.text(
      `Grand Total: ₹${order.total}`,
      150,
      doc.lastAutoTable.finalY + 20
    );

    // Footer (Tagline)
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Thank you for shopping with Calliwear! Stay stylish with tradition.",
      14,
      290
    );

    // Save PDF
    doc.save(`invoice-${order.orderId}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-black text-white rounded-lg"
    >
      Download Invoice
    </button>
  );
};

export default InvoiceGenerator;
