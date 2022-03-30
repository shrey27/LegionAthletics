export default function Drawer({ open, setOpen }) {
  return (
    <div>
      <div className={`drawer flex-ct-ct ${open && 'drawer__open'}`}>
        <div
          className={`drawer__background ${open && 'drawer__open'}`}
          onClick={() => setOpen(false)}
        ></div>
        <div className='drawer__content' direction='left'>
          <h1 className='btn--float home xs-s'>
            <i className='fas fa-home'></i>
          </h1>
          <hr />
          <section className='submenu__items flex-st-ct flex-vertical'>
            <span className='submenu__item md sb'>Protein</span>
            <span className='submenu__item md sb'>Gym Gear</span>
            <span className='submenu__item md sb'>Athletics</span>
            <span className='submenu__item md sb'>Nutrition</span>
            <span className='submenu__item md sb'>Vegan</span>
            <span className='submenu__item md sb'>Clothing</span>
            <span className='submenu__item md sb'>Limited-Edition</span>
          </section>
          <hr />
        </div>
        <span className='drawer__close' onClick={() => setOpen(false)}>
          <i className='fas fa-times-circle'></i>
        </span>
      </div>
    </div>
  );
}
