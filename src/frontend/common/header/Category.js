import './header.css';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../routes';

const categoryList = [
  'Protein',
  'Gym Gear',
  'Athletics',
  'Nutrition',
  'Vegan',
  'Clothing'
];
export default function Category() {
  return (
    <section className='categories'>
      {categoryList.map((elem, index) => {
        return (
          <div key={index + elem} className='category'>
            <Link to={PRODUCTS}>
              <span className='link__tags'>{elem}</span>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
