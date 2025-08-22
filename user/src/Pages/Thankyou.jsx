import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "/logo.png"; 

const ThankYouPage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [width, height] = useWindowSize();

  useEffect(() => {
    console.log("Full Order Data:", data?.orderId);
  }, [data]);

  useEffect(() => {
    // Prevent horizontal scroll
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto"; // cleanup on unmount
    };
  }, []);

  // 👉 Invoice generate function
  const generateInvoice = () => {
    if (!data) return;

    const doc = new jsPDF();

    // Logo
    doc.addImage(logo, "PNG", 150, 10, 40, 20);

    // Title
    doc.setFontSize(20);
    doc.text("Invoice", 14, 20);

    // Order Info
    doc.setFontSize(12);
    doc.text(`Order ID: ${data.orderId}`, 14, 35);
    doc.text(`Date: ${data.date || new Date().toLocaleDateString()}`, 14, 42);

    // Customer Info
    if (data.customer) {
      doc.text(`Customer: ${data.customer.name}`, 14, 55);
      doc.text(`Email: ${data.customer.email}`, 14, 62);
      doc.text(`Address: ${data.customer.address}`, 14, 69);
    }

    // Items Table
    const tableColumn = ["Item", "Qty", "Price", "Total"];
    const tableRows = [];

    data.items?.forEach((item) => {
      tableRows.push([
        item.name,
        item.qty,
        `₹${item.price}`,
        `₹${item.qty * item.price}`,
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 80,
    });

    // Total
    doc.setFontSize(14);
    doc.text(
      `Grand Total: ₹${data.total}`,
      150,
      doc.lastAutoTable.finalY + 20
    );

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Thank you for shopping with Calliwear! Stay stylish with tradition.",
      14,
      290
    );

    // Save PDF
    doc.save(`invoice-${data.orderId}.pdf`);
  };

  return (
    <div className="min-h-[80vh] max-w-full overflow-hidden flex flex-col justify-center items-center bg-white text-center p-6">
      <Confetti width={width} height={height} />

      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Thank you for your order!
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Your order # {data?.orderId} has been placed successfully.
      </p>

      {/* Invoice Download Button */}
      <button
        onClick={generateInvoice}
        className="px-6 my-2 mx-2 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Download Invoice
      </button>

      <Link
        to="/"
        style={{ padding: "10px" }}
        className="px-6 my-4 mx-2 py-2 bg-black text-white hover:bg-green-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

// 👇 Window Size Hook
function useWindowSize() {
  const [size, setSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useEffect(() => {
    const handleResize = () =>
      setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default ThankYouPage;
