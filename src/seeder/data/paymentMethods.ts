import { CreatePaymentMethodDto } from 'src/api/payments/dtos/methods';

const PAYMENT_METHODS: CreatePaymentMethodDto[] = [
  { currencyId: 1, name: 'Efectivo' },
  { currencyId: 1, name: 'Zelle' },
  { currencyId: 2, name: 'Punto de venta' },
  { currencyId: 2, name: 'Transferencia' },
  { currencyId: 2, name: 'Pago móvil' },
  { currencyId: 2, name: 'Efectivo' },
];

export default PAYMENT_METHODS;
