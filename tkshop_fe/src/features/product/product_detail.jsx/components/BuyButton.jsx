import { Button, Stack } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import * as React from "react";
import { styled } from "@mui/system";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartItems, increaseQuantity } from "../../../../actions/CartAction";
import ShowSnackbar from "../../../../components/common/components/ShowSnackbar.js";

const BuyNowButton = styled(Button)({
  backgroundColor: "#ec1c24",
  fontWeight: 700,
  padding: "15px 0",
  fontSize: 15,
  "&:hover": {
    backgroundColor: "#d40008",
  },
});

const AddCartButton = styled(Button)({
  borderColor: "#ed7615",
  color: "#ed7615",
  fontWeight: 700,
  fontSize: 15,
  "&:hover": {
    borderColor: "#ed7615",
    color: "#ffffff",
    backgroundColor: "#ed7615",
  },
});

const BuyButton = ({ productId, sku }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const handleAddCart = async () => {
    try {
      const response = await axios.post("http://localhost:3030/cart/add", {
        userId: user._id,
        productId: productId,
        sku: sku,
        quantity: 1,
      });
      if (response.status === 200) {
        dispatch(increaseQuantity(productId, sku));
        const cartResponse = await axios.get(
          `http://localhost:3030/cart/${user._id}`,
        );
        if (cartResponse.status === 200) {
          const updatedCartItems = cartResponse.data.data?.items || [];
          dispatch(cartItems(updatedCartItems));
        }
        setShowSnackbar(true);
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };
  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
    } else {
      await handleAddCart();
      navigate("/cart");
    }
  };

  return (
    <Stack spacing={1}>
      <BuyNowButton
        variant="contained"
        onClick={handleBuyNow}
        startIcon={<StoreIcon />}
      >
        Mua ngay
      </BuyNowButton>
      <AddCartButton
        variant="outlined"
        onClick={handleAddCart}
        startIcon={<AddShoppingCartIcon />}
      >
        Thêm vào giỏ hàng
      </AddCartButton>
      {showSnackbar && (
        <ShowSnackbar
          isOpen={true}
          snackbarMessage="Đã thêm vào giỏ hàng thành công"
        />
      )}
    </Stack>
  );
};

export default BuyButton;
