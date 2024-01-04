import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
} from "@mui/material";
import CustomCard from "./CustomCard";

const MainSale = () => {
  return (
    <Card
      sx={{
        background: "linear-gradient(red, black)",
        padding: 0,
        position: "relative",
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <center>
          <Typography
            variant="h6"
            sx={{ color: "white", marginBottom: 2, marginTop: "14px" }}
          >
            Sản phẩm nổi bật
          </Typography>
        </center>
        <Tabs
          variant="scrollable"
          scrollButtons
          sx={{
            "& .MuiTabs-scrollButtons": {
              backgroundColor: "#ffff",
              height: "40px",
              width: "40px",
              borderRadius: "100%",
              marginTop: "160px",
            },
          }}
          allowScrollButtonsMobile
        >
          {Array.from(Array(10).keys()).map((index) => (
            <Box
              key={index}
              sx={{
                minWidth: "31%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CustomCard />
            </Box>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MainSale;
