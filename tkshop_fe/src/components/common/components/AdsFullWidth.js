import { Container, Card, CardMedia } from "@mui/material";
import React from "react";

const AdsFullWidth = () => {
  return (
    <>
      <Card
        sx={{
          width: "100%",
          margin: "auto",
          boxShadow: 5,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image="https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:80/plain/https://dashboard.cellphones.com.vn/storage/banner-special-desk-b2s-new.png"
        />
      </Card>
    </>
  );
};

export default AdsFullWidth;
