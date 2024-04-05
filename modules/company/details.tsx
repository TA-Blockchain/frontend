import React from "react";
import { Company } from "./list";

export function CompanyDetails({ details }: { details: Company }) {
  return <div>{JSON.stringify(details)}</div>;
}
