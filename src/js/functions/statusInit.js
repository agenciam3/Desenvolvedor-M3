import { filterOptions } from './inputs/filterButton';
import orderOptions from './getButtons/orderOptions';

export default function statusInitial() {
  orderOptions();
  filterOptions();
}