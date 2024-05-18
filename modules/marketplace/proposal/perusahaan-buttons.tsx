import React from "react";
import { Button, TextInput } from "@tremor/react";
import { useMutation } from "@/hooks/use-mutation";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { useOptimisticList } from "@/hooks/use-optimistic";
import useSWR from "swr";
import { ProposalKarbon } from "./proposal-karbon-list-readonly";
import { TransaksiKarbon } from "../transaction/transaksi-karbon-list";
import { RiAttachment2 } from "@remixicon/react";
import { Company } from "@/modules/company/list";

type CreateTransaksiKarbon = {
  idPerusahaanPembeli: string;
  idProposalPenjual: string;
  kuota: number;
  status: "pending";
  urlBuktiTransaksi: string;
  approvers: [string];
};

export function PerusahaanButtons({ details }: { details: ProposalKarbon }) {
  const {
    user: { id, idPerusahaan },
  } = useUser();

  const { data: dataPerusahaan, isLoading: isLoadingPerusahaan } = useSWR<{ data: Company }>(
    `/company/${details.idPerusahaan}`
  );

  const [urlBuktiTransaksi, setUrlBuktiTransaksi] = React.useState<string>("");

  const { mutate } = useOptimisticList(`/carbon_trading/transactions/perusahaan/${idPerusahaan}`);

  const { data, isLoading } = useSWR<{ data: Array<TransaksiKarbon> }>(
    `/carbon_trading/transactions/perusahaan/${idPerusahaan}`
  );

  const [isClicked, setIsClicked] = React.useState(false);

  const { trigger, isMutating } = useMutation<CreateTransaksiKarbon>("/carbon_trading/transactions");

  const hasDiajukan = data?.data.some((item) => item.idProposalPenjual === details.id && item.status === "pending");

  const isOwner = details.idPerusahaan === idPerusahaan;

  const cannotBuy = dataPerusahaan && details.kuotaYangDijual > dataPerusahaan?.data.sisaKuota;

  if (isOwner) return null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await trigger({
          idPerusahaanPembeli: idPerusahaan,
          idProposalPenjual: details.id,
          kuota: details.kuotaYangDijual,
          status: "pending",
          urlBuktiTransaksi,
          approvers: [id],
        });

        toast.success("Pembelian kuota karbon telah diajukan.");

        await mutate(result);

        setIsClicked(true);
      }}
    >
      <div className="sm:max-w-sm ml-auto grid place-items-end gap-4">
        {!hasDiajukan && (
          <TextInput
            disabled={cannotBuy}
            icon={RiAttachment2}
            value={urlBuktiTransaksi}
            onChange={(e) => setUrlBuktiTransaksi(e.target.value)}
            placeholder="Masukkan URL bukti transaksi"
            className="mt-2 w-full rounded-tremor-small sm:max-w-lg"
            required
          />
        )}
        <Button
          className="rounded-tremor-small"
          disabled={isLoading || isLoadingPerusahaan || hasDiajukan || isClicked || cannotBuy}
          loading={isMutating}
        >
          {hasDiajukan ? "Pembelian telah diajukan" : cannotBuy ? "Kuota tersisa tidak mencukupi" : "Ajukan Pembelian"}
        </Button>
      </div>
    </form>
  );
}
