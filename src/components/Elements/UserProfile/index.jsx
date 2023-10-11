const UserProfile = ({ img, alt, name, roleName, moreClass }) => {
  return (
    <div className={`user-profile${moreClass ? ' ' + moreClass : ''}`}>
      <img src={img} alt={alt} />
      <div className="box">
        <p>{name}</p>
        <p className="font-size-11 disabled-text-2 font-weg-400">{roleName}</p>
      </div>
    </div>
  )
}

export default UserProfile
