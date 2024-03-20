/**
 * @param cartValue The total value of the cart.
 * @param numberOfItems The number of items in the cart.
 * @param deliveryDistance The delivery distance in meters.
 * @param orderTime The time at which the order was placed.
 * @returns The calculated delivery fee.
 */

export const calculateDeliveryFee = (
  cartValue: number,
  numberOfItems: number,
  deliveryDistance: number,
  orderTime: Date | null
): number => {
  let fee = 2;

  // Small order surcharge if cart value is less than 10
  if (cartValue > 0 && cartValue < 10) {
    fee += 10 - cartValue;
  }

  // Additional fee for extra distance beyond the first 1000 meters
  if (deliveryDistance > 1000) {
    fee += Math.ceil((deliveryDistance - 1000) / 500);
  }

  // Extra charges for having more than 4 items
  if (numberOfItems >= 5) {
    fee += 0.5 * (numberOfItems - 4);
  }

  // Bulk fee for more than 12 items
  if (numberOfItems > 12) {
    fee += 1.2;
  }

  // Check for rush hour (3pm to 7pm)
  if (orderTime) {
    const hour = orderTime.getHours();
    if (hour >= 15 && hour <= 19) {
      fee *= 1.2;
    }
  }

  // Provide free delivery for cart values equal or greater than 200
  if (cartValue >= 200) {
    return 0; // Free delivery
  }

  // Cap the maximum fee at 15 
  return fee > 15 ? 15 : fee; // Max fee cap
};
