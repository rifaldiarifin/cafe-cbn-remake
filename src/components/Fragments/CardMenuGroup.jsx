import { useEffect, useRef, useState } from 'react'
import Button from '../Elements/Button'
import InputToggle from '../Elements/InputToggle'
import AdminPanelUI2 from '../Layout/AdminPanelUI2'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import getImage from '../../utils/getImage'

const CardMenuGroup = ({
  image,
  name,
  id,
  groupName,
  onEditClick = () => {},
  onDeleteClick = () => {},
  callback,
  initialToggle,
  onAddMenus,
  onDeleteMenus,
  menus
}) => {
  const [moreOptions, setMoreOptions] = useState(false)
  const ref = useRef(null)
  const useOutsideClick = (ref) => {
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          // ref.current.classList.remove('active')
          setMoreOptions(false)
        }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
    }, [ref])
  }
  useOutsideClick(ref)
  return (
    <AdminPanelUI2.Card
      customTitle={
        <div
          className="box dsp-flex align-itms-center gap-4 overflow-hidden cursr-pointer"
          onClick={() => onEditClick()}
        >
          <h3 className="font-size-18 font-main font-weg-500 space-06 nowrap overflow-hidden text-elips cursr-pointer">
            {groupName}
          </h3>
          <span className="icons8-regular create cursr-pointer" style={{ '--i8-ratio': '20px' }}></span>
        </div>
      }
      moreClass={'default border-box separator-header'}
      style={{ border: '1px solid var(--separator)' }}
      header={
        <InputToggle
          label={'Show On'}
          initialToggle={initialToggle}
          name={name}
          id={id}
          moreClass={'dsp-flex align-itms-center gap-10'}
          callback={callback}
        />
      }
    >
      <div className="box dsp-flex justify-between align-itms-center gap-20" ref={ref}>
        <div className="box">
          <LazyLoadImage
            className="auto-scale-image rounded20"
            src={image}
            alt={groupName}
            effect="opacity"
            style={{ width: '80px', height: '80px' }}
          />
        </div>
        <div className={`box options${moreOptions ? ' active' : ''} dsp-flex fl-1 justify-center align-itms-center`}>
          <div className="box option1 dsp-flex fl-1 fl-colm justify-center gap-10">
            <div
              className="box fl-1 dsp-grid align-itms-center"
              style={{ '--gd-colm': 'repeat(auto-fill, 20px)', '--gd-rows': '40px', width: '120px' }}
            >
              {menus.map((menu, i) => {
                if (i >= 4) return
                return (
                  <img
                    key={`${menu?.uuid}${i}`}
                    className="auto-scale-image"
                    src={getImage(menu?.image, 'nofoodphoto')}
                    alt={menu?.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', boxShadow: 'var(--box-shadow-1)' }}
                  />
                )
              })}
              <Button
                color="second"
                moreClass={'icon'}
                height={'40px'}
                icon={'plus-math'}
                iconSize={'18px'}
                style={'fill'}
                onClick={() => onAddMenus()}
              />
            </div>
            <p className="font-size-14 font-weg-600 disabled-text-1">
              {menus.length > 0 ? `${menus.length} Menu added` : 'Nothing to view here.'}
            </p>
          </div>
          <div className="box option2 justify-end fl-1 gap-10">
            <Button
              iconSize={'22px'}
              brightness={'var(--icon3)'}
              height={'50px'}
              moreClass={'icon'}
              color="classic"
              style={'fill'}
              icon={'delete-row'}
              onClick={() => onDeleteMenus()}
            />
            <Button
              iconSize={'22px'}
              brightness={'var(--icon3)'}
              height={'50px'}
              moreClass={'icon'}
              color="classic"
              style={'fill'}
              icon={'trash'}
              onClick={() => onDeleteClick()}
            />
          </div>
        </div>
        <Button
          icon={moreOptions ? 'menu' : 'menu-vertical'}
          brightness={'var(--icon2)'}
          height={'40px'}
          moreClass={'icon z-1'}
          onClick={() => setMoreOptions(moreOptions ? false : true)}
        />
      </div>
    </AdminPanelUI2.Card>
  )
}

export default CardMenuGroup
