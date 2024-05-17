import React from "react";
import { FileInput } from "./file-input";
import { Button, Divider, Text } from "@tremor/react";
import { toast } from "sonner";
import { useMutation } from "@/hooks/use-mutation";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { pdfjs, Document, Page } from "react-pdf";
import { Info } from "@/components/info";
import { TransaksiKarbonDetails } from "@/modules/marketplace/transaction/transaksi-karbon-details";
import { ShipmentDetailsComponent } from "@/modules/shipment/shipment-details";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export function CarbonTransactionVerification() {
  const [pdfBlobUrl, setPdfBlobUrl] = React.useState<string | null>(null);

  const [metaData, setMetaData] = React.useState<any>();

  async function onLoadSuccess(pdf: any) {
    const metadata = await pdf.getMetadata();
    setMetaData(metadata);
  }

  const { trigger, data, isMutating, reset } = useMutation("/carbon_trading/transactions/verify");

  const carbonTransactionData = data?.data?.data?.data?.carbonTransaction;

  return (
    <div className="mt-3 grid md:grid-cols-2 gap-4 md:h-[calc(100dvh-240px)]">
      <FileInput
        disabled={isMutating}
        onChange={(url) => {
          setPdfBlobUrl(url);
          if (!url) {
            reset();
          }
        }}
      />
      <div className="hidden">
        {pdfBlobUrl && (
          <Document file={pdfBlobUrl} onLoadSuccess={onLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
      <Divider className="md:hidden" />
      <div className="border max-md:-mt-4 space-y-2 md:overflow-y-auto scrollbar">
        {pdfBlobUrl && data ? (
          <div className="px-4 md:px-8 pb-4">
            <Text className="mt-4 text-xl font-medium text-black flex gap-2 items-center">
              Invoice traksaksi karbon valid <RiCheckboxCircleFill className="text-emerald-600" />
            </Text>
            <TransaksiKarbonDetails details={carbonTransactionData} isLoading={isMutating} />
          </div>
        ) : (
          <div className="relative max-md:h-64 w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full -z-10 px-4 opacity-20">
              <ShipmentDetailsComponent
                details={{
                  id: "28d26121-a811-48ab-8e13-9c523a663016",
                  idSupplyChain: "3e5be0a3-130a-45bc-befc-8e5d4c4f5425",
                  divisiPengirim: {
                    id: "d561897f-310a-4554-b2a0-fdefda73a02e",
                    name: "d2",
                    perusahaan: "bdee209d-a9af-4610-930e-8c6e9d814589",
                    lokasi: "RQQM+8VC, Jelambar, Grogol petamburan, West Jakarta City, Jakarta, Indonesia",
                    manajer: "20d74ce8-bff0-4768-bded-9e605450f2ea",
                    lat: "-6.1616979999999995",
                    long: "106.7846412",
                  },
                  divisiPenerima: {
                    id: "cb5504b4-1abe-4c00-af28-dced4fa46783",
                    name: "d1",
                    perusahaan: "656e5708-2d8a-40ee-8d08-80f06b168b89",
                    lokasi:
                      "Jl. Masjid Al-Ikhlas II Blk. D No.37, RT.10/RW.2, Meruya Sel., Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610, Indonesia",
                    manajer: "0bb9525a-a1a2-457a-923f-1cc09e91fa8f",
                    lat: "-6.2130429",
                    long: "106.7366637",
                  },
                  status: "Completed",
                  waktuBerangkat: "2024-05-02T12:16:00.000Z",
                  waktuSampai: "2024-05-02T12:16:30Z",
                  transportasi: {
                    id: "b61560f4-7236-48a7-940c-fdf1ba8833bc",
                    divisi: {
                      id: "d561897f-310a-4554-b2a0-fdefda73a02e",
                      name: "d2",
                      perusahaan: "bdee209d-a9af-4610-930e-8c6e9d814589",
                      lokasi: "RQQM+8VC, Jelambar, Grogol petamburan, West Jakarta City, Jakarta, Indonesia",
                      manajer: "20d74ce8-bff0-4768-bded-9e605450f2ea",
                      lat: "",
                      long: "",
                    },
                    carModel: "kijang",
                    fuelType: "diesel",
                    kmUsage: "111",
                  },
                  beratMuatan: 1222,
                  emisiKarbon: 15824.984412000002,
                  approver: "0bb9525a-a1a2-457a-923f-1cc09e91fa8f",
                  TxId: "5a4e7d8fcd3afb3e8d10511136b6d7913031d1b2fbc4192d04a95bd549aca54d",
                }}
              />
            </div>
            <div className="text-center space-y-4 absolute inset-0 w-full h-full backdrop-blur-sm px-8 flex flex-col items-center justify-center">
              <div>
                <Info
                  title="Invoice Transaksi Karbon"
                  description="Unggah file PDF invoice transaksi karbon untuk memulai verifikasi."
                />
              </div>
              <Button
                className="w-full"
                loading={isMutating}
                onClick={async () => {
                  if (!pdfBlobUrl) {
                    toast.error("Mohon unggah file PDF terlebih dahulu.");
                    return;
                  }

                  const identifier = metaData?.info?.Title;
                  if (!identifier) {
                    toast.error("Tidak dapat menemukan identifier pada file PDF. Mohon unggah file yang valid.");
                    return;
                  }

                  try {
                    await trigger({
                      identifier: {
                        carbonTransaction: identifier,
                      },
                    });
                  } catch (error) {}
                }}
              >
                Verifikasi Invoice
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
