import { environment } from "@/environments/environment";

export const getProducts = async () => {
  return await fetch(`${environment.api}products`, { method: "GET" });
}

export const getProductId = async (id: string) => {
  return fetch(`${environment.api}products/${id}`, { method: "GET" });
}

export const postProduct = async (data: any) => {
  return fetch(`${environment.api}products`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(data),
  });
}

export const putProduct = async (data: any) => {
    return fetch(`${environment.api}products/${data.id}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data),
    });
  }

  export const deleteProduct = async (id: string) => {
    return fetch(`${environment.api}products/${id}`, { method: "DELETE" });
  }
