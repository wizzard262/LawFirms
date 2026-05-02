import axios from "axios";
import type { PaginatedList } from "~/types/common-types";
import type { CreateLawFirmRequest, LawFirm } from "~/types/law-firm-types";

export type IApi = ReturnType<typeof useApi>;

export default function useApi() {

  //const apiBaseAddress = "https://localhost:7113";
  //const apiBaseAddress = "https://lawfirmapi-gdage3hffjgugkeh.uksouth-01.azurewebsites.net";
  const apiBaseAddress = import.meta.env.VITE_API_URL;

  const config = {
    headers: {
      "X-User-Id": "aaaaaaaa-0000-0000-0000-000000000001",
    },
  };

  return {
    getLawFirms: async (pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) => {
      const url =
        `${apiBaseAddress}/lawfirms` +
        `?pageNumber=${pageNumber + 1}` +
        `&pageSize=${pageSize}` +
        `&sortBy=${sortBy}` +
        `&sortOrder=${sortOrder}`;
      const { data } = await axios.get<PaginatedList<LawFirm>>(url, config);
      return data;
    },

    createLawFirm: async (request: CreateLawFirmRequest) => {
      const { data } = await axios.post<LawFirm>(
        `${apiBaseAddress}/lawfirms`,
        request,
        config,
      );
      return data;
    },
  };
}
