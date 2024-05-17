import { Company } from "@/modules/company/list";
import { ProposalKarbon } from "@/modules/marketplace/proposal/proposal-karbon-list-readonly";
import { TransaksiKarbonStatus } from "./transaksi-karbon-list";

export interface TransaksiKarbonDetailsType {
  id: string;
  perusahaanPembeli: Company;
  proposalPenjual: ProposalKarbon;
  kuota: number;
  status: TransaksiKarbonStatus;
  urlBuktiTransaksi: string;
  approvers: string[];
  HistoryTxId: Array<string>;
  signatures: Array<Signature>;
}

export type Signature = {
  signature: string;
  signTime: string;
  signerPubKey: string;
};
