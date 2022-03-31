import './notfound.css';
import { Navbar, Footer } from '../../components';
import pic from '../../assets/notfound.gif';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className='notfound'>
        <img src={pic} alt='notfound' className='notfound__image' />
        <h1 className='notfound__primary'>Oops! Looks like you are lost. </h1>
        <h1 className='notfound__secondary'>
          Check the URL you were trying to visit
        </h1>
        <h1 className='notfound__secondary'>or,</h1>
        <button className='btn btn--large btn--auth--solid md sb'>
          Go back to Homepage
        </button>
      </div>
      <Footer fixed={true} />
    </div>
  );
}
