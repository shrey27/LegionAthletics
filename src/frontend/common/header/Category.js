import './header.css';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../../routes';
import { categoryList } from '../constants';

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
