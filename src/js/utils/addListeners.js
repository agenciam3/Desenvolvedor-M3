import { filterOptions } from './form/filterButton';
import orderOptions from './order-button/orderOptions';

export default function addListeners() {
  orderOptions();
  filterOptions();
}