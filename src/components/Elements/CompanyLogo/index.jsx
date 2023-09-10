import { Link } from 'react-router-dom'

const CompanyLogo = (props) => {
  const { to = '/', img, alt, companyName } = props
  return (
    <Link to={to} className="company-logo" style={{ color: 'var(--accent-color1)' }}>
      <img src={img} alt={alt} />
      {companyName}
    </Link>
  )
}

export default CompanyLogo
