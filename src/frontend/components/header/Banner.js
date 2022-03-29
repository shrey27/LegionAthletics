import './header.css';

export default function Banner({ source }) {
  return (
    <div className='carousal--container mg-full'>
      <img src={source} className='carousal' alt='Banner' />
    </div>
  );
}
