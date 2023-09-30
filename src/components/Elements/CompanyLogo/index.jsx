import { Link } from 'react-router-dom'

const CompanyLogo = ({
  to = '/',
  img = null,
  alt = null,
  companyName = 'Company Name',
  moreClass = 'font-size-18 space-2',
  fontSize = null
}) => {
  return (
    <Link
      to={to}
      className={`company-logo${moreClass ? ' ' + moreClass : ''}`}
      style={{ color: 'var(--accent-color1)', fontSize }}
    >
      {img && <img src={img} alt={alt} />}
      {companyName}
    </Link>
  )
}

export default CompanyLogo
