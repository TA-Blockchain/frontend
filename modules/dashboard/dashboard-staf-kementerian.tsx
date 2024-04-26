import React from "react";

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { Button } from "@tremor/react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 40,
  },
  invoiceInfoItem: {
    width: "50%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemDescription: {
    width: "70%",
  },
  itemAmount: {
    width: "30%",
    textAlign: "right",
  },
  totalAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

// Sample invoice data
const invoiceData = {
  invoiceNumber: "INV-001",
  invoiceDate: "April 26, 2024",
  dueDate: "May 10, 2024",
  companyName: "ABC Company",
  companyAddress: "123 Main Street, Cityville, ABC",
  clientName: "XYZ Corporation",
  clientAddress: "456 Oak Avenue, Townsville, XYZ",
  items: [
    { description: "Product A", amount: 100 },
    { description: "Product B", amount: 150 },
    { description: "Product C", amount: 200 },
  ],
  totalAmount: 450,
};

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>INVOICE</Text>
        <View style={styles.invoiceInfo}>
          <View style={styles.invoiceInfoItem}>
            <Text>Invoice #: {invoiceData.invoiceNumber}</Text>
            <Text>Date: {invoiceData.invoiceDate}</Text>
          </View>
          <View style={styles.invoiceInfoItem}>
            <Text>Due Date: {invoiceData.dueDate}</Text>
            <Text>Client: {invoiceData.clientName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text>From: {invoiceData.companyName}</Text>
        <Text>{invoiceData.companyAddress}</Text>
      </View>
      <View style={styles.section}>
        <Text>To: {invoiceData.clientName}</Text>
        <Text>{invoiceData.clientAddress}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.itemDescription}>Description</Text>
          <Text style={styles.itemAmount}>Amount</Text>
        </View>
        {invoiceData.items.map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemAmount}>${item.amount}</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalAmount}>
        <Text>Total:</Text>
        <Text>${invoiceData.totalAmount}</Text>
      </View>
    </Page>
  </Document>
);

export default function DashboardStafKementerian() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PDFViewer className="w-full h-[calc(100dvh-100px)]">
        <MyDocument />
      </PDFViewer>

      <div>
        <div>here side is your pdf</div>

        <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (
            <Button className="rounded-tremor-small">{loading ? "Memuat dokumen..." : "Unduh"}</Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
