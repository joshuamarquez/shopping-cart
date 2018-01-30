'use strict';

module.exports = {
  discounts: [
    {
      code: 'PANTS',
      type: '2-FOR-1',
      calculate(qty, price) {
        const noDiscountQty = qty % 2;
        const discountQty = qty - noDiscountQty;

        return ((discountQty * price) / 2) + (noDiscountQty * price);
      },
    },
    {
      code: 'TSHIRT',
      type: 'BULK-PURCHASE',
      calculate(qty, price) {
        if (qty >= 3) {
          return qty * (price - 1);
        }

        return qty * price;
      },
    },
  ],
};
