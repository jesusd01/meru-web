"use client";

import { FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";

import { Product } from "@/service/products/products.interface";

export default function AddProduct( createProduct: () => Promise<void>, state: Product, onChange: (e: any) => void
) {
  return (
    <form className="form" onSubmit={createProduct}>
      <TextField
        id="nombre-basic"
        label="Nombre"
        name="name"
        value={state.name}
        onChange={onChange}
        variant="standard"
      />
      <TextField
        id="descripcion-basic"
        label="Descripción"
        name="description"
        value={state.description}
        onChange={onChange}
        variant="standard"
      />
      <TextField
        id="precio-basic"
        label="Precio"
        name="price"
        value={state.price}
        onChange={onChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
