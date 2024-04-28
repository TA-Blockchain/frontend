import React from "react";
import { FileInput } from "./file-input";
import { Text } from "@tremor/react";

export function ShipmentVerification() {
  const [pdfBlobUrl, setPdfBlobUrl] = React.useState<string | null>(null);

  return (
    <div className="mt-3 grid md:grid-cols-2 gap-4">
      <FileInput
        onChange={(url) => {
          setPdfBlobUrl(url);
        }}
      />
      <div className="max-md:mt-8 space-y-2">
        <Text>Invoice perjalanan akan tampil disini.</Text>

        {pdfBlobUrl && <iframe src={pdfBlobUrl} style={{ width: "100%", height: "100%" }} />}
      </div>
    </div>
  );
}
