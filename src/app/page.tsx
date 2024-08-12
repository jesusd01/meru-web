"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { FormEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";

import AddProduct from "./AddProduct/AddProduct";
import { deleteProduct, getProducts, postProduct, putProduct } from "@/service/products/products";
import customTable from "@/components/customTable/customTable";
import { Product } from "@/service/products/products.interface";

import styles from "./page.module.css";
import Icon from "@mui/material/Icon";
import EditProduct from "./EditProduct/EditProduct";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stateProduct, setStateProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const res = await getProducts();
    const body = await res.json();
    if (body) {
      setProducts(body);
    }
  };

  const handleOpen = (product: Product) => {
    setOpen(true);
    setStateProduct(product);    
  };

  const createProduct = async () => {
    const res = await postProduct({
      name: stateProduct.name,
      description: stateProduct.description,
      price: stateProduct.price,
    });
    const body = await res.json();
  };

  const updateProduct = async () => {
    const res = await putProduct({
      id: stateProduct.id,
      name: stateProduct.name,
      description: stateProduct.description,
      price: stateProduct.price,
    });
    const body = await res.json();
  };

  const delet = async (id: string) => {
    const res = await deleteProduct(id);
    const body = await res.json();
  };

  const onChange = (e: any) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.main}>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 14px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Productos
            </Typography>
          </CardContent>
        </Box>
        <div
          onClick={() =>
            handleOpen({
              id: "",
              name: "",
              description: "",
              price: 0,
            })
          }
        >
          <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
        </div>
      </Card>
      <div>{customTable(products, handleOpen, delet)}</div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            stateProduct.id.length === 0 ?
              AddProduct(createProduct, stateProduct, onChange)
              :EditProduct(updateProduct, stateProduct, onChange)
          }
        </Box>
      </Modal>
    </main>
  );
}
