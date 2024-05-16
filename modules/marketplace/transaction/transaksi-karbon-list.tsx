export type TransaksiKarbon = {
  idPerusahaanPembeli: string;
  idProposalPenjual: string;
  kuota: number;
  status: "pending" | "approve penjual" | "approve";
  urlBuktiTransaksi: string;
  approvers: [string];
};
