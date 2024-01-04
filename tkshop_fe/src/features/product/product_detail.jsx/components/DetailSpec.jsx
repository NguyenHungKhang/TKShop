import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import * as React from "react";
import "swiper/css";
import "swiper/css/pagination";

const DetailSpecTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#efefef",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

const DetailSpecTableContainer = styled(TableContainer)({
  border: "1px solid #efefef",
  borderRadius: "20px",
  marginTop: "10px",
  "& td": {
    padding: "10px",
  },
});

const DetailSpec = ({ open, setOpen, detailSpecs }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpen(false);
  };

  return !detailSpecs ? (
    <>Loading</>
  ) : (
    <Dialog fullScreen={fullScreen} open={open}>
      <DialogTitle sx={{ backgroundColor: "rgb(41, 182, 246)" }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: "#ffffff" }}>
          Thông số kỹ thuật chi tiết
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "white",
        }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>
          {detailSpecs.map((item, index) => {
            return (
              <>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{ color: "black", mt: 2 }}
                >
                  {item.groupName}
                </Typography>
                <DetailSpecTableContainer>
                  <Table>
                    <TableBody>
                      {item.groupItems.map((childItem, childIndex) => {
                        return (
                          <DetailSpecTableRow key={childIndex}>
                            <TableCell width="40%">{childItem.name}</TableCell>
                            <TableCell width="60%">
                              {childItem.values[0]}
                            </TableCell>
                          </DetailSpecTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </DetailSpecTableContainer>
              </>
            );
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ width: "100%", m: 1.5, backgroundColor: "rgb(41, 182, 246)" }}
          autoFocus
          startIcon={<HighlightOffIcon />}
          onClick={handleClose}
        >
          <Typography variant="body1" fontWeight={650}>
            Đóng
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailSpec;
