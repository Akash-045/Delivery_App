import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateDeliveryFee } from "./calculateDeliveryFee";

const DeliveryFeeCalculator = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<Date | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);

  return (
    <Box sx={{ margin: 2 }}>
      <h1>Delivery Fee Calculator</h1>
      <TextField
        label="Cart Value (€)"
        type="number"
        value={cartValue}
        onChange={(e) => setCartValue(parseFloat(e.target.value))}
        margin="normal"
        fullWidth
        data-test-id="cartValue"
      />
      <TextField
        label="Number of Items"
        type="number"
        value={numberOfItems}
        onChange={(e) => setNumberOfItems(parseInt(e.target.value))}
        margin="normal"
        fullWidth
        data-test-id="numberOfItems"
      />
      <div style={{ margin: "20px 0" }}>
        <label>Order Date/Time: </label>
        <DatePicker
          selected={orderTime}
          onChange={(date: Date) => setOrderTime(date)}
          showTimeSelect
          dateFormat="Pp"
          customInput={<TextField data-test-id="orderTime" />}
        />
      </div>
      <TextField
        label="Delivery Distance (meters)"
        type="number"
        value={deliveryDistance}
        onChange={(e) => setDeliveryDistance(parseInt(e.target.value))}
        margin="normal"
        fullWidth
        data-test-id="deliveryDistance"
      />
      <div>
        <h2 data-test-id="fee">
          Delivery Fee:
          {calculateDeliveryFee(
            cartValue,
            numberOfItems,
            deliveryDistance,
            orderTime
          ).toFixed(2)}
          €
        </h2>
      </div>
    </Box>
  );
};

export default DeliveryFeeCalculator;
