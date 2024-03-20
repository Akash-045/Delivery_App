import "@testing-library/jest-dom";
import { calculateDeliveryFee } from "./calculateDeliveryFee";

describe("calculateDeliveryFee", () => {
  test("applies small order surcharge for cart values less than 10", () => {
    const fee = calculateDeliveryFee(5, 1, 500, new Date());
    expect(fee).toBeGreaterThan(5);
  });

  test("applies base delivery fee", () => {
    const fee = calculateDeliveryFee(20, 1, 500, new Date());
    expect(fee).toBeGreaterThanOrEqual(2);
  });

  test("adds additional fee for distance beyond 1000 meters", () => {
    const fee = calculateDeliveryFee(20, 1, 1500, new Date());
    expect(fee).toBeGreaterThan(2);
  });

  test("adds extra charges for more than 4 items", () => {
    const fee = calculateDeliveryFee(20, 5, 1000, new Date());
    expect(fee).toBeGreaterThan(2);
  });

  test("includes bulk fee for more than 12 items", () => {
    const fee = calculateDeliveryFee(20, 13, 1000, new Date());
    expect(fee).toBeGreaterThan(2 + 1.2);
  });

  test("increases fee during rush hour (3pm to 7pm)", () => {
    const rushHourTime = new Date();
    rushHourTime.setHours(16);
    const fee = calculateDeliveryFee(20, 1, 1000, rushHourTime);
    expect(fee).toBe(2 * 1.2);
  });

  test("provides free delivery for cart values equal or greater than 200", () => {
    const fee = calculateDeliveryFee(200, 2, 1000, new Date());
    expect(fee).toBe(0);
  });

  test("caps the maximum fee at 15", () => {
    const fee = calculateDeliveryFee(15, 20, 5000, new Date());
    expect(fee).toBeLessThanOrEqual(15);
  });
});
