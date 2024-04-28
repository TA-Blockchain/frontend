import React from "react";
import { FileInput } from "./file-input";
import { Divider, Text } from "@tremor/react";
import { ShipmentDetails } from "../shipment/shipment-details";
import { Shipment } from "../shipment/shipment-list";
import useSWR from "swr";
import { toast } from "sonner";
import { fetcher } from "@/lib";

export function ShipmentVerification() {
  const [pdfBlobUrl, setPdfBlobUrl] = React.useState<string | null>(null);

  const { data: shipment, isLoading } = useSWR<{ data: Shipment }>(
    `/company/shipment/detail/${pdfBlobUrl ? "0545c6ac-cdec-40b5-9799-8b5b7d06465f" : "undefined"}`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data) toast.success("Verifikasi perjalanan berhasil.");
      },
    }
  );

  return (
    <div className="mt-3 grid md:grid-cols-2 gap-4 md:h-[calc(100dvh-240px)]">
      <FileInput
        disabled={isLoading}
        onChange={(url) => {
          setPdfBlobUrl(url);
        }}
      />
      <Divider className="md:hidden" />
      <div className="max-md:-mt-4 space-y-2 md:overflow-y-scroll md:px-4 pb-4 scrollbar">
        {pdfBlobUrl && (
          <div>
            <Text className="text-xl font-medium text-black">Hasil Verifikasi Invoice Perjalanan</Text>
            <ShipmentDetails details={shipment?.data} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}
