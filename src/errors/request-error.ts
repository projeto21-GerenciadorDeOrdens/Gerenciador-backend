import { RequestError } from "@/protocols";

export function requestError(status: number, statusText: string): RequestError {
  return {
    name: "RequestError",
    data: null,
    status,
    statusText,
    message: "There is a problem with this requisition!",
  };
}
